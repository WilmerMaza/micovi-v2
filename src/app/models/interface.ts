import { HttpParams } from "@angular/common/http";
import { DataUser } from "../view/models/dataUser";


export interface listInfo {
  value: string;
  code: string;
}

export interface session {
  token: string;
}


export interface Ijwt {
  dataUser: DataUser;
  account: string;
  iat: number;
  exp: number;
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


