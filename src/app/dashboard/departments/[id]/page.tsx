import { notFound } from 'next/navigation';
import DepartmentForm from '@/app/dashboard/departments/_components/DepartmentForm';
import { findDepartmentById } from '../../../../actions/departments/services';

export default async function EditDepartmentPage({
  params,
}: {
  params: { id: string };
}) {
  const department = await findDepartmentById(params.id);

  if (!department) {
    notFound();
  }

  return <DepartmentForm department={department} />;
}
