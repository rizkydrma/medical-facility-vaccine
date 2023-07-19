import { FC } from 'react';

interface LoadingProps {}

const Loading: FC<LoadingProps> = ({}) => {
  return (
    <div className="h-screen grid place-items-center">
      <p className="text-lg dark:text-white text-stone-900">Loading...</p>
    </div>
  );
};

export default Loading;
