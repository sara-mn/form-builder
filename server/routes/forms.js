import express from 'express';
import { randomUUID } from 'crypto';

export default function createFormsRouter(db) {
    const router = express.Router();
    router.use(express.json());

    const getForms = () => db.get('forms');
    const findForm = (id) => getForms().find({ id }).value();

    router.get('/', (_req, res) => {
        res.json(getForms().value());
    });

    router.get('/:id', (req, res) => {
        const form = findForm(req.params.id);
        if (!form) return res.status(404).json({ message: 'Form not found' });
        res.json(form);
    });

    router.post('/', (req, res) => {
        const now = new Date().toISOString();
        // id and timestamps are set last, so values sent in the body can never win
        const form = { ...req.body, id: randomUUID(), createdAt: now, updatedAt: now };
        getForms().push(form).write();
        res.status(201).json(form);
    });

    router.patch('/:id', (req, res) => {
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

    router.delete('/:id', (req, res) => {
        const { id } = req.params;
        if (!findForm(id)) return res.status(404).json({ message: 'Form not found' });

        getForms().remove({ id }).write();
        res.json({});
    });

    return router;
}
