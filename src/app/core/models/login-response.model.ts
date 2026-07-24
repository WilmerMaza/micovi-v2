export interface ApiAuthenticatedUser {
  id: string;
  email: string;
  role: string;
  schoolId: string | null;
}

export interface MeResponse {
  id: string;
  email: string;
  role: string;
  schoolId: string | null;
}
