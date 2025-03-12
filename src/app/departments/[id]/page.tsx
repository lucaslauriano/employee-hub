import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import DepartmentForm from '../components/DepartmentForm';

type PageProps = {
  params: {
    id: string;
  };
};

export default async function EditDepartmentPage({ params }: PageProps) {
  const department = await prisma.departments.findUnique({
    where: { id: params.id },
  });

  if (!department) {
    notFound();
  }

  return <DepartmentForm department={department} />;
}
