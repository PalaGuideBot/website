# PalaGuideBot Website

Un écosystème web complet pour les joueurs du serveur Minecraft Paladium, offrant des statistiques, des outils de calcul et des fonctionnalités communautaires.

## 🚀 Technologies

- **Backend**: AdonisJS 6 + TypeScript
- **Frontend**: React 19 + Inertia.js (SSR)
- **Styling**: TailwindCSS 4
- **UI**: Radix UI + composants personnalisés
- **Base de données**: MongoDB
- **Conteneurisation**: Docker

## ✨ Fonctionnalités

- 📊 **Statistiques de joueurs et factions** en temps réel
- 🏆 **Classements multiples** (argent, trixium, clicker, jobs, etc.)
- 🛠️ **Outils de calcul** (métiers, clicker, pioche)
- 🎁 **Système de giveaways** intégré
- 👥 **Dashboard staff** pour l'administration
- 🔗 **Intégration Discord** complète

## 📋 Pré-requis

- Node.js `>=20.6`
- npm ou un gestionnaire de paquets équivalent

## 🛠️ Installation

1. **Installer les dépendances**
```sh
npm install
```

2. **Configurer l'environnement**
```sh
cp .env.example .env
node ace generate:key
```

3. **Renseigner les variables d'environnement** dans `.env`:
   - `API_URL` - URL de l'API Paladium
   - `API_KEY` - Clé d'API pour l'authentification
   - Credentials Discord pour l'OAuth

4. **Lancer le serveur de développement**
```sh
npm run dev
```

## 📜 Scripts disponibles

```sh
npm run dev      # Serveur de développement avec HMR
npm run build    # Build de production
npm run start    # Serveur de production
npm test         # Exécuter les tests
npm run lint     # Linter le code
npm run format   # Formater le code
```

## 📖 Documentation

Pour une documentation complète du projet, consultez [PROJECT_DESCRIPTION.md](./PROJECT_DESCRIPTION.md).

## 👥 Équipe

- **TonyKun** - Créateur & Développeur principal
- **Zeluck** - Designer graphique & Communication  
- **Riveur** - Développeur web

## 📊 Impact

- 700+ serveurs Discord utilisant le bot
- 9 000+ utilisateurs uniques sur le site
- 50 000+ interactions enregistrées