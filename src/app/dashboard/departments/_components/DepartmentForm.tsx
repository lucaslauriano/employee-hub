'use client';

import { useForm } from 'react-hook-form';
import Button from '@/components/Button';
import Page from '@/components/Page';
import Input from '@/components/Input';
import { Departments } from '@prisma/client';
import EmployeeSelect from './EmployeeSelect';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface IDepartmentForm {
  name: string;
  managerId: string | null;
}

interface DepartmentFormProps {
  department?: Departments;
  onSubmit?: (data: IDepartmentForm) => Promise<void>;
  serverErrors?: Record<string, string[]>;
}

export default function DepartmentForm({
  department,
  onSubmit,
  serverErrors,
}: DepartmentFormProps) {
  const router = useRouter();
  const isEditing = Boolean(department?.id);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<IDepartmentForm>({
    defaultValues: department || {},
  });

  useEffect(() => {
    if (serverErrors) {
      Object.entries(serverErrors).forEach(([field, messages]) => {
        setError(field as keyof IDepartmentForm, {
          type: 'server',
          message: messages[0],
        });
      });
    }
  }, [serverErrors, setError]);

  const onSubmitHandler = async (data: IDepartmentForm) => {
    if (onSubmit) {
      await onSubmit(data);
    }
  };

  return (
    <Page>
      <form onSubmit={handleSubmit(onSubmitHandler)}>
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
                error={!!errors.name}
                supportingText={errors.name?.message}
                {...register('name')}
              />
            </div>
            <div className='sm:col-span-3'>
              <EmployeeSelect
                label='Manager'
                error={!!errors.managerId}
                supportingText={errors.managerId?.message}
                value={department?.managerId || ''}
                onChange={(value) =>
                  register('managerId').onChange({ target: { value } })
                }
              />
            </div>
          </div>
        </div>

        <div className='mt-6 flex items-center justify-end gap-x-6'>
          <Button
            type='button'
            appearance='outlined'
            onClick={() => router.push('/dashboard/departments')}
          >
            Cancel
          </Button>
          <Button type='submit'>Save</Button>
        </div>
      </form>
    </Page>
  );
}
