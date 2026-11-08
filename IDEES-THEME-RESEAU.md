# Thème réseau du portfolio : bilan des idées (07/11/2026)

Fichier de travail, non publié (exclu dans `_config.yml`).

## La question de départ

Faut-il construire tout le site comme un schéma réseau, façon Packet Tracer ? Une recherche d'idées a été faite avec deux points de vue (une recruteuse RH pressée sur téléphone, un RSSI qui recrute un alternant), puis une critique.

**Conclusion : non.** Le thème est déjà bien dosé :

- le plan de l'accueil en topologie ;
- la trame Wireshark ;
- le contact en pare-feu ;
- les certifications façon certificat ;
- la page 404.

Le meilleur gain vient de deux choses : rendre exact ce qui existe, et ajouter de vraies preuves, plutôt que de nouveaux décors.

## Règles retenues pour tout élément du thème

- Le contenu reste lisible tel quel par un RH ; l'outil réseau n'est que la forme.
- Chaque détail technique affiché doit être exact (ports, champs, IP cohérentes) : un RSSI le verra et posera la question en entretien.
- Seulement des outils que Maxime a pratiqués : Packet Tracer, Wireshark, traceroute et ping, commandes Cisco `show`, ACL et pare-feu, syslog et Wazuh, Nmap, Kali, Debian, Ubuntu. Pour tout autre outil, lui demander.
- Pas de fausse sortie de commande, pas de fausse alerte.
- Aucune information ne passe par la seule couleur, et le rendu à l'impression est vérifié.
- Chaque modification du CSS oblige à augmenter `?v=N` dans toutes les pages.

## Décisions de Maxime (07/11/2026)

