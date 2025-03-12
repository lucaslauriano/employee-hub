'use client';

import { useForm, Controller } from 'react-hook-form';
import Button from '@/components/Button';
import Page from '@/components/Page';
import Input from '@/components/Input';
import { Departments } from '@prisma/client';
import EmployeeSelect from './EmployeeSelect';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  updateDepartment,
  createDepartment,
} from '@/actions/departments/actions';

type IDepartmentForm = {
  name: string;
  managerId: string | null;
};

interface DepartmentFormProps {
  department?: Departments;
}

export default function DepartmentForm({ department }: DepartmentFormProps) {
  const router = useRouter();
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const isEditing = Boolean(department?.id);

  const {
    register,
    control,
    handleSubmit,
    setError,
    formState: { errors: formErrors },
  } = useForm<IDepartmentForm>({
    defaultValues: department || {},
  });

  useEffect(() => {
    if (errors) {
      Object.entries(errors).forEach(([field, messages]) => {
        setError(field as keyof IDepartmentForm, {
          type: 'server',
          message: messages[0],
        });
      });
    }
  }, [errors, setError]);

  const onSubmit = async (data: IDepartmentForm) => {
    const result =
      isEditing && department
        ? await updateDepartment(department.id, data)
        : await createDepartment(data);

    if (result.error && typeof result.error === 'object') {
      setErrors(result.error);
    }
  };

  return (
    <Page>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='border-b border-white/10 pb-12'>
          <h2 className='text-base/7 font-semibold text-gray-900'>
            {isEditing ? 'Edit' : 'Add'} Department
          </h2>
        </div>

        <div className='border-b border-white/10 pb-12'>
          <div className='mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
            <div className='sm:col-span-4'>
              <Input
                label='Name'
                error={!!formErrors.name}
                supportingText={formErrors.name?.message}
                {...register('name')}
              />
            </div>
            <div className='sm:col-span-4'>
              <Controller
                control={control}
                name='managerId'
                render={({ field: { value, onChange } }) => (
                  <EmployeeSelect
                    label='Manager'
                    value={value}
                    onChange={onChange}
                    error={!!formErrors.managerId}
                    supportingText={formErrors.managerId?.message}
                  />
                )}
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
