export interface Employee {
  id: string;
  name: string;
  lastname: string;
  email: string;
  role: string;
  profile_image: string | null;
  is_online: boolean;
}

export interface CreateEmployeeDto {
  email: string;
  name: string;
  lastname: string;
  role: string;
}

export interface UpdateEmployeeDto {
  role?: string;
  is_online?: boolean;  
}
