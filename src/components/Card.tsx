import { IAdvantage } from '@/types/advantage';
import { FC } from 'react';

interface CardProps extends IAdvantage {}

const Card: FC<CardProps> = ({ icon, title, description }) => {
  return (
    <div className="lg:w-1/3 border dark:border-stone-700 transition duration-300 shadow rounded-md cursor-default p-5 hover:shadow-stone-600/40 hover:shadow-xl flex flex-col dark:conic-border__dark conic-border">
      <div className="p-2 bg-stone-100 dark:bg-stone-100 w-fit rounded shadow">{icon}</div>
      <h5 className="font-bold dark:text-stone-100 text-stone-700 mt-4">{title}</h5>
      <p className="text-sm dark:text-stone-100 text-stone-700 mt-4 flex-1">{description}</p>
    </div>
  );
};

export default Card;
