<script setup lang="ts">
import { computed } from 'vue'
import { Icon } from '@iconify/vue'
import type { WeatherData } from '@/types/weather'
import { getWeatherIconUrl } from '@/services/weatherApi'
import { useWeatherStore } from '@/stores/weatherStore'

interface Props {
  weather: WeatherData | null
}

const props = defineProps<Props>()
const weatherStore = useWeatherStore()

const isFavorite = computed(() => weatherStore.isCurrentFavorite)

function toggleFavorite() {
  if (!props.weather) return
  
  if (isFavorite.value) {
    weatherStore.removeFromFavorites(props.weather.id)
  } else {
    weatherStore.addToFavorites()
  }
}

function formatDate(timestamp: number): string {
  const date = new Date(timestamp * 1000)
  return date.toLocaleDateString('fr-FR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

function formatTime(timestamp: number): string {
  const date = new Date(timestamp * 1000)
  return date.toLocaleTimeString('fr-FR', {
    hour: '2-digit',
    minute: '2-digit'
  })
}
</script>

<template>
  <div v-if="weather" class="card animate-fade-in">
    <div class="flex justify-between items-start mb-4">
      <div>
        <h2 class="text-3xl font-bold text-white">
          {{ weather.name }}
          <span class="text-lg text-white/70 ml-2">{{ weather.sys.country }}</span>
        </h2>
        <p class="text-sm text-white/70 mt-1">
          {{ formatDate(weather.dt) }}
        </p>
      </div>
      <button
        @click="toggleFavorite"
        class="p-2 rounded-full hover:bg-white/20 transition-colors"
        :title="isFavorite ? 'Retirer des favoris' : 'Ajouter aux favoris'"
      >
        <Icon
          icon="lucide:heart"
          width="24"
          :class="isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'"
        />
      </button>
    </div>

    <div class="flex items-center justify-between mb-6">
      <div class="flex items-center gap-4 p-2"> 
        <img
          :src="getWeatherIconUrl(weather.weather[0].icon)"
          :alt="weather.weather[0].description"
          class="w-24 h-24"
        />
        <div>
          <p class="text-6xl font-bold text-white">
            {{ Math.round(weather.main.temp) }}°C
          </p>
          <p class="text-lg text-white/80 capitalize mt-1">
            {{ weather.weather[0].description }}
          </p>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-white/20">
      <div class="flex items-center gap-2">
        <Icon icon="lucide:thermometer" width="20" class="text-orange-200" />
        <div>
          <p class="text-xs text-white/60">Ressenti</p>
          <p class="font-semibold">{{ Math.round(weather.main.feels_like) }}°C</p>
        </div>
      </div>

      <div class="flex items-center gap-2">
        <Icon icon="lucide:droplets" width="20" class="text-orange-200" />
        <div>
          <p class="text-xs text-white/60">Humidité</p>
          <p class="font-semibold">{{ weather.main.humidity }}%</p>
        </div>
      </div>

      <div class="flex items-center gap-2">
        <Icon icon="lucide:wind" width="20" class="text-orange-200" />
        <div>
          <p class="text-xs text-white/60">Vent</p>
          <p class="font-semibold">{{ Math.round(weather.wind.speed * 3.6) }} km/h</p>
        </div>
      </div>

      <div class="flex items-center gap-2">
        <Icon icon="lucide:gauge" width="20" class="text-orange-200" />
        <div>
          <p class="text-xs text-white/60">Pression</p>
          <p class="font-semibold">{{ weather.main.pressure }} hPa</p>
        </div>
      </div>
    </div>

    <div class="flex justify-around mt-4 pt-4 border-t border-white/20">
      <div class="flex items-center gap-2">
        <Icon icon="lucide:sunrise" width="20" class="text-orange-200" />
        <div>
          <p class="text-xs text-white/60">Lever</p>
          <p class="font-semibold">{{ formatTime(weather.sys.sunrise) }}</p>
        </div>
      </div>

      <div class="flex items-center gap-2">
        <Icon icon="lucide:sunset" width="20" class="text-orange-200" />
        <div>
          <p class="text-xs text-white/60">Coucher</p>
          <p class="font-semibold">{{ formatTime(weather.sys.sunset) }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

