import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const ACCESS_TOKEN_SECRET = process.env.JWT_ACCESS_SECRET || 'dev-only-access-secret-change-me';
const REFRESH_TOKEN_SECRET = process.env.JWT_REFRESH_SECRET || 'dev-only-refresh-secret-change-me';

if (!process.env.JWT_ACCESS_SECRET || !process.env.JWT_REFRESH_SECRET) {
    console.warn('[auth] Using fallback dev secrets — set JWT_ACCESS_SECRET and JWT_REFRESH_SECRET env vars for anything beyond local dev.');
}
export default function createAuthRouter(db) {
    const router = express.Router();

    const getUsers = () => db.get('users');

    const toSafeUser = (user) => {
        const { password, ...safeUser } = user;
        return safeUser;
    };

    router.post('/register', async (req, res) => {
        const { email, password, name, roles } = req.body;

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
            profile: { avatarUrl: '', bio: '', phone: '' }
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

        res.cookie('refreshToken', refreshToken, { httpOnly: true, sameSite: 'strict' }).json({ accessToken, user: toSafeUser(user) });
    });

    router.post('/refresh', (req, res) => {
        const refreshToken = req.cookies['refreshToken'];
        if (!refreshToken) {
            return res.status(401).json({ message: 'No refresh token provided' });
        }

        try {
            const decoded = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET);

            const payload = { sub: decoded.sub, email: decoded.email, roles: decoded.roles };
            const accessToken = jwt.sign(payload, ACCESS_TOKEN_SECRET, { expiresIn: '1h' });

            res.json({ accessToken });
        } catch (error) {
            return res.status(401).json({ message: 'Invalid or expired refresh token' });
        }
    });

    router.post('/logout', (req, res) => {
        res.clearCookie('refreshToken', { httpOnly: true, sameSite: 'strict' });
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

    router.get('/protected', authenticate, (req, res) => {
        res.json({ message: 'Welcome to the protected route', user: req.user });
    });

    return router;
}
