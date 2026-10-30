# À publier sur LinkedIn

Une entrée par nouveauté du site, la plus récente en haut. Les posts sont publiés avec Claude Desktop, après relecture. Format : voir `CLAUDE.md`, partie 4.

**Calendrier proposé** (2 posts par semaine, le soir vers 18 h 30 : le lancement du homelab, posté vers 22-23 h, a fait 80 à 90 impressions, le post Cato de 9 h seulement 4) :

| Date | Post |
|---|---|
| mer. 28/10, 18 h 30 | Homelab, étape 2 : le socle logiciel |
| ven. 30/10, 18 h 30 | Le Zero Trust, que j'appliquais déjà pour un client |
| mar. 03/11 | Homelab, étape 3 : l'accès à distance |
| jeu. 05/11 | Homelab, étape 4 : l'audit DNS et courrier |
| mar. 10/11 | Homelab, étape 5 : l'audit web |
| jeu. 12/11 | Nouvelle veille : la sécurité de la messagerie |
| mar. 17/11 | Homelab, étape 6 : l'historique des audits et la sauvegarde |
| jeu. 19/11 | Homelab, étape 7 : la surveillance des sites de mes clients |

## 2026-10-30 : Homelab, étape 7 : la surveillance des sites de mes clients

- Statut : à relire, à programmer le 2026-11-19 à 18 h 30
- Lien : https://forestmaxime-pf.fr/projets/homelab-etape-7.html
- Image proposée : projets/img/homelab-etape-7-03.webp

L'étape 7 de mon homelab est validée : savoir dans le quart d'heure si le site d'un de mes clients tombe en panne.

Ma tour n'est pas allumée en permanence. La surveillance tourne donc chez Cloudflare, dans un Worker (offre gratuite) : toutes les 15 minutes, il vérifie que chaque site répond et que son HTTPS marche.

Quand un site tombe, ou quand il revient, je reçois une alerte sur mon téléphone par Discord. Tant que rien ne change, aucun message : avec une alerte à chaque passage, une panne d'une nuit enverrait 30 messages, et on finit par ne plus les lire. Un échec est aussi revérifié 5 secondes plus tard, pour ignorer une erreur passagère.

Une surveillance qui ne dit rien doit prouver qu'elle tourne : chaque matin à 8 h, je reçois un résumé de tous les sites. S'il manque, c'est la surveillance elle-même qui est en panne.

Pour tester l'alerte avec une vraie panne sans toucher au site d'un client, j'ai ajouté exprès expired.badssl.com, un site public au certificat expiré : l'alerte est bien arrivée sur mon téléphone.

Le Worker n'a aucune adresse publique, le lien secret de Discord n'est jamais dans Git, et seuls les sites de mes clients sont surveillés, jamais ceux des prospects.

Prochaine étape : les rapports d'audit en HTML, puis en PDF.

La fiche complète : https://forestmaxime-pf.fr/projets/homelab-etape-7.html

## 2026-10-30 : Homelab, étape 6 : l'historique des audits, la sauvegarde et la restauration

- Statut : à relire, à programmer le 2026-11-17 à 18 h 30
- Lien : https://forestmaxime-pf.fr/projets/homelab-etape-6.html
- Image proposée : projets/img/homelab-etape-6-06.webp

L'étape 6 de mon homelab est validée : garder l'historique des audits de mes clients, et le protéger.

Les résultats des audits (DNS, courrier et site web) vont dans une base SQLite. Chaque mois, le script compare le dernier audit à celui du mois précédent : mieux, moins bien ou pareil, pour chaque vérification.

Pour la sauvegarde :
- un minuteur systemd plutôt qu'une tâche cron : la tour n'est pas allumée tout le temps, et systemd rattrape une sauvegarde ratée au démarrage suivant ;
- chaque copie est relue et vérifiée, 30 copies gardées ;
- une copie sur mon PC portable, pour ne pas tout perdre si le disque de la tour lâche.

Une sauvegarde qu'on n'a jamais restaurée n'est pas une sauvegarde : j'ai donc cassé la base exprès, puis je l'ai restaurée. Le client et ses 4 audits sont revenus.

Côté RGPD : seuls mes clients sont enregistrés, jamais un prospect, avec le minimum d'informations et un accès réservé à mon compte.

85 tests automatiques couvrent les étapes 4, 5 et 6.

Prochaine étape : la surveillance des sites par un Worker Cloudflare, avec une alerte sur mon téléphone.

La fiche complète : https://forestmaxime-pf.fr/projets/homelab-etape-6.html

