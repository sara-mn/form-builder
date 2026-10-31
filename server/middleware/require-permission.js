import { hasPermission } from '../permissions.js';

/** Route guard: 403 unless the authenticated user has the permission. Must run after authenticate. */
export default function requirePermission(permission) {
    return (req, res, next) =>
        hasPermission(req.user, permission) ? next() : res.status(403).json({ message: 'Forbidden' });
}
