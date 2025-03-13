import { createDepartment } from '@/actions/departments/actions';
import { findAllEmployees } from '@/actions/employees/services';
import DepartmentForm from '@/app/dashboard/departments/_components/DepartmentForm';

export default async function Page() {
  const employees = await findAllEmployees();

  return <DepartmentForm action={createDepartment} employees={employees} />;
}
