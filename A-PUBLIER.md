# À publier sur LinkedIn

Une entrée par nouveauté du site, la plus récente en haut. Les posts sont publiés avec Claude Desktop, après relecture. Format : voir `CLAUDE.md`, partie 4.

## 2026-10-25 : Homelab, étape 2 : le socle logiciel du serveur

- Statut : à relire
- Lien : https://forestmaxime-pf.fr/projets/homelab-etape-2.html
- Image proposée : projets/img/homelab-etape-2-01.webp

L'étape 2 de mon homelab est validée : le socle logiciel du serveur.

Au programme :
- un pare-feu (ufw) qui bloque tout en entrée, sauf le SSH depuis mon réseau local ;
- les mises à jour de sécurité automatiques, vérifiées par un essai à blanc ;
- Docker Engine, installé depuis le dépôt officiel de Docker ;
- le projet dans un dépôt Git privé, avec une clé de déploiement pour le serveur : elle ne donne accès qu'à ce dépôt, pas à tout mon compte GitHub.

Deux réflexes que je retiens : autoriser et vérifier le SSH avant d'activer le pare-feu, pour ne pas me couper l'accès à un serveur sans écran ; et écrire le .gitignore avant le premier commit, pour qu'aucun secret ne parte dans Git.

Prochaine étape : l'accès à distance au serveur.

La fiche complète, avec les tests et les problèmes rencontrés : https://forestmaxime-pf.fr/projets/homelab-etape-2.html

#homelab #linux #docker #cybersécurité #btssio

## 2026-10-25 : Lancement du homelab et étape 1 : installer Ubuntu Server sur un ancien PC

- Statut : à relire
- Lien : https://forestmaxime-pf.fr/projets/homelab.html
- Image proposée : projets/img/homelab-etape-1-07.webp

Je lance un projet personnel, en parallèle de ma 2e année de BTS SIO option SISR : un homelab.

Le point de départ : un ancien PC de jeu qui ne servait plus. Je l'ai transformé en serveur Ubuntu Server 24.04, sans écran, que j'administre à distance en SSH.

Le but : construire un outil d'audit et de surveillance des sites des clients de ma micro-entreprise Site de Poche (DNS, courrier, HTTPS, en-têtes de sécurité), avec des rapports et une IA locale qui les explique en français simple. Budget : 0 €, ou presque.

Le projet compte 10 étapes. La première est validée :
- Ubuntu Server installé sur le disque entier, avec LVM ;
- une adresse fixe grâce à un bail DHCP statique sur la box ;
- la connexion SSH par clé seulement : les mots de passe sont désactivés, après avoir testé la clé ;
- les mises à jour, dont 80 correctifs de sécurité.

Le plus formateur : au départ, la tour n'avait ni câble réseau ni pilote Wi-Fi libre. J'ai dû chercher par élimination (câble, adresse en 169.254, journaux) avant d'avoir du réseau.

Je publie chaque étape sur mon portfolio, avec les tests et les problèmes rencontrés : https://forestmaxime-pf.fr/projets/homelab.html

#homelab #linux #ubuntu #cybersécurité #btssio
