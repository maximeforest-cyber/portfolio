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

**Prochaine tâche (nouvelle session) : le paquet du simulateur voyage jusqu'à la rubrique.** Idée de Maxime, 07/11/2026 :
- **autorisé** (ex. : HTTPS vers Compétences) : le paquet arrive sur l'équipement du plan, puis sort du schéma et file vers la rubrique pendant que la page y défile, et la rubrique s'allume brièvement à l'arrivée. Même technique que la tempête (`span` en `position: fixed` + `element.animate()`, compatible CSP) ;
- **refusé** : pas d'envoi vers une page d'erreur ni vers l'accueil (une 404 veut dire « introuvable », pas « refusé », et le visiteur sortirait du simulateur). Le paquet s'écrase sur fw-contact avec la croix, puis revient vers « wan · Vous êtes ici » ;
- **à tester** : le défilement sur téléphone (la rubrique peut être loin du schéma), le bouton pause (le simulateur affiche alors le verdict sans animation), le même VLAN, le clavier. Les animations se lancent même en mouvement réduit (voir plus haut) ;
- effort moyen. Le code du simulateur est dans `script.js` (fonctions `chemin`, `afficher`, et le clic sur `#simu-go`).

**À discuter plus tard** :

- un paquet retour sur le plan ;
- l'objet déjà rempli dans le lien e-mail ;
- le quiz « Passe ou pas ? » sur la partie 9 d'Infra-Site.

**Remarque** : à l'impression, la page 2 de l'accueil sort vide (le cadre du plan est coupé en deux). C'était déjà le cas avant ces changements.

## Points ouverts

- **RGPD** : « parcours complet » confirmé par Maxime le 07/11/2026. Les modules se débloquent dans l'ordre et le module 6 est le dernier ; l'attestation du module 6 (19/10/2026, 93 %) est dans `~/badges`.
- **Carte du stage Pyroalliance** : pas de ligne « Résultat » (elle n'a pas de page de compte rendu).
