import { FC } from 'react';
import Icons from './Icons';

interface LocationOffProps {}

const LocationOff: FC<LocationOffProps> = ({}) => {
  return (
    <div className="h-full min-h-[100vh] grid place-items-center bg-gray-50">
      <div className="flex justify-center items-center flex-col">
        <Icons.LocateOffIcon size={80} className="mb-4 animate-pulse" />
        <h1>Location Permission is disable</h1>
        <p className="text-xs text-gray-600 w-72 text-center">
          Please turn on location permission on your device and reload again.
        </p>
      </div>
    </div>
  );
};

export default LocationOff;
