import { Injectable } from '@angular/core';
import { StorageService } from '@domain/storage-service.abstract';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService implements StorageService {

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
