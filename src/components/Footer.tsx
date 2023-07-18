import Link from 'next/link';
import { FC } from 'react';

interface FooterProps {}

const Footer: FC<FooterProps> = ({}) => {
  return (
    <div className="py-4 border-t-[1px] w-full dark:border-stone-600/60 border-stone-950/10 mt-32 ">
      <div className="container">
        <span className="text-xs font-light dark:text-white">
          © 2023{' '}
          <Link href="https://rizkydarma.com" className="hover:underline hover:text-yellow-400 transition duration-300">
            Rizky Darma.
          </Link>{' '}
          All rights reserved.
        </span>
      </div>
    </div>
  );
};

export default Footer;
