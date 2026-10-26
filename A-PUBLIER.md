# À publier sur LinkedIn

Une entrée par nouveauté du site, la plus récente en haut. Les posts sont publiés avec Claude Desktop, après relecture. Format : voir `CLAUDE.md`, partie 4.

## 2026-10-26 : Le Zero Trust, que j'appliquais déjà pour un client de Site de Poche

- Statut : à relire
- Lien : https://forestmaxime-pf.fr/#parcours
- Image proposée : aucune

En suivant la formation Zero Trust Security Essentials de Cato Networks, je me suis rendu compte que j'appliquais déjà ce principe sans le savoir, pour un client de ma micro-entreprise Site de Poche.

Avant la formation, j'avais protégé l'espace de gestion de son site avec Cloudflare Access :
- chaque connexion est vérifiée par un code à usage unique envoyé par e-mail ;
- seules les adresses autorisées peuvent entrer ;
- pas de VPN ni de réseau « de confiance » : sans cette vérification, l'espace de gestion n'est pas accessible.

Je l'avais fait par bon sens. La formation m'a appris que ça porte un nom : le Zero Trust, ne faire confiance à aucun accès par défaut et vérifier chaque connexion.

Mon parcours : https://forestmaxime-pf.fr/#parcours

#zerotrust #cybersécurité #cloudflare #btssio

## 2026-10-26 : Certification Zero Trust Security Essentials (Cato Networks)

- Statut : programmé le 2026-10-27 à 9 h 30
- Lien : https://forestmaxime-pf.fr/#certifications
- Image proposée : badge-cato-zero-trust.png

Nouvelle certification : Zero Trust Security Essentials, de Cato Networks.

Le principe du Zero Trust : ne faire confiance à aucun accès par défaut et vérifier chaque connexion.

Elle rejoint mes certifications Cisco et ma formation RGPD de la CNIL, dans la rubrique Certifications de mon portfolio : https://forestmaxime-pf.fr/#certifications

#zerotrust #cybersécurité #btssio

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

- Statut : publié
- Lien : https://forestmaxime-pf.fr/projets/homelab.html
- Image proposée : projets/img/homelab-etape-1-07.webp

Je lance un projet personnel, en parallèle de ma 2e année de BTS SIO option SISR : un homelab.

Le point de départ : un ancien PC de jeu qui ne servait plus. Je l'ai transformé en serveur Ubuntu Server 24.04. Un écran pour l'installation, puis plus aucun : je l'administre à distance en SSH.

Le but : un outil d'audit et de surveillance des sites des clients de ma micro-entreprise Site de Poche (DNS, courrier, HTTPS, en-têtes de sécurité), avec des rapports qu'une IA locale explique en français simple. Budget : 0 €, avec des logiciels libres et des offres gratuites.

Le projet compte 10 étapes. La première est validée :
- Ubuntu Server installé sur le disque entier, avec LVM ;
- une adresse fixe grâce à un bail DHCP statique sur la box ;
- la connexion SSH par clé seulement : j'ai testé la clé avant de désactiver les mots de passe ;
- les mises à jour.

Le plus formateur : au départ, la tour n'avait ni câble réseau ni pilote libre pour sa carte Wi-Fi. J'ai trouvé les pannes par élimination (câble testé sur un autre appareil, adresse en 169.254 qui veut dire « personne n'a répondu », lecture des journaux) avant d'avoir du réseau.

Un assistant IA (Claude Code) me guide pas à pas, mais je fais les manipulations moi-même et je vérifie chaque résultat.

Je publie chaque étape sur mon portfolio, avec les tests et les problèmes rencontrés : https://forestmaxime-pf.fr/projets/homelab.html

#homelab #linux #ubuntu #cybersécurité #btssio
