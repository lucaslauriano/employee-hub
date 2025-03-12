'use client';

import EmployeeForm from '@/app/employees/components/EmployeeForm';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { IEmployeeForm } from '@/types/employees';
import { Employee } from '@prisma/client';

type LayoutProps = {
  params: {
    id: string;
  };
};

const EditEmployeePage = ({ params }: LayoutProps) => {
  const [employee, setEmployee] = useState<Employee | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchEmployee = async () => {
      const response = await fetch(`/api/employees/${params.id}`);
      if (response.ok) {
        const data = await response.json();
        setEmployee(data.employee);
      }
    };
    fetchEmployee();
  }, [params.id]);

  const handleSubmit = async (data: IEmployeeForm) => {
    try {
      const response = await fetch('/api/employees', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...data, id: params.id }),
      });

      if (response.ok) {
        router.push('/employees');
        router.refresh();
      } else {
        const error = await response.json();
        console.error('Failed to update employee:', error);
      }
    } catch (error) {
      console.error('Error updating employee:', error);
    }
  };

  if (!employee) {
    return <div className='text-white'>Loading...</div>;
  }

  return <EmployeeForm employee={employee} onSubmit={handleSubmit} />;
};

export default EditEmployeePage;
