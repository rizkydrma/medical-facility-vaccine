'use client';
import { useEffect, useState } from 'react';
import useSWR from 'swr';

import Error from '@/components/Error';
import Icons from '@/components/Icons';
import Loading from '@/components/Loading';
import LocationOff from '@/components/LocationOff';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import { Button } from '@/components/ui/Button';
import ComboboxComponent from '@/components/ui/Combobox';
import useMyLocation from '@/hook/useMyLocation';
import { ICity, IFacilityVaccine, IProvince } from '@/types/places';
import api from '@/utils/api';
import dynamic from 'next/dynamic';

const Map = dynamic(() => import('@/components/Map'), { ssr: false });

const FindMedical = () => {
  const { data, error, isLoading } = useSWR('/api/provinces', api.getProvinces);
  const [loading, setLoading] = useState(false);
  const [selectedProvince, setSelectedProvince] = useState<IProvince | null>(null);
  const [selectedCity, setSelectedCity] = useState<ICity | null>(null);
  const [cities, setCities] = useState<ICity[]>([]);
  const [facilities, setFacilities] = useState<IFacilityVaccine[]>([]);
  const myLocation = useMyLocation();

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
    } catch (error) {}
    setLoading(false);
  };

  const onSearch = () => {
    if (!selectedProvince || !selectedCity) return;
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
    <div>
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

          <Button size="sm" className="mt-4 text-ss" onClick={onSearch} isLoading={loading}>
            <Icons.SearchIcon className="w-4 mr-2" /> Search
          </Button>
        </div>
      </Sidebar>

      <div className="z-0 transition duration-600 relative">
        <Map myLocation={myLocation} facilities={facilities} />
      </div>
    </div>
  );
};

export default FindMedical;
