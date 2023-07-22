import { FC } from 'react';
import { useMap } from 'react-leaflet';
import Icons from '../Icons';

interface ResetLocationProps {
  location: IGeolocation | null;
}

const ResetLocation: FC<ResetLocationProps> = ({ location }) => {
  const map = useMap();

  const onResetLocation = () => {
    if (location) {
      const { latitude, longitude } = location;
      map.setView({ lat: latitude, lng: longitude }, map.getZoom(), {
        animate: true,
        duration: 1,
      });
    }
  };

  return (
    <button
      type="button"
      className="absolute bottom-5 p-2 flex items-center justify-center right-2 rounded border-2 border-stone-400/50 shadow w-10 h-10 bg-white hover:bg-stone-100 z-[1000000]"
      onClick={onResetLocation}
    >
      <Icons.LocateIcon size={22} className="text-stone-500" />
    </button>
  );
};

export default ResetLocation;
