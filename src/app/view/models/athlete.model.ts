/**
 * Interfaces para el módulo de deportistas/athletes.
 * Define los contratos de datos entre frontend y backend.
 */

export interface Athlete {
  id: string;
  documentTypeId: string;
  documentNumber: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  age: number;
  genderId: string;
  birthCountryId: string;
  birthDepartmentId: string;
  birthCityId: string;
  residenceCountryId: string;
  residenceDepartmentId: string;
  residenceCityId: string;
  educationLevelId: string;
  educationInstitution: string;
  categoryId: string;
  weight: number;
  height: number;
  schoolId: string;
  disciplineId: string;
  email: string;
  phone: string;
  photoUrl: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface AthleteListResponse {
  data: Athlete[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface CatalogItem {
  id: string;
  name: string;
  countryId?: string;
  departmentId?: string;
  schoolId?: string;
  code?: string;
}

export interface AthleteFilters {
  search?: string;
  categoryId?: string;
  disciplineId?: string;
  genderId?: string;
  page?: number;
  limit?: number;
}
