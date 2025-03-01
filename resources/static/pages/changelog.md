# Changelog

## 01/03/2025

### Website

- Ajout d'une nouvelle page de classement pour l'alignement : `/leaderboard/alignment`
- Ajout d'une nouvelle page de classement pour les métiers : `/leaderboard/jobs`
- Ajout des nouveaux grades disponibles sur Paladium
- Correction de l'expérience obtenue par une **Kiwano Seed** sur l'outil : `/tools/job-calculator`
- Correction du bonus d'XP maximum sur l'outil : `/tools/job-calculator`
- Retrait du Paladium Wrapped

### Bot

- Ajout des nouveaux grades disponibles sur Paladium  
- Suppression des classements Chorus et End dans les commandes `/leaderboard global` & `/leaderboard player`  


## 16/02/2025

### Website

- Ajout du Wrapped de la saison
- Correction de la page /status/paladium
- Ajout d'un article sur PalaGuideBot et son histoire [Temporaire]

## 09/01/2025

### Website

- Restauration des couleurs du site
- Ajout d'un système de **Giveaway**

### Bot

- Retrait des codes couleurs Minecraft sur les items de la commande `/ah player`

## 27/12/2024

### Website

- Ajout de la page passerelle `/tools` pour les outils
- Correction sur l'affichage des erreurs de validation sur l'outil POG Calculator
- Ajout d'une bannière indicant l'indisponibilité des données de classements (Faction et Trixium)
- Ajout du Market pour un joueur sur la page `/players`

## 10/12/2024

### Website

- Refonte de l'outil POG Calculator [En Bêta]
- Correction de l'erreur lorsqu'une page est introuvable

## 01/12/2024

### Website

- Ajout de l'outil POG Calculator
- Ajout de flocons sur la page d'accueil (Noël)
- Modification des couleurs du site pour le mois de décembre (Noël)

### Bot

- Modification de la commande `/pog` pour obtenir le lien vers le site web

## 29/11/2024

### Website

- Modification du lien **En savoir plus** sur la page d'accueil
- Ajout de l'alliance dans les informations d'une faction

### Bot

- Correction de l'URL vers la version Web du Job Calculator

## 18/11/2024

### Website

- Modification de l'information "XP" par le niveau de la monture sur la page `/players`
- Ajout de l'XP actuelle sur l'outil Job Calculator

### Bot

- Ajout de l'alliance sur la commande `/faction`

## 12/11/2024

### Website

- Ajout des animations de familiers et montures sur la page `/players`

### Bot

- Correction d'un bug avec la commande `/faction`

## 08/11/2024

### Website

- Ajout de l'outil Job Calculator
- Modification de l'informations "Nombre de skills" par le niveau du pet sur la page `/players`
- Correction d'un bug sur la page `/factions` (les membres ne s'actualisent pas lors du changement de faction)

### Bot

- Ajout des récompenses sur la commande `/calculator`.

## 03/11/2024

### Website

- Ajout d'un badge "Bug Hunter"
- Modification des icônes (Contributor & Link) sur `/players`
- Modification du nom de la redirection vers les statuts de nos services (Bot > Services)
- Modification de la page `/factions` pour afficher la faction du joueur (uniquement pour les personnes connectées et liées sur le site)

### Bot

- Ajout d'un footer indiquant le badge du joueur sur le site web avec la commande `/lookup`
- Modification du système de gestion des emojis
- Correction de l'envoi d'embed vide avec la commande `/ah player`
- Correction de la commande `/faction` qui ne répondait pas
- Amélioration de la gestion des erreurs envoyées par les différentes API (Mojang, Paladium, Palaguidebot)

## 31/10/2024

### Website

- Ajout d'un outil interne d'analytics sur notre site web
- Correction du débordement de l'écran (pour les mobiles) sur la page `/events`

## 27/10/2024

### Website

- Modification interne du système d'authentification.
- Ajout de badge sur `/players`.

## 20/10/2024

### Website

- Modification de la navbar.
- Modification des images de présentation sur la page d'accueil.
- Correction de la période par défaut `/players`.

### Bot

- Correction de la possibilité de mettre le current XP supérieur à celui possible avec la commande `/calculator`.
- Correction de la couleur des bonbons Miner et Farmer avec la commande `/calculator`.

## 16/10/2024

### Website

- Ajout d'un bouton permettant de sélectionner la saison ou la période sur les pages `/players` et `/leaderboard`.
- Modification de la fréquence de mise à jour du `/status/paladium` de 10 minutes à 5 minutes.
- Modification des informations de confidentialité (privacy).

### Bot

- Ajout de la fonctionnalité permettant d'utiliser le bot partout (User-Installable).
- Correction des calculs avec la commande `/calculator`.
- Correction des calculs avec la commande `/reverse-calculator`.

## 04/10/2024

### Website

- Ajout de l'outil clicker
- Modification de la navbar pour remonter la catégorie "Autre"
- Correction de l'affichage des achievements lorsqu'ils sont masqués par le joueur `/players`

