<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { RouterLink } from "vue-router";
</script>
<template>
  <div class="home-view min-h-screen flex items-center justify-center p-4">
    <div class="max-w-4xl w-full">
      <div class="text-center mb-12 animate-fade-in">
        <div class="flex justify-center mb-6">
          <div class="bg-white rounded-full p-6 shadow-2xl">
            <Icon icon="lucide:cloud-sun" width="80" class="text-orange-200" />
          </div>
        </div>

        <h1 class="text-5xl md:text-6xl font-bold text-white mb-4">
          WeatherApp
        </h1>

        <p class="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
          Découvrez la météo en temps réel de vos villes préférées. Recherchez,
          sauvegardez et suivez les conditions météorologiques partout dans le
          monde.
        </p>

        <div
          class="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <RouterLink
            :to="{ name: 'weather' }"
            class="btn-primary px-8 py-3 text-lg flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all"
          >
            <Icon icon="lucide:search" width="24" />
            Rechercher la météo
          </RouterLink>

          <RouterLink
            :to="{ name: 'dashboard' }"
            class="btn-secondary px-8 py-3 text-lg flex items-center gap-2 shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all"
          >
            <Icon icon="lucide:bar-chart-3" width="24" />
            Voir le tableau de bord
          </RouterLink>
        </div>
      </div>

      <div class="grid md:grid-cols-3 gap-6 mt-16 animate-slide-up">
        <div class="card text-center">
          <div
            class="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4"
          >
            <Icon icon="lucide:search" width="32" class="text-blue-600" />
          </div>
          <h3 class="text-xl font-semibold text-white mb-2">
            Recherche rapide
          </h3>
          <p class="text-white/80">
            Trouvez instantanément la météo de n'importe quelle ville dans le
            monde
          </p>
        </div>

        <div class="card text-center">
          <div
            class="bg-yellow-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4"
          >
            <Icon icon="lucide:star" width="32" class="text-yellow-600" />
          </div>
          <h3 class="text-xl font-semibold text-white mb-2">Favoris</h3>
          <p class="text-white/80">
            Sauvegardez vos villes préférées pour un accès rapide et facile
          </p>
        </div>

        <div class="card text-center">
          <div
            class="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4"
          >
            <Icon icon="lucide:bar-chart-3" width="32" class="text-green-600" />
          </div>
          <h3 class="text-xl font-semibold text-white mb-2">Statistiques</h3>
          <p class="text-white/80">
            Visualisez vos données météo avec des graphiques interactifs
          </p>
        </div>
      </div>

      <div class="mt-16 card">
        <div class="flex items-center gap-4">
          <Icon icon="lucide:info" width="32" class="flex-shrink-0" />
          <div>
            <h3 class="text-xl font-semibold mb-2">Données en temps réel</h3>
            <p class="opacity-90">
              Toutes les informations météorologiques sont fournies par
              OpenWeather API, garantissant des données précises et actualisées.
            </p>
          </div>
        </div>
      </div>
    </div>
</div>

</template>

<style scoped>
.home-view {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  background: radial-gradient(
      circle at 20% 50%,
      rgba(120, 119, 198, 0.3),
      transparent 50%
    ),
    radial-gradient(circle at 80% 80%, rgba(56, 189, 248, 0.3), transparent 50%),
    radial-gradient(circle at 40% 20%, rgba(251, 191, 36, 0.2), transparent 50%);
}
</style>
