'use client';

import Divider from '@/components/Divider';
import Spinner from '@/components/Spinner';

import Icon, { IconName } from './Icon';
import { classy } from '@/helpers/classy';

type ButtonProps = {
  icon?: IconName;
  type?: 'button' | 'submit' | 'reset';
  size?: 'sm' | 'md' | 'lg';
  theme?: 'light' | 'dark';
  color?: 'primary' | 'secondary' | 'tertiary';
  divider?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  children?: React.ReactNode;
  disabled?: boolean;
  className?: string;
  appearance?: 'outlined' | 'filled' | 'text';
  iconPosition?: 'left' | 'right';
};

const buttonSizes = {
  sm: 'h-[36px] px-4',
  md: 'h-[44px] px-4',
  lg: 'h-[52px] px-4',
};

const buttonColors = {
  filled: {
    primary: {
      dark: 'bg-white text-black',
      light:
        'bg-zinc-700 text-white hover:bg-zinc-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-600',
    },
    secondary: {
      dark: 'bg-blue-900 text-white',
      light:
        'bg-blue-900 text-white hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-800',
    },
    tertiary: {
      dark: 'bg-orange-900 text-white',
      light:
        'bg-orange-900 text-white hover:bg-orange-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-800',
    },
  },

  outlined: {
    primary: {
      dark: 'bg-transparent text-gray-900 border-white border-[1px] text-gray-900',
      light:
        'bg-transparent text-gray-900 hover:text-gray-900 border-[1px] border-gray-300 hover:bg-gray-200 hover:text-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600',
    },
    secondary: {
      dark: 'bg-transparent text-blue-900 border-blue-900 border-[1px]',
      light:
        'bg-transparent text-blue-900 border-[1px] border-blue-900 hover:bg-blue-100 hover:text-blue-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-800',
    },
    tertiary: {
      dark: 'bg-transparent text-orange-900 border-orange-900 border-[1px]',
      light:
        'bg-transparent text-orange-900 border-[1px] border-orange-900 hover:bg-orange-100 hover:text-orange-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-800',
    },
  },
  text: {
    primary: {
      dark: 'bg-transparent text-white',
      light: 'bg-transparent text-black hover:bg-gray-100',
    },
    secondary: {
      dark: 'bg-transparent text-blue-900',
      light: 'bg-transparent text-blue-900 hover:bg-blue-100',
    },
    tertiary: {
      dark: 'bg-transparent text-orange-900',
      light: 'bg-transparent text-orange-900 hover:bg-orange-100',
    },
  },
};

export default function Button({
  icon,
  type = 'button',
  size = 'lg',
  theme = 'light',
  color = 'primary',
  onClick,
  loading,
  divider = true,
  fullWidth = true,
  children,
  disabled,
  className = '',
  appearance = 'filled',
  iconPosition = 'left',
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      data-testid='button__testid'
      className={classy(
        'flex items-center font-semibold rounded-[3px] transition-all duration-200 text-[12px]',
        buttonSizes[size],
        fullWidth ? 'w-full' : '',
        buttonColors[appearance][color][theme],
        icon ? 'justify-between' : 'justify-center',
        icon && iconPosition === 'left' ? 'text-right' : '',
        icon && iconPosition === 'right' ? 'text-left' : '',
        disabled ? 'opacity-50 cursor-not-allowed' : '',
        className
      )}
    >
      {icon && iconPosition === 'left' && (
        <>
          <Icon icon={icon} />
          {divider && <Divider bgColor='bg-zinc-900' />}
        </>
      )}
      {children}
      {icon && iconPosition === 'right' && (
        <span>
          {divider && <Divider bgColor='bg-zinc-900' />}
          <Icon icon={icon} />
        </span>
      )}
      {loading && <Spinner />}
    </button>
  );
}
