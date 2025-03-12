'use client';

import { Controller, useForm } from 'react-hook-form';
import Button from '@/components/Button';
import Page from '@/components/Page';
import { IEmployeeForm } from '@/types/employees';
import Input from '@/components/Input';
import PhoneInput from '@/components/PhoneInput';
import { Employee } from '@prisma/client';
import DepartmentSelect from './DepartmentSelect';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface EmployeeFormProps {
  employee?: Employee;
  onSubmit?: (data: IEmployeeForm) => void;
  serverErrors?: Record<string, string[]>;
}

export default function EmployeeForm({
  employee,
  onSubmit,
  serverErrors,
}: EmployeeFormProps) {
  const router = useRouter();
  const isEditing = Boolean(employee?.id);
  const {
    control,
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<IEmployeeForm>({
    defaultValues: employee || {},
  });

  useEffect(() => {
    if (serverErrors) {
      Object.entries(serverErrors).forEach(([field, messages]) => {
        setError(field as keyof IEmployeeForm, {
          type: 'server',
          message: messages[0],
        });
      });
    }
  }, [serverErrors, setError]);

  const onSubmitHandler = async (data: IEmployeeForm) => {
    if (onSubmit) {
      await onSubmit(data);
    }
  };

  return (
    <Page>
      <form onSubmit={handleSubmit(onSubmitHandler)}>
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
                error={!!errors.firstName}
                supportingText={errors.firstName?.message}
                {...register('firstName')}
              />
            </div>
            <div className='sm:col-span-3'>
              <Input
                label='Last Name'
                error={!!errors.lastName}
                supportingText={errors.lastName?.message}
                {...register('lastName')}
              />
            </div>
            <div className='sm:col-span-3'>
              <Input
                label='Document'
                error={!!errors.document}
                supportingText={errors.document?.message}
                {...register('document')}
              />
            </div>

            <div className='sm:col-span-3'>
              <Input
                label='Birth Date'
                error={!!errors.birthDate}
                supportingText={errors.birthDate?.message}
                {...register('birthDate')}
              />
            </div>

            <div className='sm:col-span-3'>
              <Input
                label='Email'
                error={!!errors.email}
                supportingText={errors.email?.message}
                {...register('email')}
              />
            </div>
            <div className='sm:col-span-3'>
              <Controller
                control={control}
                name='phone'
                render={({ field: { value, onChange, ...field } }) => (
                  <PhoneInput
                    {...field}
                    value={value ?? undefined}
                    onChange={onChange}
                    id='phone'
                    label='Phone'
                    error={!!errors.phone?.message}
                    supportingText={errors.phone?.message || ''}
                  />
                )}
              />
            </div>
            <div className='sm:col-span-3'>
              <Controller
                control={control}
                name='departmentId'
                render={({ field: { value, onChange } }) => (
                  <DepartmentSelect
                    value={value ?? undefined}
                    onChange={onChange}
                    error={!!errors.departmentId}
                    supportingText={errors.departmentId?.message}
                    label='Department'
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
            onClick={() => router.push('/dashboard/employees')}
          >
            Cancel
          </Button>
          <Button type='submit'>Save</Button>
        </div>
      </form>
    </Page>
  );
}
