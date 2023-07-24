'use client';
import { IAdvantage } from '@/types/advantage';
import { FC } from 'react';
import { motion } from 'framer-motion';

interface CardProps extends IAdvantage {
  index?: number;
}

const variants = {
  visible: (i: number) => ({
    type: 'spring',
    opacity: 1,
    transition: {
      delay: i * 0.5,
    },
    y: 0,
  }),
  hidden: { opacity: 0, y: -50 },
};

const Card: FC<CardProps> = ({ icon, title, description, index }) => {
  return (
    <motion.div
      className="col-span-12 sm:col-span-6 lg:col-span-3 border dark:border-stone-700 transition duration-300 shadow  cursor-default p-5 hover:shadow-stone-600/40 hover:shadow-xl flex flex-col dark:conic-border__dark conic-border"
      initial="hidden"
      animate="visible"
      variants={variants}
      custom={index}
    >
      <div className="p-2 bg-stone-100 dark:bg-stone-100 w-fit rounded shadow">{icon}</div>
      <h5 className="font-bold dark:text-stone-100 text-stone-700 mt-4">{title}</h5>
      <p className="text-sm dark:text-stone-100 text-stone-700 mt-4 flex-1">{description}</p>
    </motion.div>
  );
};

export default Card;
