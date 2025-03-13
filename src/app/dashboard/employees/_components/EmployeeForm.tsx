'use client';

import Button from '@/components/Button';
import Page from '@/components/Page';
import Input from '@/components/Input';
import Select from '@/components/Select';
import { Departments, Employee } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useActionState } from 'react';
import {
  employeeSchema,
  type EmployeeFormData,
} from '@/actions/employees/schema';
import { type ActionResponse } from '@/actions/employees/actions';
import { useEffect } from 'react';

const initialState: ActionResponse = {
  success: false,
  message: '',
};

interface EmployeeFormProps {
  employee?: Employee;
  departments: Departments[];
  action: (
    prevState: ActionResponse | null,
    formData: FormData
  ) => Promise<ActionResponse>;
}

export default function EmployeeForm({
  employee,
  departments,
  action,
}: EmployeeFormProps) {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(action, initialState);
  const isEditing = !!employee?.id;

  const {
    register,
    formState: { errors },
    setError,
  } = useForm<EmployeeFormData>({
    resolver: zodResolver(employeeSchema),
    defaultValues: {
      firstName: employee?.firstName || '',
      lastName: employee?.lastName || '',
      email: employee?.email || '',
      document: employee?.document || '',
      phone: employee?.phone || '',
      departmentId: employee?.departmentId || '',
    },
  });

  useEffect(() => {
    if (state?.errors) {
      Object.entries(state.errors).forEach(([key, messages]) => {
        setError(key as keyof EmployeeFormData, {
          type: 'server',
          message: messages[0],
        });
      });
    }
  }, [state?.errors, setError]);

  return (
    <Page>
      <form action={formAction}>
        {isEditing && employee?.id && (
          <input type='hidden' name='id' value={employee.id} />
        )}
        <div className='border-b border-white/10 pb-12'>
          <h2 className='text-base/7 font-semibold text-gray-900'>
            {isEditing ? 'Edit' : 'Add'} Employee
          </h2>
        </div>

        <div className='border-b border-white/10 pb-12'>
          <div className='mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
            <div className='sm:col-span-3'>
              <Input
                label='First Name'
                {...register('firstName')}
                error={!!errors.firstName}
                supportingText={errors.firstName?.message}
              />
            </div>
            <div className='sm:col-span-3'>
              <Input
                label='Last Name'
                {...register('lastName')}
                error={!!errors.lastName}
                supportingText={errors.lastName?.message}
              />
            </div>
            <div className='sm:col-span-3'>
              <Input
                label='Email'
                type='email'
                {...register('email')}
                error={!!errors.email}
                supportingText={errors.email?.message}
              />
            </div>
            <div className='sm:col-span-3'>
              <Input
                label='Document'
                {...register('document')}
                error={!!errors.document}
                supportingText={errors.document?.message}
              />
            </div>
            <div className='sm:col-span-3'>
              <Input
                label='Phone'
                {...register('phone')}
                error={!!errors.phone}
                supportingText={errors.phone?.message}
              />
            </div>
            <div className='sm:col-span-3'>
              <Select
                label='Department'
                {...register('departmentId')}
                error={!!errors.departmentId}
                supportingText={errors.departmentId?.message}
                placeholder='Select a department'
                options={departments.map((department) => ({
                  value: department.id,
                  label: department.name,
                }))}
              />
            </div>
          </div>
        </div>

        {state?.message && (
          <div
            className={`mt-4 p-4 rounded-md ${
              state.success
                ? 'bg-green-50 text-green-700'
                : 'bg-red-50 text-red-700'
            }`}
          >
            {state.message}
          </div>
        )}

        <div className='mt-6 flex items-center justify-end gap-x-6'>
          <Button
            type='button'
            appearance='outlined'
            onClick={() => router.push('/dashboard/employees')}
          >
            Cancel
          </Button>
          <Button type='submit' disabled={isPending} loading={isPending}>
            {isPending ? 'Saving...' : 'Save'}
          </Button>
        </div>
      </form>
    </Page>
  );
}
