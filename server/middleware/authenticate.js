import jwt from 'jsonwebtoken';
import { ACCESS_TOKEN_SECRET } from '../config.js';

/** Rejects requests without a valid access token; on success puts the token payload on req.user. */
export default function authenticate(req, res, next) {
    const authHeader = req.headers['authorization'];
    const accessToken = authHeader && authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;

    if (!accessToken) {
        return res.status(401).json({ message: 'No access token provided' });
    }

    try {
        req.user = jwt.verify(accessToken, ACCESS_TOKEN_SECRET);
        next();
    } catch {
        return res.status(401).json({ message: 'Invalid or expired access token' });
    }
}
