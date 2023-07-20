import { IFacilityVaccine } from '@/types/places';
import { useTheme } from 'next-themes';
import { FC, memo } from 'react';
import { LayersControl, MapContainer, Marker, Popup, TileLayer, ZoomControl } from 'react-leaflet';
import { icon } from 'leaflet';

const ICON = icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconSize: [30, 40],
});

interface MapProps {
  myLocation: Omit<Coordinates, 'id' | 'value'>;
  facilities: IFacilityVaccine[];
}

const { BaseLayer } = LayersControl;

const Map: FC<MapProps> = ({ myLocation, facilities }) => {
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

      {facilities?.length > 0
        ? facilities?.map((facility) => (
            <Marker position={[facility?.latitude, facility?.longitude]} icon={ICON} key={facility?.id}>
              <Popup>{facility?.nama}</Popup>
            </Marker>
          ))
        : null}

      {/* <Routing geolocation={geolocation} handleClickMap={onClickMap} setRouteDirection={setRouteDirection} /> */}
    </MapContainer>
  );
};

export default memo(Map);
