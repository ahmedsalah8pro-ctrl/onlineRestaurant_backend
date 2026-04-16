import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SessionIdService {
  private readonly STORAGE_KEY = 'app_session_id';
  private currentId: string | null = null;

  constructor() {
    this.currentId = localStorage.getItem(this.STORAGE_KEY);
    if (!this.currentId) {
      this.currentId = this.generateId();
      localStorage.setItem(this.STORAGE_KEY, this.currentId);
    }
  }

  get sessionId(): string {
    return this.currentId || this.generateId();
  }

  private generateId(): string {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  }
}
