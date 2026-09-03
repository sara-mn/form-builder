import { Service } from '@angular/core';
import { StorageGateway } from '@domain/storage.gateway.abstract';

@Service()
export class TokenStorageService implements StorageGateway {
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
        localStorage.clear();
    }
}
