import { Service } from '@angular/core';
import { StorageGateway } from '@domain/storage.gateway.abstract';

@Service()
export class TokenStorageService implements StorageGateway {
    private readonly authKeys: readonly string[] = ['token'];

    getItem(key: string): string | null {
        return localStorage.getItem(key);
    }

    setItem(key: string, value: string): void {
        localStorage.setItem(key, value);
    }

    removeItem(key: string): void {
        localStorage.removeItem(key);
    }

    clear(): void {
        this.authKeys.forEach((key) => localStorage.removeItem(key));
    }
}
