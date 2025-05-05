import {IStorage} from '@domain/storage.abstract';
import {BehaviorSubject} from 'rxjs';

export class TokenUseCase {
  private tokenSubject = new BehaviorSubject<string | null>(null);
  private key = 'accessToken';

  constructor(private storage: IStorage) {
  }

  setAccessToken(token: string) {
    this.tokenSubject.next(token);
    this.storage.setItem(this.key, token);
  }

  getAccessToken(): string | null {
    return this.tokenSubject.value || this.storage.getItem(this.key);
  }

  clearAccessToken() {
    this.tokenSubject.next(null);
    this.storage.removeItem(this.key);
  }
}
