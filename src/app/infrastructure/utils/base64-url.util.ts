export function base64UrlToBase64(base64Url: string): string {
    return base64Url.replace(/-/g, '+').replace(/_/g, '/');
}
