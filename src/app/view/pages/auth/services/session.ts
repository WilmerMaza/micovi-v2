import { Injectable } from '@angular/core';
import { MicoviApi } from '../../../../core/services/micovi.api';
import { AuthService } from '../../../../core/services/auth';
import { Persistence } from '../../../../utils/persistence.service';
import { Observable, tap } from 'rxjs';
import { session } from '../../../../models/interface';
import { DataLoginModel } from '../models/data-login';
import { dataToken } from '../models/data-token';

@Injectable({
  providedIn: 'root',
})
export class Session {
  constructor(
    private micovid$: MicoviApi,
    private Auth$: AuthService,
    private persistence$: Persistence
  ) {}

  sessionLogin(data: DataLoginModel): Observable<session> {
    const endpoint = '/login';

    return this.micovid$.post<session>(endpoint, data).pipe(
      tap(async (UserInfo: session) => {
        this.setAuth(UserInfo);
      })
    );
  }

  setAuth({ token }: dataToken): void {
    this.Auth$.setToken(token);
  }

  logout(): void {
    this.persistence$.deleteAll();
  }
}
