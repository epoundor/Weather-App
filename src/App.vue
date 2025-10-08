<template>
  <div id="app" class="min-h-dvh">
    <RouterView />
  </div>
  <footer>
    <!-- Credits au designer -->
    <p class="text-center text-white mt-6 bg-transparent">Design inspired by <a href="https://dribbble.com/shots/21413102-Weather-App">Dulanjali Senarathna</a></p>
  </footer>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>
