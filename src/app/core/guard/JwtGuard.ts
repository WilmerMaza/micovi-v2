import { inject, Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { AuthService } from '../services/auth';


export const JwtGuard: CanActivateFn = async () => {
  console.log('gallinas y pollos');
  const auth = inject(AuthService);
  const router = inject(Router);

  // si ya hay usuario, pasas
  if (auth.isAuthenticated()) return true;

  try {
    await firstValueFrom(auth.ensureSession()); // ← bloquea hasta que /me resuelva
    return true;
  } catch {
    return router.createUrlTree(['/login']);
  } finally {
  }
};
