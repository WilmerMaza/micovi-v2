import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { MicoviApi } from './micovi.api';


export interface DataUser {
  ID: string
  email: string
  institutionName: string
  legalRepresentative: string
  character: string
  pais: string
  sede: string
  webPage: string
  phone: string
  image: string
  createdAt: string
  updatedAt: string
  account: string
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private user = signal<DataUser | null>(null);

  constructor(private micoviapi: MicoviApi, private router: Router) {

  }

  getUser(): DataUser | null {
    return this.user();
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

  loadSession(): Observable<DataUser> {
    return this.micoviapi.get<DataUser>('/login/me')
      .pipe(tap((res: DataUser) => this.setUser(res)));
  }

  logout(): Observable<void> {
    return this.micoviapi.post<void>(`/login/logout`, {})
      .pipe(
        tap(() => {
          this.clear(); // ✅ resetea usuario
          this.router.navigate(['/login']);
        })
      );
  }

}

