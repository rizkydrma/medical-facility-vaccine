import { ICity, IProvince } from '@/types/places';

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

  return { getProvinces, getCities };
})();

export default api;
