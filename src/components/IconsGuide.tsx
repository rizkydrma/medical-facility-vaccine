import { FC } from 'react';
import { ModifierType } from '../types/route';
import Icons from './Icons';
import { cn } from '@/lib/utils';

interface IconsGuideProps {
  type: ModifierType;
  className?: string;
}

const IconsGuide: FC<IconsGuideProps> = ({ type, className }) => {
  switch (type) {
    case 'Head':
      return <Icons.MapPin size={14} className={cn(className)} />;
    case 'Continue':
    case 'Straight':
      return <Icons.MoveUpIcon size={14} className={cn(className)} />;
    case 'Left':
    case 'SharpLeft':
      return <Icons.CornerUpLeftIcon size={14} className={cn(className)} />;
    case 'SlightLeft':
      return <Icons.MoveUpLeft size={14} className={cn(className)} />;
    case 'Right':
    case 'SharpRight':
      return <Icons.CornerUpRightIcon size={14} className={cn(className)} />;
    case 'SlightRight':
      return <Icons.MoveUpRight size={14} className={cn(className)} />;
    case 'Fork':
      return <Icons.SplitIcon size={14} className={cn(className)} />;
    case 'DestinationReached':
      return <Icons.HomeIcon size={14} className={cn(className)} />;
    case 'Uturn':
      return <Icons.Undo2Icon size={14} className={cn('rotate-90', className)} />;
    default:
      return <Icons.CarIcon size={14} className={cn(className)} />;
  }
};

export default IconsGuide;
