import { HttpParams } from "@angular/common/http";

export interface listInfo {
  value: string;
  code: string;
}

export interface session {
  token: string;
}

export interface DataUser {
  ID: string;
  email: string;
  institutionName: string;
  legalRepresentative?: string;
  character?: string;
  pais?: string;
  sede?: string;
  webPage?: string;
  phone?: string;
  image?: string;
  createdAt?: Date;
  updatedAt?: Date;
  name: string;
  identification?: string;
  typeIdentification?: string;
  gender?: string;
  nationality?: string;
  birtDate?: string;
  city?: string;
  stateordepartmen?: string;
  studyLevelMax?: string;
  institutionNameStudy?: string;
  SportsInstitutionID?: string;
  account?: string;
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
