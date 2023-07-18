import Image from 'next/image';
import { FC } from 'react';

interface BannerProps {}

const Banner: FC<BannerProps> = ({}) => {
  return (
    <div className="banner pt-16">
      <div className="w-full flex gap-4 lg:gap-10 items-center">
        <div className="w-full">
          <Image
            quality={100}
            style={{ objectFit: 'contain' }}
            height={400}
            width={600}
            className="grayscale brightness-200"
            src="/astra-zeneca.png"
            alt="astra zeneca"
          />
        </div>
        <div className="w-full">
          <Image
            quality={100}
            style={{ objectFit: 'contain' }}
            height={400}
            width={600}
            className="grayscale brightness-200"
            src="/sinovac.webp"
            alt="sinovac"
          />
        </div>
        <div className="w-full">
          <Image
            quality={100}
            style={{ objectFit: 'contain' }}
            height={400}
            width={600}
            className="grayscale brightness-200"
            src="/pfizer.png"
            alt="sinovac"
          />
        </div>
        <div className="w-full">
          <Image
            quality={100}
            style={{ objectFit: 'contain' }}
            height={400}
            width={600}
            className="grayscale brightness-200"
            src="/novavac.png"
            alt="novavac"
          />
        </div>
        <div className="w-full">
          <Image
            quality={100}
            style={{ objectFit: 'contain' }}
            height={400}
            width={600}
            className="grayscale brightness-200"
            src="/moderna.png"
            alt="moderna"
          />
        </div>
      </div>
      <div className="w-full flex gap-10 items-center">
        <div className="w-full">
          <Image
            quality={100}
            style={{ objectFit: 'contain' }}
            height={400}
            width={600}
            className="grayscale brightness-200"
            src="/astra-zeneca.png"
            alt="astra zeneca"
          />
        </div>
        <div className="w-full">
          <Image
            quality={100}
            style={{ objectFit: 'contain' }}
            height={400}
            width={600}
            className="grayscale brightness-200"
            src="/sinovac.webp"
            alt="sinovac"
          />
        </div>
        <div className="w-full">
          <Image
            quality={100}
            style={{ objectFit: 'contain' }}
            height={400}
            width={600}
            className="grayscale brightness-200"
            src="/pfizer.png"
            alt="sinovac"
          />
        </div>
        <div className="w-full">
          <Image
            quality={100}
            style={{ objectFit: 'contain' }}
            height={400}
            width={600}
            className="grayscale brightness-200"
            src="/novavac.png"
            alt="novavac"
          />
        </div>
        <div className="w-full">
          <Image
            quality={100}
            style={{ objectFit: 'contain' }}
            height={400}
            width={600}
            className="grayscale brightness-200"
            src="/moderna.png"
            alt="moderna"
          />
        </div>
      </div>
    </div>
  );
};

export default Banner;
