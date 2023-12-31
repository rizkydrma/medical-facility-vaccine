'use client';
import { useEffect, useState } from 'react';
import useSWR from 'swr';

import DetailFacility from '@/components/DetailFacility';
import DetailRoute from '@/components/DetailRoute';
import Error from '@/components/Error';
import Icons from '@/components/Icons';
import Loading from '@/components/Loading';
import LocationOff from '@/components/LocationOff';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import SneakPeekFacility from '@/components/SneakPeekFacility';
import SneekPeekRoute from '@/components/SneekPeekRoute';
import { Button } from '@/components/ui/Button';
import ComboboxComponent from '@/components/ui/Combobox';
import useMyLocation from '@/hook/useMyLocation';
import { ICity, IFacilityVaccine, IProvince } from '@/types/places';
import api from '@/utils/api';
import dynamic from 'next/dynamic';
import useMapContext from '@/context/useMapContext';

const Map = dynamic(() => import('@/components/Map'), { ssr: false });

const FindMedical = () => {
  const { data, error, isLoading } = useSWR('/api/provinces', api.getProvinces);
  const { resetState } = useMapContext();
  const [loading, setLoading] = useState(false);
  const [selectedProvince, setSelectedProvince] = useState<IProvince | null>(null);
  const [selectedCity, setSelectedCity] = useState<ICity | null>(null);
  const [cities, setCities] = useState<ICity[]>([]);
  const [facilities, setFacilities] = useState<IFacilityVaccine[]>([]);
  const myLocation = useMyLocation();
  const [mapCenter, setMapCenter] = useState<IGeolocation | null>(null);

  const fetchCities = async (idProvince: string) => {
    setLoading(true);
    try {
      const cities = await api.getCities(idProvince);
      setCities(cities);
    } catch (error) {}
    setLoading(false);
  };

  const fetchFacilityVaccine = async ({ province, city }: { province: string; city: string }) => {
    setLoading(true);
    try {
      const resFacilities = await api.getFacilityVaccine({ province, city });
      setFacilities(resFacilities);

      if (resFacilities.length) {
        const { latitude, longitude } = resFacilities?.[0];
        setMapCenter({ latitude, longitude });
      }
    } catch (error) {}
    setLoading(false);
  };

  const onSearch = () => {
    if (!selectedProvince || !selectedCity) return;
    resetState();
    fetchFacilityVaccine({ province: selectedProvince?.value, city: selectedCity?.value });
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
    <>
      <Sidebar>
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

          <Button
            size="sm"
            className="mt-4 text-ss bg-stone-200 dark:bg-stone-700 text-stone-700 dark:text-stone-200 hover:bg-stone-300 hover:dark:bg-stone-900"
            onClick={onSearch}
            isLoading={loading}
          >
            <Icons.SearchIcon className="w-4 mr-2" /> Search
          </Button>
        </div>

        <SneakPeekFacility />
        <SneekPeekRoute />
        <DetailFacility />
        <DetailRoute />
      </Sidebar>

      <div className="z-0 transition duration-600 relative">
        <Map myLocation={myLocation} center={mapCenter} facilities={facilities} />
      </div>
    </>
  );
};

export default FindMedical;
