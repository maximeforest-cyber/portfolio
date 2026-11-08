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
| mar. 24/11 | Homelab, étape 8 : les rapports aux couleurs de Site de Poche |
| jeu. 26/11 | Homelab, étape 9 : une IA locale sur la carte graphique du labo |
| mar. 01/12 | Homelab, étape 10 : des services dans Docker, avec un vrai certificat |
| jeu. 03/12 | Homelab : tout le labo en un schéma cliquable |

## 2026-11-08 : L'étiquette 802.1Q du plan se déplie

- Statut : à relire
- Lien : https://forestmaxime-pf.fr/
- Image proposée : aucune (une capture de l'étiquette dépliée serait à prendre sur le site en ligne)

Sur le plan de mon portfolio, le câble entre le pare-feu et le switch porte une petite étiquette « trunk 802.1Q ». En cliquant dessus, elle se déplie et montre ce qu'elle contient vraiment : 4 octets ajoutés dans la trame Ethernet.

Le TPID 0x8100 annonce une trame étiquetée, puis viennent la priorité (3 bits), un bit qui dit si la trame peut être jetée en premier, et le numéro du VLAN sur 12 bits. Cette étiquette n'existe que sur le trunk : elle disparaît dès que la trame ressort vers un poste.

Et une exception à connaître : le VLAN natif passe sans étiquette. C'est pour ça qu'on le met sur un VLAN où il n'y a aucun poste.

## 2026-11-07 : Envoyer un paquet à travers le pare-feu de mon portfolio

- Statut : à relire
- Lien : https://forestmaxime-pf.fr/#simulation
- Image proposée : aucune (une capture du simulateur serait à prendre sur le site en ligne)

Sur l'accueil de mon portfolio, le plan du site est dessiné comme un schéma réseau. Il est maintenant possible d'y envoyer un paquet.

On choisit une source, une destination et un service (HTTPS, HTTP, SSH ou ping), et le pare-feu du plan applique ses règles dans l'ordre : la première qui correspond décide, et tout le reste est refusé par défaut. Le paquet part sur le schéma, et le résultat dit quelle règle s'est appliquée. S'il passe, il vous emmène jusqu'à la rubrique demandée. S'il est refusé, le pare-feu le jette sans répondre, comme une vraie règle DROP.

C'est une maquette, pas mon vrai réseau, et la page le dit : des serveurs joignables depuis Internet iraient en vrai dans une DMZ, comme dans mon projet Infra-Site.

Et pour les plus curieux, il y a un câble qui traîne sur le schéma.

## 2026-11-07 : Des preuves plutôt que des décors sur mon portfolio

- Statut : à relire
- Lien : https://forestmaxime-pf.fr/projets/infra-site.html
- Image proposée : projets/img/infra-site-04.webp (le show ip route de RNET, déjà publié)

Je me suis demandé si je devais pousser le thème réseau de mon portfolio encore plus loin. J'ai finalement fait l'inverse : rendre exact ce qui existait, et ajouter des preuves.

Dans les comptes rendus Infra-Site, Maquette RIOCA et GLPI, des encadrés « Vérification » montrent maintenant la vraie commande et ce qu'elle a prouvé : show ip route pour les routes apprises en RIP, show ip ssh pour vérifier que seule la version 2 de SSH est active, un ping entre deux VLAN…

Sur l'accueil, les projets qui ont un compte rendu affichent leur résultat sans avoir à ouvrir la fiche, et une partie des compétences mène à l'endroit où je les ai mises en pratique.

Et j'ai corrigé mes propres approximations : le tableau de contact est devenu une matrice des flux exacte (ports 587, 465 et 443), et mes certifications indiquent qui les a délivrées et quand.

## 2026-11-06 : Quelques clins d'œil réseau sur mon portfolio

- Statut : à relire
- Lien : https://forestmaxime-pf.fr/
- Image proposée : aucune (une capture du plan de l'accueil avec le tampon pourrait être faite, elle n'est pas encore publiée)

J'ai ajouté quelques petits clins d'œil à mon portfolio, sans rien enlever de ce qu'il faut lire en trois minutes.

Le plan du site, dessiné comme un schéma réseau, porte maintenant un tampon « Bon pour alternance · sept. 2027 ». Sous le plan, on peut « capturer un paquet » qui passe sur le switch : la trame est décodée couche par couche, comme dans Wireshark, et les données résument mon profil.

Et si vous tapez une adresse qui n'existe pas, la page d'erreur vous montre que le paquet est bien arrivé : le nom a été résolu, la connexion HTTPS est établie, seule la page manque.

Les animations peuvent être mises en pause, et elles s'arrêtent d'elles-mêmes si votre appareil demande moins de mouvement.

## 2026-11-06 : Homelab : tout le labo en un schéma cliquable

- Statut : à relire
- Lien : https://forestmaxime-pf.fr/projets/homelab.html#partie-3
- Image proposée : aucune (une capture du schéma pourrait être faite, elle n'est pas encore publiée)

Mon homelab a maintenant son schéma d'ensemble. Sur la page du projet, on voit d'un coup d'œil comment tout s'assemble : le VPN WireGuard de la Freebox pour y accéder de l'extérieur, la tour sous Ubuntu Server avec ses audits, sa base SQLite, ses rapports et ses services Docker, puis la surveillance par Cloudflare et les alertes sur mon téléphone.

Chaque case numérotée mène à la fiche de l'étape qui la met en place : 10 étapes, toutes validées par des tests.

## 2026-10-30 : Homelab, étape 10 : des services dans Docker, avec un vrai certificat

- Statut : à relire
- Lien : https://forestmaxime-pf.fr/projets/homelab-etape-10.html
- Image proposée : projets/img/homelab-etape-10-12.webp

L'étape 10 de mon homelab est validée. C'était une étape en option : faire tourner des services dans Docker sur mon serveur, sans affaiblir sa sécurité.

Le premier, Uptime Kuma, est un tableau de bord qui surveille le labo et deux sites. Pour le tester, j'ai provoqué une vraie panne en arrêtant un service : l'alerte est arrivée sur Discord, puis le message de retour deux minutes plus tard.

Le second, Traefik, ouvre ce tableau de bord en https avec un vrai certificat Let's Encrypt, alors que mon serveur n'est pas joignable depuis internet. L'astuce, c'est le défi DNS : au lieu de venir vérifier sur mon serveur, Let's Encrypt lit un enregistrement que Traefik a posé dans mon DNS chez Cloudflare. Essai sur mon iPhone en 4G : avec le VPN, la page s'ouvre ; sans le VPN, rien ne répond.

Pour poser cet enregistrement, Traefik utilise un jeton Cloudflare. Je l'ai limité : une seule zone DNS, utilisable seulement depuis mon adresse, avec une date de fin. Mais cette zone porte aussi mon portfolio : limiter un secret, ce n'est pas le rendre inoffensif. Et quand un premier jeton s'est retrouvé visible sur une capture d'écran, je l'ai remplacé : un secret vu est un secret grillé.

Les deux conteneurs tournent sous leur propre utilisateur, avec le moins de droits possible, et Docker ne publie aucun port : un port publié par Docker passerait par-dessus le pare-feu.

Le compte rendu complet : https://forestmaxime-pf.fr/projets/homelab-etape-10.html

#homelab #docker #letsencrypt #cybersécurité #btssio

## 2026-10-30 : Homelab, étape 9 : une IA locale sur la carte graphique du labo

- Statut : programmé le 2026-11-26 à 18 h 30
- Lien : https://forestmaxime-pf.fr/projets/homelab-etape-9.html
- Image proposée : projets/img/homelab-etape-9-03.webp

L'étape 9 de mon homelab est validée : faire tourner une IA sur ma propre machine, sans service en ligne, avec la carte graphique de 2016 de mon serveur (une GTX 1060).

Premier travail : trouver le bon pilote. Celui que proposait Ubuntu était trop ancien pour Ollama, et les plus récents ne gèrent plus cette carte. Le pilote 580 était la bonne série. Ensuite, j'ai essayé 8 modèles sur des phrases d'un client inventé, avec un seul critère : aucune erreur de fond. Seuls les deux modèles Gemma 4 l'ont rempli.

Mon idée était que l'IA reformule en français simple les phrases techniques de mes rapports d'audit. J'avais ajouté des garde-fous pour refuser les phrases fausses. Mais j'ai fait relire mon code trois fois par une autre session d'IA, qui inventait exprès des phrases fausses : à chaque fois, de nouvelles passaient. Une liste de mots ne peut pas vérifier le sens d'une phrase.

J'ai donc retiré l'IA des rapports. Elle est remplacée par des phrases fixes, une par couleur, vérifiées une par une. Pour un texte qui part chez un client, une phrase vérifiée vaut mieux qu'une phrase élégante peut-être fausse. L'installation reste en place sur le serveur pour d'autres usages.

Le compte rendu complet : https://forestmaxime-pf.fr/projets/homelab-etape-9.html

#homelab #ia #ollama #nvidia #btssio

## 2026-10-30 : Homelab, étape 8 : les rapports aux couleurs de Site de Poche

- Statut : programmé le 2026-11-24 à 18 h 30
- Lien : https://forestmaxime-pf.fr/projets/homelab-etape-8.html
- Image proposée : projets/img/homelab-etape-8-01.webp

L'étape 8 de mon homelab est validée : transformer les résultats de mes audits en documents qu'un commerçant peut lire.

Un fichier JSON plein de « SPF » et de « DMARC » ne parle à personne. Mon script Python produit donc deux rapports, en page HTML et en PDF, aux couleurs de ma micro-entreprise Site de Poche. Le premier est un diagnostic d'une seule page, pour démarcher : le cadenas, l'affichage sur téléphone, la date d'expiration du nom de domaine… en phrases simples. Le second est un rapport mensuel complet pour chacun de mes clients, avec le détail technique et ce qui a changé depuis le mois dernier.

Une règle que je me suis fixée : la couleur (vert, orange, rouge) est toujours décidée par les règles écrites des scripts d'audit, jamais par la mise en page. Chaque point porte aussi un mot (« Bon », « À améliorer »…), pour rester lisible en noir et blanc ou pour un daltonien.

Côté données personnelles : le diagnostic d'un prospect n'est jamais enregistré, et les rapports sont rangés dans un dossier lisible par moi seul, hors de Git.

J'ai aussi fait relire tout mon code par une deuxième session d'IA, comme une revue de code : elle a trouvé deux défauts que mes tests ne pouvaient pas voir, parce qu'ils venaient d'une mauvaise idée de départ. Parmi les points relevés : un site qui bloque les robots était dit « en panne », alors qu'il s'affiche très bien pour un vrai visiteur.

Le compte rendu complet, avec un exemple de diagnostic : https://forestmaxime-pf.fr/projets/homelab-etape-8.html

#homelab #python #rgpd #btssio

## 2026-10-30 : Homelab, étape 7 : la surveillance des sites de mes clients

- Statut : programmé le 2026-11-19 à 18 h 30
- Lien : https://forestmaxime-pf.fr/projets/homelab-etape-7.html
- Image proposée : aucune (l'aperçu du lien suffit ; « expired[.]badssl.com » est écrit ainsi pour que LinkedIn ne prenne pas ce site pour l'aperçu)

L'étape 7 de mon homelab est validée : savoir dans le quart d'heure si le site d'un de mes clients tombe en panne.

Ma tour n'est pas allumée en permanence. La surveillance tourne donc chez Cloudflare, dans un Worker (offre gratuite) : toutes les 15 minutes, il vérifie que chaque site répond et que son HTTPS marche.

Quand un site tombe, ou quand il revient, je reçois une alerte sur mon téléphone par Discord. Tant que rien ne change, aucun message : avec une alerte à chaque passage, une panne d'une nuit enverrait 30 messages, et on finit par ne plus les lire. Un échec est aussi revérifié 5 secondes plus tard, pour ignorer une erreur passagère.

Une surveillance qui ne dit rien doit prouver qu'elle tourne : chaque matin vers 8 h, je reçois un résumé de tous les sites. S'il manque, c'est la surveillance elle-même qui est en panne.

Pour tester l'alerte avec une vraie panne sans toucher au site d'un client, j'ai ajouté exprès expired[.]badssl.com, un site public au certificat expiré : l'alerte est bien arrivée sur mon téléphone.

Le Worker n'a aucune adresse publique, le lien secret de Discord n'est jamais dans Git, et seuls les sites de mes clients sont surveillés, jamais ceux des prospects.

Prochaine étape : les rapports d'audit en HTML, puis en PDF.

La fiche complète : https://forestmaxime-pf.fr/projets/homelab-etape-7.html

#homelab #cloudflare #supervision #cybersécurité #btssio

## 2026-10-30 : Homelab, étape 6 : l'historique des audits, la sauvegarde et la restauration

- Statut : programmé le 2026-11-17 à 18 h 30
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

- Statut : programmé le 2026-11-12 à 18 h 30
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

- Statut : programmé le 2026-11-10 à 18 h 30
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

- Statut : programmé le 2026-11-05 à 18 h 30
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

- Statut : programmé le 2026-11-03 à 18 h 30
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
