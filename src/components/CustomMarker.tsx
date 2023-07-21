import { IFacilityVaccine } from '@/types/places';
import { Dispatch, FC, SetStateAction } from 'react';
import { Marker, MarkerProps, Popup, useMap, useMapEvents } from 'react-leaflet';
import Icons from './Icons';
import { Button } from './ui/Button';
import { icon } from 'leaflet';

interface CustomMarkerProps extends IFacilityVaccine {
  setDestination: Dispatch<SetStateAction<Omit<Coordinates, 'id' | 'value'> | null>>;
}

const ICON = icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconSize: [30, 40],
});

const CustomMarker: FC<CustomMarkerProps> = ({
  alamat,
  telp,
  longitude,
  latitude,
  id,
  status,
  nama,
  setDestination,
}) => {
  const map = useMap();
  const onDestination = () => {
    map.closePopup();
    setDestination({ latitude: latitude, longitude: longitude });
  };

  return (
    <Marker position={[latitude, longitude]} icon={ICON} key={id}>
      <Popup>
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
