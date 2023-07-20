import { ICity, IFacilityVaccine, IProvince } from '@/types/places';

const api = (() => {
  const BASE_URL = 'https://kipi.covid19.go.id/api';

  async function getProvinces(): Promise<IProvince[]> {
    const response = await fetch(`${BASE_URL}/get-province`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const responseJson = await response.json();

    return responseJson?.results;
  }

  async function getCities(idProvince: string): Promise<ICity[]> {
    const response = await fetch(`${BASE_URL}/get-city`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        start_id: idProvince,
      }),
    });

    const responseJson = await response.json();

    return responseJson?.results;
  }

  async function getFacilityVaccine({
    province,
    city,
  }: {
    province: string;
    city: string;
  }): Promise<IFacilityVaccine[]> {
    const query = new URLSearchParams({ province, city }).toString();
    const response = await fetch(`${BASE_URL}/get-faskes-vaksinasi?${query}`);

    const responseJson = await response.json();

    return responseJson?.data;
  }

  return { getProvinces, getCities, getFacilityVaccine };
})();

export default api;
