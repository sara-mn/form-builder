import express from 'express';
import { randomUUID } from 'crypto';

export default function createSubmissionsRouter(db) {
    const router = express.Router();
    router.use(express.json());

    const getSubmissions = () => db.get('submissions');

    // The client filters only by formId and submittedBy; json-server accepted any field.
    router.get('/', (req, res) => {
        const { formId, submittedBy } = req.query;
        let submissions = getSubmissions().value();
        if (formId) submissions = submissions.filter((s) => s.formId === formId);
        if (submittedBy) submissions = submissions.filter((s) => s.submittedBy === submittedBy);
        res.json(submissions);
    });

    router.post('/', (req, res) => {
        // id and submittedAt are set last: the server's clock is the reference, not the browser's.
        const submission = { ...req.body, id: randomUUID(), submittedAt: new Date().toISOString() };
        getSubmissions().push(submission).write();
        res.status(201).json(submission);
    });

    return router;
}
