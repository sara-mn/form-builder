import express from 'express';
import { randomUUID } from 'crypto';
import requirePermission from '../middleware/require-permission.js';
import { Permission, hasPermission } from '../permissions.js';
import { isOpenForSubmissions } from '../rules.js';
export default function createSubmissionsRouter(db) {
    const router = express.Router();
    router.use(express.json());

    const getSubmissions = () => db.get('submissions');

    router.get('/', (req, res) => {
        const { formId } = req.query;
        // Other respondents' answers are private: without SubmissionView a user only ever sees their own.
        const submittedBy = hasPermission(req.user, Permission.SubmissionView) ? req.query.submittedBy : req.user.sub;

        let submissions = getSubmissions().value();
        if (formId) submissions = submissions.filter((s) => s.formId === formId);
        if (submittedBy) submissions = submissions.filter((s) => s.submittedBy === submittedBy);
        res.json(submissions);
    });

    router.post('/', requirePermission(Permission.SubmissionCreate), (req, res) => {
        const form = db.get('forms').find({ id: req.body.formId }).value();
        if (!form) return res.status(404).json({ message: 'Form not found' });
        if (!isOpenForSubmissions(form)) {
            return res.status(409).json({ message: 'This form is not accepting submissions.' });
        }

        // The respondent is whoever holds the token, never what the body claims.
        const submittedBy = req.user.sub;
        if (getSubmissions().find({ formId: form.id, submittedBy }).value()) {
            return res.status(409).json({ message: 'You have already submitted this form.' });
        }

        const submission = {
            id: randomUUID(),
            formId: form.id,
            submittedBy,
            answers: req.body.answers ?? {},
            submittedAt: new Date().toISOString()
        };
        getSubmissions().push(submission).write();
        res.status(201).json(submission);
    });

    return router;
}
