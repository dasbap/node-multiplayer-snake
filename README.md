[![](node-multiplayer-snake.gif)](https://node-multiplayer-snake.herokuapp.com/)
![Alt](snake.gif)
[![Build Status](https://travis-ci.org/simondiep/node-multiplayer-snake.svg?branch=master)](https://travis-ci.org/simondiep/node-multiplayer-snake)
[![Dependency Status](https://david-dm.org/simondiep/node-multiplayer-snake/status.svg?style=flat)](https://david-dm.org/simondiep/node-multiplayer-snake)  

--------------------------------------------------------------------------------------------------------------------

SNAKE-review

🐍  Un jeu de serpent multijoueur basé sur NodeJs, Express, socket.io et JavaScript ES6. Pas de bibliothèques inutiles. 

### 1 - Pour commencer - 🚀

Installez la dernière version de [Node.js](http://nodejs.org) 8 Stable

'git clone https://github.com/dasbap/node-multiplayer-snake.git'

'cd node-multiplayer-snake'

'Installation npm'

'Début du NPM'

Ouvrez votre navigateur web sur 'localhost :3000' 

### Caractéristiques du jeu

- Inscription et jeu rapides (pas d’inscriptions)
- Paramètres du lecteur
- Changer les couleurs
- Changer de nom
- Contrôles d’administration
- Changer la vitesse du jeu
- Changer la quantité de nourriture
- Modifier la longueur de départ du joueur
- Ajouter ou supprimer des bots
- Différents types d’aliments
- Téléchargez votre propre image de serpent et votre image d’arrière-plan
- Statistiques des joueurs, y compris les éliminations/morts/score
- Volez les scores et la durée des joueurs en les tuant
- Notifications de jeu
- Annonces de meurtres
- Apparitions aléatoires
- Spectate
- Stockage local du nom et de l’image
- Ajoutez et supprimez des murs en cliquant
- Effets sonores

### Dette technique 

- Validation supplémentaire côté client pour réduire les émissions inutiles vers le serveur 
- Optimisation supplémentaire côté serveur pour réduire les émissions inutiles vers le client 
- Validation de la taille des chaînes base64 
- Basculement de l’affichage des options d’administration en tant qu’élément de menu 
- Suppression des vérifications eslint assouplies de .eslintrc.js 
- Refactorisation en code plus testable 
- Couverture de test plus élevée 
- Création d’étapes de construction plus pratiques (dev vs prod) qui ne nécessitent pas de dégroupage lors de l’extraction 
  - Ignorer le bundle qui est placé dans public/js/config.js 
-  support spinners 
- input type=number pour remplacer les boutons d’administration existants 
- animer/lisser le défilement en haut et en bas de la page 
- sprite-maker (convertir toutes les images en une) 
- jsdoc de haut niveau 
- convertir innerHtml en modèles (guidon ou moustache) 
- e.keyCode et d’autres valeurs plus réutilisées doivent être mises en cache (stockées dans une variable locale) pour augmenter les performances 
  - comme 'click' 
- DomHelper extrait toutes les chaînes dans un objet 
- un moyen facile de créer de nouveaux gifs de bannière comme le jeu Ajoute des fonctionnalités
- optimiser les données envoyées à chaque client, uniquement ce qui est nécessaire, et non l’ensemble de l’état du jeu
  - ne videz pas tout le canevas après chaque tour (regardez les alternatives de canevas/WebGL comme PixiJS)
  - Code client plus intelligent qui peut rendre les serpents se déplaçant dans une seule direction sans avoir besoin de l’état du serveur
  - Code de serveur plus intelligent pour envoyer les événements de modification
- nettoyer les constructeurs de classe qui prennent beaucoup de paramètres, et passer à la place un seul objet
- ajouter des instructions de jeu éventuellement à une boîte de dialogue révocable
- Ajouter une légende pour différents bonus

### Objectif de ce FORK

🎯Ce projet vise à améliorer plusieurs aspects du Jeu SNAKE original :

# Stabilité - 1 ✅

- Réduction des émissions inutilse entre le serveur et le client
- Validation renforcée des entrées utilisateur.
- Optimisation des mises à jour en temps réel.

# Performance - 2 ⚡

- Amélioration du rendu graphique avec WebGL.  
- Réduction du volume de données échangées entre clients et serveur.  
- Optimisation des calculs de déplacement des serpents.

# Sécurité - 3 🔒 

- Validation renforcée des données côté serveur.
- Protection contre les injections de code et exploitations WebSocket et injection de code via image.
- Restriction des accès administrateurs.

# Expérience utilisateur (Ergonomie & Accessibilité) - 4 🎮

- Interface plus intuitive pour les paramètres du joueur.
- Support mobile et écrans de petite résolution.
- Ajout d’une boîte de dialogue expliquant les règles du jeu.


# Correction d’anomalies - 5 🛠️

- Correction des collisions mal gérées entre serpents.
- Fix des bugs liés au positionnement des aliments.
- Meilleur contrôle des spawns aléatoires.

# Fonctionnalités ajoutées - 6 🚀

- Mode “1v1” avec spawn fixe.
- Support du chat en jeu.
- Ajout de power-ups (boosts de vitesse, invincibilité temporaire, etc.).
- Option pour changer le background image (ce référer à sécurité - 3 🔒)
- Afficher un contour lumineux lorsque le joueur grandit
- Ajout de chat textuel
- Support pour mobile
- Affichage le score maximum atteins



### 2 - ROLES MOE - ###

### 🙎Maître d'Œuvre (MOE) Principal (Responsable technique global)

Initiales : Dylan BOULAY

- Rôle : Assure la supervision technique globale du projet, la gestion des performances, et les choix techniques majeurs. Il est responsable de la coordination entre les différents membres du groupe et s'assure que toutes les tâches sont alignées avec les objectifs du projet.

- Tâches :
Planification de l'architecture du projet.
Supervision de l'optimisation des performances.
Coordination avec les autres membres pour la gestion des anomalies et la sécurité.

### 🙎Responsable des Performances et Optimisation

Initiales : Baptiste Da SILVA

- Rôle : Responsable de l'amélioration des performances techniques et de la gestion de la latence entre le serveur et le client.
Tâches :

- Optimisation des flux de données entre le serveur et le client.
Réduction de la latence du jeu en ajustant la gestion de la communication via WebSocket.
Tests de charge et ajustements nécessaires pour améliorer la réactivité du jeu.

### 🙎Responsable de la Sécurité et de la Gestion des Utilisateurs

Initiales : Yannis YENOUSSI

- Rôle : Responsable de la mise en place des mécanismes de sécurité, notamment l'authentification des utilisateurs et la sécurisation des communications.

- Tâches :
Mise en place de l'authentification et gestion des sessions utilisateur.
Sécurisation des communications via SSL ou autre protocole.
Validation de la sécurité des données échangées avec le serveur (par exemple, via Socket.io).

### 🙎Responsable de l'Ergonomie et de l'Accessibilité

Initiales : Mouhamadou Gatta BA

- Rôle : S'assure que le jeu soit accessible et intuitif pour tous les utilisateurs, notamment pour les personnes ayant des besoins spécifiques.

- Tâches :
Amélioration de l'interface utilisateur (UI) pour la rendre plus ergonomique.
Ajout de fonctionnalités d'accessibilité telles que le mode sombre, des options de contraste élevé, et l'adaptation aux écrans mobiles.
Test de l'application sur plusieurs plateformes pour assurer la compatibilité.

### 3 - TMA-SonarQube - ###

Les Screens du rapport SnoarQube sont disponible dans le fichier TMA :

TMA
|_Rapport-SonarQube_
|_Rapport-Reliability_
|_Rapport-Maintanability_

### Explication SonarQube 📗

🔐 Security
0 open issues → Aucune vulnérabilité de sécurité détectée. ✅
(Sécurité avait une erreur de sécurité de type "DDOS" à cause d'un regex )
Accepted issues: 0 → Pas de failles acceptées sans correction.
Security Hotspots: 17 → Points du code à examiner manuellement (potentiellement sensibles mais pas forcément dangereux). ⚠️

⚙️ Reliability
13 open issues → Ce sont des bugs ou erreurs potentielles de logique dans le code.
Note: C → Moyenne. Il y a de la place pour amélioration ici.

🧹 Maintainability
7 open issues → Problèmes liés à la maintenabilité (code complexe, duplications, etc.).
Note: A → Très bonne note ici malgré les quelques problèmes.
(Souvent des fonctions trop longues à réduire classe mal écrite problème d'indentation)

📊 Coverage
0.0% → Il n’y a aucun test unitaire ou ils ne couvrent aucune ligne de code.
Sur 1.4k lignes à couvrir → 1400 lignes ne sont pas testées du tout.

❌ Note rouge → C’est critique, à améliorer rapidement si possible.

🔁 Duplications
3.7% de duplications → Cela signifie qu'environ 3 % du code est dupliqué (copier-coller).

Sur 3k lignes → Sur environ 3000 lignes de code analysées.

