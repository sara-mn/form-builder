import { TokenStorageService } from './token-storage.service';
import { describe, it, expect, beforeEach } from 'vitest';

describe('TokenStorageService', () => {
    let service: TokenStorageService;

    beforeEach(() => {
        localStorage.clear();
        service = new TokenStorageService();
    });

    it('should return the exact value that was stored (round-trip)', () => {
        service.setItem('access_token', 'fake-jwt-value');

        const result = service.getItem('access_token');

        expect(result).toBe('fake-jwt-value');
    });

    it('should return null value for non-existent key', () => {
        const result = service.getItem('non_existent_key');
        expect(result).toBeNull();
    });

    it('should remove the item from storage', () => {
        service.setItem('access_token', 'fake-jwt-value');
        service.setItem('user_id', 'fake-user-id');
        service.removeItem('access_token');

        const result1 = service.getItem('access_token');
        const result2 = service.getItem('user_id');
        expect(result1).toBeNull();
        expect(result2).toBe('fake-user-id');
    });

    it('should not throw when removing a non-existent key', () => {
        expect(() => service.removeItem('non_existent_key')).not.toThrow();
    });

    it('should clear all items from storage', () => {
        service.setItem('access_token', 'fake-jwt-value');
        service.setItem('user_id', 'fake-user-id');
        service.clear();

        const result1 = service.getItem('access_token');
        const result2 = service.getItem('user_id');
        expect(result1).toBeNull();
        expect(result2).toBeNull();
    });
});
