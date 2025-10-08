import axios from 'axios'
import type { WeatherData } from '@/types/weather'

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY
const BASE_URL = import.meta.env.VITE_OPENWEATHER_BASE_URL || 'https://api.openweathermap.org/data/2.5'

const weatherApi = axios.create({
  baseURL: BASE_URL,
  params: {
    appid: API_KEY,
    units: 'metric',
    lang: 'fr'
  }
})

export async function getCurrentWeather(cityName: string): Promise<WeatherData> {
  try {
    const response = await weatherApi.get<WeatherData>('/weather', {
      params: { q: cityName }
    })
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 404) {
        throw new Error('Ville non trouvée. Veuillez vérifier l\'orthographe.')
      } else if (error.response?.status === 401) {
        throw new Error('Clé API invalide. Veuillez vérifier votre configuration.')
      } else if (!error.response) {
        throw new Error('Erreur réseau. Veuillez vérifier votre connexion internet.')
      }
    }
    throw new Error('Une erreur est survenue lors de la récupération des données météo.')
  }
}

export async function getWeatherById(cityId: number): Promise<WeatherData> {
  try {
    const response = await weatherApi.get<WeatherData>('/weather', {
      params: { id: cityId }
    })
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error) && !error.response) {
      throw new Error('Erreur réseau. Veuillez vérifier votre connexion internet.')
    }
    throw new Error('Une erreur est survenue lors de la récupération des données météo.')
  }
}

export function getWeatherIconUrl(iconCode: string): string {
  return `https://openweathermap.org/img/wn/${iconCode}@2x.png`
}
