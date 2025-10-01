import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { AuthService } from '../services/auth';

@Injectable({
  providedIn: 'root',
})
export class JwtGuard {
  constructor(private router: Router, private authService$: AuthService) { }
  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    if (this.authService$.isAuthenticated()) return true;

    try {
      await firstValueFrom(this.authService$.loadSession()); // GET /me (con cookies)
      return true;
    } catch (error) {
      this.router.navigate(['/login']);
      return false;
    }


  }
}
