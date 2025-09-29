import { IStorage } from '@domain/storage.abstract';
import { Injectable } from '@angular/core';

// @Injectable()
export class TokenUseCase {
  private key = 'accessToken';

  constructor(private storage: IStorage) {
  }

  setAccessToken(token: string) {
    this.storage.setItem(this.key, token);
  }

  getAccessToken(): string | null {
    return this.storage.getItem(this.key);
  }

  clearAccessToken() {
    this.storage.removeItem(this.key);
  }
}
