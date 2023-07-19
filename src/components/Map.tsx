import { useTheme } from 'next-themes';
import { FC } from 'react';
import { LayersControl, MapContainer, TileLayer, ZoomControl } from 'react-leaflet';

interface MapProps {
  myLocation: any;
}

const { BaseLayer } = LayersControl;

const Map: FC<MapProps> = ({ myLocation }) => {
  const { theme } = useTheme();

  return (
    <MapContainer
      center={[myLocation.latitude, myLocation.longitude]}
      zoom={13}
      style={{ height: '100vh' }}
      zoomControl={false}
    >
      <ZoomControl position="topright" />

      <LayersControl>
        <BaseLayer name="Light" checked={theme === 'light'}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
        </BaseLayer>
        <BaseLayer name="Dark" checked={theme !== 'light'}>
          <TileLayer
            url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
            attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
          />
        </BaseLayer>
      </LayersControl>

      {/* <Routing geolocation={geolocation} handleClickMap={onClickMap} setRouteDirection={setRouteDirection} /> */}
    </MapContainer>
  );
};

export default Map;
