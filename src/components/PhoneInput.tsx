'use client';

import { forwardRef } from 'react';
import ReactPhoneInput from 'react-phone-input-2';
import pt from 'react-phone-input-2/lang/pt.json';
import 'react-phone-input-2/lib/style.css';
import { classy } from '@/helpers/classy';

type InputProps = {
  id?: string;
  name?: string;
  error?: boolean;
  label?: string | React.ReactNode;
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  required?: boolean;
  className?: string;
  placeholder?: string;
  supportingText?: string | React.ReactNode;
  trailingContent?: React.ReactNode;
};

const PhoneInput = forwardRef<HTMLInputElement, InputProps>(function PhoneInput(
  {
    id,
    name,
    error,
    label,
    value,
    onChange,
    disabled,
    required,
    className = '',
    placeholder,
    supportingText,
    trailingContent,
  },
  ref
) {
  return (
    <div className='relative flex w-full flex-col'>
      {label && (
        <label
          htmlFor={id}
          className={classy(
            'pb-2 text-xs font-semibold',
            error ? 'text-red-600' : 'text-gray-900',
            disabled ? 'text-gray-200' : ''
          )}
        >
          {label}
        </label>
      )}

      <div className='relative'>
        <ReactPhoneInput
          inputProps={{
            name,
            required,
            disabled,
            ref,
            className: classy(
              'h-[60px] block w-full rounded-md bg-white/5 px-3 py-1.5 text-base outline placeholder:text-gray-500 sm:text-sm/6',
              'hover:ring-2 focus:ring-2',
              'transition-all duration-200',
              'disabled:border-gray-200 disabled:placeholder-gray-200 disabled:hover:ring-0',
              'pl-12',
              error
                ? 'border-red-200 text-red-600 placeholder-red-900 placeholder-opacity-50'
                : 'border-gray-50 text-black',
              error
                ? 'hover:ring-red-500 focus:ring-red-500'
                : 'hover:ring-black focus:ring-gray-500',
              className
            ),
          }}
          value={value}
          onChange={(phone) => {
            if (onChange) {
              onChange(phone);
            }
          }}
          placeholder={placeholder}
          containerStyle={{
            width: '100%',
          }}
          buttonStyle={{
            backgroundColor: 'white',
            borderColor: error ? '#ef4444' : '#d1d5db',
            borderRightColor: error ? '#ef4444' : '#d1d5db',
          }}
          dropdownStyle={{
            backgroundColor: 'white',
            color: '#000',
          }}
          buttonClass={classy(
            'hover:bg-zinc-50',
            error ? 'border-red-500' : 'border-gray-300'
          )}
          dropdownClass='hover:bg-zinc-50'
          localization={pt}
          country={'br'}
        />

        {trailingContent && (
          <div className='absolute bottom-4 right-1.5 flex items-center justify-center'>
            {trailingContent}
          </div>
        )}
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
});

PhoneInput.displayName = 'PhoneInput';

export default PhoneInput;
