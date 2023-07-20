import { cn } from '@/lib/utils';
import { FC, HTMLAttributes, memo, useState } from 'react';
import Icons from './Icons';

interface SidebarProps extends HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

const Sidebar: FC<SidebarProps> = ({ children }) => {
  const [collapse, setCollapse] = useState(false);
  return (
    <>
      <div
        className={cn(
          'fixed top-0 bottom-0 bg-white dark:bg-stone-800 z-20 transition',
          collapse ? 'translate-x-0' : '-translate-x-80 lg:-translate-x-[28rem]',
        )}
      >
        <div className={`z-20 h-full max-h-[100vh] w-80 lg:w-[28rem] overflow-y-scroll`}>{children}</div>
      </div>

      {/* BUTTON COLLAPSE */}
      <button
        onClick={() => setCollapse((prevState) => !prevState)}
        className={cn(
          'h-20 w-8 bg-white dark:bg-stone-800 rounded-tr-md rounded-br-md absolute top-0 bottom-0 translate-y-[calc(50vh)] border-l dark:border-l-stone-900 z-20 shadow-md items-center flex justify-center transition duration-200',
          collapse ? 'translate-x-80 lg:translate-x-[28rem]' : 'translate-x-0',
        )}
      >
        <Icons.ChevronRight
          size="22"
          className={cn('transition duration-1000 dark:text-white', collapse ? 'rotate-180' : 'rotate-0')}
        />
      </button>
    </>
  );
};

export default memo(Sidebar);
