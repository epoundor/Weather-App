export interface WeatherData {
  id: number
  name: string
  sys: {
    country: string
    sunrise: number
    sunset: number
  }
  main: {
    temp: number
    feels_like: number
    temp_min: number
    temp_max: number
    pressure: number
    humidity: number
  }
  weather: Array<{
    id: number
    main: string
    description: string
    icon: string
  }>
  wind: {
    speed: number
    deg: number
  }
  clouds: {
    all: number
  }
  dt: number
  timezone: number
}

export interface FavoriteCity {
  id: number
  name: string
  country: string
  addedAt: number
}

export interface SearchHistory {
  cityName: string
  timestamp: number
}

export interface WeatherStats {
  totalFavorites: number
  recentSearches: SearchHistory[]
  weatherConditions: Record<string, number>
  averageTemp: number
}
