import api from '@/api/axios';
import type { Employee, CreateEmployeeDto, UpdateEmployeeDto } from '../models/employee.model';


export const getEmployees = async (restaurantId: string): Promise<Employee[]> => {
  const { data } = await api.get(`/restaurants/${restaurantId}/employees`);
  return data;
};

export const createEmployee = async (restaurantId: string, employeeData: CreateEmployeeDto): Promise<Employee> => {
  const { data } = await api.post(`/restaurants/${restaurantId}/employees`, employeeData);
  return data;
};

export const updateEmployee = async (restaurantId: string, employeeId: string, updateData: UpdateEmployeeDto): Promise<Employee> => {
  const { data } = await api.patch(`/restaurants/${restaurantId}/employees/${employeeId}`, updateData);
  return data;
};

export const deleteEmployee = async (restaurantId: string, employeeId: string): Promise<void> => {
  await api.delete(`/restaurants/${restaurantId}/employees/${employeeId}`);
};
