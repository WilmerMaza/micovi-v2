import { Injectable } from '@angular/core';
import { MicoviApi } from './micovi.api';
import { Observable } from 'rxjs';
import { responseUploadMode } from '../../models/interface';

@Injectable({
  providedIn: 'root',
})
export class Imgs {
  constructor(private micoviApiService$: MicoviApi) {}

  getImg(name: string): Observable<Blob> {
    return this.micoviApiService$.request<Blob>(
      'GET',
      `/subirImagen/lower/${name}`,
      {
        responseType: 'blob',
      }
    );
  }

  subirImg(files: FormData): Observable<responseUploadMode> {
    return this.micoviApiService$.request<responseUploadMode>(
      'POST',
      '/subirImagen/upload',
      {
        body: files,
        responseType: 'json',
      }
    );
  }

  subirRegisterImg(files: FormData): Observable<responseUploadMode> {
    return this.micoviApiService$.request<responseUploadMode>(
      'POST',
      '/subirImagenRegistro/uploadRegister',
      {
        body: files,
        responseType: 'json',
      }
    );
  }

  getAdminImg(name: String): Observable<Blob> {
    return this.micoviApiService$.request<Blob>(
      'GET',
      `/subirImagenRegistro/lowerWithoutFolter/${name}`,
      {
        responseType: 'blob',
      }
    );
  }
}
