/**
 * Interceptor HTTP que activa el overlay global con umbrales de SpinnerService.
 *
 * Omite bootstrap/auth, refresh silencioso, mutaciones (feedback local en botón),
 * peticiones con `SKIP_LOADING` o header `X-Skip-Loading`.
 */
import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize } from 'rxjs';
import {
  SKIP_LOADING,
  SKIP_LOADING_HEADER,
  shouldSkipLoadingUrl,
} from '../loading/loading.context';
import { SpinnerService } from '../../shared/services/spinner.service';

const MUTATION_METHODS = new Set(['POST', 'PUT', 'PATCH', 'DELETE']);

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const skipByContext = req.context.get(SKIP_LOADING);
  const skipByHeader = req.headers.has(SKIP_LOADING_HEADER);
  const skipByUrl = shouldSkipLoadingUrl(req.url);
  const skipMutation = MUTATION_METHODS.has(req.method);

  const outgoing = skipByHeader
    ? req.clone({ headers: req.headers.delete(SKIP_LOADING_HEADER) })
    : req;

  if (skipByContext || skipByHeader || skipByUrl || skipMutation) {
    return next(outgoing);
  }

  const spinner = inject(SpinnerService);
  spinner.show();

  return next(outgoing).pipe(finalize(() => spinner.hide()));
};
