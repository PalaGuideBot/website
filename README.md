# PalaGuideBot : Website

Ce projet est la version web du bot Discord **PalaGuideBot** accessible sur https://palaguidebot.fr.

L'application permet d'avoir plusieurs statistiques et outils pour le serveur Paladium (version Java). On des statistiques joueurs, faction, les classements et l'état des serveurs. On a aussi des outils : Clicker, POG Calculator, Job Calculator.

> Note : L'API de Paladium (l'interface qui nous permet de récupérer les informations en jeu) n'est plus disponible. Il faut prendre en compte qu'il y a plusieurs fonctionnalités obselètes.

## Pré-requis

- Avoir Node.js `>=24`
- Avoir accès à [PalaGuideBot : Api](https://github.com/PalaGuideBot/api-adonis)
- Avoir une [application Discord](https://discord.com/developers/applications) pour l'authentification

## Stack technique

- [AdonisJS](https://docs.adonisjs.com/)
- [React](https://react.dev/)
- [InertiaJS](https://inertiajs.com/)
- [TailwindCSS + shadcn/ui](https://ui.shadcn.com/)

## Instructions pour lancer en mode dev

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

4. Remplir le .env

```bash
# API_URL: L'url vers l'api de PalaGuideBot
# API_KEY: Une clé pour s'authentifier à l'api de PalaGuideBot
# DISCORD_CLIENT_ID: Fournit lors de la création d'une application Discord
# DISCORD_CLIENT_SECRET: Fournit lors de la création d'une application Discord
```

Les autres valeurs sont relatives à AdonisJS, [voir doc.](https://docs.adonisjs.com/configuration)

5. Lancer l'application

```sh
npm run dev
```

Pour y accèder rendez-vous http://localhost:3333

## Pages réservées au staff

Il existe une partie dédié au staff accessible sur `/staff`

Pour y accéder il faut d'abord se connecter sur le website et rajouter le rôle `STAFF` à votre compte sur l'API ([voir le repo](https://github.com/PalaGuideBot/api-adonis)).

Une fois le rôle ajouté, reconnectez-vous pour y accéder.
