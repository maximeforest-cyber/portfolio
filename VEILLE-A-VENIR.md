# Veille : fiches à venir (non publiées)

Fichier de travail, exclu de la publication dans `_config.yml`. Une seule fiche de veille par mois (objectif : 6 fiches sur l'année). Ces deux fiches ont été retirées du site le 29/10/2026 pour sortir aux mois suivants.

| Mois prévu | Fiche |
|---|---|
| Novembre 2026 | Sujet 2 : où en est DMARC en France ? |
| Décembre 2026 | Sujet 3 : le phishing à l'ère de l'IA, et les limites de DMARC |

Avant de publier une fiche :

- remettre à jour les chiffres (nouvelle étude de l'Afnic ? nouveau rapport de Cybermalveillance.gouv.fr ?) et vérifier que chaque source est toujours en ligne ;
- sujet 2 : refaire le relevé DMARC (`dig +short TXT _dmarc.gmail.com`, etc.) et changer la date à deux endroits : « Mon relevé du 29/10/2026 » et la source « Relevé DNS personnel … le 29/10/2026 » ;
- changer le mois dans `<p class="meta">Sujet N · … 2026</p>` ;
- ajouter l'entrée LinkedIn en haut de `A-PUBLIER.md`.

Le code HTML est prêt à coller dans `index.html`, dans la grille de « La sécurité de la messagerie », après la fiche du sujet 1.

## Sujet 2 (novembre 2026)

```html
      <article class="card" id="veille-dmarc-france">
        <p class="meta">Sujet 2 · octobre 2026</p>
        <h3>Où en est DMARC en France ?</h3>
        <p>Un domaine .fr sur cinq a un DMARC, et la plupart ne bloquent rien. Même gmail.com.</p>
        <details>
          <summary>Lire la veille</summary>
          <div class="fiche">
            <h4>Les chiffres</h4>
            <p>L'Afnic, qui gère les noms de domaine en .fr, a publié en septembre 2025 une étude sur tous les domaines en .fr, même ceux qui ne reçoivent pas de courrier (avant 2025, elle ne comptait que ceux qui en reçoivent) :</p>
            <ul>
              <li>SPF : 69,0 % des domaines (52,5 % en 2023)</li>
              <li>DKIM : 40,7 % (22,6 % en 2023)</li>
              <li>DMARC : 19,5 % (7,3 % en 2023)</li>
            </ul>
            <p>Parmi les domaines qui ont un DMARC, 49,7 % sont en <code>p=none</code> sans adresse de rapport, 13,0 % en <code>p=none</code> avec rapports, 16,7 % en <code>quarantine</code> et 20,6 % en <code>reject</code>. L'adoption progresse vite, mais la plupart ne bloquent rien, et la moitié n'observe même pas : sans adresse de rapport, le domaine ne reçoit aucun compte rendu.</p>
            <h4>Mon relevé du 29/10/2026</h4>
            <ul>
              <li><code>gmail.com</code> : <code>p=none</code> (observation seulement), mais <code>quarantine</code> pour ses sous-domaines</li>
              <li><code>google.com</code> : <code>p=reject</code></li>
              <li><code>orange.fr</code> : <code>p=quarantine</code></li>
              <li><code>laposte.net</code> et <code>impots.gouv.fr</code> : <code>p=reject</code></li>
            </ul>
            <p>Google exige un DMARC des gros expéditeurs et protège google.com au maximum, mais garde la politique la plus souple sur gmail.com. Google n'explique pas officiellement ce choix.</p>
            <p>L'exemple du sujet 1, un faux e-mail venant de <code>contact@impots.gouv.fr</code>, serait donc refusé par les grandes messageries : ce domaine est en <code>reject</code>.</p>
            <h4>Ce que j'en retiens</h4>
            <p>Avoir un DMARC ne suffit pas : en <code>p=none</code>, un e-mail usurpé est quand même livré. On passe en général par étapes de <code>none</code> à <code>quarantine</code> puis <code>reject</code>, en lisant les rapports DMARC pour ne pas bloquer ses propres e-mails. C'est ce que vérifie mon <a href="projets/homelab-etape-4.html">outil d'audit</a> : un DMARC en <code>p=none</code> y apparaît en orange.</p>
            <h4>Sources</h4>
            <ul class="sources">
              <li><a href="https://www.afnic.fr/en/observatory-and-resources/expert-papers/spf-dkim-dmarc-and-bimi-on-fr-still-on-the-rise-in-2025/" rel="noopener">afnic.fr</a></li>
              <li>Relevé DNS personnel des enregistrements <code>_dmarc</code>, le 29/10/2026</li>
            </ul>
          </div>
        </details>
      </article>
```

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
