import Banner from '@/components/Banner';
import Header from '@/components/Header';
import LargeHeading from '@/components/ui/LargeHeading';
import Paragraph from '@/components/ui/Paragraph';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Medical Facility Vaccine',
  description: 'Search nearest medical facility vaccine in your city.',
};

export default function Home() {
  return (
    <div className="relative h-screen overflow-x-hidden pb-40">
      <Header />
      <Banner />

      <div className="container pt-16">
        <LargeHeading size="sm" className="text-left">
          Why should I vaccine?
        </LargeHeading>

        <Paragraph className="text-left mt-4" size="sm">
          Getting vaccinated is an important step to protect yourself and others from various infectious diseases. Here
          are several reasons why you should consider getting vaccinated:
        </Paragraph>
      </div>
    </div>
  );
}
