import useMapContext from '@/context/useMapContext';
import { IFacilityVaccine } from '@/types/places';
import { icon } from 'leaflet';
import { FC, useMemo, useRef } from 'react';
import { Marker, Popup, useMap } from 'react-leaflet';
import Icons from './Icons';
import { Button } from './ui/Button';

interface CustomMarkerProps {
  facility: IFacilityVaccine;
}

const ICON = icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconSize: [30, 40],
});

const CustomMarker: FC<CustomMarkerProps> = ({ facility }) => {
  const { alamat, telp, longitude, latitude, status, nama } = facility;
  const { setFacility, setCollapse, setDestination } = useMapContext();

  const map = useMap();
  const onDestination = () => {
    map.closePopup();
    setDestination({ latitude: latitude, longitude: longitude });
  };

  const markerRef = useRef(null);
  const handlersMarker = useMemo(
    () => ({
      click() {
        const marker = markerRef.current;

        if (marker) {
          setFacility(facility);
          setCollapse(true);
        }
      },
    }),
    [],
  );

  const closePopup = () => {
    setCollapse(false);
    setFacility(null);
    map.closePopup();
  };

  return (
    <Marker position={[latitude, longitude]} icon={ICON} ref={markerRef} eventHandlers={handlersMarker}>
      <Popup closeButton={false} closeOnClick={false}>
        <button type="button" className="absolute top-4 right-4" onClick={closePopup}>
          <Icons.XIcon size={14} className="text-stone-800 dark:text-stone-200" />
        </button>
        <span className="text-sm font-medium">{nama}</span>
        <div className="flex gap-4 items-center pt-2 ">
          <div className="flex items-center gap-2 w-fit dark:text-green-500 text-green-600 text-ss">
            <Icons.BadgeCheckIcon size={15} className="dark:text-green-500 text-green-600" /> {status}
          </div>

          <div className="flex items-center gap-1 dark:text-stone-200 text-stone-800 text-ss">
            <Icons.PhoneIcon size={13} /> {telp || '-'}
          </div>
        </div>
        <span className="text-ss pt-2 block">{alamat}</span>
        <Button
          size="sm"
          variant="ghost"
          className="text-xs border py-1 px-2 mt-3 hover:dark:bg-stone-900"
          onClick={onDestination}
        >
          <Icons.CompassIcon size={14} className="mr-2 text-blue-300" />
          Directions
        </Button>
      </Popup>
    </Marker>
  );
};

export default CustomMarker;
