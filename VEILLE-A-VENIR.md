# Veille : fiches à venir (non publiées)

Fichier de travail, exclu de la publication dans `_config.yml`. Une seule fiche de veille par mois (objectif : 6 fiches sur l'année). Ces fiches ont été retirées du site le 29/10/2026 pour sortir aux mois suivants. Le sujet 2 (DMARC en France) a été publié le 20/11/2026.

| Mois prévu | Fiche |
|---|---|
| Décembre 2026 | Sujet 3 : le phishing à l'ère de l'IA, et les limites de DMARC |

Avant de publier une fiche :

- remettre à jour les chiffres (nouvelle étude de l'Afnic ? nouveau rapport de Cybermalveillance.gouv.fr ?) et vérifier que chaque source est toujours en ligne ;
- changer le mois dans `<p class="meta">Sujet N · … 2026</p>` ;
- ajouter l'entrée LinkedIn en haut de `A-PUBLIER.md`.
- garder le même format que les sujets 1 et 2 : un encadré « En bref » de 3 lignes en haut de la fiche, et au moins un schéma (classes `.bref`, `.hl-fig`, `.graph`, `.etapes` dans `style.css`, section Veille).

Le code HTML est prêt à coller dans `index.html`, dans la grille de « La sécurité de la messagerie », après la fiche du sujet 2. Avec trois fiches, passer la grille de `grid g2` à `grid g3`.

## Sujet 3 (décembre 2026)

```html
      <article class="card" id="veille-phishing-ia">
        <p class="meta">Sujet 3 · octobre 2026</p>
        <h3>Le phishing à l'ère de l'IA, et les limites de DMARC</h3>
        <p>L'hameçonnage est devenu la première menace en France, et DMARC ne suffit pas à l'arrêter.</p>
        <details>
          <summary>Lire la veille</summary>
          <div class="fiche">
            <h4>Le constat</h4>
            <p>Dans son rapport d'activité 2025, publié le 26 mars 2026, Cybermalveillance.gouv.fr place l'hameçonnage (par e-mail, SMS ou appel) au premier rang des menaces, tous publics confondus, en hausse de 70 % en un an. Il relie cette hausse aux fuites de données (+107 % de demandes d'assistance) : les données volées donnent aux attaquants de quoi viser et personnaliser leurs messages.</p>
            <p>L'IA, elle, rend ces e-mails plus crédibles : elle permet d'écrire des e-mails sans fautes, adaptés à chaque cible, et en grand nombre. Des kits de phishing vendus clé en main (« phishing-as-a-service ») mettent ces attaques à la portée de personnes sans compétences techniques.</p>
            <h4>Ce que SPF, DKIM et DMARC ne bloquent pas</h4>
            <p>Ils protègent seulement le nom de domaine exact. Ils n'empêchent pas :</p>
            <ul>
              <li>un faux domaine qui ressemble au vrai, comme <code>impots-gouv-remboursement.fr</code></li>
              <li>un e-mail envoyé depuis une vraie boîte piratée</li>
              <li>un e-mail bien écrit par une IA, envoyé depuis un domaine de l'attaquant correctement configuré</li>
            </ul>
            <h4>Comment se protéger ?</h4>
            <ul>
              <li>Configurer SPF, DKIM et DMARC jusqu'à <code>reject</code>, pour que personne ne puisse usurper son domaine</li>
              <li>Activer la double authentification, pour qu'un mot de passe volé ne suffise pas</li>
              <li>Filtrer les e-mails entrants et sensibiliser les utilisateurs</li>
              <li>Signaler les e-mails d'hameçonnage sur Signal Spam</li>
            </ul>
            <h4>Ce que j'en retiens</h4>
            <p>L'authentification des e-mails est nécessaire mais pas suffisante : elle empêche d'usurper mon domaine, mais elle ne protège pas mes utilisateurs de tous les phishings.</p>
            <h4>Sources</h4>
            <ul class="sources">
              <li><a href="https://www.cybermalveillance.gouv.fr/tous-nos-contenus/actualites/rapport-activite-2025" rel="noopener">cybermalveillance.gouv.fr</a> (<a href="https://www.cybermalveillance.gouv.fr/medias/2026/03/CP-RA2026.pdf" rel="noopener">communiqué</a>)</li>
              <li><a href="https://itdaily.fr/nouvelles/securite/ia-phishing-as-a-service-attaques-par-email/" rel="noopener">itdaily.fr</a></li>
              <li><a href="https://www.signal-spam.fr/" rel="noopener">signal-spam.fr</a></li>
            </ul>
          </div>
        </details>
      </article>
```

### Visuels du sujet 3 (prêts, à coller au moment de la publication)

Encadré « En bref », juste après `<div class="fiche">` :

```html
            <div class="bref">
              <p class="bref-t">En bref</p>
              <ul>
                <li><b>Le constat :</b> l'hameçonnage est la première menace en France, en hausse de 70 % en un an.</li>
                <li><b>La limite :</b> SPF, DKIM et DMARC protègent seulement le nom de domaine exact.</li>
                <li><b>Pour une entreprise :</b> DMARC en <code>reject</code>, double authentification, et une procédure pour vérifier tout changement de RIB.</li>
              </ul>
            </div>
```

Faux e-mail annoté, après « Ce que SPF, DKIM et DMARC ne bloquent pas ». L'entreprise et les domaines sont **inventés** (jamais une vraie marque ni un vrai organisme) ; le lien n'est pas cliquable :

```html
            <figure class="faux-mail">
              <div class="fm">
                <p><b>De :</b> Comptabilité &lt;compta@exemple-factures.fr&gt; <span class="fm-n">1</span></p>
                <p><b>Objet :</b> URGENT : nouveau RIB avant vendredi <span class="fm-n">2</span></p>
                <p>Bonjour, suite à un changement de banque, merci de régler la facture n° 2026-118 sur notre nouveau compte <span class="fm-n">3</span>. Le RIB est ici : <u>exemple.fr.rib-facture.com</u> <span class="fm-n">4</span></p>
              </div>
              <ol class="fm-notes">
                <li>Un domaine qui ressemble au vrai (<code>exemple.fr</code>) : DMARC ne protège que le domaine exact, celui-ci passe.</li>
                <li>L'urgence, pour qu'on ne prenne pas le temps de vérifier.</li>
                <li>Un changement de RIB : on le vérifie par téléphone, au numéro qu'on connaît déjà.</li>
                <li>Le vrai site est la fin de l'adresse (<code>rib-facture.com</code>), pas le début.</li>
              </ol>
              <figcaption>Un faux e-mail inventé : ce qu'il faut repérer.</figcaption>
            </figure>
```

Ce que DMARC bloque ou non, après le faux e-mail :

```html
            <div class="bloque">
              <div><p class="bloque-t oui">Bloqué par DMARC en <code>reject</code></p><ul><li>un faux e-mail qui affiche exactement <code>exemple.fr</code></li></ul></div>
              <div><p class="bloque-t non">Pas bloqué</p><ul><li>un domaine qui ressemble au vrai</li><li>une vraie boîte piratée</li><li>un e-mail écrit par une IA, envoyé depuis le domaine de l'attaquant, bien configuré</li></ul></div>
            </div>
```

CSS à ajouter dans `style.css` (section Veille), puis passer `?v=` au numéro suivant dans toutes les pages :

```css
.faux-mail .fm { padding: 12px 14px; background: #fff; border: 1.5px solid var(--ink); font-size: 14.5px; }
.fiche .fm p { margin-top: 6px; }
.fiche .fm p:first-child { margin-top: 0; }
.fm-n { display: inline-grid; place-items: center; width: 18px; height: 18px; background: var(--cable); color: #fff; font: 700 11.5px var(--mono); }
.fiche .fm-notes { list-style: none; padding-left: 0; counter-reset: note; }
.fiche .fm-notes li { counter-increment: note; padding-left: 26px; }
.fiche .fm-notes li::before { content: counter(note); top: .15em; width: 18px; height: 18px; display: grid; place-items: center; color: #fff; font: 700 11.5px var(--mono); }
.bloque { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 10px; margin-top: 12px; }
.bloque > div { padding: 10px 12px; background: var(--paper); border: 1.5px solid var(--ink); }
.bloque-t { font-weight: 700; font-size: 14px; }
.bloque-t.oui::before { content: "✓ "; color: #2f8a4a; }
.bloque-t.non::before { content: "✗ "; color: var(--cable); }
```
