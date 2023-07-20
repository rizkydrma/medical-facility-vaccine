import { IFacilityVaccine } from '@/types/places';
import { useTheme } from 'next-themes';
import { FC, memo, useState } from 'react';
import { LayersControl, MapContainer, Marker, Popup, TileLayer, ZoomControl } from 'react-leaflet';
import { icon, divIcon, point } from 'leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import { Button } from './ui/Button';
import Icons from './Icons';
import RoutingMap from './RoutingMap';

const ICON = icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconSize: [30, 40],
});

const CurrentMarker = divIcon({
  html: `<span class="border-red-600 text-white animate-pulse rounded-full border-[4px] w-6 h-6 flex items-center justify-center"></span>`,
  className: 'custom-marker-cluster',
  iconSize: point(33, 33, true),
});

interface MapProps {
  myLocation: Omit<Coordinates, 'id' | 'value'>;
  facilities: IFacilityVaccine[];
}

const { BaseLayer } = LayersControl;

const Map: FC<MapProps> = ({ myLocation, facilities }) => {
  const { theme } = useTheme();
  const [destination, setDestination] = useState<Omit<Coordinates, 'id' | 'value'> | null>(null);

  const createClusterCustomIcon = function (cluster: any): any {
    return divIcon({
      html: `<span class="dark:bg-stone-700 bg-stone-50 dark:border-stone-200 border-stone-700 dark:text-stone-200 text-stone-700 p-3 rounded-full border-2 w-10 h-10 flex items-center justify-center ">${cluster.getChildCount()}</span>`,
      className: 'custom-marker-cluster',
      iconSize: point(33, 33, true),
    });
  };

  return (
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
            <Marker position={[facility?.latitude, facility?.longitude]} icon={ICON} key={facility?.id}>
              <Popup>
                <p className="text-xs font-medium">{facility?.nama}</p>

                <div className="flex items-center gap-3">
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-xs"
                    onClick={() => setDestination({ latitude: facility?.latitude, longitude: facility?.longitude })}
                  >
                    <Icons.CompassIcon size={14} className="mr-2 text-blue-300" />
                    Directions
                  </Button>

                  <Button size="sm" variant="ghost" className="text-xs">
                    <Icons.CompassIcon size={14} className="mr-2" />
                    Open with Gmap
                  </Button>
                </div>
              </Popup>
            </Marker>
          ))}
        </MarkerClusterGroup>
      ) : null}

      <RoutingMap start={myLocation} destination={destination} />
    </MapContainer>
  );
};

export default memo(Map);
