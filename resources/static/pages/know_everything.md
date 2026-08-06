# **Tout savoir sur PalaGuideBot**  

Cet article vise à être le plus **transparent** possible afin que chacun puisse comprendre le fonctionnement de **PalaGuideBot**.  

---

## **Histoire**

PalaGuideBot a été créé par **TonyKun** le **8 décembre 2023** pour offrir un service aux joueurs de **Paladium**. Il permet de calculer de manière optimisée la progression des métiers et d’évaluer l’XP nécessaire pour passer un niveau, une fonctionnalité qui, jusqu’alors, n’était disponible qu’au travers de fichiers Excel créés par la communauté à chaque saison.  

Au fil du temps, de nouvelles commandes ont été ajoutées. **Zeluck** a rejoint l’équipe le **19 janvier 2024** en tant que graphiste, avec pour mission de repenser la direction artistique du bot. Un mois plus tard, une version remaniée du bot a été déployée.  

À cette époque, **PalaGuideBot** avait dépassé les **100 serveurs** et enregistré plus de **3 000 commandes exécutées**.  

Le **29 mars 2024**, le bot a introduit les commandes phares que nous connaissons aujourd’hui, comme **/lookup** et **/faction**. Cette mise à jour a popularisé l’utilisation de l’API publique, jusqu’alors méconnue des joueurs.  

Dès le lendemain, le nombre d’interactions avec le bot a explosé, atteignant un record de **plus de 1 000 interactions en une seule journée**.  

