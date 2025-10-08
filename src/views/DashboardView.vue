<script setup lang="ts">
import { RouterLink } from "vue-router";
import { Icon } from "@iconify/vue";
import WeatherDashboard from "@/components/WeatherDashboard.vue";
</script>

<template>
  <div class="dashboard-view min-h-screen p-4 md:p-8">
    <div class="max-w-7xl mx-auto">
      <header class="mb-8">
        <div class="flex items-center justify-between mb-6">
          <RouterLink
            to="/"
            class="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
          >
            <Icon icon="lucide:arrow-left" width="24" />
            <span class="font-semibold">Retour</span>
          </RouterLink>

          <RouterLink to="/weather" class="btn-primary flex items-center gap-2">
            <Icon icon="lucide:search" width="20" />
            Rechercher
          </RouterLink>
        </div>

        <h1 class="text-4xl font-bold text-white mb-2 flex items-center gap-3">
          <Icon icon="lucide:bar-chart-3" width="40" class="text-orange-200" />
          Tableau de bord
        </h1>
        <p class="text-white/80">
          Vue d'ensemble de vos données météorologiques
        </p>
      </header>

      <WeatherDashboard />
    </div>
  </div>
</template>
