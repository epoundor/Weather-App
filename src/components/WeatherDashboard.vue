<script setup lang="ts">
import { computed, onMounted, watch, ref, nextTick } from "vue";
import { Icon } from "@iconify/vue";
import { Chart, registerables } from "chart.js";
import { useWeatherStore } from "@/stores/weatherStore";
import { getWeatherIconUrl } from "@/services/weatherApi";

Chart.register(...registerables);

const weatherStore = useWeatherStore();
const weatherChart = ref<HTMLCanvasElement | null>(null);
let chartInstance: Chart | null = null;

const stats = computed(() => weatherStore.stats);
const favoritesWeather = computed(() => weatherStore.favoritesWeather);

function clearHistory() {
  weatherStore.clearHistory();
}

function formatRelativeTime(timestamp: number): string {
  const now = Date.now();
  const diff = now - timestamp;
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 1) return "À l'instant";
  if (minutes < 60) return `Il y a ${minutes} min`;
  if (hours < 24) return `Il y a ${hours}h`;
  return `Il y a ${days}j`;
}

function createWeatherChart() {
  if (!weatherChart.value) return;

  // Détruire le graphique existant
  if (chartInstance) {
    chartInstance.destroy();
  }

  const conditions = stats.value.weatherConditions;
  if (Object.keys(conditions).length === 0) return;

  const ctx = weatherChart.value.getContext("2d");
  if (!ctx) return;

  // Couleurs pour chaque condition météo
  const colorMap: Record<string, string> = {
    Clear: "#FDB813",
    Clouds: "#95A5A6",
    Rain: "#3498DB",
    Drizzle: "#5DADE2",
    Thunderstorm: "#8E44AD",
    Snow: "#ECF0F1",
    Mist: "#BDC3C7",
    Fog: "#7F8C8D",
  };

  const labels = Object.keys(conditions);
  const data = Object.values(conditions);
  const colors = labels.map((label) => colorMap[label] || "#95A5A6");

  chartInstance = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels,
      datasets: [
        {
          data,
          backgroundColor: colors,
          borderWidth: 2,
          borderColor: "#ffffff",
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "bottom",
          labels: {
            padding: 15,
            font: {
              size: 12,
            },
          },
        },
        tooltip: {
          callbacks: {
            label: (context) => {
              const label = context.label || "";
              const value = context.parsed || 0;
              const total = (context.dataset.data as number[]).reduce(
                (a, b) => a + b,
                0
              );
              const percentage = ((value / total) * 100).toFixed(1);
              return `${label}: ${value} (${percentage}%)`;
            },
          },
        },
      },
    },
  });
}

onMounted(() => {
  // Créer le graphique au montage et lors des changements
  nextTick(() => {
    createWeatherChart();
  });
});

watch(
  () => stats.value.weatherConditions,
  () => {
    nextTick(() => {
      createWeatherChart();
    });
  },
  { deep: true }
);
</script>

<template>
  <div class="weather-dashboard space-y-6">
    <h2 class="text-2xl font-bold flex items-center gap-2 text-white">
      <Icon icon="lucide:bar-chart-3" width="28" class="text-orange-200" />
      Tableau de bord météo
    </h2>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div class="card bg-gradient-to-br from-blue-500 to-blue-600 text-white">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm opacity-90">Villes favorites</p>
            <p class="text-4xl font-bold mt-2">{{ stats.totalFavorites }}</p>
          </div>
          <Icon icon="lucide:star" width="48" class="opacity-30" />
        </div>
      </div>

      <div
        class="card bg-gradient-to-br from-orange-500 to-orange-600 text-white"
      >
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm opacity-90">Température moyenne</p>
            <p class="text-4xl font-bold mt-2">
              {{
                stats.averageTemp > 0 ? Math.round(stats.averageTemp) : "--"
              }}°C
            </p>
          </div>
          <Icon icon="lucide:thermometer" width="48" class="opacity-30" />
        </div>
      </div>

      <!-- Recherches récentes -->
      <div
        class="card bg-gradient-to-br from-green-500 to-green-600 text-white"
      >
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm opacity-90">Recherches récentes</p>
            <p class="text-4xl font-bold mt-2">
              {{ stats.recentSearches.length }}
            </p>
          </div>
          <Icon icon="lucide:clock" width="48" class="opacity-30" />
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div class="card">
        <h3
          class="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2"
        >
          <Icon icon="lucide:cloud" width="20" class="text-orange-200" />
          Conditions météo des favoris
        </h3>
        <div
          v-if="Object.keys(stats.weatherConditions).length > 0"
          class="h-64"
        >
          <canvas ref="weatherChart"></canvas>
        </div>
        <div v-else class="h-64 flex items-center justify-center text-gray-400">
          <div class="text-center">
            <Icon
              icon="lucide:cloud-off"
              width="48"
              class="mx-auto mb-2 opacity-50"
            />
            <p>Aucune donnée disponible</p>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="flex justify-between items-center mb-4">
          <h3
            class="text-lg font-semibold text-gray-800 flex items-center gap-2"
          >
            <Icon icon="lucide:history" width="20" class="text-orange-200" />
            Historique de recherche
          </h3>
          <button
            v-if="stats.recentSearches.length > 0"
            @click="clearHistory"
            class="text-sm text-red-500 hover:text-red-600 flex items-center gap-1"
          >
            <Icon icon="lucide:trash-2" width="14" />
            Effacer
          </button>
        </div>

        <div
          v-if="stats.recentSearches.length > 0"
          class="space-y-2 max-h-64 overflow-y-auto"
        >
          <div
            v-for="search in stats.recentSearches"
            :key="search.timestamp"
            class="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div class="flex items-center gap-3">
              <Icon icon="lucide:map-pin" width="16" class="text-gray-400" />
              <span class="font-medium text-gray-700">{{
                search.cityName
              }}</span>
            </div>
            <span class="text-xs text-gray-500">
              {{ formatRelativeTime(search.timestamp) }}
            </span>
          </div>
        </div>
        <div v-else class="h-64 flex items-center justify-center text-gray-400">
          <div class="text-center">
            <Icon
              icon="lucide:search"
              width="48"
              class="mx-auto mb-2 opacity-50"
            />
            <p>Aucune recherche récente</p>
          </div>
        </div>
      </div>
    </div>

    <div v-if="favoritesWeather.size > 0" class="card">
      <h3
        class="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2"
      >
        <Icon icon="lucide:trending-up" width="20" class="text-orange-200" />
        Vue d'ensemble des favoris
      </h3>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div
          v-for="[cityId, weather] of favoritesWeather"
          :key="cityId"
          class="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-4"
        >
          <div class="flex items-center justify-between mb-2">
            <h4 class="font-semibold text-gray-800">{{ weather.name }}</h4>
            <div class="p-1 bg-gray-200 rounded-full">
              <img
                :src="getWeatherIconUrl(weather.weather[0].icon)"
                :alt="weather.weather[0].description"
                class="w-10 h-10"
              />
            </div>
          </div>
          <p class="text-3xl font-bold text-gray-800 mb-1">
            {{ Math.round(weather.main.temp) }}°C
          </p>
          <p class="text-sm text-gray-600 capitalize">
            {{ weather.weather[0].description }}
          </p>
          <div class="flex gap-4 mt-3 text-xs text-gray-500">
            <span class="flex items-center gap-1">
              <Icon icon="lucide:droplets" width="12" />
              {{ weather.main.humidity }}%
            </span>
            <span class="flex items-center gap-1">
              <Icon icon="lucide:wind" width="12" />
              {{ Math.round(weather.wind.speed * 3.6) }} km/h
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
