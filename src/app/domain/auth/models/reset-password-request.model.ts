export interface RequestPasswordResetPayload {
    email: string;
}

export interface ConfirmPasswordResetPayload {
    token: string;
    newPassword: string;
}
