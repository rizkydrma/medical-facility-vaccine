import Link from 'next/link';
import { ThemeToggle } from './ThemeToggle';
import { buttonVariants } from './ui/Button';

const Navbar = async () => {
  return (
    <div className="fixed backdrop-blur-sm bg-white/60 dark:bg-stone-950/60 z-50 top-0 left-0 right-0 h-16 border-b border-slate-300 dark:border-slate-700 shadow-sm flex items-center justify-between">
      <div className="container max-w-7xl mx-auto w-full flex justify-between items-center">
        <Link
          href="/"
          className={buttonVariants({
            variant: 'link',
            className: 'text-indigo-700 dark:text-slate-50 text-lg font-bold',
          })}
        >
          Vaccination
        </Link>

        <div className="md:hidden">
          <ThemeToggle />
        </div>

        <div className="hidden md:flex gap-4">
          <Link href="#educations" className={buttonVariants({ variant: 'ghost' })}>
            Educations
          </Link>
          <Link href="/documentation" className={buttonVariants({ className: 'bg-indigo-700' })}>
            Find
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
