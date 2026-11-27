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

## 2026-11-27 : MAC flooding : saturer un switch, puis le protéger

- Statut : à relire
- Lien : https://forestmaxime-pf.fr/projets/mac-flooding.html
- Image proposée : projets/img/mac-flooding-04.webp

Nouveau compte rendu sur mon portfolio : une attaque MAC flooding, faite en binôme en TP.

Depuis une machine Kali Linux, nous avons rempli la table d'adresses MAC d'un switch Cisco : 8 000 adresses, plus aucune place libre. Le switch envoie alors le trafic sur tous ses ports, et dans Wireshark nous avons vu les connexions FTP entre deux autres postes.

Mais le serveur FTP utilisait TLS : on voyait qui se connectait à qui, pas les identifiants ni les fichiers.

Pour finir, nous avons protégé le port avec port-security : 2 adresses MAC au plus, et une alerte à chaque violation.

## 2026-11-27 : Infra-Site : le planning prévu et réel

- Statut : à relire
- Lien : https://forestmaxime-pf.fr/projets/infra-site.html#partie-1
- Image proposée : aucune (le diagramme est en HTML dans la page ; une capture d'écran de la page est possible)

J'ai ajouté le diagramme de Gantt à mon compte rendu Infra-Site, le projet où j'étais chef de projet en binôme.

21 tâches, avec pour chacune le temps prévu et le temps réellement passé. Quatre ont dépassé : le routage RIP v2, l'administration à distance en SSH, les sauvegardes automatiques vers le serveur TFTP et la mise en place des règles du pare-feu. Les dix-sept autres ont pris moins de temps que prévu : mes tâches ont pris 22 h 41 pour 27 h prévues.

Comparer le prévu et le réel, c'est ce qui permet de mieux estimer le projet suivant.

## 2026-11-27 : HSRP : un deuxième accès à Internet

- Statut : à relire
- Lien : https://forestmaxime-pf.fr/projets/hsrp.html
- Image proposée : projets/img/hsrp-13.webp

Nouveau compte rendu sur mon portfolio : un deuxième accès à Internet pour le réseau de RIOCA, l'entreprise fictive de notre BTS.

Tout le trafic passait par un seul routeur. En binôme, nous en avons ajouté un deuxième, avec HSRP : les deux routeurs partagent une adresse virtuelle, et si le premier tombe, le second prend le relais tout seul.

Le piège : si c'est l'opérateur qui tombe, le câble reste branché et le premier routeur se croit toujours en forme. Nous l'avons réglé avec IP SLA, qui vérifie toutes les 5 secondes que l'opérateur répond.

Maquette sur Packet Tracer, puis mise en place sur les routeurs Cisco et le pare-feu Zyxel : 11 tests validés, dont 5 pannes simulées. Et une leçon : sur le matériel, la bascule échouait à cause d'une route oubliée sur le pare-feu, trouvée grâce à un compteur du NAT resté à zéro.

#BTSSIO #Réseau #Cisco

## 2026-11-26 : Veille : des schémas pour comprendre SPF, DKIM et DMARC

- Statut : à relire
- Lien : https://forestmaxime-pf.fr/#veille-exigences-messagerie
- Image proposée : aucune (une capture du schéma « trajet d'un e-mail » de la fiche ferait une bonne image : à faire depuis le site en ligne)

Mes fiches de veille sur la sécurité de la messagerie étaient un long texte. J'y ai ajouté des schémas.

Le premier montre ce que fait le serveur qui reçoit un e-mail : il vérifie SPF (l'adresse IP d'envoi est-elle autorisée ?), DKIM (la signature est-elle bonne ?), puis DMARC (l'un des deux a-t-il réussi pour le domaine affiché dans « De : » ?). Ensuite, selon la politique du domaine, l'e-mail est livré, mis en spam ou refusé.

Les autres : les chiffres de l'Afnic sur les domaines en .fr en graphique, un enregistrement DMARC expliqué balise par balise, et les étapes pour passer de p=none à reject sans bloquer ses propres e-mails.

C'est ce que je règle pour mes clients, et ce que vérifie l'outil d'audit de mon homelab.

## 2026-11-20 : Veille, sujet 2 : où en est DMARC en France ?

- Statut : à relire
- Lien : https://forestmaxime-pf.fr/#veille-dmarc-france
- Image proposée : aucune

Nouvelle fiche de veille sur la sécurité de la messagerie : où en est DMARC en France ?

D'après l'Afnic (septembre 2025), un domaine en .fr sur cinq a un DMARC (19,5 %, contre 7,3 % en 2023). Mais parmi eux, près des deux tiers sont en p=none : un e-mail usurpé est quand même livré. Et la moitié n'a même pas d'adresse pour recevoir les rapports.

J'ai fait mon propre relevé le 20 novembre : google.com, laposte.net et impots.gouv.fr refusent les e-mails usurpés (p=reject), orange.fr les met en spam (quarantine)… et gmail.com reste en p=none.

Ce que j'en retiens : avoir un DMARC ne suffit pas. Il faut lire les rapports, puis passer par étapes de none à quarantine, puis à reject.

La fiche complète est sur mon portfolio : https://forestmaxime-pf.fr/#veille-dmarc-france

## 2026-11-20 : Audit de sécurité de l'Active Directory avec PingCastle (projet de BTS, en cours)

- Statut : à relire (mieux vaut peut-être attendre le contre-audit, après la séance du 26/11, pour poster avec la note finale)
- Lien : https://forestmaxime-pf.fr/projets/audit-ad.html
- Image proposée : projets/img/audit-ad-03.webp (la note de 85 sur 100 dans PingCastle), ou projets/img/apercu-audit-ad.jpg

En ce moment en BTS, nous auditons en binôme l'Active Directory de notre entreprise fictive, avec PingCastle.

Avant de lancer quoi que ce soit : une autorisation signée, un périmètre écrit et un instantané du contrôleur de domaine. L'audit se fait avec un simple compte utilisateur, sans droits d'administration : c'est ce que verrait quelqu'un qui aurait volé le mot de passe d'un salarié.

Résultat : 85 sur 100, sachant que plus c'est bas, mieux c'est. La note globale n'est pas une moyenne, c'est la pire des quatre catégories, et chez nous ce sont les comptes d'administration. Nous avons analysé les 34 règles déclenchées (point ANSSI, technique d'attaque MITRE, risque), puis écrit un plan de 17 corrections, chacune avec son test et son retour arrière. Objectif : 59 au plus. Les corrections et le contre-audit arrivent la semaine prochaine.

## 2026-11-20 : Serveur NAS TrueNAS et GPO (TP de BTS)

- Statut : à relire
- Lien : https://forestmaxime-pf.fr/projets/nas-gpo.html
- Image proposée : projets/img/nas-gpo-13.webp (le NAS qui se croit en 2025), ou projets/img/apercu-nas-gpo.jpg

Nouveau compte rendu sur mon portfolio : un serveur de fichiers et des GPO, en TP de BTS, en binôme.

De mon côté, j'ai monté le NAS. Sur un vrai serveur Dell, j'ai installé TrueNAS sur deux disques en RAID 1, joint au domaine Active Directory, avec quatre partages : un dossier par utilisateur, un par service, les outils et les sauvegardes. Mon binôme s'est occupé des GPO, avec mon aide. Elles préparent chaque poste tout seul : lecteurs réseau, fond d'écran imposé, panneau de configuration bloqué, Firefox et VLC installés au démarrage.

Deux pannes m'ont appris le plus. Le NAS refusait de rejoindre le domaine : il se croyait en 2025, et Kerberos refuse un écart de plus de 5 minutes. Et les logiciels ne s'installaient jamais : le port du poste était protégé par le 802.1X de notre TP précédent, qui reste fermé tant que personne ne s'est connecté. C'est le journal Windows qui l'a montré.

## 2026-11-20 : Spanning Tree : des liens de secours sur le LAN (TP de BTS)

- Statut : à relire
- Lien : https://forestmaxime-pf.fr/projets/spanning-tree.html
- Image proposée : projets/img/spanning-tree-02.webp (la photo de la baie avec les fibres), ou projets/img/apercu-spanning-tree.jpg

Nouveau compte rendu sur mon portfolio : le Spanning Tree, en TP de BTS, sur de vrais switchs Cisco.

Le réseau de l'entreprise fictive était en étoile : une seule fibre par étage, donc un câble coupé et tout l'étage perdait le réseau. J'ai ajouté des liens de secours, en cuivre vers le switch cœur et en fibre entre les étages, puis configuré le Spanning Tree en Rapid-PVST pour éviter les boucles.

Deux surprises. Sans réglage, c'était un switch d'étage qui commandait tout l'arbre, parce qu'il avait la plus petite adresse MAC. Et à coût égal, c'était la fibre qui était bloquée au profit du câble cuivre. Une fois la priorité et le coût réglés, j'ai coupé des fibres : le trafic est passé par le lien de secours, et pendant la coupure au rez-de-chaussée, aucun ping n'a été perdu.

## 2026-11-20 : 802.1X et RADIUS : un VLAN selon l'utilisateur (TP de BTS)

- Statut : à relire
- Lien : https://forestmaxime-pf.fr/projets/radius-8021x.html
- Image proposée : projets/img/radius-8021x-01.webp (le schéma de l'échange 802.1X), ou projets/img/apercu-radius-8021x.jpg

Nouveau compte rendu sur mon portfolio : l'authentification 802.1X, en TP de BTS, en binôme.

Avant, n'importe quel appareil branché sur une prise avait accès au réseau, et le VLAN dépendait du port. Maintenant, le switch Cisco bloque le port tant que l'utilisateur ne s'est pas identifié avec son compte Active Directory. Le serveur RADIUS (NPS, sous Windows Server) vérifie son groupe et renvoie le VLAN de son service, quel que soit le port ou l'étage. C'est moi qui ai configuré ce serveur RADIUS.

Nous avons noté 14 problèmes pendant la mise en place. Le plus long à trouver : une mise à jour Windows d'octobre bloquait l'envoi automatique des identifiants en PEAP, sans accord ni refus côté serveur. C'est le journal du poste qui l'a montré. En secours, nous avons aussi mis en place l'authentification par certificats (EAP-TLS), sans mot de passe.

## 2026-11-20 : ArchiSite : un site HTTPS dans la DMZ (projet de BTS)

- Statut : à relire
- Lien : https://forestmaxime-pf.fr/projets/archisite.html
- Image proposée : projets/img/archisite-09.webp (la case « Enable Policy Control » décochée trouvée pendant l'audit), ou projets/img/apercu-archisite.jpg

Nouveau compte rendu sur mon portfolio : ArchiSite, un projet de BTS en binôme. Le but : mettre en ligne le site d'une entreprise en HTTPS, dans une DMZ, avec la base de données isolée dans une seconde DMZ, comme le recommande l'ANSSI.

De mon côté : le serveur web Apache, une autorité de certification interne déployée sur les postes par GPO, un HTTPS durci (TLS 1.2 et 1.3 seulement, HSTS) et un serveur FTPS pour que les développeurs déposent le site.

Le moment le plus utile a été un test qui aurait dû échouer : la base de données arrivait à joindre le serveur web. En relisant le pare-feu à deux, nous avons trouvé le filtrage désactivé, les deux DMZ dans la même zone et la base publiée sur le Wi-Fi du campus. Tout a été corrigé, puis vérifié dans le journal du pare-feu. Une règle bien écrite ne protège rien tant qu'on n'a pas testé ce qui doit être refusé.

## 2026-11-20 : Homelab n°2, étape 2 : le pare-feu et la segmentation

- Statut : à relire
- Lien : https://forestmaxime-pf.fr/projets/homelab-si-etape-2.html
- Image proposée : projets/img/homelab-si-etape-2-09.webp (la Freebox bloquée depuis les 3 zones, adresse publique masquée)

Deuxième étape de mon homelab n°2 : un pare-feu OPNsense, dans une machine virtuelle, découpe le labo en quatre zones (administration, serveurs, postes clients, DMZ). Tout est refusé, sauf ce qui est écrit dans une matrice des flux.

Plutôt que de faire confiance à une capture des règles, j'ai écrit un script de 81 essais. Pour chacun, il connaît le résultat attendu et sépare « bloqué par le pare-feu » de « machine injoignable ». Ma première version prenait une VM éteinte pour un flux bloqué.

Ces essais ont confirmé un vrai trou : la règle « internet = tout sauf les réseaux privés » laissait les zones joindre ma box par son adresse publique. Je l'ai bloquée et j'ai réduit la sortie au web et à l'heure. Résultat : 81 essais, 0 écart. La fiche liste aussi ce que je n'ai pas encore essayé.

## 2026-11-20 : Homelab n°2 : un petit SI segmenté, défendu et supervisé (lancement et étape 1)

- Statut : à relire
- Lien : https://forestmaxime-pf.fr/projets/homelab-si.html
- Image proposée : projets/img/apercu-homelab-si.jpg (ou projets/img/homelab-si-etape-1-02.webp : la VM de test, 25,5 Mo occupés pour 20 Go annoncés)

Je commence un deuxième homelab, tourné vers la sécurité des infrastructures : un petit système d'information dans des machines virtuelles, avec des zones isolées derrière un pare-feu, un Active Directory et une détection des attaques avec Wazuh.

Un AD et un pare-feu, j'en ai déjà monté en cours. Ici, je veux mesurer : un score PingCastle avant et après le durcissement, puis des faiblesses classiques rejouées dans le labo, pour vérifier qu'elles sont détectées et corrigées.

Étape 1 : la virtualisation avec KVM, sur le serveur de mon premier homelab, sans rien casser de ce qui y tourne. Un volume réservé aux VM, des disques qui ne stockent que leurs différences avec un modèle commun, et mon compte gardé hors du groupe libvirt, même quand une mise à jour le remet dedans.

## 2026-11-08 : Suivre un paquet pas à pas sur le plan du portfolio

- Statut : à relire
- Lien : https://forestmaxime-pf.fr/#simulation
- Image proposée : aucune (une capture du paquet arrêté sur le trunk, avec son étiquette VID, serait à prendre sur le site en ligne)

Le simulateur de paquets de mon portfolio ne dit plus seulement « autorisé » ou « refusé » : on peut maintenant suivre le paquet pas à pas. La vue zoome sur lui, il avance de câble en câble, et à chaque arrêt un court texte explique ce qui se passe. On avance avec « Continuer », à son rythme.

Depuis Internet, le paquet vise une adresse publique, que le pare-feu traduit en adresse privée (NAT de destination), avant de lire ses règles et de noter la connexion dans sa table d'état. Entre deux VLAN, il monte jusqu'au pare-feu dans une trame qui porte l'étiquette 802.1Q du VLAN 10, puis redescend sur le même câble dans une nouvelle trame, avec celle du VLAN 20 : il passe deux fois par le switch, mais le TTL ne baisse qu'une fois, parce qu'un switch ne touche pas au paquet IP. Dans le même VLAN, rien ne change dans la trame, et le pare-feu ne la voit même pas.

S'il passe, le paquet vous emmène jusqu'à la rubrique du site. C'est une maquette, pas mon vrai réseau, mais chaque arrêt est une étape que je sais expliquer.

## 2026-11-08 : L'étiquette 802.1Q du plan se déplie

- Statut : à relire
- Lien : https://forestmaxime-pf.fr/
- Image proposée : aucune (une capture de l'étiquette dépliée serait à prendre sur le site en ligne)

Sur le plan de mon portfolio, le câble entre le pare-feu et le switch porte une petite étiquette « trunk 802.1Q ». En cliquant dessus, elle se déplie et montre ce qu'elle contient vraiment : 4 octets ajoutés dans la trame Ethernet.

Le TPID 0x8100 annonce une trame étiquetée, puis viennent la priorité (3 bits), un bit qui dit si la trame peut être jetée en premier, et le numéro du VLAN sur 12 bits. Cette étiquette n'existe que sur le trunk : elle disparaît dès que la trame ressort vers un poste.

Et une exception à connaître : le VLAN natif passe sans étiquette. On le met donc sur un VLAN où il n'y a aucun poste, pour qu'une trame à double étiquette ne puisse pas sauter d'un VLAN à l'autre.

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
