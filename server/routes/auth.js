import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

const ACCESS_TOKEN_SECRET = process.env.JWT_ACCESS_SECRET || 'dev-only-access-secret-change-me';
const REFRESH_TOKEN_SECRET = process.env.JWT_REFRESH_SECRET || 'dev-only-refresh-secret-change-me';
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:4200';

if (!process.env.JWT_ACCESS_SECRET || !process.env.JWT_REFRESH_SECRET) {
    console.warn('[auth] Using fallback dev secrets — set JWT_ACCESS_SECRET and JWT_REFRESH_SECRET env vars for anything beyond local dev.');
}
export default function createAuthRouter(db, isProduction = false) {
    const router = express.Router();

    const cookieOptions = {
        httpOnly: true,
        sameSite: isProduction ? 'none' : 'strict',
        secure: isProduction
    };

    const getUsers = () => db.get('users');

    const toSafeUser = (user) => {
        const { password, resetPasswordToken, resetPasswordExpiresAt, ...safeUser } = user;
        return safeUser;
    };

    router.post('/register', async (req, res) => {
        const { email, password, name, mobile, roles } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        const existing = getUsers().find({ email }).value();
        if (existing) {
            return res.status(409).json({ message: 'A user with this email already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = {
            id: String(Date.now()),
            email,
            password: hashedPassword,
            name: name || email,
            roles: roles || ['viewer'],
            profile: { avatarUrl: '', bio: '', mobile: mobile || '' }
        };

        getUsers().push(newUser).write();
        res.status(201).json({ message: 'User registered successfully', user: toSafeUser(newUser) });
    });

    router.post('/login', async (req, res) => {
        const { username, password } = req.body;

        // Find the user
        const user = getUsers().find({ email: username }).value();
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Check the password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Create a JWT
        const payload = { sub: user.id, email: user.email, roles: user.roles };
        const accessToken = jwt.sign(payload, ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
        const refreshToken = jwt.sign(payload, REFRESH_TOKEN_SECRET, { expiresIn: '7d' });

        res.cookie('refreshToken', refreshToken, cookieOptions).json({ accessToken, user: toSafeUser(user) });
    });

    router.post('/refresh', (req, res) => {
        const refreshToken = req.cookies['refreshToken'];
        if (!refreshToken) {
            return res.status(401).json({ message: 'No refresh token provided' });
        }

        try {
            const decoded = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET);

            const user = getUsers().find({ id: decoded.sub }).value();
            if (!user) {
                return res.status(401).json({ message: 'User no longer exists' });
            }

            const payload = { sub: user.id, email: user.email, roles: user.roles };
            const accessToken = jwt.sign(payload, ACCESS_TOKEN_SECRET, { expiresIn: '1h' });

            res.json({ accessToken, user: toSafeUser(user) });
        } catch (error) {
            return res.status(401).json({ message: 'Invalid or expired refresh token' });
        }
    });

    router.post('/logout', (req, res) => {
        res.clearCookie('refreshToken', cookieOptions);
        res.status(200).json({ message: 'Logged out successfully' });
    });

    const authenticate = (req, res, next) => {
        const authHeader = req.headers['authorization'];
        const accessToken = authHeader && authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;

        if (!accessToken) {
            return res.status(401).json({ message: 'No access token provided' });
        }

        try {
            req.user = jwt.verify(accessToken, ACCESS_TOKEN_SECRET);
            next();
        } catch (error) {
            return res.status(401).json({ message: 'Invalid or expired access token' });
        }
    };

    router.post('/reset-password/request', async (req, res) => {
        const { email } = req.body;
        const user = getUsers().find({ email }).value();

        // Always respond 200 — never reveal whether the email exists
        if (!user) {
            return res.status(200).json({ message: 'If that email exists, a reset link has been sent' });
        }

        const token = crypto.randomBytes(32).toString('hex');
        const expiresAt = Date.now() + 60 * 60 * 1000; // 1h

        getUsers()
            .find({ email })
            .assign({
                resetPasswordToken: token,
                resetPasswordExpiresAt: expiresAt
            })
            .write();

        // No real email service — log the link for manual testing (documented in README)
        console.log(`[password-reset] Reset link for ${email}: ${FRONTEND_URL}/reset-password?token=${token}`);
        res.status(200).json({ message: 'If that email exists, a reset link has been sent' });
    });

    router.post('/reset-password/confirm', async (req, res) => {
        const { token, newPassword } = req.body;
        if (!token || !newPassword) {
            return res.status(400).json({ message: 'Token and new password are required' });
        }

        const user = getUsers().find({ resetPasswordToken: token }).value();
        if (!user || !user.resetPasswordExpiresAt || user.resetPasswordExpiresAt < Date.now()) {
            return res.status(400).json({ message: 'Invalid or expired reset token' });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        getUsers()
            .find({ id: user.id })
            .assign({
                password: hashedPassword,
                resetPasswordToken: null,
                resetPasswordExpiresAt: null
            })
            .write();

        res.status(200).json({ message: 'Password reset successfully' });
    });

    router.patch('/profile', authenticate, async (req, res) => {
        const { name, mobile } = req.body;
        const user = getUsers().find({ id: req.user.sub }).value();
        if (!user) return res.status(404).json({ message: 'User not found' });

        getUsers()
            .find({ id: req.user.sub })
            .assign({
                ...(name !== undefined && { name }),
                profile: { ...user.profile, ...(mobile !== undefined && { mobile }) }
            })
            .write();

        res.json(toSafeUser(getUsers().find({ id: req.user.sub }).value()));
    });

    router.get('/profile', authenticate, (req, res) => {
        const user = getUsers().find({ id: req.user.sub }).value();
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(toSafeUser(user));
    });

    router.post('/change-password', authenticate, async (req, res) => {
        const { currentPassword, newPassword } = req.body;
        const user = getUsers().find({ id: req.user.sub }).value();
        if (!user) return res.status(404).json({ message: 'User not found' });

        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Current password is incorrect' });

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        getUsers().find({ id: user.id }).assign({ password: hashedPassword }).write();

        res.status(200).json({ message: 'Password changed successfully' });
    });

    router.get('/protected', authenticate, (req, res) => {
        res.json({ message: 'Welcome to the protected route', user: req.user });
    });

    return router;
}
