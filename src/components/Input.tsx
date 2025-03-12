import React, { forwardRef } from 'react';

import { classy } from '@/helpers/classy';

type InputProps = {
  id?: string;
  name?: string;
  type?: React.HTMLInputTypeAttribute;
  error?: boolean;
  label?: string | React.ReactNode;
  value?: string | number | readonly string[] | undefined;
  prefix?: string;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  maxLength?: number;
  max?: string | number;
  min?: string | number;
  onClick?: React.MouseEventHandler<HTMLInputElement>;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onKeyUp?: React.KeyboardEventHandler<HTMLInputElement>;
  onPaste?: React.ClipboardEventHandler<HTMLInputElement>;
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  className?: string;
  placeholder?: string;
  supportingText?: string | React.ReactNode;
  trailingContent?: React.ReactNode;
  autoComplete?: string;
};

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      id,
      name,
      type,
      error,
      label,
      value,
      onClick,
      onChange,
      onKeyDown,
      maxLength,
      readOnly,
      onFocus,
      prefix,
      onKeyUp,
      onPaste,
      disabled,
      max,
      min,
      required,
      className = '',
      placeholder,
      supportingText,
      trailingContent,
      autoComplete,
    },
    ref,
    ...rest
  ) => (
    <div className='relative flex w-full flex-col'>
      {label && (
        <label
          htmlFor={id}
          className={classy(
            'pb-2 text-xs font-semibold text-gray-900',
            error ? 'text-red-600' : '',
            disabled ? 'text-gray-200' : ''
          )}
        >
          {label}
        </label>
      )}

      <div className='relative flex'>
        {prefix && (
          <div className='flex h-[60px] w-auto items-center rounded-l border-r-0 bg-gray-50 px-4 text-gray-400'>
            {prefix}
          </div>
        )}

        <input
          id={id}
          ref={ref}
          name={name}
          type={type}
          value={value}
          onFocus={onFocus}
          maxLength={maxLength}
          max={max}
          min={min}
          onClick={onClick}
          onChange={onChange}
          onKeyUp={onKeyUp}
          onPaste={onPaste}
          onKeyDown={onKeyDown}
          disabled={disabled}
          required={required}
          readOnly={readOnly}
          autoComplete={autoComplete}
          className={classy(
            disabled ? 'text-gray-200' : '',
            'h-[60px] w-full rounded border border-gray-300 bg-white px-4 text-sm outline-none',
            'transition-all duration-200',
            'disabled:border-gray-200 disabled:placeholder-gray-200 disabled:hover:ring-0',
            trailingContent ? 'pr-[80px]' : '',
            error
              ? 'border-red-200 text-red-600 placeholder-red-900 placeholder-opacity-50'
              : 'border-gray-50 text-black',
            error
              ? 'hover:ring-red-900 focus:ring-red-900'
              : 'hover:ring-2 focus:ring-2 hover:ring-black focus:ring-black',
            prefix ? 'rounded-l-none' : '',
            className
          )}
          placeholder={placeholder}
          {...rest}
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
            error ? 'text-red-600' : '',
            disabled ? 'text-gray-200' : 'text-black'
          )}
        >
          {supportingText}
        </p>
      )}
    </div>
  )
);

Input.displayName = 'Input';

export default Input;
