# PalaGuideBot

Ce projet utilise AdonisJS 6 + Inertia (SSR) + React

## Pré-requis

- Avoir Node.js `>=20.6`

## Installation

1. Installer les dépendances JavaScript
```sh
npm install
```

2. Copier le fichier d'environnement
```sh
cp .env.example .env
```

3. Générer une nouvelle `APP_KEY`
```sh
node ace generate:key
```

4. Renseigner les valeurs pour `API_URL` et `API_KEY` dans le fichier `.env`

5. Lancer le serveur
```sh
npm run dev
```