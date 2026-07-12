import { Injectable } from '@angular/core';
import { StorageGateway } from '@domain/storage.gateway.abstract';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService implements StorageGateway {

  constructor() {
  }

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