#homelab #sqlite #sauvegarde #rgpd #btssio

## 2026-10-29 : Nouvelle veille : la sécurité de la messagerie

- Statut : à relire, à programmer le 2026-11-12 à 18 h 30
- Lien : https://forestmaxime-pf.fr/#veille-exigences-messagerie
- Image proposée : aucune

Je commence une nouvelle veille technologique pour mon BTS : la sécurité de la messagerie. Ma question : comment protéger un domaine contre l'usurpation et le phishing ? Je publierai une fiche par mois.

Première fiche : Google, Yahoo et Microsoft trient désormais les e-mails selon trois réglages publiés dans le DNS du domaine :
- SPF : les serveurs qui ont le droit d'envoyer pour le domaine ;
- DKIM : une signature qui prouve que l'e-mail n'a pas été modifié ;
- DMARC : il vérifie que le domaine contrôlé est bien celui affiché dans « De : », et dit quoi faire sinon.

C'est exigé des gros expéditeurs (plus de 5 000 e-mails par jour vers Gmail, même seuil chez Microsoft), et de fait attendu de tous : sans ces réglages, les e-mails d'une petite entreprise risquent de finir en spam.

Je l'ai fait pour mon premier client, avec un cas particulier : son domaine sert seulement à recevoir. Personne n'envoie d'e-mail en son nom, donc son DMARC est en « reject » et tout e-mail à son nom est forcément faux.

La fiche complète : https://forestmaxime-pf.fr/#veille-exigences-messagerie

#cybersécurité #messagerie #dmarc #btssio

## 2026-10-27 : Homelab, étape 5 : l'audit web d'un site

- Statut : à relire, à programmer le 2026-11-10 à 18 h 30
- Lien : https://forestmaxime-pf.fr/projets/homelab-etape-5.html
- Image proposée : projets/img/homelab-etape-5-03.webp

L'étape 5 de mon homelab est validée : un script Python qui audite ce qu'un visiteur voit d'un site.

Il vérifie :
- le HTTPS : certificat valide, renvoi de http vers https, une seule adresse principale ;
- les en-têtes de sécurité : HSTS, CSP, X-Content-Type-Options, Referrer-Policy ;
- la date d'expiration du nom de domaine, dans l'annuaire public RDAP ;
- le code et le temps de réponse.

Dès le premier essai, il a trouvé un vrai oubli sur le site de mon premier client : le site s'ouvrait avec et sans « www », sans renvoyer vers une seule adresse. Corrigé en quelques minutes avec une règle de redirection dans Cloudflare, puis audit tout vert.

Je me suis aussi fixé une limite : le script ne lit que ce que voit n'importe quel visiteur. Pas de scan de ports ni de recherche de failles, et le test des versions de TLS est réservé à mes clients.

65 tests automatiques vérifient les règles de couleur.

Prochaine étape : garder l'historique des audits dans une base SQLite, avec une sauvegarde automatique.

La fiche complète : https://forestmaxime-pf.fr/projets/homelab-etape-5.html

#homelab #python #cybersécurité #https #btssio

## 2026-10-27 : Homelab, étape 4 : l'audit DNS et courrier d'un nom de domaine

- Statut : à relire, à programmer le 2026-11-05 à 18 h 30
- Lien : https://forestmaxime-pf.fr/projets/homelab-etape-4.html
- Image proposée : projets/img/homelab-etape-4-01.webp

L'étape 4 de mon homelab est validée : un script Python qui vérifie les réglages qui protègent le courrier d'un nom de domaine.

MX, SPF, DMARC, DKIM et DNSSEC : pour chacun, un résultat vert, orange ou rouge, décidé par des règles écrites dans le code (jamais par une IA), et un résultat complet en JSON pour l'historique.

Ce que j'ai appris en le testant :
- le domaine de mon client, que j'avais réglé moi-même, a révélé deux défauts du script que les domaines publics ne montraient pas ;
- un audit honnête distingue « absent » et « non trouvé » : on ne peut pas lister les clés DKIM d'un domaine, seulement essayer des noms courants ;
- un domaine au DNSSEC cassé exprès permet de tester un cas d'erreur sans rien casser chez soi.

30 tests automatiques vérifient que chaque cas donne la bonne couleur.

Prochaine étape : l'audit du site lui-même (HTTPS, en-têtes de sécurité).

La fiche complète : https://forestmaxime-pf.fr/projets/homelab-etape-4.html

#homelab #python #dns #cybersécurité #btssio

