'use client';

import { useEffect, useState } from 'react';
import { classy } from '@/helpers/classy';

type Department = {
  id: string;
  name: string;
};

interface DepartmentSelectProps {
  value?: string;
  onChange: (value: string) => void;
  error?: boolean;
  supportingText?: string;
  label?: string;
}

export default function DepartmentSelect({
  value,
  onChange,
  error,
  supportingText,
  label = 'Department',
}: DepartmentSelectProps) {
  const [departments, setDepartments] = useState<Department[]>([]);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await fetch('/api/departments');
        const data = await response.json();
        setDepartments(data.departments || []);
      } catch (error) {
        console.error('Error fetching departments:', error);
      }
    };

    fetchDepartments();
  }, []);

  return (
    <div className='relative flex w-full flex-col'>
      {label && (
        <label
          htmlFor='department'
          className={classy(
            'pb-2 text-xs font-semibold',
            error ? 'text-red-900' : '',
            'text-gray-200'
          )}
        >
          {label}
        </label>
      )}
      <div className='relative flex'>
        <select
          id='department'
          className='block w-full rounded-md border-0 bg-white/5 px-3 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6 h-[38px]'
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
        >
          <option value=''>Select a department</option>
          {departments.map((department) => (
            <option key={department.id} value={department.id}>
              {department.name}
            </option>
          ))}
        </select>
      </div>
      {error && supportingText && (
        <p className='mt-2 text-sm text-red-500'>{supportingText}</p>
      )}
    </div>
  );
}
