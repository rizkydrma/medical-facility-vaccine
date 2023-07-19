'use client';
import { useEffect, useState } from 'react';
import { LayersControl, MapContainer, TileLayer, ZoomControl } from 'react-leaflet';
import useSWR from 'swr';
import { useTheme } from 'next-themes';

import Error from '@/components/Error';
import Icons from '@/components/Icons';
import Loading from '@/components/Loading';
import LocationOff from '@/components/LocationOff';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import ComboboxComponent from '@/components/ui/Combobox';
import useMyLocation from '@/hook/useMyLocation';
import { ICity, IProvince } from '@/types/places';
import api from '@/utils/api';

const { BaseLayer } = LayersControl;

const FindMedical = () => {
  const { data, error, isLoading } = useSWR('/api/provinces', api.getProvinces);
  const myLocation = useMyLocation();
  const { theme } = useTheme();
  const [collapse, setCollapse] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedProvince, setSelectedProvince] = useState<IProvince | null>(null);
  const [selectedCity, setSelectedCity] = useState<ICity | null>(null);
  const [cities, setCities] = useState<ICity[]>([]);

  const fetchCities = async (idProvince: string) => {
    setLoading(true);
    try {
      const cities = await api.getCities(idProvince);
      setCities(cities);
    } catch (error) {}
    setLoading(false);
  };

  useEffect(() => {
    if (selectedProvince) {
      fetchCities(selectedProvince?.value);
    }
  }, [selectedProvince]);

  if (error) return <Error />;
  if (isLoading) return <Loading />;
  if (!myLocation) return <LocationOff />;

  return (
    <div>
      <Sidebar collapse={collapse} setCollapse={setCollapse}>
        <Navbar />

        <div className="px-10 py-4 mt-16 border-b dark:border-b-stone-600">
          <Icons.Building2Icon size={18} className="text-stone-700 dark:text-stone-300 inline mr-2" />
          <h1 className="dark:text-stone-300 inline text-stone-700 font-medium text-sm  border-b-stone-300">
            Find Nearest Medical Facility
          </h1>

          <ComboboxComponent
            className="mt-4"
            label="Provinces"
            data={data?.map((item) => ({ ...item, id: item?.key, name: item?.value })) || []}
            selectedData={selectedProvince}
            setSelectedData={setSelectedProvince}
            option={(data: IProvince) => data.value}
            placeholder="Search Province"
            display={(data: IProvince) => data?.value}
          />

          <ComboboxComponent
            className="mt-4"
            label="Cities"
            data={cities?.map((item) => ({ ...item, id: item?.key, name: item?.value })) || []}
            selectedData={selectedCity}
            setSelectedData={setSelectedCity}
            option={(data: ICity) => data.value}
            placeholder="Search City"
            disabled={loading}
            display={(data: ICity) => data?.value}
          />
        </div>
      </Sidebar>

      <div className="z-0 transition duration-600 relative">
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
      </div>
    </div>
  );
};

export default FindMedical;
