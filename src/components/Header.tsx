'use client';

import Link from 'next/link';
import { FC, useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import NET from 'vanta/dist/vanta.net.min.js';
import Icons from './Icons';
import { buttonVariants } from './ui/Button';
import LargeHeading from './ui/LargeHeading';
import Paragraph from './ui/Paragraph';

interface HeaderProps {}

const Header: FC<HeaderProps> = ({}) => {
  const [vantaEffect, setVantaEffect] = useState<any>(0);
  const vantaRef = useRef(null);

  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(
        NET({
          el: vantaRef.current,
          THREE: THREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 100.0,
          minWidth: 100.0,
          scale: 1.0,
          scaleMobile: 1.0,
          color: '#dc2626',
          backgroundAlpha: 0,
        }),
      );
    }

    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);
  return (
    <div className="h-[100vh] w-full mx-auto text-center grid place-items-center" ref={vantaRef}>
      <div>
        <LargeHeading>Fight Virus With Vaccines</LargeHeading>
        <Paragraph className="mx-auto max-w-4xl mt-2">
          Let's stop this pandemic by killing the virus with a vaccine, don't let yourself and family get infected
        </Paragraph>
        <Link
          href="/search"
          className={buttonVariants({ className: 'rounded-lg hover:text-shadow hover:shadow-stone-100' })}
        >
          Search Medical Facility <Icons.ArrowRightIcon size={16} className="ml-2" />
        </Link>
      </div>
    </div>
  );
};

export default Header;