1. **Corriger les 3 erreurs** :
   - stage 2027 affiché « en cours » ;
   - champ « Objet » des certifications (en X.509, c'est le titulaire) ;
   - contact à rendre exact : matrice des flux.
2. **Encadrés « Vérification »** dans les comptes rendus : une vraie commande et ce qu'elle a montré.
3. **« Résultat »** sur les cartes Projets, et **« En bref »** en haut des pages Homelab, Infra-Site, Maquette RIOCA et GLPI.
4. **Compétences** : garder les étiquettes, et faire d'une dizaine d'entre elles des liens « preuve » vers les comptes rendus.

## Idées qui ont divisé (non retenues pour l'instant)

- **Plan du site trop haut sur mobile.** Pour : il prend presque un écran. Contre : le nom, la recherche et les boutons sont déjà au-dessus. À décider après un essai sur téléphone.
- **Page « Errata » et `/.well-known/security.txt` (RFC 9116).** Les deux montrent de la rigueur, mais :
  - `security.txt` doit porter une date `Expires` (moins d'un an conseillé), donc il faut le refaire chaque année ;
  - il faut passer par `include` dans `_config.yml`, **jamais** par `.nojekyll`, qui publierait les fichiers de travail.

## Idées écartées

- **Veille en fausses alertes Wazuh** : attendre le 2e projet homelab et une vraie alerte, nettoyée.
- **Parcours en `traceroute`** : il faudrait inventer des données, et `* * *` veut dire « ne répond pas ». Éventuellement sur la page 404.
- **Faux scan Nmap des compétences** : un gadget.

## Rappels

- **Janvier 2027** : le stage Pyroalliance de 2e année passe de « À venir » à « En cours » (rubrique Parcours de `index.html`).

## Ce qui a été fait (07/11/2026, commits locaux, à pousser après relecture)

- **Parcours** : stage 2027 « à venir », BTS et micro-entreprise « en cours », en toutes lettres.
- **Certifications** : « Délivré par » et « Délivré le », lien Credly du badge Cato. Pas de « Délivré à », parce que le nom sur les attestations Cisco est à faire corriger. À ajouter, avec les liens de vérification Cisco, quand Cisco aura corrigé le nom.
- **Contact** : matrice des flux. Envoi par SMTP 587 ou 465, ou par webmail en HTTPS 443, jusqu'au serveur d'envoi du visiteur ; HTTPS 443 vers LinkedIn et GitHub. Pas de port 25 (c'est un échange entre serveurs), pas de ligne de refus (personne ne l'applique). fw-contact · 10.0.10.1.
- **Projets** : ligne « Résultat » sur les 9 cartes qui ont un compte rendu, et dans l'en-tête d'Infra-Site, de RIOCA et de GLPI. L'encadré « En bref » prévu au départ a été abandonné : l'en-tête des pages avait déjà le résumé et le contexte.
- **Vérification** : 5 encadrés (Infra-Site parties 6 et 7, RIOCA parties 4 et 5, GLPI partie 3), tirés des captures déjà publiées.
- **Compétences** : 23 liens « preuve » (dont 4 vers la fiche du stage).
- **Infra-Site, figure 6** : recadrée, elle montrait la clé publique SSH du switch.

## Éléments « fun » du plan de l'accueil (/idees du 07/11/2026, après-midi)

Recherche avec trois points de vue (recruteuse RH sur téléphone, RSSI, développeuse front), puis une critique. Avis commun : du fun, oui, s'il reste facultatif, exact, et lancé par le visiteur. Les pressés regardent ce qu'ils veulent, les extras sont pour les curieux.

**Fait (commits locaux, à pousser après la relecture de niveau 3)** :

- **Capture** : le bouton s'appelle « Mon profil en bref, façon capture Wireshark ».
- **LED d'activité** : elles clignotent quand un paquet arrive, et sont allumées et fixes à l'impression.
- **Étiquette « trunk 802.1Q »** sur le lien sw-coeur–fw-contact (« 802.1Q » sur mobile).
- **Simulateur « Envoyer un paquet sur le plan »** (`#simulation`) :
  - un pare-feu à état, avec 4 règles : HTTPS et HTTP depuis le wan vers les 6 équipements, SSH, HTTPS et ping depuis pc-maxime vers fw-contact et le VLAN 20, et un refus par défaut ;
  - dans le même VLAN, le paquet ne passe pas par fw-contact ;
  - une phrase dit que c'est une maquette, et qu'en vrai ce serait une DMZ (lien vers Infra-Site partie 9) ;
  - les 56 combinaisons ont été testées.
- **Tempête de broadcast** : un câble pend sous sw-coeur. Branché (clic ou clavier), il fait une boucle : des paquets envahissent la page pendant 4 s, puis une phrase explique le rôle du STP.
- **Console** : un message pour ceux qui ouvrent les outils de développement. **Onglet** : « Connexion perdue… » quand on le quitte.
- **Compétences** : « SSH » mène au homelab, étape 1. « ACL » n'a plus de lien, parce que la partie 10 d'Infra-Site est le travail du binôme.

**Animations même en mouvement réduit** (décision de Maxime, 07/11/2026) : la tempête et le paquet du simulateur se lancent même quand le système demande moins d'animations, comme le trafic du plan. Ils ne partent que sur un clic du visiteur et durent moins de 5 s. Seul le bouton pause du plan les arrête (le simulateur affiche alors le verdict sans animation).

**Écarté** :

- **Refus en boucle dans le trafic automatique** : ça ressemble à une panne. Et dans Infra-Site, le filtrage entre VLAN est sur le switch cœur, pas sur le pare-feu.
- **Refus sur la 404** : une 404 n'est pas un refus.
- **Tampon cliquable** : il ferait doublon avec « Me contacter ».
- **Trame « après NAT »** : la preuve citée parlait d'un serveur de DMZ, et le site est servi en HTTP/3.
- **« Vous êtes ici » qui suit la visite**, **fichier Packet Tracer du plan**, **« Avancer d'un pas »** : coût trop élevé ou effet faux.

**wan → pc-maxime en HTTPS : on garde l'autorisation** (choix de Maxime, 07/11/2026). La note sous le tableau des règles reconnaît qu'en vrai, un poste de travail ne serait pas joignable depuis Internet.

**Fait et en ligne (08/11/2026, après relecture de niveau 3) : le paquet du simulateur voyage jusqu'à la rubrique.**
- **Autorisé ou livré** : 450 ms après l'arrivée sur l'équipement, le paquet sort du plan (`span.paquet-voyage` en `position: fixed`) et file vers le numéro de la rubrique. La page défile en même temps, pilotée image par image (`requestAnimationFrame`, durée de 0,7 à 1,5 s), pour que le paquet et la page arrivent ensemble dans tous les navigateurs. Le numéro s'allume (classe `arrivee`) et le focus passe sur le titre `h2` de la rubrique, comme après un lien. Si le visiteur fait défiler lui-même pendant le vol, la page le laisse faire.
- **Refusé : jeté, rien ne revient** (choix de Maxime) : DENY veut dire « jeté sans réponse », un retour vers wan ferait penser à un REJECT. Le paquet tremble contre fw-contact puis disparaît, la croix reste, et le verdict ajoute « Le paquet est jeté sans réponse : la connexion finit en délai dépassé » (« le ping attend un écho qui ne vient pas » pour ICMP).
- **Pause** : pas de voyage. Une pause en plein vol retire le paquet, sans allumer la rubrique ni déplacer le focus (il reste sur le bouton pause).
- **Le visiteur reprend la main pendant le vol** (il défile ou clique dans le menu) : le paquet finit son vol, mais la rubrique ne s'allume pas et le focus ne bouge pas.
- **Testé** dans Chromium (Playwright) : les 56 combinaisons sur ordinateur, 8 au téléphone (390 px) et 8 en mouvement réduit, plus la pause avant et pendant le vol, un nouvel envoi pendant un vol et le clavier (Entrée, puis focus sur le titre). Aucune erreur dans la console. Le menu fixe reste en haut pendant tout le vol (mesuré image par image).

**Idée de départ** (Maxime, 07/11/2026) :
- **autorisé** (ex. : HTTPS vers Compétences) : le paquet arrive sur l'équipement du plan, puis sort du schéma et file vers la rubrique pendant que la page y défile, et la rubrique s'allume brièvement à l'arrivée. Même technique que la tempête (`span` en `position: fixed` + `element.animate()`, compatible CSP) ;
- **refusé** : pas d'envoi vers une page d'erreur ni vers l'accueil (une 404 veut dire « introuvable », pas « refusé », et le visiteur sortirait du simulateur). Le paquet s'écrase sur fw-contact avec la croix, puis revient vers « wan · Vous êtes ici » ;
- **à tester** : le défilement sur téléphone (la rubrique peut être loin du schéma), le bouton pause (le simulateur affiche alors le verdict sans animation), le même VLAN, le clavier. Les animations se lancent même en mouvement réduit (voir plus haut) ;
- effort moyen. Le code du simulateur est dans `script.js` (fonctions `chemin`, `afficher`, et le clic sur `#simu-go`).

**À discuter plus tard** :

- **Verdict qui sort de l'écran** (relecture du 08/11/2026, choix de Maxime en attente) : quand le paquet passe, le verdict disparaît environ 1 s après son affichage, et il faut remonter jusqu'au simulateur pour un 2e essai. Options : garder tel quel, attendre plus longtemps avant le départ, rappeler la règle à l'arrivée, ou ajouter un lien « Revenir au simulateur ».
- **À essayer sur un vrai téléphone, dans Firefox et Safari, et avec NVDA** (testé seulement dans Chromium). Le script devine que le visiteur reprend la main quand la page bouge sans lui (écart de plus de 2 px). Au téléphone, la barre d'adresse qui se replie pourrait le tromper : la rubrique ne s'allumerait pas et le focus ne bougerait pas, sans autre conséquence.

- un paquet retour sur le plan ;
- l'objet déjà rempli dans le lien e-mail ;
- le quiz « Passe ou pas ? » sur la partie 9 d'Infra-Site.

**Remarque** : à l'impression, la page 2 de l'accueil sort vide (le cadre du plan est coupé en deux). C'était déjà le cas avant ces changements.

## Points ouverts

- **RGPD** : « parcours complet » confirmé par Maxime le 07/11/2026. Les modules se débloquent dans l'ordre et le module 6 est le dernier ; l'attestation du module 6 (19/10/2026, 93 %) est dans `~/badges`.
- **Carte du stage Pyroalliance** : pas de ligne « Résultat » (elle n'a pas de page de compte rendu).

## Surprises cachées (/idees du 08/11/2026)

Recherche avec trois points de vue (RSSI qui fouille le site, développeuse front créative, recruteuse RH sur téléphone), puis une critique. Question de départ : d'autres surprises « cachées », qui ne gênent pas le visiteur pressé, et la POV (caméra qui suit le paquet du simulateur).

**La POV** : une vraie vue à la première personne en 3D est écartée par tous (un tunnel vide, le mal des transports, le plan perdu). Version retenue : d'abord « Ce qu'a vu le paquet », en texte sous le verdict ; plus tard, peut-être, une caméra qui zoome dans le cadre du plan (`viewBox` réécrit à chaque image), en option (case « Suivre le paquet »).

**À faire (gardé par Maxime), dans cet ordre** :

1. **Corriger 3 défauts déjà en ligne** :
   - même VLAN : le verdict dit que sw-coeur relie les deux équipements, mais le paquet dessiné passe par la barre du VLAN sans toucher sw-coeur (on croirait un hub) ;
   - en-têtes Cloudflare : `/projets/glpi` (page servie sans `.html`) et les 404 comme `/nexiste-pas` n'ont ni la CSP en en-tête ni `X-Frame-Options` (vérifié par `curl -I`) ; à corriger dans la règle Cloudflare ;
   - pause pendant le trajet sur le plan : le verdict s'affichait pendant que le paquet restait figé à mi-chemin (`setTimeout` qui continuait).
2. **L'étiquette « trunk 802.1Q » se déplie** : ses 4 octets (TPID 0x8100, PCP 3 bits, DEI 1 bit, VID 12 bits = 10 ou 20), « elle n'existe que sur ce câble », plus une phrase sur le VLAN natif (sans étiquette). Zone de 24 px au moins à toucher sur mobile, cachée à l'impression.
3. **Touche « ? » façon aide de Cisco IOS** : la liste des raccourcis (1 à 7 pour les rubriques, P pour la pause) et des surprises cachées. Interrupteur pour couper les raccourcis (WCAG 2.1.4). Piège : en AZERTY, « ? » et les chiffres se tapent avec Maj (tester `e.key` et `e.code`).
4. **« Ce qu'a vu le paquet »** sous le verdict : règle et table d'état sur fw-contact, TTL −1 et MAC réécrites, étiquette 802.1Q ajoutée puis retirée, rien ne change dans le même VLAN. À trancher par Maxime : le NAT (une adresse en 10.0.x.x n'est pas joignable depuis le wan sans lui) et le double passage par sw-coeur.
5. **Pour ceux qui lisent le code** : commentaire de 3 lignes en tête d'`index.html` (fait main, CSP en `<meta>` et en en-tête) ; un `robots.txt` à soi (« robots.txt n'est pas un contrôle d'accès, le code est public »). Cloudflare ajoute déjà ses lignes en tête.
6. **Petites gênes** : la page 2 vide à l'impression de l'accueil ; un lien « Revenir au simulateur » quand le paquet est arrivé.

**À discuter** :

- **Caméra qui zoome** : faisable, mais beaucoup de pièges (`marquer`, `getScreenCTM`, la pause, le plan mobile), et des panneaux qui défilent en 3 s ne se lisent pas.
- **« Votre vrai paquet »** : les vraies mesures du chargement du visiteur (Performance API : h2 ou h3, DNS, TLS, premier octet). Support Safari non vérifié ; « h3 » (QUIC, UDP 443) à côté de « HTTPS · TCP 443 » demande une nuance.
- **`security.txt`** (déjà en attente) : `Expires` à refaire chaque année, contact `mailto:` plus clair qu'un lien vers #contact.
- **Lexique au toucher** (VLAN, 802.1Q, ALLOW/DENY, 443) : utile à une RH, mais pas caché, et du bruit pour le visiteur pressé.
- **Bouton « Transmettre à l'équipe technique »** (partage du téléphone) : pas une surprise.
- **QR code sur le CV papier** : plutôt vers l'accueil que vers le simulateur, adresse écrite en clair à côté (un QR inconnu ressemble à de l'hameçonnage).
- **Idée audacieuse : « Voir ma CSP bloquer »** : 4 ou 5 tentatives figées (script en ligne, `eval`, `onclick` en attribut, `setAttribute('style')`, image externe), avec le vrai rapport `securitypolicyviolation` du navigateur. Aucun champ libre, ne jamais assouplir la CSP ; sans doute deux rapports par tentative (CSP en `<meta>` et en en-tête).

**Écarté** : la POV 3D ; le service worker hors ligne (presque personne ne le verrait, cache périmé) ; la fiche `.vcf` ; le fichier `.pcapng` à ouvrir dans Wireshark (capture fabriquée, adresses impossibles sans NAT ; la vraie preuve Wireshark sera une vraie capture du homelab).

**À retenir** : la carte « Ce portfolio » dit que le site est fait avec l'aide d'une IA. Un effet front très poussé sera donc mis au crédit de Claude : préférer les surprises dont Maxime explique le fond réseau (802.1Q, table d'état, trajet du paquet).

**Non vérifié** : la Performance API sur Safari, le double rapport de la CSP, `e.key` et `e.code` en AZERTY selon les navigateurs, l'onglet « Connexion perdue… » vu depuis un iPhone, la fluidité du zoom sur un vieux téléphone.

**Avancement des 3 défauts (08/11/2026)** :

- **En-têtes Cloudflare : corrigé et en ligne.** Deux règles « Response Header Transform Rules » dans Cloudflare :
  1. « En-têtes de sécurité (toutes les réponses) » : HSTS, nosniff, Referrer-Policy, Permissions-Policy ;
  2. « CSP et anti-cadre (pages HTML) » : Content-Security-Policy (avec `frame-ancestors 'none'`) et `X-Frame-Options: DENY`. Son filtre était « chemin = `/`, finit par `/` ou par `.html` » ; il est maintenant `(http.response.content_type.media_type eq "text/html")` (accepté avec l'offre gratuite).

  Vérifié par `curl -I` : CSP et anti-cadre sur `/`, `/projets/glpi` (sans `.html`), `/projets/glpi.html`, les 404 (`/nexiste-pas`, `/truc.php`) ; rien sur le CSS, les images ni le PDF du CV (ce ne sont pas des pages).
- **Même VLAN et pause pendant le trajet : corrigés, commit local** (`script.js` en v=8), en attente de la relecture de niveau 3. Le paquet du même VLAN passe maintenant par le port de sw-coeur. En pause, le paquet est figé et le verdict attend la reprise. Testé dans Chromium : trajet relevé image par image (ordinateur et 390 px), pause en plein trajet (autorisé et refusé), nouvel envoi pendant la pause. Sur les 56 combinaisons, seuls les 8 verdicts du même VLAN changent ; aucune erreur dans la console.

**Étape 2, l'étiquette « trunk 802.1Q » (08/11/2026) : faite, commit local**, en attente de la relecture de niveau 3. Un clic (ou Entrée, Espace) sur l'étiquette du plan déplie un panneau sous le plan : les 4 champs (TPID 0x8100, PCP, DEI, VID 10 ou 20), les octets en hexadécimal (`81 00 00 0a`, `81 00 00 14`), « elle n'existe que sur ce câble » et le VLAN natif. Sans JavaScript, l'étiquette reste un simple texte. `style.css` en v=8, `script.js` en v=9. Testé dans Chromium (1280, 761, 390 et 320 px) : zone à toucher de 24 px au moins (41 x 25 px à 320 px, 55 x 24 px à 761 px, le pire cas), clic, toucher et clavier, focus qui reste sur l'étiquette, la page ne saute pas, caché à l'impression, aucune case ne déborde, aucune erreur dans la console.

Corrections après la relecture (session relecture-etiquette-8021q) : la zone de clic de l'étiquette ne prend plus sur celle de fw-contact (texte resté au milieu du câble ; c'est la zone vide de fw-contact, à droite de son nom, qui a été réduite : 0 % pris aux 4 largeurs) ; le panneau vient à l'écran quand on le déplie (avant, sur téléphone, il s'ouvrait hors de l'écran) ; Entrée maintenue ne fait plus clignoter le panneau ; « ici 0 » ajouté pour PCP et DEI ; le post LinkedIn donne la raison du VLAN natif vide (double étiquette).


**Étape 4, « Ce qu'a vu le paquet » (08/11/2026) : faite, commit local**, en attente de la relecture de niveau 3. Choix de Maxime : le NAT est montré (NAT de destination, « l'adresse publique de srv-projets », aucune adresse publique inventée), et le double passage par sw-coeur est détaillé (étiquette 10 à la montée, 20 à la descente, TTL qui baisse une seule fois). Un bloc dépliable `#simu-vu` sous le verdict, en dehors du `role="status"` (sinon le lecteur d'écran lirait toute la liste), rempli par la fonction `raconter` de `script.js` ; caché pendant le trajet et pour « Rien n'est parti ». `style.css` en v=11, `script.js` en v=10. Testé dans Chromium : les 56 récits relus (`combos.txt` du test), ouverture gardée d'un envoi à l'autre, pas de débordement à 390 et 320 px, aucune erreur dans la console.
- Reste vrai : quand le paquet passe, la page part vers la rubrique, et il faut remonter pour lire le récit (même souci que le verdict, choix en attente : lien « Revenir au simulateur »).
