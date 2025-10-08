import type { FavoriteCity, SearchHistory } from '@/types/weather'

const FAVORITES_KEY = 'weather_app_favorites'
const SEARCH_HISTORY_KEY = 'weather_app_search_history'
const MAX_HISTORY_ITEMS = 5

export function getFavorites(): FavoriteCity[] {
  try {
    const stored = localStorage.getItem(FAVORITES_KEY)
    return stored ? JSON.parse(stored) : []
  } catch (error) {
    console.error('Erreur lors de la lecture des favoris:', error)
    return []
  }
}

export function saveFavorites(favorites: FavoriteCity[]): void {
  try {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites))
  } catch (error) {
    console.error('Erreur lors de la sauvegarde des favoris:', error)
  }
}

export function addFavorite(city: FavoriteCity): boolean {
  try {
    const favorites = getFavorites()
    
    if (favorites.some(fav => fav.id === city.id)) {
      return false
    }
    
    favorites.push(city)
    saveFavorites(favorites)
    return true
  } catch (error) {
    console.error('Erreur lors de l\'ajout aux favoris:', error)
    return false
  }
}

export function removeFavorite(cityId: number): void {
  try {
    const favorites = getFavorites()
    const filtered = favorites.filter(fav => fav.id !== cityId)
    saveFavorites(filtered)
  } catch (error) {
    console.error('Erreur lors de la suppression du favori:', error)
  }
}

export function isFavorite(cityId: number): boolean {
  const favorites = getFavorites()
  return favorites.some(fav => fav.id === cityId)
}

export function getSearchHistory(): SearchHistory[] {
  try {
    const stored = localStorage.getItem(SEARCH_HISTORY_KEY)
    return stored ? JSON.parse(stored) : []
  } catch (error) {
    console.error('Erreur lors de la lecture de l\'historique:', error)
    return []
  }
}

export function addToSearchHistory(cityName: string): void {
  try {
    let history = getSearchHistory()
    
    history = history.filter(item => item.cityName.toLowerCase() !== cityName.toLowerCase())
    
    history.unshift({
      cityName,
      timestamp: Date.now()
    })
    
    if (history.length > MAX_HISTORY_ITEMS) {
      history = history.slice(0, MAX_HISTORY_ITEMS)
    }
    
    localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(history))
  } catch (error) {
    console.error('Erreur lors de l\'ajout à l\'historique:', error)
  }
}

export function clearSearchHistory(): void {
  try {
    localStorage.removeItem(SEARCH_HISTORY_KEY)
  } catch (error) {
    console.error('Erreur lors de l\'effacement de l\'historique:', error)
  }
}
