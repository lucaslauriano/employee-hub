import DepartmentForm from '@/app/dashboard/departments/_components/DepartmentForm';
import { updateDepartment } from '@/actions/departments/actions';
import {
  findAllEmployees,
  findDepartmentById,
} from '@/actions/departments/services';

export default async function EditDepartmentPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const [department, employees] = await Promise.all([
    findDepartmentById(id),
    findAllEmployees(),
  ]);

  if (!department) {
    return <div className='text-gray-900'>Department not found</div>;
  }

  return (
    <DepartmentForm
      action={updateDepartment}
      employees={employees}
      department={department}
    />
  );
}
