/**
 * Cliente HTTP centralizado de la API Micovi.
 *
 * Siempre usa rutas relativas (environment.apiUrl = '/api') y withCredentials: true
 * para que el navegador envíe cookies HttpOnly en cada petición.
 *
 * En DEV el proxy de Angular reenvía /api → localhost:3000.
 * En QA/PROD el reverse proxy hace el mismo rol.
 */
import { HttpClient, HttpContext, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { catchError, Observable, throwError } from 'rxjs';
import { SKIP_LOADING } from '../loading/loading.context';
import { RequestOptions } from '../../models/interface';

export interface MicoviRequestOptions {
  /** Omite overlay global; el caller muestra skeleton o button loading. */
  skipLoading?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class MicoviApi {
  private readonly baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  get<T>(
    endpoint: string,
    params?: HttpParams,
    options?: MicoviRequestOptions,
  ): Observable<T> {
    return this.http
      .get<T>(`${this.baseUrl}${endpoint}`, {
        params,
        withCredentials: true,
        context: this.buildContext(options),
      })
      .pipe(catchError(this.handleError));
  }

  post<T>(
    endpoint: string,
    body: unknown = {},
    options?: MicoviRequestOptions,
  ): Observable<T> {
    return this.http
      .post<T>(`${this.baseUrl}${endpoint}`, body, {
        withCredentials: true,
        context: this.buildContext(options),
      })
      .pipe(catchError(this.handleError));
  }

  put<T>(
    endpoint: string,
    body: unknown,
    options?: MicoviRequestOptions,
  ): Observable<T> {
    return this.http
      .put<T>(`${this.baseUrl}${endpoint}`, body, {
        withCredentials: true,
        context: this.buildContext(options),
      })
      .pipe(catchError(this.handleError));
  }

  delete<T>(endpoint: string, options?: MicoviRequestOptions): Observable<T> {
    return this.http
      .delete<T>(`${this.baseUrl}${endpoint}`, {
        withCredentials: true,
        context: this.buildContext(options),
      })
      .pipe(catchError(this.handleError));
  }

  private buildContext(options?: MicoviRequestOptions): HttpContext | undefined {
    if (!options?.skipLoading) {
      return undefined;
    }
    return new HttpContext().set(SKIP_LOADING, true);
  }

  request<T>(method: string, endpoint: string, options: RequestOptions = {}): Observable<T> {
    const url = `${this.baseUrl}${endpoint}`;
    return this.http
      .request<T>(method, url, {
        params: options.params,
        body: options.body,
        responseType: options.responseType ?? 'json',
        observe: options.observe ?? 'body',
        withCredentials: true,
      } as object)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: unknown): Observable<never> {
    console.error('API error:', error);
    return throwError(() => error);
  }
}
