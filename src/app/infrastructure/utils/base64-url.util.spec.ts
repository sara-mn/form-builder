import { base64UrlToBase64 } from './base64-url.util';

describe('base64UrlToBase64', () => {
    it('replaces "-" with "+"', () => {
        expect(base64UrlToBase64('abc-def')).toBe('abc+def');
    });

    it('replaces "_" with "/"', () => {
        expect(base64UrlToBase64('abc_def')).toBe('abc/def');
    });

    it('replaces both "-" and "_" in the same string', () => {
        expect(base64UrlToBase64('a-b_c-d_e')).toBe('a+b/c+d/e');
    });

    it('leaves standard base64 characters untouched', () => {
        expect(base64UrlToBase64('abcDEF123+/=')).toBe('abcDEF123+/=');
    });

    it('returns an empty string unchanged', () => {
        expect(base64UrlToBase64('')).toBe('');
    });
});
