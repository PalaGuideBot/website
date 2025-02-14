# Tout savoir sur PalaGuideBot

Cet article vise à être le plus transparent possible afin que chacun puisse comprendre le fonctionnement de PalaGuideBot.

---

## Histoire

PalaGuideBot a été créé par **TonyKun** le **8 décembre 2023** pour offrir un service aux joueurs de **Paladium**. Il permet de calculer de manière optimisée la progression des métiers et d’évaluer l’XP nécessaire pour passer un niveau, une fonctionnalité qui, jusqu’alors, n’était disponible qu’au travers de fichiers Excel créés par la communauté à chaque saison.

Au fil du temps, de nouvelles commandes ont été ajoutées. **Zeluck** a rejoint l’équipe le **19 janvier 2024** en tant que graphiste, avec pour mission de repenser la direction artistique du bot. Un mois plus tard, une version remaniée du bot a été déployée.

À cette époque, **PalaGuideBot** avait dépassé les **100 serveurs** et enregistré plus de **3 000 commandes exécutées**.

Le **29 mars 2024**, le bot a introduit les commandes phares que nous connaissons aujourd’hui, comme **/lookup** et **/faction**. Cette mise à jour a popularisé l’utilisation de l’API publique, jusqu’alors méconnue des joueurs.

Dès le lendemain, le nombre d’interactions avec le bot a explosé, atteignant un record de **plus de 1 000 interactions en une seule journée**.

![image](https://image.palaguidebot.fr/articles/knowEverything/interactions.png)

Le **12 avril 2024**, le bot a franchi une nouvelle étape avec **400 serveurs** et près de **50 000 interactions**.

Le **24 mai 2024**, **Riveur** a rejoint l’équipe en tant que développeur web et s’est pleinement investi dans le projet. Grâce à lui, les premiers aperçus du site web ont été dévoilés le **31 mai 2024**, et la première version du site est sortie le **15 juin 2024**. Elle offrait comme fonctionnalité principale un historique des joueurs ainsi que des classements.

Lors de la fermeture de la **V9.5** de Paladium en **juin 2024**, le bot comptait **700 serveurs** et plus de **9 000 joueurs uniques** sur le site web.

Depuis la sortie de la **V10**, PalaGuideBot continue d’innover en proposant divers ajouts, toujours avec un design soigné et un code propre. L’équipe accorde une grande importance à l’expérience utilisateur et aux retours des joueurs.

---

## Motivations

À l’origine, **TonyKun** souhaitait proposer une alternative simple et accessible aux tableaux Excel pour calculer son XP. Avec le temps, la motivation principale est devenue d’améliorer l’expérience des joueurs de **Paladium** en leur offrant des outils pratiques et optimisés.  

Aujourd’hui, après plus d’un an d’existence, l’équipe reste fidèle à cet objectif, malgré une baisse de motivation en fin de saison, lorsque l’activité des joueurs diminue.

---

## L’équipe

L’équipe de **PalaGuideBot** est composée de trois membres principaux :

### **Membres principaux**  

- **TonyKun** (*Créateur*)  
  - **Rejoint le :** 08/12/23  
  - **Études/Travail :** Étudiant en développement  
  - **Rôles :** Développement du bot, du site web, de l’API, gestion des images, administration système...  

- **Zeluck** (*Graphiste, Communication*)  
  - **Rejoint le :** 31/01/24  
  - **Études/Travail :** Étudiant en maintenance  
  - **Rôles :** Direction artistique, communication, Minecraft (*les choses simples*)  

- **Riveur** (*Développeur TypeScript*)  
  - **Rejoint le :** 24/05/24  
  - **Études/Travail :**  
  - **Rôles :** Développement du site web, de l’API, gestion des images...  

### **Contributeurs externes**  

Deux contributeurs ont également apporté leur expertise au projet :  

- **Razi** (*Développeur Java*)  
  - **Dernière contribution :** 16/09/24  
  - **Réalisation :** Développement d’un easter egg pour le serveur Minecraft de Link.  

- **Volcane’eau** (*Développeur TypeScript*)  
  - **Dernière contribution :** 21/10/24  
  - **Réalisations :**  
    - Développement initial des badges sur les profils.  
    - Suggestions et rapports de bugs.  
    - Conseils et améliorations techniques.  

---

## Organisation

L’organisation du projet repose sur plusieurs outils clés :  

- [Portainer](https://www.portainer.io) (Gestion des conteneurs Docker)  
- [GitHub](https://github.com/PalaGuideBot) (Développement et versionnage du code)  
- [Umami](https://umami.is) (Suivi des statistiques)  
- [Discord](https://discord.com) (Gestion des suggestions et des rapports de bugs)  

### **Portainer**  
Portainer est utilisé pour visualiser et gérer les conteneurs Docker plus facilement qu’en ligne de commande.  

![image](https://image.palaguidebot.fr/articles/knowEverything/portainer.png)  

### **GitHub**  
GitHub permet de gérer le code source via Git, d’automatiser le déploiement avec Docker et de suivre l’historique des modifications.  

![image](https://image.palaguidebot.fr/articles/knowEverything/github.png)  

### **Umami**  
Pour les statistiques, nous utilisons **Umami**, qui respecte le RGPD sans nécessiter de bannière de cookies, contrairement à **Google Analytics**. Nous ne collectons pas d’informations personnelles comme la localisation précise des utilisateurs.  

![image](https://image.palaguidebot.fr/articles/knowEverything/umami.png)

### **Discord**  
Discord est notre principal canal de communication, notamment pour la gestion des bugs et des suggestions via les forums. Ces outils permettent un suivi structuré grâce aux tags et aux discussions dédiées.  

![image](https://image.palaguidebot.fr/articles/knowEverything/discord.png)

### Choix Des Implémentations

...

---

## Développement

...

### Les Technologies

...

### **Infrastructure**  
PalaGuideBot doit gérer plusieurs services :  
- **Site web**  
- **Bot Discord**  
- **API**  
- **Génération d’images**  
- **Serveur Minecraft**  
- **Bot de support**  

L’ensemble fonctionne sur un **VPS sous Debian 11**, fourni gracieusement par **NVH Cloud**, qui assure également une protection contre les attaques **DDoS**. Tous les services sont gérés via **Docker**.

---

## Suggestions & Rapports de Bugs  

L’équipe est à l’écoute des joueurs et encourage la communauté à faire remonter des suggestions et des bugs via Discord.

---

## Remerciements

...

---



Question : 

Si vous faites ca sur votre temps libre ou sinon avez d'autres projets qui vous prends du temps (en rapport à paladium ou pas) ---> Organisation
Si vous êtes bénévoles
Combien de temps / semaine sur le projet ---> Organisation