import { HttpClient } from '@angular/common/http';
import { Injectable, signal, computed } from '@angular/core';
import { catchError, map, of, Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { MicoviApi } from './micovi.api';
import { Router } from '@angular/router';

export interface User {
  id: string;
  name: string;
  email: string;
  // agrega más campos si tu backend los devuelve
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private user = signal<User | null>(null);
  constructor(private micoviapi: MicoviApi, private router: Router) {

  }

  setUser(u: any): void {
    this.user.set(u);
  }

  clear(): void {
    this.user.set(null);
  }

  isAuthenticated(): boolean {
    return !!this.user();
  }



  loadSession(): Observable<User> {
    return this.micoviapi.get<User>('/me')
      .pipe(tap(res => this.setUser(res)));
  }

  logout(): Observable<void> {
    return this.micoviapi.get<void>(`/logout`).pipe(
      tap(() => {
        this.clear(); // ✅ resetea usuario
        this.router.navigate(['/login']);
      })
    );
  }

}

