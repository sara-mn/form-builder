import {Injectable} from '@angular/core';
import {IStorage} from '@domain/storage.abstract';

@Injectable({
  providedIn: 'root'
})
export class StorageService implements IStorage {

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
