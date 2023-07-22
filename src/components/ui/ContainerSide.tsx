import { cn } from '@/lib/utils';
import { FC } from 'react';

interface ContainerProps {
  show: boolean;
  children: React.ReactNode;
}

const ContainerSide: FC<ContainerProps> = ({ show, children }) => {
  return (
    <div
      className={cn(
        'fixed top-0 bottom-0 bg-white dark:bg-stone-800 z-20 transition',
        show ? 'translate-x-0' : '-translate-x-80 lg:-translate-x-[28rem]',
      )}
    >
      <div className={`z-20 h-full max-h-[100vh] w-80 lg:w-[28rem] overflow-y-scroll`}>{children}</div>
    </div>
  );
};

export default ContainerSide;
