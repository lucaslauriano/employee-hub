import { classy } from '@/helpers/classy';

type DividerProps = {
  className?: string;
  bgColor: string;
  orientation?: string;
};

export default function Divider({
  className: className = '',
  bgColor = 'bg-gray-300',
  orientation = 'vertical',
}: DividerProps) {
  return (
    <div
      className={classy(
        'inline-block  opacity-100 dark:opacity-50',
        orientation === 'horizontal' ? 'w-full min-w-auto h-[1px] my-2' : '',
        orientation === 'vertical' ? 'h-full min-h-auto w-[1px] ml-1 mr-2' : '',
        bgColor,
        className
      )}
    />
  );
}
