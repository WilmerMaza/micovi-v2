import { HttpParams } from "@angular/common/http";

export interface listInfo {
  value: string;
  code: string;
}

export interface RequestOptions {
  params?: HttpParams;
  body?: any;
  responseType?: 'json' | 'blob' | 'arraybuffer';
  observe?: 'body' | 'response';
}


export interface responseUploadMode {
  isUpload: string;
  msg: string;
}


