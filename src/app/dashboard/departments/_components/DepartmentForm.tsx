'use client';

import Button from '@/components/Button';
import Page from '@/components/Page';
import Input from '@/components/Input';
import Select from '@/components/Select';
import { Departments, Employee } from '@prisma/client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useActionState } from 'react';
import {
  departmentSchema,
  type DepartmentFormData,
} from '@/actions/departments/schema';
import { type ActionResponse } from '@/actions/departments/actions';

const initialState: ActionResponse = {
  success: false,
  message: '',
};

interface DepartmentFormProps {
  department?: Departments;
  employees: Employee[];
  action: (
    prevState: ActionResponse | null,
    formData: FormData
  ) => Promise<ActionResponse>;
}

export default function DepartmentForm({
  department,
  employees,
  action,
}: DepartmentFormProps) {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(action, initialState);
  const isEditing = Boolean(department?.id);

  const {
    register,
    formState: { errors },
    setError,
  } = useForm<DepartmentFormData>({
    resolver: zodResolver(departmentSchema),
    defaultValues: {
      name: department?.name || '',
      managerId: department?.managerId || '',
    },
  });

  useEffect(() => {
    if (state?.errors) {
      Object.entries(state.errors).forEach(([key, messages]) => {
        setError(key as keyof DepartmentFormData, {
          type: 'server',
          message: messages[0],
        });
      });
    }
  }, [state?.errors, setError]);

  return (
    <Page>
      <form action={formAction}>
        {isEditing && department?.id && (
          <input type='hidden' name='id' value={department.id} />
        )}
        <div className='border-b border-white/10 pb-12'>
          <h2 className='text-base/7 font-semibold text-gray-900'>
            {isEditing ? 'Edit' : 'Add'} Department
          </h2>
        </div>

        <div className='border-b border-white/10 pb-12'>
          <div className='mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
            <div className='sm:col-span-3'>
              <Input
                label='Name'
                {...register('name')}
                error={!!errors.name}
                supportingText={errors.name?.message}
              />
            </div>
            <div className='sm:col-span-3'>
              <Select
                label='Manager'
                {...register('managerId')}
                error={!!errors.managerId}
                supportingText={errors.managerId?.message}
                placeholder='Select a manager'
                options={employees?.map((employee) => ({
                  value: employee.id,
                  label: `${employee.firstName} ${employee.lastName}`,
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
            onClick={() => router.push('/dashboard/departments')}
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
