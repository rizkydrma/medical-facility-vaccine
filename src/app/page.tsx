import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Medical Facility Vaccine',
  description: 'Search nearest medical facility vaccine in your city.',
};

export default function Home() {
  return (
    <div className="relative h-screen flex items-center justify-center overflow-x-hidden">
      <h1>Hello World</h1>
    </div>
  );
}
