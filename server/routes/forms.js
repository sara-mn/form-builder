import express from 'express';
import { randomUUID } from 'crypto';
import { Permission, hasPermission } from '../permissions.js';
import requirePermission from '../middleware/require-permission.js';

export default function createFormsRouter(db) {
    const router = express.Router();
    router.use(express.json());

    const getForms = () => db.get('forms');
    const findForm = (id) => getForms().find({ id }).value();

    // Changing status is publishing; changing anything else is editing. A body that does both needs both.
    const requirePatchPermissions = (req, res, next) => {
        const keys = Object.keys(req.body ?? {});
        const needed = [];
        if (keys.includes('status')) needed.push(Permission.FormPublish);
        if (keys.length === 0 || keys.some((key) => key !== 'status')) needed.push(Permission.FormEdit);

        const allowed = needed.every((permission) => hasPermission(req.user, permission));
        return allowed ? next() : res.status(403).json({ message: 'Forbidden' });
    };

    router.get('/', requirePermission(Permission.FormView), (_req, res) => {
        res.json(getForms().value());
    });

    router.get('/:id', requirePermission(Permission.FormView), (req, res) => {
        const form = findForm(req.params.id);
        if (!form) return res.status(404).json({ message: 'Form not found' });
        res.json(form);
    });

    router.post('/', requirePermission(Permission.FormCreate), (req, res) => {
        const now = new Date().toISOString();
        // id and timestamps are set last, so values sent in the body can never win
        const form = { ...req.body, id: randomUUID(), createdAt: now, updatedAt: now };
        getForms().push(form).write();
        res.status(201).json(form);
    });

    router.patch('/:id', requirePatchPermissions, (req, res) => {
        const { id } = req.params;
        if (!findForm(id)) return res.status(404).json({ message: 'Form not found' });

        // id and createdAt are owned by the server; updatedAt is always refreshed here.
        const { id: _ignoredId, createdAt: _ignoredCreatedAt, ...changes } = req.body;
        getForms()
            .find({ id })
            .assign({ ...changes, updatedAt: new Date().toISOString() })
            .write();
        res.json(findForm(id));
    });

    router.delete('/:id', requirePermission(Permission.FormDelete), (req, res) => {
        const { id } = req.params;
        if (!findForm(id)) return res.status(404).json({ message: 'Form not found' });

        getForms().remove({ id }).write();
        res.json({});
    });

    return router;
}
