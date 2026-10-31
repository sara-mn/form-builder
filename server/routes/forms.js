import express from 'express';
import { randomUUID } from 'crypto';
import { Permission, hasPermission } from '../permissions.js';
import requirePermission from '../middleware/require-permission.js';
import { FormStatus, getPublishError } from '../rules.js';
export default function createFormsRouter(db) {
    const router = express.Router();
    router.use(express.json());

    const getForms = () => db.get('forms');
    const findForm = (id) => getForms().find({ id }).value();
    const isLocked = (formId) => db.get('submissions').find({ formId }).value() !== undefined;
    // Changing status is publishing; changing anything else is editing. A body that does both needs both.
    const requirePatchPermissions = (req, res, next) => {
        const keys = Object.keys(req.body ?? {});
        const needed = [];
        if (keys.includes('status')) needed.push(Permission.FormPublish);
        if (keys.length === 0 || keys.some((key) => key !== 'status')) needed.push(Permission.FormEdit);

        const allowed = needed.every((permission) => hasPermission(req.user, permission));
        return allowed ? next() : res.status(403).json({ message: 'Forbidden' });
    };

    router.get('/', requirePermission(Permission.FormView), (req, res) => {
        // Drafts are work in progress: only users who can edit forms see them (mirrors canViewForm).
        const canSeeDrafts = hasPermission(req.user, Permission.FormEdit);
        const forms = getForms()
            .value()
            .filter((form) => canSeeDrafts || form.status === FormStatus.Published);
        res.json(forms);
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
        const form = findForm(id);
        if (!form) return res.status(404).json({ message: 'Form not found' });

        const { id: _ignoredId, createdAt: _ignoredCreatedAt, ...changes } = req.body;

        if ('status' in changes && !Object.values(FormStatus).includes(changes.status)) {
            return res.status(400).json({ message: 'Unknown status' });
        }

        // The lock protects the structure; publishing and unpublishing stay allowed.
        const changesStructure = Object.keys(changes).some((key) => key !== 'status');
        if (changesStructure && isLocked(id)) {
            return res
                .status(409)
                .json({ message: 'Form is locked: cannot be edited after receiving submissions. Clone it instead.' });
        }

        if (changes.status === FormStatus.Published) {
            const error = getPublishError({ ...form, ...changes });
            if (error) return res.status(422).json({ message: error });
        }

        getForms()
            .find({ id })
            .assign({ ...changes, updatedAt: new Date().toISOString() })
            .write();
        res.json(findForm(id));
    });

    router.delete('/:id', requirePermission(Permission.FormDelete), (req, res) => {
        const { id } = req.params;
        if (!findForm(id)) return res.status(404).json({ message: 'Form not found' });
        if (isLocked(id)) {
            return res
                .status(409)
                .json({ message: 'Form is locked: cannot be deleted after receiving submissions. Clone it instead.' });
        }

        getForms().remove({ id }).write();
        res.json({});
    });

    return router;
}
