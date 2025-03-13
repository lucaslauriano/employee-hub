import EmployeeForm from '@/app/dashboard/employees/_components/EmployeeForm';
import { updateEmployee } from '@/actions/employees/actions';
import { findEmployeeById } from '@/actions/employees/services';
import { findAllDepartments } from '@/actions/departments/services';

export default async function EditDepartmentPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const [employee, departments] = await Promise.all([
    findEmployeeById(id),
    findAllDepartments(),
  ]);

  if (!employee) {
    return <div className='text-gray-900'>Employee not found</div>;
  }

  return (
    <EmployeeForm
      action={updateEmployee}
      employee={employee}
      departments={departments}
    />
  );
}
