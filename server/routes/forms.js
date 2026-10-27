import express from 'express';

export default function createFormsRouter(db) {
    const router = express.Router();

    const getForms = () => db.get('forms');

    router.get('/', (req, res) => {
        const forms = getForms().value();
        res.json(forms);
    });

    router.get('/:id', (req, res) => {
        const form = getForms().find({ id: req.params.id }).value();
        if (!form) return res.status(404).json({ message: 'Form not found' });
        res.json(form);
    });

    return router;
}
