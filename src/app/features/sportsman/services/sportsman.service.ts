/**
 * Servicio para gestión de deportistas.
 * Se comunica con el backend REST usando endpoints reales de /api/athletes.
 */
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { MicoviApi } from '../../../core/services/micovi.api';
import { Athlete, AthleteListResponse, AthleteFilters, CatalogItem } from '../../../view/models/athlete.model';

@Injectable({
  providedIn: 'root',
})
export class SportsmanService {
  constructor(private micoviApi: MicoviApi) {}

  getAthletes(filters?: AthleteFilters): Observable<AthleteListResponse> {
    let params = new URLSearchParams();
    if (filters?.search) params.set('search', filters.search);
    if (filters?.categoryId) params.set('categoryId', filters.categoryId);
    if (filters?.disciplineId) params.set('disciplineId', filters.disciplineId);
    if (filters?.genderId) params.set('genderId', filters.genderId);
    if (filters?.page) params.set('page', filters.page.toString());
    if (filters?.limit) params.set('limit', filters.limit.toString());

    const queryString = params.toString();
    const url = `/athletes${queryString ? '?' + queryString : ''}`;
    return this.micoviApi.get(url);
  }

  getAthleteById(id: string): Observable<Athlete> {
    return this.micoviApi.get(`/athletes/${id}`);
  }

  createAthlete(data: Partial<Athlete>): Observable<Athlete> {
    return this.micoviApi.post('/athletes', data);
  }

  updateAthlete(id: string, data: Partial<Athlete>): Observable<Athlete> {
    return this.micoviApi.put(`/athletes/${id}`, data);
  }

  deleteAthlete(id: string): Observable<{ message: string }> {
    return this.micoviApi.delete(`/athletes/${id}`);
  }

  uploadPhoto(athleteId: string, file: File): Observable<{ photoUrl: string; message: string }> {
    const formData = new FormData();
    formData.append('photo', file);
    return this.micoviApi.request('POST', `/athletes/${athleteId}/photo`, { body: formData });
  }

  getDocumentTypes(): Observable<CatalogItem[]> {
    return this.micoviApi.get('/catalogs/document-types');
  }

  getGenders(): Observable<CatalogItem[]> {
    return this.micoviApi.get('/catalogs/genders');
  }

  getCountries(): Observable<CatalogItem[]> {
    return this.micoviApi.get('/catalogs/countries');
  }

  getDepartmentsByCountry(countryId: string): Observable<CatalogItem[]> {
    return this.micoviApi.get(`/catalogs/countries/${countryId}/departments`);
  }

  getCitiesByDepartment(departmentId: string): Observable<CatalogItem[]> {
    return this.micoviApi.get(`/catalogs/departments/${departmentId}/cities`);
  }

  getEducationLevels(): Observable<CatalogItem[]> {
    return this.micoviApi.get('/catalogs/education-levels');
  }

  getDisciplinesBySchool(schoolId: string): Observable<CatalogItem[]> {
    return this.micoviApi.get(`/catalogs/schools/${schoolId}/disciplines`);
  }

  getCategoriesBySchool(schoolId: string): Observable<CatalogItem[]> {
    return this.micoviApi.get(`/catalogs/schools/${schoolId}/categories`);
  }

  // Legacy methods for backward compatibility with indicators/rubrica components
  private redirectSportmanInfo: any[] = [];

  setSportmanInfoRedirect(data: any): void {
    this.redirectSportmanInfo = [];
    this.redirectSportmanInfo.push(data);
  }

  getSportmanInfoRedirect(): any[] {
    const data = [...this.redirectSportmanInfo];
    this.redirectSportmanInfo = [];
    return data;
  }

  getAlldataIndicators(ID: string): Observable<any> {
    return this.micoviApi.get(`/indicators/get-indicators?id=${ID}`);
  }

  getAllCalifications(sportmanid: string, ejercicioid: string): Observable<any[]> {
    return this.micoviApi.get(`/sportMan/calificacion?SportsManID=${sportmanid}&EjercicioID=${ejercicioid}`);
  }

  // Legacy methods for old create-sportsman component
  getAllCategory(): Observable<any[]> {
    return this.micoviApi.get('/Categoria/getAll');
  }

  createSportsman(data: any): Observable<any> {
    return this.micoviApi.post('/sportMan/create', data);
  }

  updateSportsman(data: any): Observable<any> {
    return this.micoviApi.post('/sportMan/update', data);
  }

  enviarDataCalificacionFinal(data: { [key: string]: number | string }): Observable<any> {
    return this.micoviApi.post('/sportMan/calificacion', data);
  }
}
