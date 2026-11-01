// Mirror of src/app/domain/user/constants/role-permissions.constant.ts.
// The server image is built from server/ only, so it cannot import the Angular domain.
// Change both files together.
export const Permission = Object.freeze({
    FormView: 'form:view',
    FormCreate: 'form:create',
    FormEdit: 'form:edit',
    FormDelete: 'form:delete',
    FormPublish: 'form:publish',
    SubmissionCreate: 'submission:create',
    SubmissionView: 'submission:view',
    UserManage: 'user:manage'
});

const ROLE_PERMISSIONS = Object.freeze({
    admin: Object.values(Permission),
    editor: [
        Permission.FormView,
        Permission.FormCreate,
        Permission.FormEdit,
        Permission.FormPublish,
        Permission.SubmissionCreate,
        Permission.SubmissionView
    ],
    viewer: [Permission.FormView, Permission.SubmissionCreate]
});

/** True when any of the user's roles grants the permission. user is the token payload (req.user). */
export function hasPermission(user, permission) {
    return (user?.roles ?? []).some((role) => (ROLE_PERMISSIONS[role] ?? []).includes(permission));
}
