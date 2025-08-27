import { computed, effect, Injectable, signal } from '@angular/core';
import { Persistence } from '../../utils/persistence.service';
import { DataUser, Ijwt, session } from '../../models/interface';
import { jwtDecode } from 'jwt-decode';
import { KEYSESSION } from '../../models/constan';
import { Observable } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private tokenSignal = signal<string | null>(null);

  // Booleano reactivo indicando si hay sesión válida
  readonly isAuthenticated = computed((): boolean => {
    const token: string | null = this.tokenSignal();
    if (!token) return false;
    try {
      const { exp } = jwtDecode(token);
      return exp! > Math.floor(Date.now() / 1000);
    } catch (e) {
      console.error(e);

      return false;
    }
  });

  // Datos del usuario decodificados
  readonly dataUser = computed<DataUser | null>(() => {
    const token = this.tokenSignal();
    return token ? jwtDecode<Ijwt>(token).dataUser : null;
  });

  constructor(private persistence: Persistence) {
    // Recupera al iniciar
    const saved = this.persistence.get(KEYSESSION) as string | null;
    if (saved) this.tokenSignal.set(saved);

    // Persiste cada vez que cambia token
    effect(() => {
      const tok = this.tokenSignal();
      if (tok) this.persistence.save(KEYSESSION, tok);
      else this.persistence.delete(KEYSESSION);
    });
  }

  /** Establece un nuevo token y dispara efectos */
  setToken(token: string) {
    this.tokenSignal.set(token);
  }

  /** Borra sesión */
  clearSession() {
    this.tokenSignal.set(null);
  }

  // Para el interceptor
  getTokenSignal(): string | null {
    return this.tokenSignal();
  }

  /** Emite el valor actual del token y futuros cambios */
  readonly getToken$: Observable<string | null> = toObservable(
    this.tokenSignal
  );

  /** Emite los datos de usuario decodificados */
  readonly getDataUser$: Observable<DataUser | null> = toObservable(
    this.dataUser
  );
}
