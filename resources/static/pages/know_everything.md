# Tout savoir sur PalaGuideBot

Cet article a pour but d'être le plus transparent possible afin que chacun puisse savoir comment fonctionne PalaGuideBot.

## Histoire

PalaGuideBot a été créé par Tonykun le **8 décembre 2023** afin d'offrir un service aux joueurs de Paladium. Il permet à tous les joueurs de calculer la manière la plus optimisée d'augmenter leurs métiers et d'évaluer le nombre d'XP nécessaire pour passer un niveau, une fonctionnalité qui, jusque-là, était uniquement disponible via des fichiers Excel créés par la communauté à chaque saison.

Au fil du temps, de nouvelles commandes ont été ajoutées. Zeluck a rejoint l'équipe le **19 janvier 2024** en tant que graphiste, avec pour mission de refondre la direction artistique du bot. Un mois plus tard, une version remaniée du bot a été déployée.

À ce moment-là, PalaGuideBot avait dépassé la barre des **100 serveurs** et enregistré plus de **3 000 commandes exécutées**.

Le **29 mars 2024**, le bot est sorti avec les commandes que nous connaissons tous aujourd'hui, comme **/lookup** et **/faction**. Cette mise à jour a démocratisé l'utilisation de l'API publique, jusqu'alors méconnue des joueurs.

Dès le lendemain, le nombre d'interactions avec le bot a explosé, atteignant un record de **plus de 1 000 interactions en une seule journée**.

![image](https://media.discordapp.net/attachments/1186865921000747102/1338611156558020658/image.png?ex=67abb649&is=67aa64c9&hm=4118c32a70dbfa1f19fef69ee50d7e66eae89906921e352399d0600d2dd629c1&=&format=webp&quality=lossless)

Le **12 avril 2024**, le bot a franchi une nouvelle grande étape avec **400 serveurs** et presque **50 000 interactions**.

Le **24 mai 2024**, Riveur a rejoint PalaGuideBot en tant que développeur web, s'investissant pleinement dans le projet. Grâce à Riveur, les premiers leaks du site web sont sortis le **21 mai 2024**. Le **15 juin 2024**, la première version du site est sortie avec comme fonctionnalité principale la construction d'historiques sur les joueurs ainsi que sur les classements disponibles.

Lors de la fermeture de la V9.5 de Paladium en juin 2024, le bot comptait **700 serveurs** et plus de **9 000 joueurs uniques** sur le site web.

Depuis la sortie de la V10, PalaGuideBot continue d'innover en proposant divers ajouts, toujours avec un design soigné et une codebase propre. L'expérience utilisateur et les retours des joueurs utilisant PalaGuideBot sont une priorité pour l'équipe.

### Motivations

Les motivations initiales de TonyKun lors de la sortie de PalaGuideBot étaient d'offrir au grand public la possibilité de calculer son XP plus simplement qu'avec un tableau Excel. Au fur et à mesure, la principale motivation est devenue de satisfaire les joueurs de Paladium en offrant des services pratiques et utiles. PalaGuideBot existe maintenant depuis plus d'un an, et la motivation reste la même pour l'équipe, malgré des baisses de motivation en fin de saison lorsqu'il y a moins de joueurs sur le serveur.

## Les Membres

L'équipe de PalaGuideBot compte 3 membres principaux :

- **TonyKun** (*Créateur*)
  - **Rejoint le :** 08/12/23
  - **Étude/Travail :** Étudiant en développement
  - **S'occupe de :** Bot, Website, API, Image, SysAdmin, ...

- **Zeluck** (*Graphiste, Communication*)
  - **Rejoint le :** 31/01/2024
  - **Étude/Travail :** Étudiant en maintenance
  - **S'occupe de :** Minecraft, *les choses simples*

- **Riveur** (*Développeur TypeScript*)
  - **Rejoint le :** 24/05/24
  - **Étude/Travail :**
  - **S'occupe de :** Website, API, Image, ...

### Il y a aussi 2 contributeurs externes au staff de PalaGuideBot qui ont apporté leur touche au projet :

- **Razi** (*Développeur Java*)
  - **Dernière contribution :** 16/09/24
  - **Réalisation :** Développement d'un easter egg pour le serveur Minecraft de link.

- **volcane'eau** (*Développeur TypeScript*)
  - **Dernière contribution :** 21/10/24
  - **Réalisation :**
    - Début du développement des badges sur le profil.
    - Suggestion / Bug Report
    - Conseils

### Parcours

## Organisation

### Choix Des Implémentations

## Développement

### Les Technologies

### Infrastructure

PalaGuideBot doit gérer six services :
- Website
- Bot
- API
- Image
- Serveur Minecraft
- Bot Support

PalaGuideBot utilise un VPS sous Debian 11, gracieusement fourni par NVH Cloud, et bénéficie de leur protection contre les attaques DDoS. Tous les services fonctionnent sur Docker.

## Suggestions / Bug Report

## Remerciements






Si vous faites ca sur votre temps libre ou sinon avez d'autres projets qui vous prends du temps (en rapport à paladium ou pas) ---> Organisation
Si vous êtes bénévoles
Combien de temps / semaine sur le projet ---> Organisation