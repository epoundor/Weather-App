<script setup lang="ts">
import { ref, computed } from "vue";
import { Icon } from "@iconify/vue";
import { useWeatherStore } from "@/stores/weatherStore";

const weatherStore = useWeatherStore();
const searchQuery = ref("");
const showSuggestions = ref(false);

const loading = computed(() => weatherStore.loading);
const searchHistory = computed(() => weatherStore.searchHistory);

async function handleSearch() {
  if (!searchQuery.value.trim()) return;

  showSuggestions.value = false;
  await weatherStore.searchWeather(searchQuery.value);
}

function selectSuggestion(cityName: string) {
  searchQuery.value = cityName;
  showSuggestions.value = false;
  handleSearch();
}

function handleFocus() {
  if (searchHistory.value.length > 0) {
    showSuggestions.value = true;
  }
}

function handleBlur() {
  setTimeout(() => {
    showSuggestions.value = false;
  }, 200);
}
</script>

<template>
  <div class="weather-search">
    <form @submit.prevent="handleSearch" class="flex gap-2">
      <div class="flex-1 relative">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Rechercher une ville..."
          class="input-field pr-10"
          :disabled="loading"
          @blur="handleBlur"
          @focus="handleFocus"
        />
        <Icon
          icon="lucide:search"
          class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
          width="20"
        />
        <div v-if="showSuggestions && searchHistory.length > 0 && !loading && !searchQuery.trim()" class="mt-2">
          <div
            class="bg-white rounded-lg shadow-md p-2 max-h-48 overflow-y-auto absolute z-50 w-full"
          >
            <p class="text-xs text-gray-500 px-2 py-1 font-semibold">
              Recherches récentes
            </p>
            <button
              v-for="item in searchHistory"
              :key="item.timestamp"
              @click="selectSuggestion(item.cityName)"
              class="w-full text-left px-3 py-2 hover:bg-gray-100 rounded flex items-center gap-2 transition-colors"
            >
              <Icon icon="lucide:clock" width="14" class="text-gray-400" />
              <span class="text-sm">{{ item.cityName }}</span>
            </button>
          </div>
        </div>
      </div>
      <button
        type="submit"
        class="btn-primary flex items-center gap-2"
        :disabled="loading || !searchQuery.trim()"
      >
        <Icon v-if="!loading" icon="lucide:cloud-sun" width="20" />
        <Icon v-else icon="lucide:loader-2" width="20" class="animate-spin" />
        Rechercher
      </button>
    </form>
  </div>
</template>
