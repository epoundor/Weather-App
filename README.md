# WeatherApp 🌤️

Application météo moderne et interactive développée avec Vue.js 3, permettant de rechercher la météo en temps réel, gérer des villes favorites et visualiser des statistiques météorologiques.

![Vue.js](https://img.shields.io/badge/Vue.js-3.5-4FC08D?style=flat&logo=vue.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178C6?style=flat&logo=typescript)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38B2AC?style=flat&logo=tailwind-css)

## Table des matières

- [Fonctionnalités](#fonctionnalités)
- [Technologies utilisées](#technologies-utilisées)
- [Prérequis](#prérequis)
- [Installation](#installation)
- [Configuration](#configuration)
- [Utilisation](#utilisation)
- [Structure du projet](#structure-du-projet)
- [API OpenWeather](#api-openweather)

## Fonctionnalités

### Recherche météo

- Recherche de la météo actuelle par nom de ville
- Affichage détaillé des conditions météorologiques :
  - Température actuelle et ressentie
  - Description des conditions (ciel clair, nuageux, pluie, etc.)
  - Humidité, vitesse du vent, pression atmosphérique
  - Heures de lever et coucher du soleil
- Gestion des erreurs (ville non trouvée, problème réseau)
- Historique de recherche avec suggestions

### Gestion des favoris

- Ajout/suppression de villes favorites
- Persistance des données dans localStorage
- Affichage rapide de la météo des favoris
- Rafraîchissement automatique des données

### ashboard statistiques

- Nombre total de villes favorites
- Température moyenne des favoris
- Historique des recherches récentes
- Graphique interactif (Chart.js) des conditions météo
- Vue d'ensemble de tous les favoris


## Technologies utilisées

### Frontend

- **Vue.js 3.5** - Framework JavaScript progressif avec Composition API
- **TypeScript** - Typage statique pour un code plus robuste
- **Vue Router** - Navigation entre les pages
- **Pinia** - Gestion d'état moderne pour Vue.js

### Styling

- **TailwindCSS** - Framework CSS utility-first

### API & Data

- **Axios** - Client HTTP pour les requêtes API
- **OpenWeather API** - Données météorologiques en temps réel
- **localStorage** - Persistance des favoris et historique

### Visualisation

- **Chart.js** - Graphiques interactifs
- **Iconify Vue** - Icônes modernes

### Build & Dev

- **Vite** - Build tool ultra-rapide
- **Vue DevTools** - Outils de développement

## Prérequis

- **Node.js** >= 22.x
- **pnpm** (recommandé) ou npm/yarn
- Une clé API OpenWeather (gratuite)

## Installation

### 1. Cloner le dépôt

```bash
git clone https://github.com/epoundor/Weather-App.git
cd Weather-App
```

### 2. Installer les dépendances

```bash
pnpm install
# ou
npm install
```

### 3. Configuration de l'API

Créez un fichier `.env` à la racine du projet :

```bash
cp .env.example .env
```

Éditez le fichier `.env` et ajoutez votre clé API OpenWeather :

```env
VITE_OPENWEATHER_API_KEY=votre_clé_api_ici
VITE_OPENWEATHER_BASE_URL=https://api.openweathermap.org/data/2.5
```

## Configuration

### Obtenir une clé API OpenWeather

1. Créez un compte sur [OpenWeather](https://openweathermap.org/api)
2. Allez dans votre profil → API Keys
3. Copiez votre clé API
4. Collez-la dans le fichier `.env`

**Note** : La clé API peut prendre quelques heures pour être activée après la création du compte.

## Utilisation

### Développement

Lancez le serveur de développement :

```bash
pnpm dev
```

L'application sera accessible sur `http://localhost:5173`

### Build de production

Compilez l'application pour la production :

```bash
pnpm build
```


## Structure du projet

```
Weather App/
├── env.d.ts
├── index.html
├── netlify.toml
├── package.json
├── pnpm-lock.yaml
├── public
│   └── favicon.ico
├── README.md
├── src
│   ├── App.vue
│   ├── components
│   │   ├── FavoritesList.vue
│   │   ├── WeatherCard.vue
│   │   ├── WeatherDashboard.vue
│   │   └── WeatherSearch.vue
│   ├── main.ts
│   ├── router
│   │   └── index.ts
│   ├── services
│   │   ├── localStorage.ts
│   │   └── weatherApi.ts
│   ├── stores
│   │   ├── counter.ts
│   │   └── weatherStore.ts
│   ├── style.css
│   ├── types
│   │   └── weather.ts
│   └── views
│       ├── DashboardView.vue
│       ├── HomeView.vue
│       └── WeatherView.vue
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts

```

## API OpenWeather

### Endpoints utilisés

- **Météo actuelle** : `/weather`
  - Par nom de ville : `?q={city name}`
  - Par ID de ville : `?id={city id}`

### Paramètres

- `units=metric` : Températures en Celsius
- `lang=fr` : Descriptions en français
- `appid={API key}` : Clé d'authentification

### Documentation complète

[OpenWeather API Documentation](https://openweathermap.org/api)

## Contribution

Ce projet a été développé dans le cadre d'un test technique. Les contributions ne sont pas acceptées pour le moment.

## Licence

Ce projet est développé à des fins éducatives et de démonstration.

## Auteur

Développé avec ❤️ par [epoundor](https://github.com/epoundor)

---
