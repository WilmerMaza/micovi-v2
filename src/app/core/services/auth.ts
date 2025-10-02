import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, of, shareReplay, tap } from 'rxjs';
import { MicoviApi } from './micovi.api';
export interface infoUser {
  user: User
}

export interface User {
  dataUser: DataUser
  iat: number
  exp: number
}

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
  private user = signal<infoUser | null>(null);
  private inFlight$?: Observable<any>;
  constructor(private micoviapi: MicoviApi, private router: Router) {

  }
  ensureSession(): Observable<any> {
    // ya tengo usuario
    if (this.user()) return of(this.user());

    // ya hay petición /me en curso → devuelvo la misma
    if (this.inFlight$) return this.inFlight$;

    // hago /me y memorizo hasta que complete
    this.inFlight$ = this.micoviapi.get<{ user: any }>('/login/me').pipe(
      tap((res) => this.user.set(res.user)),
      catchError((err) => {
        this.user.set(null);
        throw err;
      }),
      // compartir el mismo observable a múltiples suscriptores
      shareReplay(1)
    );

    // cuando complete o falle, libero el inFlight$
    this.inFlight$.subscribe({ finalize: () => (this.inFlight$ = undefined) } as any);

    return this.inFlight$;
  }

  getUser(): infoUser | null {
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

  loadSession(): Observable<infoUser> {
    return this.micoviapi.get<infoUser>('/login/me')
      .pipe(tap(res => this.setUser(res)));
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

