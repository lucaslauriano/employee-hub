import EmployeeForm from '@/app/dashboard/employees/_components/EmployeeForm';
import { createEmployee } from '@/actions/employees/actions';
import { findAllDepartments } from '@/actions/departments/services';

export default async function Page() {
  const [departments] = await Promise.all([findAllDepartments()]);

  return <EmployeeForm departments={departments} action={createEmployee} />;
}
