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
   - contact à rendre exact : matrice des flux, ports 443 / 587 / 25, refus par défaut.
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
