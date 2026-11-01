export const ACCESS_TOKEN_SECRET = process.env.JWT_ACCESS_SECRET || 'dev-only-access-secret-change-me';
export const REFRESH_TOKEN_SECRET = process.env.JWT_REFRESH_SECRET || 'dev-only-refresh-secret-change-me';
export const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:4200';

if (!process.env.JWT_ACCESS_SECRET || !process.env.JWT_REFRESH_SECRET) {
    console.warn(
        '[auth] Using fallback dev secrets — set JWT_ACCESS_SECRET and JWT_REFRESH_SECRET env vars for anything beyond local dev.'
    );
}
