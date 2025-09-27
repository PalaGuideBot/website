# Architecture du Projet PalaGuideBot

## Vue d'ensemble de l'architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        PALAGUIDEBOT ECOSYSTEM                   │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐         │
│  │   Discord   │    │   Website   │    │  API Server │         │
│  │     Bot     │◄──►│   (React)   │◄──►│  (AdonisJS) │         │
│  └─────────────┘    └─────────────┘    └─────────────┘         │
│                             │                   │               │
│                             ▼                   ▼               │
│                    ┌─────────────┐    ┌─────────────┐           │
│                    │  Image Gen  │    │  Database   │           │
│                    │  (HonoJS)   │    │ (MongoDB)   │           │
│                    └─────────────┘    └─────────────┘           │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## Stack Technique

### Frontend (Client-Side)
```
React 19
├── Inertia.js (SSR)
├── TailwindCSS 4
├── Radix UI
├── TypeScript
├── Zustand (State)
├── React Three Fiber (3D)
└── Recharts (Graphiques)
```

### Backend (Server-Side)
```
AdonisJS 6
├── TypeScript
├── Inertia.js (SSR)
├── BentoCache
├── OAuth (Discord)
├── MongoDB Driver
└── Sharp (Images)
```

### Infrastructure
```
Docker
├── Portainer (Gestion)
├── Umami (Analytics)
├── GitHub (CI/CD)
└── MongoDB (Base de données)
```

## Architecture des Modules

### Structure des Contrôleurs
```
app/controllers/
├── page_controller.ts          # Pages statiques
├── auth_controller.ts          # Authentification
├── stats/
│   ├── player_controller.ts    # Statistiques joueurs
│   └── faction_controller.ts   # Statistiques factions
├── leaderboard/
│   ├── money_controller.ts     # Classement argent
│   ├── clicker_controller.ts   # Classement clicker
│   └── jobs_controller.ts      # Classement métiers
├── tools/
│   ├── clicker_controller.ts   # Outil clicker
│   ├── job_calculator_controller.ts
│   └── pog_calculator_controller.ts
└── staff/
    ├── dashboard_controller.ts # Panel admin
    ├── giveaway_controller.ts  # Gestion giveaways
    └── user_controller.ts      # Gestion utilisateurs
```

### Structure des Pages React
```
inertia/pages/
├── home.tsx                    # Page d'accueil
├── auth/                       # Authentification
├── stats/
│   ├── player.tsx             # Profil joueur
│   └── faction.tsx            # Page faction
├── leaderboard/
│   ├── index.tsx              # Hub classements
│   ├── money.tsx              # Classement argent
│   └── clicker.tsx            # Classement clicker
├── tools/
│   ├── index.tsx              # Hub outils
│   ├── clicker.tsx            # Calculateur clicker
│   └── job-calculator.tsx     # Calculateur métiers
└── staff/                     # Interface admin
    ├── dashboard.tsx          # Tableau de bord
    └── giveaways.tsx          # Gestion giveaways
```

## Flux de Données

### Authentification
1. **Login Discord** → OAuth2 → Session AdonisJS
2. **Middleware Auth** → Vérification session → Accès ressources
3. **Role-based Access** → Staff middleware → Panel admin

### Données Statistiques
1. **API Paladium** → Cache BentoCache → Controllers
2. **Real-time Updates** → WebSocket Transmit → Frontend
3. **Image Generation** → HonoJS → CDN → Partage social

### Gestion d'État
```
Frontend State Management:
├── Zustand Stores
│   ├── AuthStore (utilisateur connecté)
│   ├── StatsStore (données en cache)
│   └── UIStore (état interface)
└── React Query (optionnel)
    ├── API calls caching
    └── Background updates
```

## Sécurité

### Authentification & Autorisation
- **OAuth2 Discord** pour l'authentification
- **Sessions sécurisées** avec AdonisJS
- **Middleware d'autorisation** pour les routes protégées
- **CORS configuré** pour les appels API

### Protection des Données
- **Validation des entrées** avec VineJS
- **Sanitization** des données utilisateur
- **Rate limiting** sur les API calls
- **CSRF protection** intégré

## Performance

### Optimisations Frontend
- **Server-Side Rendering** avec Inertia.js
- **Code splitting** automatique avec Vite
- **Lazy loading** des composants
- **Image optimization** avec Sharp

### Optimisations Backend
- **Caching multi-niveau** avec BentoCache
- **Connection pooling** MongoDB
- **Background jobs** pour tâches lourdes
- **CDN** pour les assets statiques

## Déploiement

### Environnements
```
Development:
├── npm run dev (HMR activé)
├── Base de données locale
└── API de développement

Production:
├── Docker containers
├── Reverse proxy (Nginx)
├── Base de données MongoDB
└── API de production
```

### CI/CD Pipeline
1. **Push GitHub** → Tests automatiques
2. **Build Docker image** → Registry
3. **Deploy Portainer** → Mise en production
4. **Health checks** → Monitoring

Cette architecture modulaire permet une scalabilité et une maintenabilité optimales du projet PalaGuideBot.