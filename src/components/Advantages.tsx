'use client';
import { motion } from 'framer-motion';
import { IAdvantage } from '@/types/advantage';
import { FC } from 'react';
import Card from './Card';

interface AdvantagesProps {
  advantages: IAdvantage[];
}

const list = {
  visible: {
    opacity: 1,
    transition: {
      when: 'beforeChildren',
      staggerChildren: 0.3,
    },
  },
  hidden: {
    opacity: 0,
    transition: {
      when: 'afterChildren',
    },
  },
};

const Advantages: FC<AdvantagesProps> = ({ advantages }) => {
  return (
    <motion.div className="grid w-full gap-6 grid-cols-12 mt-6">
      {advantages?.map((advantage, index) => (
        <Card {...advantage} key={advantage?.title} index={index + 1} />
      ))}
    </motion.div>
  );
};

export default Advantages;
