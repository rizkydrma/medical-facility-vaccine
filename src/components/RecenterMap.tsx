import { FC, useEffect } from 'react';
import { useMap } from 'react-leaflet';

interface RecenterMapProps {
  location: IGeolocation | null;
}

const RecenterMap: FC<RecenterMapProps> = ({ location }) => {
  const map = useMap();

  useEffect(() => {
    if (location) {
      map.setView({ lat: location.latitude, lng: location.longitude }, map.getZoom(), {
        animate: true,
        duration: 5,
      });
    }
  }, [location, map]);

  return null;
};

export default RecenterMap;
