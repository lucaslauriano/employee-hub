export interface IEmployee {
  id: string;
  firstName: string;
  lastName: string;
  document: string;
  phone: string | null;
  email: string;
  birthDate: string | null;
  departmentId: string | null;
}

export type IEmployeeForm = Omit<IEmployee, 'id'>;
