import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { WeatherData, FavoriteCity, SearchHistory, WeatherStats } from '@/types/weather'
import { getCurrentWeather, getWeatherById } from '@/services/weatherApi'
import * as localStorageService from '@/services/localStorage'

export const useWeatherStore = defineStore('weather', () => {
  const currentWeather = ref<WeatherData | null>(null)
  const favorites = ref<FavoriteCity[]>(localStorageService.getFavorites())
  const searchHistory = ref<SearchHistory[]>(localStorageService.getSearchHistory())
  const loading = ref(false)
  const error = ref<string | null>(null)
  const favoritesWeather = ref<Map<number, WeatherData>>(new Map())

  const stats = computed<WeatherStats>(() => {
    const weatherConditions: Record<string, number> = {}
    let totalTemp = 0
    let tempCount = 0

    favoritesWeather.value.forEach((weather) => {
      const condition = weather.weather[0]?.main || 'Unknown'
      weatherConditions[condition] = (weatherConditions[condition] || 0) + 1
      totalTemp += weather.main.temp
      tempCount++
    })

    return {
      totalFavorites: favorites.value.length,
      recentSearches: searchHistory.value.slice(0, 5),
      weatherConditions,
      averageTemp: tempCount > 0 ? totalTemp / tempCount : 0
    }
  })

  const searchWeather = async (cityName: string) => {
    if (!cityName.trim()) {
      error.value = 'Veuillez entrer un nom de ville'
      return
    }

    loading.value = true
    error.value = null

    try {
      const data = await getCurrentWeather(cityName)
      currentWeather.value = data
      localStorageService.addToSearchHistory(data.name)
      searchHistory.value = localStorageService.getSearchHistory()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Une erreur est survenue'
      currentWeather.value = null
    } finally {
      loading.value = false
    }
  }

  const loadFavoriteWeather = async (cityId: number) => {
    loading.value = true
    error.value = null

    try {
      const data = await getWeatherById(cityId)
      currentWeather.value = data
      favoritesWeather.value.set(cityId, data)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Une erreur est survenue'
    } finally {
      loading.value = false
    }
  }

  const refreshFavoritesWeather = async () => {
    const promises = favorites.value.map(async (fav) => {
      try {
        const data = await getWeatherById(fav.id)
        favoritesWeather.value.set(fav.id, data)
      } catch (err) {
        console.error(`Erreur lors du rafraîchissement de ${fav.name}:`, err)
      }
    })

    await Promise.all(promises)
  }

  const addToFavorites = () => {
    if (!currentWeather.value) return false

    const favorite: FavoriteCity = {
      id: currentWeather.value.id,
      name: currentWeather.value.name,
      country: currentWeather.value.sys.country,
      addedAt: Date.now()
    }

    const success = localStorageService.addFavorite(favorite)
    if (success) {
      favorites.value = localStorageService.getFavorites()
      favoritesWeather.value.set(favorite.id, currentWeather.value)
    }
    return success
  }

  const removeFromFavorites = (cityId: number) => {
    localStorageService.removeFavorite(cityId)
    favorites.value = localStorageService.getFavorites()
    favoritesWeather.value.delete(cityId)
  }

  const isCurrentFavorite = computed(() => {
    if (!currentWeather.value) return false
    return localStorageService.isFavorite(currentWeather.value.id)
  })

  const clearHistory = () => {
    localStorageService.clearSearchHistory()
    searchHistory.value = []
  }

  const clearError = () => {
    error.value = null
  }

  return {
    currentWeather,
    favorites,
    searchHistory,
    loading,
    error,
    favoritesWeather,
    stats,
    isCurrentFavorite,
    searchWeather,
    loadFavoriteWeather,
    refreshFavoritesWeather,
    addToFavorites,
    removeFromFavorites,
    clearHistory,
    clearError
  }
})
