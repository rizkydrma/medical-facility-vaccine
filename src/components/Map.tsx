import { IFacilityVaccine } from '@/types/places';
import { divIcon, point } from 'leaflet';
import { useTheme } from 'next-themes';
import { FC, memo } from 'react';
import { LayersControl, MapContainer, Marker, Popup, TileLayer, ZoomControl } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import CustomMarker from './CustomMarker';
import RecenterMap from './RecenterMap';
import RoutingMap from './RoutingMap';
import ResetLocation from './ui/ResetLocation';

const CurrentMarker = divIcon({
  html: `<span class="border-red-600 text-white animate-pulse rounded-full border-[4px] w-6 h-6 flex items-center justify-center"></span>`,
  className: 'custom-marker-cluster',
  iconSize: point(33, 33, true),
});

interface MapProps {
  myLocation: IGeolocation;
  center: IGeolocation | null;
  facilities: IFacilityVaccine[];
}

const { BaseLayer } = LayersControl;

const Map: FC<MapProps> = ({ myLocation, center, facilities }) => {
  const { theme } = useTheme();

  const createClusterCustomIcon = function (cluster: any): any {
    return divIcon({
      html: `<span class="dark:bg-stone-700 bg-stone-50 dark:border-stone-200 border-sky-600 dark:text-stone-200 text-stone-700 p-3 rounded-full border-2 w-10 h-10 flex items-center justify-center ">${cluster.getChildCount()}</span>`,
      className: 'custom-marker-cluster',
      iconSize: point(33, 33, true),
    });
  };

  return (
    <div className="relative">
      <MapContainer
        center={[myLocation.latitude, myLocation.longitude]}
        zoom={13}
        style={{ height: '100vh' }}
        zoomControl={false}
      >
        <ZoomControl position="topright" />

        <LayersControl hideSingleBase>
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

        <Marker position={[myLocation.latitude, myLocation.longitude]} icon={CurrentMarker}>
          <Popup>My Current Location</Popup>
        </Marker>

        {facilities?.length > 0 ? (
          <MarkerClusterGroup chunkedLoading iconCreateFunction={createClusterCustomIcon} maxClusterRadius={50}>
            {facilities?.map((facility) => (
              <CustomMarker key={facility?.id} facility={facility} />
            ))}
          </MarkerClusterGroup>
        ) : null}

        <RoutingMap start={myLocation} />
        <RecenterMap location={center} />
        <ResetLocation location={myLocation} />
      </MapContainer>
    </div>
  );
};

export default memo(Map);
