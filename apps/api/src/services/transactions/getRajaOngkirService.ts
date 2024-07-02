import axios from 'axios';

interface RajaOngkirResponse {
  rajaongkir: {
    status: {
      //   code: number;
      description: string;
    };
    results: {
      costs: {
        service: string;
        description: string;
        cost: {
          value: number;
        }[];
      }[];
    }[];
  };
}
interface RajaOngkirBody {
  origin: string;
  destination: string;
  weight: number;
  courier: string;
}

export const getRajaOngkirService = async (body: RajaOngkirBody) => {
  try {
    const apiKey = '7cf938ca0cd950bf59bac9148dbc2b2e';

    async function buildCitySearchUrl(cityName: string) {
      try {
        const response = await axios.get(
          `https://api.rajaongkir.com/starter/city?search=${encodeURIComponent(cityName)}`,
          {
            headers: {
              key: apiKey,
            },
          },
        );
        const cityId = response.data.rajaongkir.results[0]?.city_id;
        if (!cityId) {
          throw new Error(`City ID not found for ${cityName}`);
        }
        return cityId;
      } catch (error) {
        throw new Error(`Failed to fetch city data for ${cityName}`);
      }
    }
    const originCityId = await buildCitySearchUrl(`${body.origin}`);
    const destinationCityId = await buildCitySearchUrl(`${body.destination}`);

    const data = {
      origin: originCityId,
      destination: destinationCityId,
      weight: body.weight,
      courier: body.courier,
    };

    // const originCityId = await buildCitySearchUrl('Jakarta');
    // const destinationCityId = await buildCitySearchUrl('Kebumen');

    // const data = {
    //   origin: originCityId,
    //   destination: destinationCityId,
    //   weight: 1700,
    //   courier: 'tiki',
    // };

    const urlCost = 'https://api.rajaongkir.com/starter/cost';
    const headers = {
      key: apiKey,
    };

    const response = await axios.post(urlCost, data, { headers });

    const result: RajaOngkirResponse = response.data;
    const costs = result.rajaongkir.results[0]?.costs;

    if (!costs) {
      throw new Error('No shipping costs available');
    }

    const formattedCosts = costs.map((cost) => ({
      service: cost.service,
      description: cost.description,
      cost: cost.cost.map((detail) => ({
        value: detail.value,
      })),
    }));

    return formattedCosts;
  } catch (error) {
    console.error('Error fetching RajaOngkir service:', error);
    throw error;
  }
};
