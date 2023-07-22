import Banner from '@/components/Banner';
import Card from '@/components/Card';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Icons from '@/components/Icons';
import Navbar from '@/components/Navbar';
import LargeHeading from '@/components/ui/LargeHeading';
import Paragraph from '@/components/ui/Paragraph';
import { IAdvantage } from '@/types/advantage';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Medical Facility Vaccine',
  description: 'Search nearest medical facility vaccine in your city.',
};

export default function Home() {
  const advantages: IAdvantage[] = [
    {
      icon: <Icons.ActivityIcon size={22} />,
      title: 'Disease prevention',
      description:
        'Vaccines are designed to stimulate your immune system and create a defense mechanism against specific diseases. By getting vaccinated, you can significantly reduce the risk of contracting serious illnesses such as measles, influenza, hepatitis, polio, and many others',
    },
    {
      icon: <Icons.PersonStandingIcon size={22} />,
      title: 'Personal protection',
      description:
        'Vaccines are highly effective in preventing diseases and can provide you with personal protection. They help your body recognize and fight specific pathogens, reducing the severity of the illness or preventing it altogether.',
    },
    {
      icon: <Icons.Users2Icon size={22} />,
      title: 'Public health',
      description:
        'Vaccinations play a crucial role in achieving herd immunity or community immunity. When a significant portion of a population is immunized, it helps protect vulnerable individuals who cannot receive vaccines due to age, medical conditions, or compromised immune systems.',
    },
    {
      icon: <Icons.ActivityIcon size={22} />,
      title: 'Safe and extensively tested',
      description:
        'Vaccines undergo rigorous testing and evaluation by regulatory authorities to ensure their safety and efficacy before they are approved for public use.',
    },
  ];

  return (
    <>
      <Navbar />

      <div className="relative h-screen overflow-x-hidden">
        <Header />
        <Banner />

        <div className="container pt-16">
          <LargeHeading size="sm" className="text-left">
            Why should I vaccine?
          </LargeHeading>

          <Paragraph className="text-left mt-6" size="sm">
            Getting vaccinated is an important step to protect yourself and others from various infectious diseases.
            Here are several reasons why you should consider getting vaccinated:
          </Paragraph>

          <div className="flex w-full gap-6 flex-col md:flex-row mt-6">
            {advantages?.map((advantage) => (
              <Card {...advantage} key={advantage?.title} />
            ))}
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
