'use client';

import { classy } from '@/helpers/classy';

export interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  value?: string | null;
  name: string;
  error?: boolean;
  label?: string;
  supportingText?: string;
  disabled?: boolean;
  options: SelectOption[];
  placeholder?: string;
}

export default function Select({
  value,
  name,
  label,
  error,
  supportingText,
  disabled,
  options,
  placeholder = 'Select an option',
}: SelectProps) {
  return (
    <div className='relative flex w-full flex-col'>
      {label && (
        <label
          htmlFor={name}
          className={classy(
            'pb-2 text-xs font-semibold',
            error ? 'text-red-600' : 'text-gray-900',
            disabled ? 'text-gray-200' : ''
          )}
        >
          {label}
        </label>
      )}
      <div className='relative flex'>
        <select
          id={name}
          name={name}
          disabled={disabled}
          defaultValue={value || ''}
          className={classy(
            'h-[60px] w-full rounded border border-gray-300 bg-white px-4 pr-12 text-sm outline-none appearance-none',
            'hover:ring-2 focus:ring-2',
            'transition-all duration-200',
            'disabled:border-gray-200 disabled:placeholder-gray-200 disabled:hover:ring-0',
            error
              ? 'border-red-200 text-red-600 placeholder-red-900 placeholder-opacity-50'
              : 'border-gray-50 text-black',
            error
              ? 'hover:ring-red-500 focus:ring-red-500'
              : 'hover:ring-black focus:ring-gray-500'
          )}
        >
          <option value='' className='text-gray-900'>
            {placeholder}
          </option>
          {options.map((option) => (
            <option
              className='text-gray-900'
              key={option.value}
              value={option.value}
            >
              {option.label}
            </option>
          ))}
        </select>
        <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500'>
          <svg className='h-4 w-4 fill-current' viewBox='0 0 20 20'>
            <path d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z' />
          </svg>
        </div>
      </div>
      {supportingText && (
        <p
          className={classy(
            'pt-1 text-xs font-semibold',
            error ? 'text-red-500' : 'text-gray-200'
          )}
        >
          {supportingText}
        </p>
      )}
    </div>
  );
}
