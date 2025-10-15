import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { MicoviApi } from './micovi.api';
import { DataUser } from '../../view/models/dataUser';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private user = signal<DataUser | null>(null);

  constructor(private micoviapi: MicoviApi, private router: Router) {}

  getUser(): DataUser | null {
    return this.user();
  }

  setUser(u: DataUser): void {
    this.user.set(u);
  }

  clear(): void {
    this.user.set(null);
  }

  isAuthenticated(): boolean {
    return !!this.user();
  }

  loadSession(): Observable<DataUser> {
    return this.micoviapi
      .get<DataUser>('/login/me')
      .pipe(tap((res: DataUser) => this.setUser(res)));
  }

  logout(): Observable<void> {
    return this.micoviapi.post<void>(`/login/logout`, {}).pipe(
      tap(() => {
        this.clear(); // ✅ resetea usuario
        this.router.navigate(['/login']);
      })
    );
  }
}
