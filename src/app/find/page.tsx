import { Metadata } from 'next';
import FindMedical from './find';

export const metadata: Metadata = {
  title: 'Find Medical Facility Vaccine',
  description: 'Search nearest medical facility vaccine in your city.',
};

export default function Page() {
  return (
    <>
      <FindMedical />
    </>
  );
}