### Bot

- Refonte du design de la commande `/carte`

## 27/09/2024

### Website

- Mise à jour de compatibilité avec la v10 de Paladium
- Ajout d'une nouvelle page `/events` pour les évènements sur Paladium
- Ajout d'une nouvelle page `/faq` pour les questions fréquemment posées

### Bot

- Migration du bot vers TypeScript.
- Refonte de la plupart des commandes (version non définitive).

## 08/09/2024

### Website

- Ajout du clicker sur la page `/players`

## 04/09/2024

### Website

- Modification de la page `/changelogs` en `/changelog`

## 27/08/2024

### Website

- Correction lors du premier chargement des données d'un joueur
- Correction du déplacement sur le rendu 3D des familiers et montures sur `/players`
- Modification de la page `/stats/users` en `/players`
- Modification de la page `/stats/factions` en `/factions`
- Suppresion de la page `/stats` (page de passerelle)
- Ajout du rang de faction au niveau des informations d'un joueur
- Redirection vers la page du joueur lié à votre compte sur la page `/players` (pour les utilisateurs liés)

### Other

- Ajout d'un rich presence Lunar Client personnalisé (Suggestions : "**Statut Lunar Client**")

## 25/08/2024

### Website

- Ajout des familiers et des montures sur (`/stats/users`).

## 21/08/2024

### Website

- Liaison de notre API avec celle de Paladium en utilisant leur nouveau système d'authentification.
- Ajout des rangs manquants à la liste des rangs indexés (`/stats/users`).
- Mise en place d'un système de filtre pour les membres des factions (`/stats/factions`).

### Bot

- Liaison du bot avec l'API de Paladium en utilisant leur nouveau système d'authentification.

## 10/08/2024

### Website

- Augmentation de la durée de la session une fois connecté

## 09/08/2024

### Website

- Ajout de la liste d'amis sur la page de statistiques utilisateur (`/stats/users`)
- Refonte du podium sur les pages de classements
- Amélioration du responsive sur la page de statistiques utilisateur (`/stats/users`)

## 07/08/2024

### Website

- Ajout d'une explication sur la façon de lier son compte Minecraft
- Suppression de la récupération du mail lors de la connexion via Discord

## 06/08/2024

### Website

- Refonte complète de l'API
- Changement des images de présentation du bot
- Correction des métiers en mode blanc
- Correction de bugs divers
- Ajout d'un système de login via Discord
- Ajout d'un dashboard pour de futurs ajouts
- Ajout d'un système de lien entre son compte Minecraft et Discord
- Ajout de divers Easter Eggs
- Ajout de meta tags (Suggestions : "**Ajouter plus de metadata dans le head**")

### Bot

- Changement de la bannière sous les commandes

## 11/07/2024

### Website

- Traduction de `Leaderboard` en `Classement` (Suggestion)

## 06/07/2024

### Website

- Traductions de mots anglais en français
- Amélioration de l'UI des liens sur les pages `/stats`, `/leaderboard` & `/informations` (Suggestions: "**Page de chemin**" #2)
- Ajout des unités de valeur & d'icônes sur les podiums de classements (Suggestions: "**Classement, grandeur de la quantité**")
- Ajout d'une comparaison par rapport au premier sur les podiums (Suggestions: "**Podium, % par rapport au premier**")

## 29/06/2024

### Website

- Amélioration de l'accesibilité sur l'ensemble des pages

## 24/06/2024

### Website

- Optimisation de page `/status/paladium` & `/leaderboard/trixium`

## 23/06/2024

### Website

- Ajout des pages `/stats`, `/leaderboard`, `/informations` qui servent de passerelle pour les différentes 
catégories (Suggestions: "**Page de chemin**")
- Ajout d'une redirection de la page `/status` vers `/status/paladium` (Suggestions: "**Page de chemin**")

## 21/06/2024

### Website

- Affichage de badges dans le changelog pour différencier les changements des différents services.

## 20/06/2024

### Website

- Ajout des embeds sur toutes les pages

### Bot

- Refonte complète de la structuration
- Suppression des commandes inutiles
- Fix de la liste des "amis" sur la commande `/lookup`
- Fix des noms de faction dans la commande `/leaderboard global trixium`
- Commande `/agenda` du bot reliée directement à l'API de Paladium (en attente d'un patch avant de UP)

## 18/06/2024

### Website

  - Fix du scroll pour la navigation mobile
  - Lien rapide sur les sections des pages `stats/users` & `stats/factions` (Suggestions: "**Lien rapide**")
  - Affichage des grandes valeurs au hover sur les podiums (Suggestions: "**Affichage des grands nombres**")
  - Ajout de lien rapide sur les graphiques de leaderboard
  - Fix des boutons sur la page `status/paladium`, qui n'affiche pas le tooltip au hover (sur mobile)
  - Refactorisation de l'API, restructuration complète de l'API pour la rendre plus stable et plus rapide.
