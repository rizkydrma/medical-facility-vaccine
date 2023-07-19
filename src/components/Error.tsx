'use client';
import { FC } from 'react';

interface ErrorProps {}

const Error: FC<ErrorProps> = ({}) => {
  return (
    <div className="h-screen grid place-content-center">
      <p className="dark:text-stone-200 text-stone-700 text-lg">Error</p>
    </div>
  );
};

export default Error;
