export abstract class IStorage {
  abstract setItem(key: string , value: any): void;
  abstract getItem(key: string): string | null;
  abstract removeItem(key: string): void;
  abstract clear(): void;
}
