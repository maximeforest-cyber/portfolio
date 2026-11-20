# Veille : fiches à venir (non publiées)

Fichier de travail, exclu de la publication dans `_config.yml`. Une seule fiche de veille par mois (objectif : 6 fiches sur l'année). Ces fiches ont été retirées du site le 29/10/2026 pour sortir aux mois suivants. Le sujet 2 (DMARC en France) a été publié le 20/11/2026.

| Mois prévu | Fiche |
|---|---|
| Décembre 2026 | Sujet 3 : le phishing à l'ère de l'IA, et les limites de DMARC |

Avant de publier une fiche :

- remettre à jour les chiffres (nouvelle étude de l'Afnic ? nouveau rapport de Cybermalveillance.gouv.fr ?) et vérifier que chaque source est toujours en ligne ;
- changer le mois dans `<p class="meta">Sujet N · … 2026</p>` ;
- ajouter l'entrée LinkedIn en haut de `A-PUBLIER.md`.

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
