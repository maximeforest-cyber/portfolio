---
name: publier-etape
description: Publier sur le portfolio forestmaxime-pf.fr une étape validée du homelab (fiche de ~/homelab/portfolio/), avec page, captures WebP, image d'aperçu LinkedIn, tableau des étapes, navigation et entrée dans A-PUBLIER.md. À utiliser quand Maxime demande de publier ou d'ajouter l'étape N du homelab sur le site. Argument : le numéro de l'étape.
argument-hint: "[numéro de l'étape]"
disable-model-invocation: true
---

# Publier l'étape N du homelab

Avant tout : `git pull` (s'il échoue, s'arrêter et prévenir Maxime). Relire les règles du point 3 de `CLAUDE.md` (ce qui ne se publie jamais, captures à vérifier) : elles s'appliquent à chaque étape ci-dessous.

Vérifier d'abord que la fiche `~/homelab/portfolio/etape-N-….md` est validée et ne porte plus la mention « BROUILLON ». Sinon, s'arrêter et le dire à Maxime.

1. Copier `projets/homelab-etape-2.html` en `projets/homelab-etape-N.html` et adapter : `<title>`, `description`, `canonical`, `og:*`, le kicker (« étape N sur 10 » et la date de validation), les `facts`, les tags, puis les 6 parties (objectif, schéma et technologies, configuration, tests réussis, problèmes rencontrés, ce que j'en retiens). Le schéma ASCII de la fiche va dans `<pre class="cmd schema" role="img" aria-label="…">`, avec une description du schéma dans `aria-label`.
   Image d'aperçu LinkedIn : ajouter l'étape dans `_outils/apercu.py` (titre sur 2 lignes ; le sous-titre n'est plus affiché, trop petit dans LinkedIn), lancer `python3 -I _outils/apercu.py <dossier-temporaire> projets/img`, convertir en JPG (`ffmpeg -i X.png -q:v 2 -pix_fmt yuvj444p X.jpg` ; en PNG, l'aperçu LinkedIn était flou), regarder l'image, puis pointer `og:image` (avec `og:image:width`, `og:image:height`, `og:image:alt`) vers `projets/img/apercu-homelab-etape-N.jpg`. `apercu.py` réécrit un PNG pour **toutes** les pages de sa liste : ne convertir que celui de l'étape N, puis supprimer tous les `projets/img/apercu-*.png` (seuls les JPG sont publiés).
2. Captures : `projets/img/homelab-etape-N-NN.webp`, numérotées dans l'ordre du tableau des tests (`<figure class="shot" id="fig-N">`, et la colonne « Preuve » renvoie vers `#fig-N`). Conversion avec `ffmpeg` : WebP sans perte pour les captures de terminal, avec perte (`-quality 88`) quand c'est plus léger (captures floutées, photos) ; réduire les captures de téléphone à environ 1 000 px de haut. Flouter par pixellisation, puis regarder le résultat avant de publier.
3. `projets/homelab.html`, tableau `#etapes` : l'étape passe à `<span class="etat ok">Validée</span> le JJ/MM/AAAA` avec le lien « Lire la fiche », la suivante à `<span class="etat cours">En cours</span>` ; mettre à jour la ligne « Avancement » de l'en-tête.
4. Navigation `pager` : la fiche N-1 reçoit un lien « Suivant » vers la fiche N ; la fiche N a « Précédent » vers la fiche N-1 et un `<span></span>` à droite.
5. La carte `#projet-homelab` de `index.html` ne change pas (elle ne donne pas l'avancement). Ajouter l'entrée dans `A-PUBLIER.md` (format du point 4 de `CLAUDE.md`).

Avant le commit : ouvrir la page en local (`python3 -m http.server`, http://localhost:8000/projets/homelab-etape-N.html), vérifier les captures, les liens « Précédent / Suivant » et l'absence d'erreur CSP. Puis commit en français, **sans pousser** : le push met le site en ligne en une à deux minutes. Demander à Maxime : « push maintenant, ou attendre les autres étapes ? ».
- Avant le push : relecture de niveau 3 (voir `~/.claude/CLAUDE.md`), par une relectrice ouverte dans `~/homelab` (là où sont les fiches). Elle compare chaque page à sa fiche et vérifie toutes les captures. Quand plusieurs étapes attendent, une seule relecture pour toutes, puis un seul push.
- Dire à Maxime ce qui n'a pas pu être vérifié (rendu sur téléphone, aperçu dans LinkedIn).
