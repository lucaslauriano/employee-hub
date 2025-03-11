import { SVGAttributes } from 'react';

import {
  PlusIcon,
  HexagonIcon,
  ArrowUpIcon,
  MenuBarsIcon,
} from '@/components/Icons';

const Icons = {
  plus: ({ className }: SVGAttributes<{}>) => (
    <PlusIcon className={className} />
  ),
  menu_bars: ({ className }: SVGAttributes<{}>) => (
    <MenuBarsIcon className={className} />
  ),
  arrow_up: ({ className }: SVGAttributes<{}>) => (
    <ArrowUpIcon className={className} />
  ),
};

export type IconName = keyof typeof Icons;

export interface IconProps {
  icon: IconName;
  className?: string;
}

const Icon = ({ icon, className = 'w-6 h-6' }: IconProps) => {
  const IconComponent = Icons[icon];

  return (
    <span className='inline-flex items-center justify-center'>
      <IconComponent className={className} />
    </span>
  );
};

export default Icon;