![image](https://image.palaguidebot.fr/articles/knowEverything/interactions.png)  

Le **12 avril 2024**, le bot a franchi une nouvelle étape avec **400 serveurs** et près de **50 000 interactions**.  

Le **24 mai 2024**, **Riveur** a rejoint l’équipe en tant que développeur web et s’est pleinement investi dans le projet. Grâce à lui, les premiers aperçus du site web ont été dévoilés le **31 mai 2024**, et la première version du site est sortie le **15 juin 2024**, offrant comme fonctionnalités principales un historique des joueurs ainsi que des classements.  

Lors de la fermeture de la **V9.5** de Paladium en **juin 2024**, le bot comptait **700 serveurs** et plus de **9 000 joueurs uniques** sur le site web.  

Depuis la sortie de la **V10**, PalaGuideBot continue d’innover en proposant divers ajouts, toujours avec un design soigné et un code propre. L’équipe accorde une grande importance à l’expérience utilisateur et aux retours des joueurs.  

---

## **Motivations**  

À l’origine, **TonyKun** souhaitait proposer une alternative simple et accessible aux tableaux Excel pour calculer son XP. Avec le temps, la motivation principale est devenue d’améliorer l’expérience des joueurs de **Paladium** en leur offrant des outils pratiques et optimisés.  

Aujourd’hui, après plus d’un an d’existence, l’équipe reste fidèle à cet objectif, malgré une baisse de motivation en fin de saison, lorsque l’activité des joueurs diminue.  

---

## **L’équipe**  

L’équipe de **PalaGuideBot** est composée de trois membres principaux :  

### **Membres principaux**  

- **TonyKun** (*Créateur*)  
  - **Rejoint le :** 08/12/23  
  - **Études/Travail :** Étudiant en développement  
  - **Rôles :** Développement du bot, du site web, de l’API, gestion des images, administration système...  

- **Zeluck** (*Graphiste, Communication*)  
  - **Rejoint le :** 31/01/24  
  - **Études/Travail :** Étudiant en maintenance  
  - **Rôles :** Direction artistique, communication, Minecraft (*les choses simples*).  

- **Riveur** (*Développeur Web*)  
  - **Rejoint le :** 24/05/24  
  - **Études/Travail :** Concepteur Développeur d'Applications  
  - **Rôles :** Développement du site web, de l’API, gestion des images...  

### **Contributeurs externes**  

Deux contributeurs ont également apporté leur expertise au projet :  

- **Razi** (*Contributeur Java*)  
  - **Dernière contribution :** 16/09/24  
  - **Réalisation :** Développement d’un easter egg pour le serveur Minecraft de Link.  

- **Volcan'eau** (*Contributeur TypeScript*)  
  - **Dernière contribution :** 21/10/24  
  - **Réalisations :**  
    - Développement initial des badges sur les profils.  
    - Suggestions et rapports de bugs.  
    - Conseils et améliorations techniques.

- **Arthur0501** (*Contributeur global*)  
  - **Dernière contribution :** 06/08/2026
  - **Aides :**
    - Suggestions et rapports de bugs

Toutes les personnes présentes sont bénévoles et contribuent sur leur temps libre.  

---

## **Organisation**  

L’organisation du projet repose sur plusieurs outils clés :  

- [Portainer](https://www.portainer.io) (**Gestion des conteneurs Docker**)  
- [GitHub](https://github.com/PalaGuideBot) (**Développement et versionnage du code**)  
- [Umami](https://umami.is) (**Suivi des statistiques**)  
- [Discord](https://discord.com) (**Gestion des suggestions et des rapports de bugs**)  

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

### **Choix des implémentations**  

Toutes les idées de l'équipe sont rassemblées dans le forum Discord, où elles sont débattues afin de déterminer si elles doivent être mises en place, leur niveau de priorité et la personne qui se chargera de les développer.  

Lorsqu'une fonctionnalité n'a pas de contrainte de date ou de priorité élevée, c'est le développeur en charge qui choisit l'ordre de traitement. Le reste de l'équipe s'adapte en conséquence. **Riveur**, étant principalement responsable du développement du site web, est souvent celui qui décide de la fonctionnalité sur laquelle il travaille en priorité.  

Les demandes des utilisateurs sont également prises en compte. Si une demande est simple à réaliser, elle sera traitée rapidement en fonction des disponibilités. En revanche, si elle concerne une fonctionnalité plus complexe qui enthousiasme l'équipe, elle sera priorisée et intégrée dans la roadmap.  

---

## **Développement**  

Le développement de **PalaGuideBot** est presque continu : il est rare qu’il se passe plus de **quatre jours** sans qu’un membre de l’équipe n’apporte une modification ou une amélioration.  

### **Temps de développement**  

Le temps consacré au développement varie en fonction des membres de l’équipe et de la charge de travail.  

Par exemple, **Riveur** consacre en moyenne **25 heures par semaine** lorsqu’il travaille sur une **grosse fonctionnalité**, et environ **7 heures par semaine** lorsqu’aucune mise à jour majeure n’est prévue. Il est actuellement le membre qui investit le plus de temps dans le développement du projet.  

### **Statistiques GitHub**  

Au cours de l’année écoulée, le nombre de commits réalisés sur les principaux dépôts GitHub est conséquent :  

- **Website** : **578** commits  
- **API** : **381** commits  
- **Image** : **167** commits  
- **Bot Officiel** : **166** commits  
- **Bot Support** : **95** commits  
- **Serveur Minecraft** : **68** commits  
- **Plugin Java** : **44** commits  

Ce qui représente un total de **1 499 commits** et **5 098 lignes de code**.  

![image](https://image.palaguidebot.fr/articles/knowEverything/lignes.png)  

### **Les Technologies**  

Le développement de **PalaGuideBot** repose principalement sur **[TypeScript](https://www.typescriptlang.org)**. Les technologies varient en fonction des services :  

- **Website** : basé sur **[React](https://fr.react.dev)** et **[AdonisJS](https://adonisjs.com)**  
- **API** : fonctionne avec **[BentoCache](https://bentocache.dev/)** et **[AdonisJS](https://adonisjs.com)**  
- **Génération d’images** : utilise **[HonoJS](https://hono.dev)**  
- **Bots Discord** (officiel et support) : développés avec **[Node.js](https://nodejs.org/en)** et la librairie **[Discord.js](https://discord.js.org)**  
- **Gestion des services** : assurée via **[Docker](https://www.docker.com)**  
- **Stockage des données** : basé sur **[MongoDB](https://www.mongodb.com/)**  

### **Infrastructure**  
PalaGuideBot doit gérer plusieurs services :  
- **Site web**  
- **Bot Discord**  
- **API**  
- **Génération d’images**  
- **Serveur Minecraft**  
- **Bot de support**  
- **Base de données**  

L’ensemble fonctionne sur un **VPS sous Debian 11**, fourni gracieusement par **[NVH Cloud](https://www.nvhcloud.com)**, qui assure également une protection contre les attaques **DDoS**. Tous les services sont gérés via **Docker**.  

---

## **Suggestions & Rapports de Bugs**  

L’équipe est à l’écoute des joueurs et encourage la communauté à remonter **suggestions** et **bugs** via Discord.  

Les retours des joueurs sont essentiels pour nous : ils constituent une précieuse source **d’inspiration** et **de motivation**, nous permettant d’améliorer continuellement **PalaGuideBot** en fonction des besoins de la communauté.  

---

## **Remerciements**  

Un immense merci à tous les **contributeurs**, à toutes les **personnes** qui nous aident en signalant des bugs ou en partageant leurs suggestions.  

Et surtout, **merci à vous** pour votre soutien et votre engagement ❤️  

---

## **❓FAQ**
Réponses aux questions posées sur notre Discord

### **PalaGuideBot sera-t-il payant un jour ?** *(Air_Infinity)*  
Actuellement, **PalaGuideBot** est entièrement **gratuit** et maintenu bénévolement par l'équipe. Il n'y a **aucun projet** de le rendre payant.  
Cependant, si les coûts d'hébergement ou le temps de développement deviennent trop importants, l'équipe pourrait envisager des **dons** ou un **modèle freemium**, avec uniquement des fonctionnalités **cosmétiques**, tout en gardant les fonctionnalités essentielles **gratuites** pour tous.  

### **Est-ce que de nouvelles fonctionnalités sont prévues ?** *(Razi)*
Pour le moment, il n'y a **pas de grosse mise à jour** prévue, hormis une **refonte complète du bot Discord**, qui ne correspond plus à nos critères actuels.

### **Quelles sont vos statistiques de l'année (gains et pertes) ?** (volcan'eau 🌋)
😥 Beaucoup de pertes, **0 gain**, le plaisir d'apprendre et de servir.

### **Pensez-vous vous élargir à d'autres serveurs Minecraft ?** (Air_Infinity)
Ce n'est **pas prévu** pour l’instant, mais nous restons **ouverts** aux serveurs dont la communauté serait suffisamment intéressée pour **justifier l'investissement** en temps et en ressources.

### **Pensez-vous abandonner le bot s'il ne fonctionne plus ?** (Air_Infinity)
Le bot reste **très apprécié et largement utilisé**, avec **850+ serveurs** et **170 installations** sur des comptes Discord personnels.  

Une **refonte** est prévue, notamment **graphique**, afin d'améliorer les embeds et les adapter à nos exigences actuelles.  

---