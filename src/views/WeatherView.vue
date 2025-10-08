<script setup lang="ts">
import { computed } from "vue";
import { RouterLink } from "vue-router";
import { Icon } from "@iconify/vue";
import { useWeatherStore } from "@/stores/weatherStore";
import WeatherSearch from "@/components/WeatherSearch.vue";
import WeatherCard from "@/components/WeatherCard.vue";
import FavoritesList from "@/components/FavoritesList.vue";

const weatherStore = useWeatherStore();

const currentWeather = computed(() => weatherStore.currentWeather);
const loading = computed(() => weatherStore.loading);
const error = computed(() => weatherStore.error);

function clearError() {
  weatherStore.clearError();
}
</script>

<template>
  <div class="weather-view min-h-screen p-4 md:p-8">
    <div class="max-w-7xl mx-auto">
      <header class="mb-8">
        <div class="flex items-center justify-between mb-6">
          <RouterLink
            :to="{ name: 'home' }"
            class="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
          >
            <Icon icon="lucide:arrow-left" width="24" />
            <span class="font-semibold">Retour</span>
          </RouterLink>

          <RouterLink
            :to="{ name: 'dashboard' }"
            class="btn-secondary flex items-center gap-2"
          >
            <Icon icon="lucide:bar-chart-3" width="20" />
            Dashboard
          </RouterLink>
        </div>

        <h1 class="text-4xl font-bold text-white mb-2 flex items-center gap-3">
          <Icon icon="lucide:cloud-sun" width="40" class="text-orange-200" />
          Recherche météo
        </h1>
        <p class="text-white/80">
          Recherchez la météo actuelle de n'importe quelle ville
        </p>
      </header>

      <div class="mb-8">
        <WeatherSearch />
      </div>

      <div v-if="error" class="mb-6 animate-fade-in">
        <div
          class="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3"
        >
          <Icon
            icon="lucide:alert-circle"
            width="24"
            class="text-red-500 flex-shrink-0 mt-0.5"
          />
          <div class="flex-1">
            <h3 class="font-semibold text-red-800 mb-1">Erreur</h3>
            <p class="text-red-700">{{ error }}</p>
          </div>
          <button
            @click="clearError"
            class="text-red-500 hover:text-red-700 transition-colors"
          >
            <Icon icon="lucide:x" width="20" />
          </button>
        </div>
      </div>

      <div v-if="loading" class="flex justify-center items-center py-12">
        <div class="text-center">
          <Icon
            icon="lucide:loader-2"
            width="48"
            class="animate-spin text-orange-200 mx-auto mb-4"
          />
          <p class="text-white/80">Chargement des données météo...</p>
        </div>
      </div>

      <div v-else class="grid lg:grid-cols-3 gap-6">
        <div class="lg:col-span-2">
          <WeatherCard v-if="currentWeather" :weather="currentWeather" />

          <div v-else class="card text-center py-12">
            <Icon
              icon="lucide:search"
              width="64"
              class="mx-auto text-gray-300 mb-4"
            />
            <h3 class="text-xl font-semibold text-white mb-2">
              Recherchez une ville
            </h3>
            <p class="text-white/70">
              Entrez le nom d'une ville dans la barre de recherche pour voir sa
              météo
            </p>
          </div>
        </div>

        <div class="lg:col-span-1">
          <FavoritesList />
        </div>
      </div>
    </div>
  </div>
</template>