## 2026-10-27 : Homelab, étape 3 : l'accès à distance au serveur

- Statut : à relire, à programmer le 2026-11-03 à 18 h 30
- Lien : https://forestmaxime-pf.fr/projets/homelab-etape-3.html
- Image proposée : projets/img/homelab-etape-3-21.webp

L'étape 3 de mon homelab est validée : je peux travailler sur mon serveur depuis n'importe où, sans l'exposer sur internet et sans le laisser allumé en permanence.

Au programme :
- un VPN WireGuard hébergé par ma Freebox, qui marche même quand le serveur est éteint ;
- le réveil à distance (Wake-on-LAN), puis l'extinction propre à distance ;
- un pare-feu qui n'accepte le SSH que depuis mon réseau local et le VPN ;
- une clé SSH et un accès VPN par appareil, pour pouvoir en retirer un sans toucher aux autres.

Le test final, depuis mon téléphone en 4G : VPN, réveil du serveur, connexion SSH, extinction. Tout le cycle est inscrit dans le journal du serveur.

Un écart au budget de 0 € annoncé au lancement : 58,27 € pour un kit CPL. Le réveil à distance ne marche qu'avec un câble, et la tour est à l'étage, loin de la box : le réseau passe maintenant par les prises électriques.

J'ai aussi relié ces choix aux principes du Zero Trust, avec leur limite : un VPN reste un accès réseau classique.

Prochaine étape : le premier script d'audit, pour le DNS et le courrier.

La fiche complète : https://forestmaxime-pf.fr/projets/homelab-etape-3.html

#homelab #linux #vpn #wireguard #cybersécurité #btssio

## 2026-10-26 : Le Zero Trust, que j'appliquais déjà pour un client de Site de Poche

- Statut : programmé le 2026-10-30 à 18 h 30
- Lien : https://forestmaxime-pf.fr/#parcours
- Image proposée : aucune

En suivant la formation Zero Trust Security Essentials de Cato Networks, je me suis rendu compte que j'appliquais déjà ce principe sans le savoir, pour un client de ma micro-entreprise Site de Poche.

Avant la formation, j'avais protégé l'espace de gestion de son site avec Cloudflare Access :
• chaque connexion est vérifiée par un code à usage unique envoyé par e-mail ;
• seules les adresses autorisées peuvent entrer ;
• pas de VPN ni de réseau « de confiance » : sans cette vérification, l'espace de gestion n'est pas accessible.

Je l'avais fait par bon sens. La formation m'a appris que ça porte un nom : le Zero Trust, ne faire confiance à aucun accès par défaut et vérifier chaque connexion.

Mon parcours : https://forestmaxime-pf.fr/#parcours

#zerotrust #cybersécurité #cloudflare #btssio

## 2026-10-26 : Certification Zero Trust Security Essentials (Cato Networks)

- Statut : publié
- Lien : https://forestmaxime-pf.fr/#certifications
- Image proposée : badge-cato-zero-trust.png

Nouvelle certification : Zero Trust Security Essentials, de Cato Networks.

Le principe du Zero Trust : ne faire confiance à aucun accès par défaut et vérifier chaque connexion.

Elle rejoint mes certifications Cisco et ma formation RGPD de la CNIL, dans la rubrique Certifications de mon portfolio : https://forestmaxime-pf.fr/#certifications

#zerotrust #cybersécurité #btssio

## 2026-10-25 : Homelab, étape 2 : le socle logiciel du serveur

- Statut : programmé le 2026-10-28 à 18 h 30
- Lien : https://forestmaxime-pf.fr/projets/homelab-etape-2.html
- Image proposée : projets/img/homelab-etape-2-01.webp

L'étape 2 de mon homelab est validée : le socle logiciel du serveur.

Au programme :
• un pare-feu (ufw) qui bloque tout en entrée, sauf le SSH depuis mon réseau local ;
• les mises à jour de sécurité automatiques, vérifiées par un essai à blanc ;
• Docker Engine, installé depuis le dépôt officiel de Docker ;
• le projet dans un dépôt Git privé, avec une clé de déploiement pour le serveur : elle ne donne accès qu'à ce dépôt, pas à tout mon compte GitHub.

Deux réflexes que je retiens : autoriser et vérifier le SSH avant d'activer le pare-feu, pour ne pas me couper l'accès à un serveur sans écran ; et écrire le .gitignore avant le premier commit, pour qu'aucun secret ne parte dans Git.

Prochaine étape publiée : l'accès à distance au serveur.

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
