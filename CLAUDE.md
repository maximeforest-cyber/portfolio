# Portfolio forestmaxime-pf.fr : consignes pour Claude

Mon portfolio de BTS SIO option SISR. On se tutoie, en français simple. Tout le contenu du site est en français.

## 1. Comment le site est fait et hébergé

- Site statique écrit à la main : HTML, CSS et JavaScript simples, sans framework, sans dépendance, sans étape de build.
- Hébergé sur **GitHub Pages** depuis la branche `main` du dépôt public `maximeforest-cyber/portfolio` (remote SSH `git@github.com:maximeforest-cyber/portfolio.git`). Domaine `forestmaxime-pf.fr` (fichier `CNAME`, ne pas y toucher). Un `git push` sur `main` met le site en ligne en une à deux minutes.
- `_config.yml` sert uniquement à exclure de la publication les fichiers de travail (`CLAUDE.md`, `A-PUBLIER.md`) : tout nouveau fichier de travail en Markdown doit y être ajouté, sinon GitHub Pages le publie en page web.
- Fichiers :
  - `index.html` : la page unique, avec ses rubriques (`#a-propos` avec le CV intégré, `#competences`, `#projets`, `#parcours`, `#certifications`, `#veille`, `#contact`) ;
  - `style.css` et `script.js` : partagés par toutes les pages ;
  - `projets/*.html` : un compte rendu par projet, tous bâtis sur le même modèle (parties `<div class="part" id="partie-N">` avec titre `<h2><span class="n">0N</span>…</h2>`, captures en `<figure class="shot">`, navigation `pager` Précédent / Suivant en bas) ;
  - `projets/img/` : captures en **WebP**, nommées `<projet>-NN.webp`, avec `width`, `height`, `alt` et `loading="lazy"` sur chaque `<img>` ;
  - `fichiers/` : archives à télécharger ; PDF du CV et du rapport de stage à la racine ; badges `badge-*.png`.
- Un nouveau projet = une page dans `projets/` (copiée d'une page existante), une carte `<article class="card project">` dans `#projets` de `index.html`, et la mise à jour des liens `pager` des pages voisines.
- Sécurité : chaque page a une CSP stricte en `<meta>` (`default-src 'none'`, scripts, styles et images en `'self'` seulement). Donc pas de `<script>` ni de `style="…"` en ligne, pas de CDN, pas de police ou d'image externe : tout est dans le dépôt. Garder aussi `canonical`, `og:*` et la `description` à jour sur chaque page.
- Pour voir le site en local : `python3 -m http.server` à la racine du dépôt, puis http://localhost:8000.

## 2. Git : toujours pull avant, push après

Claude Desktop travaille aussi sur ce dépôt.

- **Avant toute modification** : `git pull`. Si le pull échoue (conflit, accès refusé), s'arrêter et me prévenir, ne rien modifier.
- **Après chaque modification** : commit (message en français qui dit ce qui change sur le site, comme dans l'historique) puis `git push` tout de suite, pour que Claude Desktop reparte de la dernière version.
- La clé SSH a une phrase de passe : si GitHub répond `Permission denied (publickey)`, me demander de taper `! ssh-add ~/.ssh/id_ed25519`, puis réessayer.

## 3. Publier depuis le homelab (`~/homelab/portfolio/`)

Les fiches d'étape du homelab sont rédigées dans `~/homelab/portfolio/` (fiches `etape-N-….md`, captures dans `captures/etape-N/`).

- Ne publier sur le site **que les fiches et les captures choisies**. Jamais les fichiers bruts : `.txt`, relevés (`docs/releves/`), sorties de commandes, fichiers de configuration.
- Avant de publier une capture, la regarder et vérifier qu'elle ne montre **aucune adresse IP publique, aucun e-mail, aucune clé (privée, publique ou empreinte complète), aucun jeton, aucun nom de Wi-Fi (SSID)**, ni aucun nom de prospect. Si c'est le cas : la flouter ou la recadrer, ou ne pas la publier, et me le dire. Même vérification sur le texte de la fiche.
- Une fiche publiée devient une page `projets/*.html` sur le modèle des autres (pas de Markdown en ligne), et les captures sont converties en WebP dans `projets/img/`.
- Ne jamais publier une fiche qui porte encore la mention « BROUILLON » en haut.

### Ajouter une étape du homelab (une fiche validée)

1. Copier `projets/homelab-etape-2.html` en `projets/homelab-etape-N.html` et adapter : `<title>`, `description`, `canonical`, `og:*`, le kicker (« étape N sur 10 » et la date de validation), les `facts`, les tags, puis les 6 parties (objectif, schéma et technologies, configuration, tests réussis, problèmes rencontrés, ce que j'en retiens). Le schéma ASCII de la fiche va dans `<pre class="cmd schema" role="img" aria-label="…">`, avec une description du schéma dans `aria-label`.
   Image d'aperçu LinkedIn : ajouter l'étape dans `_outils/apercu.py` (titre sur 2 lignes, sous-titre), lancer `python3 -I _outils/apercu.py <dossier-temporaire> projets/img`, regarder l'image, puis pointer `og:image` (avec `og:image:width`, `og:image:height`, `og:image:alt`) vers `projets/img/apercu-homelab-etape-N.png`.
2. Captures : `projets/img/homelab-etape-N-NN.webp`, numérotées dans l'ordre du tableau des tests (`<figure class="shot" id="fig-N">`, et la colonne « Preuve » renvoie vers `#fig-N`). Conversion avec `ffmpeg` : WebP sans perte pour les captures de terminal, avec perte (`-quality 88`) quand c'est plus léger (captures floutées, photos) ; réduire les captures de téléphone à environ 1 000 px de haut. Flouter par pixellisation, puis regarder le résultat avant de publier.
3. `projets/homelab.html`, tableau `#etapes` : l'étape passe à `<span class="etat ok">Validée</span> le JJ/MM/AAAA` avec le lien « Lire la fiche », la suivante à `<span class="etat cours">En cours</span>` ; mettre à jour la ligne « Avancement » de l'en-tête.
4. Navigation `pager` : la fiche N-1 reçoit un lien « Suivant » vers la fiche N ; la fiche N a « Précédent » vers la fiche N-1 et un `<span></span>` à droite.
5. La carte `#projet-homelab` de `index.html` ne change pas (elle ne donne pas l'avancement). Ajouter l'entrée dans `A-PUBLIER.md`.

## 4. À chaque nouveauté : une entrée dans `A-PUBLIER.md`

À chaque nouveauté mise sur le site (projet, étape du homelab, certification, veille, mise à jour du CV…), ajouter une entrée **en haut** de `A-PUBLIER.md`. Ce fichier sert à préparer mes posts LinkedIn, que je publie avec Claude Desktop. Format :

```markdown
## AAAA-MM-JJ : <titre de la nouveauté>

- Statut : à relire
- Lien : https://forestmaxime-pf.fr/<page>
- Image proposée : <chemin d'une capture déjà publiée, ou « aucune »>

<texte du post LinkedIn proposé, prêt à relire : court, en français simple, à la première personne, sans exagérer ce que j'ai fait>
```

Je relis et je corrige le texte ; c'est moi qui passe le statut à « publié ». Le texte ne contient que ce qui est déjà visible sur le site (mêmes règles qu'au point 3).
