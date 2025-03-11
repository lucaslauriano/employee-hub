import { IconProps } from '@/components/Icons';

export default function Plus({ className }: IconProps) {
  return (
    <svg
      fill='currentColor'
      width='800px'
      height='800px'
      viewBox='0 0 22 22'
      xmlns='http://www.w3.org/2000/svg'
      id='memory-plus'
      className={className}
    >
      <path d='M12 17H10V12H5V10H10V5H12V10H17V12H12Z' />
    </svg>
  );
}
