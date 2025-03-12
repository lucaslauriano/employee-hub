'use client';

import { classy } from '@/helpers/classy';
import { Employee } from '@prisma/client';
import { useEffect, useState } from 'react';

type EmployeeSelectProps = {
  value?: string | null;
  onChange: (value: string | null) => void;
  error?: boolean;
  label?: string;
  supportingText?: string;
};

export default function EmployeeSelect({
  value,
  label,
  onChange,
  error,
  supportingText,
}: EmployeeSelectProps) {
  const [employees, setEmployees] = useState<Employee[]>([]);

  useEffect(() => {
    async function fetchEmployees() {
      const response = await fetch('/api/employees');
      const data = await response.json();
      setEmployees(data.employees || []);
    }
    fetchEmployees();
  }, []);

  return (
    <div className='relative'>
      {label && (
        <label
          htmlFor='manager'
          className={classy(
            'pb-2 text-xs font-semibold',
            error ? 'text-red-900' : '',
            'text-gray-200'
          )}
        >
          {label}
        </label>
      )}
      <select
        value={value || ''}
        onChange={(e) => onChange(e.target.value || null)}
        className='block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline outline-white/10 placeholder:text-gray-500 sm:text-sm/6'
      >
        <option value=''>Select a manager</option>
        {employees.map((employee) => (
          <option key={employee.id} value={employee.id}>
            {employee.firstName} {employee.lastName}
          </option>
        ))}
      </select>
      {supportingText && (
        <p
          className={`pt-1 text-xs font-semibold ${
            error ? 'text-red-900' : 'text-black'
          }`}
        >
          {supportingText}
        </p>
      )}
    </div>
  );
}
