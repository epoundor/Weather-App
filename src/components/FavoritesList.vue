<template>
  <div class="favorites-list">
    <div class="flex justify-between items-center mb-4">
      <h3
        class="text-xl font-bold text-gray-800 flex items-center gap-2 text-white"
      >
        <Icon
          icon="lucide:star"
          width="24"
          class="text-yellow-500 fill-yellow-500"
        />
        Villes favorites
      </h3>
      <span class="text-sm text-gray-100">{{ favorites.length }} ville(s)</span>
    </div>

    <div v-if="favorites.length === 0" class="text-center py-8">
      <Icon
        icon="lucide:map-pin"
        width="48"
        class="mx-auto text-gray-300 mb-3"
      />
      <p class="text-gray-500">Aucune ville favorite</p>
      <p class="text-sm text-gray-400 mt-1">
        Recherchez une ville et ajoutez-la à vos favoris
      </p>
    </div>

    <div v-else class="space-y-3">
      <div
        v-for="favorite in favorites"
        :key="favorite.id"
        class="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-all duration-200 cursor-pointer group"
      >
        <div class="flex justify-between items-start">
          <div @click="loadWeather(favorite.id)" class="flex-1">
            <div class="flex items-center gap-2 mb-2">
              <h4
                class="font-semibold text-gray-800 group-hover:text-sky-600 transition-colors"
              >
                {{ favorite.name }}
              </h4>
              <span class="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                {{ favorite.country }}
              </span>
            </div>

            <div
              v-if="favoritesWeather.has(favorite.id)"
              class="flex items-center gap-3"
            >
              <div class="p-1 bg-gray-200 rounded-full">
                <img
                  :src="getWeatherIconUrl(favoritesWeather.get(favorite.id)!.weather[0].icon)"
                  :alt="favoritesWeather.get(favorite.id)!.weather[0].description"
                  class="w-12 h-12"
                />
              </div>
              <div>
                <p class="text-2xl font-bold text-gray-800">
                  {{
                    Math.round(favoritesWeather.get(favorite.id)!.main.temp)
                  }}°C
                </p>
                <p class="text-xs text-gray-600 capitalize">
                  {{
                    favoritesWeather.get(favorite.id)!.weather[0].description
                  }}
                </p>
              </div>
            </div>

            <p v-else class="text-sm text-gray-400">Chargement...</p>
          </div>

          <button
            @click.stop="removeFavorite(favorite.id)"
            class="p-2 rounded-full hover:bg-red-50 transition-colors group"
            title="Retirer des favoris"
          >
            <Icon
              icon="lucide:trash-2"
              width="18"
              class="text-gray-400 group-hover:text-red-500"
            />
          </button>
        </div>
      </div>
    </div>

    <button
      v-if="favorites.length > 0"
      @click="refreshAll"
      class="w-full mt-4 btn-secondary flex items-center justify-center gap-2"
      :disabled="loading"
    >
      <Icon
        icon="lucide:refresh-cw"
        width="18"
        :class="{ 'animate-spin': loading }"
      />
      Rafraîchir tout
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from "vue";
import { Icon } from "@iconify/vue";
import { useWeatherStore } from "@/stores/weatherStore";
import { getWeatherIconUrl } from "@/services/weatherApi";

const weatherStore = useWeatherStore();
const favorites = computed(() => weatherStore.favorites);
const favoritesWeather = computed(() => weatherStore.favoritesWeather);
const loading = computed(() => weatherStore.loading);

async function loadWeather(cityId: number) {
  await weatherStore.loadFavoriteWeather(cityId);
}

function removeFavorite(cityId: number) {
  weatherStore.removeFromFavorites(cityId);
}

async function refreshAll() {
  await weatherStore.refreshFavoritesWeather();
}

onMounted(() => {
  if (favorites.value.length > 0) {
    weatherStore.refreshFavoritesWeather();
  }
});
</script>
