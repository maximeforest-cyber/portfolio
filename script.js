// Portfolio de Maxime Forest — petit script, sans dépendance.
(function () {
  'use strict';

  // Menu sur petit écran
  var burger = document.querySelector('.burger');
  var nav = document.getElementById('menu');
  burger.addEventListener('click', function () {
    var open = nav.classList.toggle('open');
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    burger.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu');
  });
  nav.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') {
      nav.classList.remove('open');
      burger.setAttribute('aria-expanded', 'false');
      burger.setAttribute('aria-label', 'Ouvrir le menu');
    }
  });

  // Portrait : initiales si la photo est absente
  var fig = document.getElementById('portrait');
  if (fig) {
    var photo = fig.querySelector('img');
    var sansPhoto = function () { fig.classList.add('sans-photo'); };
    photo.addEventListener('error', sansPhoto);
    if (photo.complete && photo.naturalWidth === 0) { sansPhoto(); }
  }

  // Badges : libellé de secours si l'image est absente
  document.querySelectorAll('img[data-secours]').forEach(function (img) {
    function remplacer() { img.replaceWith(img.getAttribute('data-secours')); }
    img.addEventListener('error', remplacer);
    if (img.complete && img.naturalWidth === 0) { remplacer(); }
  });

  // Un lien direct vers une fiche (#projet-..., #veille-...) l'ouvre
  function ouvrirCible() {
    var id = decodeURIComponent(location.hash.slice(1));
    var cible = id && document.getElementById(id);
    var fiche = cible && cible.tagName === 'ARTICLE' && cible.querySelector('details');
    if (fiche) { fiche.open = true; }
  }
  window.addEventListener('hashchange', ouvrirCible);
  ouvrirCible();

  // Fiche ouverte : les cartes voisines gardent la hauteur qu'elles ont quand tout est fermé
  function egaliser(grille) {
    var cartes = Array.prototype.slice.call(grille.children);
    cartes.forEach(function (c) { c.style.minHeight = ''; });
    if (!grille.querySelector('details[open]')) { return; }
    grille.classList.add('mesure');
    var rangs = {};
    var hauts = cartes.map(function (c) {
      var y = c.offsetTop;
      rangs[y] = Math.max(rangs[y] || 0, c.getBoundingClientRect().height);
      return y;
    });
    grille.classList.remove('mesure');
    cartes.forEach(function (c, i) { c.style.minHeight = rangs[hauts[i]] + 'px'; });
  }
  function egaliserTout() {
    document.querySelectorAll('.grid').forEach(function (g) {
      if (g.querySelector('details')) { egaliser(g); }
    });
  }
  document.addEventListener('toggle', function (e) {
    var g = e.target.closest && e.target.closest('.grid');
    if (g) { egaliser(g); }
  }, true);
  var attente;
  window.addEventListener('resize', function () {
    clearTimeout(attente);
    attente = setTimeout(egaliserTout, 120);
  });
  egaliserTout();

  // Contact : copier l'adresse (utile quand aucun logiciel de messagerie n'est configuré)
  var copier = document.getElementById('copier');
  if (copier) {
    var etat = document.getElementById('copie-etat');
    var adresse = copier.getAttribute('data-adresse');
    var libelle = copier.textContent;
    var retour;
    var annoncer = function (ok) {
      copier.textContent = ok ? 'Adresse copiée ✓' : libelle;
      etat.textContent = ok ? adresse + ' est dans le presse-papiers.' : 'Copie impossible : sélectionnez l\'adresse dans le tableau.';
      clearTimeout(retour);
      retour = setTimeout(function () { copier.textContent = libelle; etat.textContent = ''; }, 4000);
    };
    var copierAncien = function () {
      var z = document.createElement('textarea');
      z.value = adresse;
      z.setAttribute('readonly', '');
      z.className = 'hors-ecran';
      document.body.appendChild(z);
      z.select();
      var ok = false;
      try { ok = document.execCommand('copy'); } catch (e) { ok = false; }
      z.remove();
      copier.focus();
      annoncer(ok);
    };
    copier.hidden = false;
    copier.addEventListener('click', function () {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(adresse).then(function () { annoncer(true); }, copierAncien);
      } else {
        copierAncien();
      }
    });
  }

  // Rubrique en cours de lecture, signalée dans le menu
  var liens = {};
  nav.querySelectorAll('a').forEach(function (a) {
    liens[a.getAttribute('href').slice(1)] = a;
  });
  if ('IntersectionObserver' in window) {
    var obs = new IntersectionObserver(function (entrees) {
      entrees.forEach(function (e) {
        if (!e.isIntersecting) { return; }
        Object.keys(liens).forEach(function (k) {
          liens[k].classList.toggle('on', k === e.target.id);
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    document.querySelectorAll('main section[id]').forEach(function (s) { obs.observe(s); });
  }

  // Schémas animés : le trafic tourne à l'arrivée sur la page, un bouton permet de l'arrêter ou de le relancer
  document.querySelectorAll('[data-anim]').forEach(function (zone) {
    var bouton = zone.querySelector('.pause');
    if (!bouton) { return; }
    var svgs = zone.querySelectorAll('svg');
    function regler(arret) {
      zone.classList.toggle('en-pause', arret);
      zone.classList.toggle('en-marche', !arret);
      svgs.forEach(function (s) {
        if (arret && s.pauseAnimations) { s.pauseAnimations(); }
        if (!arret && s.unpauseAnimations) { s.unpauseAnimations(); }
      });
      bouton.textContent = arret ? 'Relancer le trafic' : 'Mettre en pause le trafic';
    }
    bouton.hidden = false;
    regler(false);
    bouton.addEventListener('click', function () { regler(!zone.classList.contains('en-pause')); });
  });

  var plan = document.querySelector('.plan[data-anim]');
  var NS = 'http://www.w3.org/2000/svg';

  // Plan du site : simulation d'un paquet à travers les règles de fw-contact
  var simu = document.getElementById('simulation');
  if (plan && simu) {
    var eqp = {
      '#contact': { nom: 'fw-contact', vlan: 0, ip: '10.0.10.1', rub: 'Contact' },
      '#a-propos': { nom: 'pc-maxime', vlan: 10, ip: '10.0.10.11', rub: 'À propos' },
      '#competences': { nom: 'srv-competences', vlan: 10, ip: '10.0.10.12', rub: 'Compétences' },
      '#parcours': { nom: 'nas-parcours', vlan: 10, ip: '10.0.10.13', rub: 'Parcours' },
      '#projets': { nom: 'srv-projets', vlan: 20, ip: '10.0.20.11', rub: 'Projets et stages' },
      '#certifications': { nom: 'pki-certifs', vlan: 20, ip: '10.0.20.12', rub: 'Certifications' },
      '#veille': { nom: 'ids-veille', vlan: 20, ip: '10.0.20.13', rub: 'Veille' }
    };
    var regles = { 1: 'Web_public', 2: 'Web_redirection', 3: 'Admin_poste', 4: 'Défaut' };
    var choixSrc = document.getElementById('simu-src');
    var choixDst = document.getElementById('simu-dst');
    var choixSvc = document.getElementById('simu-svc');
    var verdict = document.getElementById('simu-verdict');
    var vu = document.getElementById('simu-vu');
    var minuteur;
    var dernierBouton = null; // « Envoyer » ou « Suivre pas à pas » : le lien de retour y remet le focus

    // Décision : la première règle qui correspond s'applique
    var juger = function (src, dst, svc) {
      if (src === dst) {
        return { etat: 'meme', titre: 'Rien n\'est parti', texte: ' : la source et la destination sont le même équipement.' };
      }
      if (src !== 'wan' && eqp[dst].vlan === eqp[src].vlan) {
        return { etat: 'local', titre: 'Livré sans passer par fw-contact', lien: dst,
          texte: ' : pc-maxime et ' + eqp[dst].nom + ' sont dans le même VLAN 10, sw-coeur fait passer la trame de l\'un à l\'autre, sans la remonter à fw-contact. Aucune règle du pare-feu ne s\'applique.' };
      }
      var regle = 4;
      if (src === 'wan' && dst !== '#contact' && svc === 'https') { regle = 1; }
      if (src === 'wan' && dst !== '#contact' && svc === 'http') { regle = 2; }
      if (src !== 'wan' && (dst === '#contact' || eqp[dst].vlan === 20) && svc !== 'http') { regle = 3; }
      if (regle < 4) {
        return { etat: 'ok', regle: regle, titre: 'Autorisé', lien: dst,
          texte: ' par fw-contact, règle ' + regle + ' (' + regles[regle] + ').' +
            (regle === 2 ? ' Le serveur répond par une redirection 301 vers HTTPS, comme le vrai site.' : '') +
            ' La réponse revient sans règle dans l\'autre sens : le pare-feu garde l\'état de la connexion.' };
      }
      var raison = src !== 'wan' ? 'depuis pc-maxime, l\'administration passe par SSH ou HTTPS, pas par HTTP en clair.' :
        svc === 'icmp' ? 'le ping depuis Internet n\'est pas autorisé.' :
        dst === '#contact' ? 'le pare-feu ne s\'administre pas depuis Internet.' : 'SSH n\'est pas ouvert depuis Internet.';
      return { etat: 'non', regle: 4, titre: 'Refusé', texte: ' par fw-contact, règle 4 (par défaut) : ' + raison +
        ' Le paquet est jeté sans réponse : ' + (svc === 'icmp' ? 'le ping attend un écho qui ne vient pas.' : 'la connexion finit en délai dépassé.') };
    };

    // « Ce qu'a vu le paquet » : le trajet étape par étape, avec ce qui change dans la trame
    var raconter = function (src, dst, svc, v) {
      var d = eqp[dst], e = [], fin = [];
      var dire = function (lieu, t) { e.push({ lieu: lieu, t: t }); }; // lieu : où le paquet s'arrête sur le plan, en pas à pas
      if (v.etat === 'meme') { return { e: e, fin: fin }; }
      var port = { https: 443, http: 80, ssh: 22 }[svc];
      var premier = svc === 'icmp' ? 'un ping (ICMP echo request)' : 'un segment TCP SYN (début de connexion), port ' + port + ',';
      var regle = v.regle ? 'Règle ' + v.regle + ' (' + (v.regle === 4 ? 'par défaut' : regles[v.regle]) + ') : ' + (v.etat === 'non' ? 'DENY.' : 'ALLOW.') : '';
      var etat = ' Une ligne entre dans sa table d\'état (' + (svc === 'icmp' ? 'adresses et identifiant du ping' : 'adresses et ports des deux côtés') + ').';
      var jete = function (ici) {
        dire('fw', 'fw-contact lit ses règles dans l\'ordre : aucune des règles 1 à 3 ne correspond. ' + regle);
        dire('fw', 'Le paquet est jeté sans réponse' + ici + ', et rien n\'entre dans la table d\'état.');
      };
      if (src === 'wan') {
        dire('depart', 'Votre machine envoie ' + premier + ' vers l\'adresse publique de ' + d.nom + (svc === 'icmp' ? '.' : ', depuis un port source choisi au hasard.'));
        // Le NAT de destination se fait avant la lecture des règles, même pour un paquet qui sera refusé ; fw-contact n'en a pas besoin pour sa propre adresse
        if (dst !== '#contact') { dire('fw', 'fw-contact fait le NAT de destination : l\'adresse publique de ' + d.nom + ' devient ' + d.ip + '.'); }
        if (v.etat === 'non') { jete(' : rien n\'arrive sur sw-coeur'); return { e: e, fin: fin }; }
        dire('fw', regle + etat + ' Le TTL baisse de 1. Adresses MAC réécrites : source fw-contact, destination ' + d.nom + '.');
        dire('trunk', 'De fw-contact à sw-coeur, sur le trunk : étiquette 802.1Q ajoutée, VID ' + d.vlan + '.');
        dire('arrivee', 'sw-coeur retire l\'étiquette et livre la trame à ' + d.nom + ', sur son port d\'accès du VLAN ' + d.vlan + '.');
        fin.push('Retour : la table d\'état reconnaît la réponse et la laisse passer, et le NAT remet l\'adresse publique de ' + d.nom + ' en source.' +
          (svc === 'http' ? ' Une fois la connexion ouverte, le serveur répond à la requête HTTP par une redirection 301 vers HTTPS.' : ''));
        return { e: e, fin: fin };
      }
      // Depuis pc-maxime (VLAN 10)
      if (v.etat === 'local') {
        dire('depart', 'pc-maxime voit que ' + d.ip + ' est dans son propre réseau, 10.0.10.0/24 : il envoie ' + premier + ' dans une trame adressée directement à l\'adresse MAC de ' + d.nom + ', trouvée par ARP, sans passer par sa passerelle.');
        dire('sw', 'sw-coeur reçoit la trame sur le port d\'accès de pc-maxime (VLAN 10, sans étiquette), trouve l\'adresse MAC de destination dans sa table et la fait sortir par le port de ' + d.nom + '.');
        dire('arrivee', 'Rien n\'a changé dans la trame : pas d\'étiquette 802.1Q, mêmes adresses MAC, même TTL. Un switch ne touche pas au paquet IP, et fw-contact ne l\'a pas vu.');
        fin.push('Retour : la réponse fait le même trajet à l\'envers, toujours sans fw-contact.');
        return { e: e, fin: fin };
      }
      var pourLui = dst === '#contact';
      dire('depart', pourLui ? 'pc-maxime envoie ' + premier + ' à fw-contact, sa passerelle (10.0.10.1).' :
        'pc-maxime voit que ' + d.ip + ' n\'est pas dans son réseau, 10.0.10.0/24 : il envoie ' + premier + ' dans une trame adressée à l\'adresse MAC de sa passerelle, fw-contact (10.0.10.1). L\'adresse IP de destination reste ' + d.ip + '.');
      dire('sw', 'De pc-maxime à sw-coeur : trame sans étiquette, sur le port d\'accès du VLAN 10.');
      dire('trunk', 'De sw-coeur à fw-contact, sur le trunk : étiquette 802.1Q ajoutée, VID 10.');
      if (v.etat === 'non') {
        dire('fw', 'fw-contact retire l\'étiquette et lit ses règles dans l\'ordre : la règle 3 n\'autorise pas HTTP. ' + regle);
        dire('fw', 'Le paquet est jeté sans réponse' + (pourLui ? '' : ' : il ne repart pas vers le VLAN 20') + ', et rien n\'entre dans la table d\'état.');
        return { e: e, fin: fin };
      }
      if (pourLui) {
        dire('fw', 'fw-contact retire l\'étiquette : le paquet est pour lui (10.0.10.1), il n\'est pas routé et le TTL ne baisse pas. ' + regle + etat);
        fin.push('Retour : fw-contact répond par le même câble, avec l\'étiquette 10 ; sw-coeur la retire et livre la réponse à pc-maxime.');
        return { e: e, fin: fin };
      }
      dire('fw', 'fw-contact retire l\'étiquette et route le paquet du VLAN 10 au VLAN 20 (il a une sous-interface par VLAN, sur le même câble). ' + regle + etat +
        ' Le TTL baisse de 1. Adresses MAC réécrites : source fw-contact, destination ' + d.nom + '.');
      dire('trunk', 'De fw-contact à sw-coeur, sur le même câble : étiquette 802.1Q, VID 20.');
      dire('arrivee', 'sw-coeur retire l\'étiquette et livre la trame à ' + d.nom + ', sur son port d\'accès du VLAN 20.');
      fin.push('Le paquet est passé deux fois par sw-coeur, dans deux trames différentes, mais le TTL n\'a baissé qu\'une fois, sur fw-contact : un switch n\'y touche pas.');
      fin.push('Retour : la réponse fait le chemin à l\'envers (étiquette 20 en montant, 10 en descendant), et la table d\'état la laisse passer.');
      return { e: e, fin: fin };
    };

    // Chemins du plan (commandes M, H, V seulement), lus dans le schéma affiché
    var points = function (d) {
      var pts = [], x = 0, y = 0, re = /([MHV])([\d.]+)(?: ([\d.]+))?/g, m;
      while ((m = re.exec(d))) {
        if (m[1] === 'M') { x = +m[2]; y = +m[3]; } else if (m[1] === 'H') { x = +m[2]; } else { y = +m[2]; }
        pts.push([x, y]);
      }
      return pts;
    };
    var route = function (svg, cle) {
      return points(svg.querySelector('a[href="' + cle + '"] .route').getAttribute('d'));
    };
    var chemin = function (svg, src, dst, refus) {
      var c = route(svg, '#contact');
      var wan = c[0], fwG = c[c.length - 1];
      var t = /translate\(([\d.]+) ([\d.]+)\)/.exec(svg.querySelector('a[href="#contact"] .ico').getAttribute('transform'));
      var fwD = [2 * t[1] - fwG[0], fwG[1]];
      if (src === 'wan') {
        return (refus || dst === '#contact') ? [wan, fwG] : [wan].concat(route(svg, dst).slice(1));
      }
      var depuis = route(svg, src).reverse();
      if (eqp[dst].vlan === eqp[src].vlan) {
        return depuis.concat(route(svg, dst).slice(1)); // la trame passe par sw-coeur, sans remonter à fw-contact
      }
      var aller = depuis.concat([fwD]);
      return (refus || dst === '#contact') ? aller : aller.concat(route(svg, dst));
    };

    var svgAffiche = function () {
      var l = plan.querySelectorAll('svg');
      for (var i = 0; i < l.length; i++) { if (l[i].getBoundingClientRect().width > 0) { return l[i]; } }
      return null;
    };
    var voyage = null;
    var arreterVoyage = function () {
      if (!voyage) { return; }
      cancelAnimationFrame(voyage.image);
      voyage.paquet.remove();
      document.documentElement.style.scrollBehavior = '';
      voyage = null;
    };
    var nettoyer = function () {
      clearTimeout(minuteur);
      arreterVoyage();
      arreterPas();
      document.querySelectorAll('.folio.arrivee').forEach(function (e) { e.classList.remove('arrivee'); });
      document.querySelectorAll('.retour-simu').forEach(function (e) { e.remove(); });
      plan.querySelectorAll('.sim').forEach(function (e) { e.remove(); });
      simu.querySelectorAll('tr.touchee').forEach(function (e) { e.classList.remove('touchee'); });
    };
    var creer = function (nom, attrs) {
      var e = document.createElementNS(NS, nom);
      Object.keys(attrs).forEach(function (k) { e.setAttribute(k, attrs[k]); });
      return e;
    };
    // Repère final sur le plan : une croix (refusé) ou une coche (arrivé), avec un mot
    var marquer = function (svg, pts, v) {
      var fin = pts[pts.length - 1], avant = pts[pts.length - 2];
      var sens = fin[0] === avant[0] ? 0 : (fin[0] > avant[0] ? 1 : -1);
      var g = creer('g', { 'class': 'sim', 'aria-hidden': 'true' });
      var x = fin[0], y = fin[1];
      if (v.etat === 'non') {
        x -= sens * 10;
        g.appendChild(creer('path', { 'class': 'sim-x', d: 'M' + (x - 5) + ' ' + (y - 5) + 'L' + (x + 5) + ' ' + (y + 5) + 'M' + (x + 5) + ' ' + (y - 5) + 'L' + (x - 5) + ' ' + (y + 5) }));
      }
      // Le mot se place du côté libre : à gauche près du bord droit du schéma, et jamais sur l'icône du pare-feu
      var aGauche = sens === 0 ? x > svg.viewBox.baseVal.width * 0.7 : sens === 1;
      var txt = creer('text', { 'class': 'sim-txt', x: sens === 0 ? x + (aGauche ? -8 : 8) : x + (aGauche ? 4 : -4),
        y: y - (sens === 0 ? 4 : 12), 'text-anchor': aGauche ? 'end' : 'start' });
      txt.textContent = v.etat === 'non' ? 'refusé' : (v.etat === 'local' ? '✓ livré' : '✓ autorisé');
      g.appendChild(txt);
      svg.appendChild(g);
    };
    var afficher = function (v, recit) {
      verdict.textContent = '';
      var liste = document.getElementById('simu-etapes');
      liste.textContent = '';
      recit.e.forEach(function (p) { var li = document.createElement('li'); li.textContent = p.t; liste.appendChild(li); });
      document.getElementById('simu-fin').textContent = recit.fin.join(' ');
      vu.hidden = v.etat === 'meme';
      var b = document.createElement('strong');
      b.textContent = v.titre;
      verdict.appendChild(b);
      verdict.appendChild(document.createTextNode(v.texte));
      var a;
      if (v.etat === 'non') {
        a = document.createElement('a'); a.href = '#contact'; a.textContent = 'Demander l\'ouverture du flux';
      } else if (v.lien) {
        a = document.createElement('a'); a.href = v.lien; a.textContent = 'Ouvrir la rubrique ' + eqp[v.lien].rub;
      }
      if (a) { verdict.appendChild(document.createTextNode(' ')); verdict.appendChild(a); }
      if (v.regle) { simu.querySelector('tr[data-regle="' + v.regle + '"]').classList.add('touchee'); }
    };

    // Paquet autorisé : il sort du plan et file vers la rubrique pendant que la page y défile
    var arriver = function (section) {
      var folio = section.querySelector('.folio');
      folio.classList.add('arrivee');
      minuteur = setTimeout(function () { folio.classList.remove('arrivee'); }, 1600);
      var titre = section.querySelector('h2');
      titre.setAttribute('tabindex', '-1');
      titre.focus({ preventScroll: true });
      ajouterRetour(section);
    };
    // Lien pour refaire un essai sans remonter à la main ; il disparaît au prochain envoi
    var ajouterRetour = function (section) {
      var titre = section.querySelector('h2');
      var retour = document.createElement('a');
      retour.className = 'retour-simu';
      retour.href = '#simulation';
      retour.textContent = 'Revenir au simulateur';
      retour.addEventListener('click', function (e) {
        e.preventDefault();
        retour.remove();
        simu.open = true;
        verdict.scrollIntoView({ block: 'center' });
        (dernierBouton || choixSrc).focus({ preventScroll: true });
      });
      titre.insertAdjacentElement('afterend', retour);
    };
    var voyager = function (svg, pt, cle) {
      var section = document.getElementById(cle.slice(1));
      var cible = section && section.querySelector('.folio .n');
      var ctm = svg.getScreenCTM();
      if (!cible || !ctm || !document.body.animate) { return; }
      var p = svg.createSVGPoint();
      p.x = pt[0]; p.y = pt[1];
      p = p.matrixTransform(ctm);
      // Où sera la rubrique une fois la page défilée (marge du menu fixe, bas de page)
      var html = document.documentElement;
      var marge = parseFloat(getComputedStyle(html).scrollPaddingTop) || 0;
      var y0 = window.pageYOffset;
      var but = Math.max(0, Math.min(html.scrollHeight - window.innerHeight, y0 + section.getBoundingClientRect().top - marge));
      var centre = function (decalage) {
        var r = cible.getBoundingClientRect();
        return [r.left + r.width / 2, r.top + r.height / 2 - decalage];
      };
      var c = centre(but - y0);
      var place = function (x, y, echelle) { return 'translate(' + (x - 5.5) + 'px, ' + (y - 5.5) + 'px) scale(' + echelle + ')'; };
      var paquet = document.createElement('span');
      paquet.className = 'paquet-fou paquet-voyage';
      paquet.setAttribute('aria-hidden', 'true');
      document.body.appendChild(paquet);
      plan.querySelectorAll('.pkt.sim').forEach(function (e) { e.remove(); });
      voyage = { paquet: paquet, image: 0 };
      var v = voyage;
      // La page défile au même rythme que le paquet : ils arrivent ensemble, quel que soit le navigateur
      var duree = Math.min(1500, 700 + Math.abs(but - y0) / 5);
      var e0 = 7 * ctm.a / 11, debut = 0, pose = y0, libre = false;
      var lisse = function (t) { return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(2 - 2 * t, 3) / 2; };
      html.style.scrollBehavior = 'auto';
      paquet.style.transform = place(p.x, p.y, e0);
      var etape = function (maintenant) {
        if (voyage !== v) { return; }
        if (plan.classList.contains('en-pause')) { arreterVoyage(); return; } // pause : le paquet disparaît, le focus reste sur le bouton
        if (!debut) { debut = maintenant; }
        var t = Math.min(1, (maintenant - debut) / duree), k = lisse(t);
        if (!libre && Math.abs(window.pageYOffset - pose) > 2) { libre = true; } // le visiteur fait défiler lui-même
        if (!libre) { pose = y0 + (but - y0) * k; window.scrollTo(0, pose); }
        paquet.style.transform = place(p.x + (c[0] - p.x) * k, p.y + (c[1] - p.y) * k, e0 + (1.3 - e0) * k);
        if (t < 1) { v.image = requestAnimationFrame(etape); return; }
        voyage = null;
        html.style.scrollBehavior = '';
        var f = centre(0);
        paquet.animate([
          { transform: place(c[0], c[1], 1.3), opacity: 1 },
          { transform: place(f[0], f[1], 0.4), opacity: 0 }
        ], { duration: 300, fill: 'forwards' }).onfinish = function () { paquet.remove(); };
        if (!libre) { arriver(section); } else { ajouterRetour(section); } // le visiteur est allé ailleurs : on ne lui prend pas le focus, mais le lien de retour est là
      };
      v.image = requestAnimationFrame(etape);
    };

    // Paquet refusé : il bute sur fw-contact, puis il est jeté (rien ne revient)
    var jeter = function (pkt) {
      [creer('animateTransform', { attributeName: 'transform', type: 'translate', additive: 'sum', begin: 'indefinite', fill: 'freeze',
        dur: '0.35s', values: '0 0;-2.5 0;2.5 0;-2.5 0;2.5 0;0 0' }),
      creer('animate', { attributeName: 'opacity', begin: 'indefinite', fill: 'freeze', dur: '0.8s', values: '1;1;0', keyTimes: '0;.45;1' })
      ].forEach(function (a) { pkt.appendChild(a); a.beginElement(); });
    };

    // Fin commune : repère sur le plan, verdict, puis le paquet est jeté ou file vers la rubrique
    var conclure = function (svg, pts, v, recit, pkt, dst) {
      marquer(svg, pts, v);
      afficher(v, recit);
      if (plan.classList.contains('en-pause')) { return; }
      if (v.etat === 'non') { jeter(pkt); return; }
      minuteur = setTimeout(function () { voyager(svg, pts[pts.length - 1], dst); }, 450);
    };

    document.getElementById('simu-go').addEventListener('click', function () {
      dernierBouton = this;
      var src = choixSrc.value, dst = choixDst.value;
      var v = juger(src, dst, choixSvc.value);
      var recit = raconter(src, dst, choixSvc.value, v);
      nettoyer();
      verdict.textContent = '';
      vu.hidden = true;
      var svg = svgAffiche();
      if (!svg || v.etat === 'meme') { afficher(v, recit); return; }
      var pts = chemin(svg, src, dst, v.etat === 'non');
      var fin = function () { conclure(svg, pts, v, recit, pkt, dst); };
      var r = svg.getBoundingClientRect();
      if (Math.min(r.bottom, window.innerHeight) - Math.max(r.top, 0) < r.height / 2) { svg.scrollIntoView({ block: 'nearest' }); }
      var pkt = creer('rect', { 'class': 'pkt sim', x: -3.5, y: -3.5, width: 7, height: 7 });
      var arrivee = pts[pts.length - 1];
      if (plan.classList.contains('en-pause') || typeof svg.animationsPaused !== 'function') {
        pkt.setAttribute('transform', 'translate(' + arrivee[0] + ' ' + arrivee[1] + ')');
        svg.appendChild(pkt);
        fin();
        return;
      }
      var longueur = 0;
      for (var i = 1; i < pts.length; i++) { longueur += Math.abs(pts[i][0] - pts[i - 1][0]) + Math.abs(pts[i][1] - pts[i - 1][1]); }
      var duree = Math.max(1.2, longueur / 320);
      var mouvement = creer('animateMotion', { dur: duree + 's', begin: 'indefinite', fill: 'freeze',
        path: 'M' + pts.map(function (p) { return p[0] + ' ' + p[1]; }).join('L') });
      pkt.appendChild(mouvement);
      svg.appendChild(pkt);
      mouvement.beginElement();
      // L'arrivée suit l'horloge du schéma : en pause, le paquet est figé et le verdict attend la reprise
      var t0 = svg.getCurrentTime();
      var attendre = function () {
        var reste = t0 + duree - svg.getCurrentTime();
        if (reste > 0.02) { minuteur = setTimeout(attendre, plan.classList.contains('en-pause') ? 200 : reste * 1000); return; }
        fin();
      };
      minuteur = setTimeout(attendre, duree * 1000);
    });

    // Pas à pas : la caméra suit le paquet sur le plan, il s'arrête à chaque étape du récit, « Continuer » le fait avancer
    var panneau = document.getElementById('pas-a-pas');
    var pasTete = document.getElementById('pas-tete');
    var pasTexte = document.getElementById('pas-texte');
    var pasFin = document.getElementById('pas-fin');
    var pasSuite = document.getElementById('pas-suite');
    var boutonPas = document.getElementById('simu-pas');
    var pas = null;
    var CAMERA = { desktop: [520, 200], mobile: [220, 170] }; // taille de la vue zoomée (sur mobile, plus large que haute : le texte reste sous le plan)
    var longueurs = function (pts) {
      var l = [0];
      for (var i = 1; i < pts.length; i++) { l.push(l[i - 1] + Math.abs(pts[i][0] - pts[i - 1][0]) + Math.abs(pts[i][1] - pts[i - 1][1])); }
      return l;
    };
    var pointA = function (pts, l, d) {
      for (var i = 1; i < pts.length; i++) {
        if (d <= l[i] || i === pts.length - 1) {
          var k = l[i] === l[i - 1] ? 1 : Math.max(0, Math.min(1, (d - l[i - 1]) / (l[i] - l[i - 1])));
          return [pts[i - 1][0] + (pts[i][0] - pts[i - 1][0]) * k, pts[i - 1][1] + (pts[i][1] - pts[i - 1][1]) * k];
        }
      }
      return pts[0];
    };
    // Distance, le long du trajet, du premier passage par le point q après la distance « apres »
    var distanceDe = function (pts, l, q, apres) {
      for (var i = 1; i < pts.length; i++) {
        var a = pts[i - 1], b = pts[i];
        var dedans = (a[0] === b[0] && q[0] === a[0] && q[1] >= Math.min(a[1], b[1]) && q[1] <= Math.max(a[1], b[1])) ||
          (a[1] === b[1] && q[1] === a[1] && q[0] >= Math.min(a[0], b[0]) && q[0] <= Math.max(a[0], b[0]));
        if (!dedans) { continue; }
        var d = l[i - 1] + Math.abs(q[0] - a[0]) + Math.abs(q[1] - a[1]);
        if (d >= apres - 0.01) { return d; }
      }
      return -1;
    };
    var cadrer = function (x, y, k) { // k : 0 = plan entier, 1 = vue zoomée centrée sur (x, y)
      var b = pas.base, w = b[2] + (pas.cam[0] - b[2]) * k, h = b[3] + (pas.cam[1] - b[3]) * k;
      var vx = Math.max(0, Math.min(b[2] - w, x - w / 2)), vy = Math.max(0, Math.min(b[3] - h, y - h / 2));
      pas.svg.setAttribute('viewBox', vx + ' ' + vy + ' ' + w + ' ' + h);
    };
    // L'étiquette 802.1Q n'est visible que sur le trunk : VID 10 en montant vers fw-contact, VID de la destination en descendant
    var placer = function (p) {
      pas.pkt.setAttribute('transform', 'translate(' + p[0] + ' ' + p[1] + ')');
      var t = pas.trunk;
      if (pas.dernier && p[0] !== pas.dernier[0]) { pas.monte = p[0] < pas.dernier[0]; }
      pas.dernier = p;
      var sur = Math.abs(p[1] - t.y) < 0.5 && p[0] > t.x1 + 1 && p[0] < t.x2 - 1;
      pas.tag.style.display = sur ? '' : 'none';
      if (sur) {
        pas.tag.setAttribute('transform', 'translate(' + p[0] + ' ' + (p[1] - 13) + ')');
        pas.tagTxt.textContent = 'VID ' + (pas.monte ? 10 : eqp[pas.dst].vlan);
      }
    };
    // Animation pilotée image par image ; elle n'avance pas quand le plan est en pause
    var animer = function (duree, image, fini) {
      var ecoule = 0, avant = 0;
      var etape = function (maintenant) {
        if (!pas) { return; }
        if (avant && !plan.classList.contains('en-pause')) { ecoule += maintenant - avant; }
        avant = maintenant;
        var t = Math.min(1, ecoule / duree);
        image(t < 0.5 ? 2 * t * t : 1 - Math.pow(2 - 2 * t, 2) / 2);
        if (t < 1) { pas.image = requestAnimationFrame(etape); return; }
        pas.image = 0;
        pas.finir = null;
        fini();
      };
      pas.finir = function () { ecoule = duree; }; // « Continuer » pendant le trajet : le paquet arrive tout de suite
      pas.image = requestAnimationFrame(etape);
    };
    var montrer = function () {
      var n = pas.i, total = pas.recit.e.length, dernier = n === total - 1;
      pasTete.textContent = 'Étape ' + (n + 1) + ' sur ' + total;
      pasTexte.textContent = pas.recit.e[n].t;
      pasFin.textContent = dernier ? pas.recit.fin.join(' ') : '';
      pasSuite.textContent = !dernier ? 'Continuer' : (pas.v.etat === 'non' ? 'Voir le verdict' : 'Arriver à la rubrique');
    };
    var arreterPas = function () {
      if (!pas) { return; }
      cancelAnimationFrame(pas.image);
      pas.svg.setAttribute('viewBox', pas.baseTxt);
      pas.tag.remove();
      pas.pkt.remove();
      panneau.hidden = true;
      plan.classList.remove('pas-en-cours');
      pas = null;
    };
    var avancer = function () {
      if (!pas) { return; }
      if (pas.finir) { pas.finir(); return; }
      if (svgAffiche() !== pas.svg) { arreterPas(); boutonPas.focus(); return; } // la fenêtre a changé de taille : le plan affiché n'est plus le même
      if (pas.i === pas.recit.e.length - 1) { // fin : la caméra recule, puis la fin habituelle
        var p0 = pas.dernier;
        animer(600, function (k) { cadrer(p0[0], p0[1], 1 - k); }, function () {
          var s = pas, garde = s.pkt;
          boutonPas.focus({ preventScroll: true }); // avant de cacher le panneau, qui a le focus ; arriver() le mettra ensuite sur le titre de la rubrique
          s.svg.setAttribute('viewBox', s.baseTxt);
          s.tag.remove();
          panneau.hidden = true;
          plan.classList.remove('pas-en-cours');
          pas = null;
          conclure(s.svg, s.pts, s.v, s.recit, garde, s.dst);
        });
        return;
      }
      pas.i++;
      var d0 = pas.d, d1 = pas.arrets[pas.i];
      if (d1 === d0) { montrer(); return; }
      animer(Math.max(400, Math.abs(d1 - d0) / 0.26), function (k) {
        pas.d = d0 + (d1 - d0) * k;
        var p = pointA(pas.pts, pas.l, pas.d);
        placer(p);
        cadrer(p[0], p[1], 1);
      }, montrer);
    };
    boutonPas.addEventListener('click', function () {
      dernierBouton = boutonPas;
      var src = choixSrc.value, dst = choixDst.value;
      var v = juger(src, dst, choixSvc.value);
      var recit = raconter(src, dst, choixSvc.value, v);
      nettoyer();
      verdict.textContent = '';
      vu.hidden = true;
      var svg = svgAffiche();
      if (!svg || v.etat === 'meme') { afficher(v, recit); return; }
      var pts = chemin(svg, src, dst, v.etat === 'non');
      var c = route(svg, '#contact');
      var t = /translate\(([\d.]+) ([\d.]+)\)/.exec(svg.querySelector('a[href="#contact"] .ico').getAttribute('transform'));
      var fwG = c[c.length - 1], fwD = [2 * t[1] - fwG[0], fwG[1]], sw = route(svg, '#a-propos')[0];
      var ts = [].filter.call(svg.querySelectorAll('text.h'), function (x) { return x.textContent === 'sw-coeur'; })[0];
      var cs = /translate\(([\d.]+) /.exec(ts.previousElementSibling.getAttribute('transform'));
      var swG = 2 * cs[1] - sw[0]; // bord gauche de l'icône de sw-coeur (sw est son bord droit)
      var lieux = { depart: pts[0], sw: sw, trunk: [(fwD[0] + swG) / 2, sw[1]], fw: src === 'wan' ? fwG : fwD, arrivee: pts[pts.length - 1] };
      var l = longueurs(pts), arrets = [], apres = 0;
      recit.e.forEach(function (e) { var d = distanceDe(pts, l, lieux[e.lieu], apres); if (d >= 0) { apres = d; } arrets.push(apres); });
      var baseTxt = svg.getAttribute('viewBox');
      var tag = creer('g', { 'class': 'sim sim-tag', 'aria-hidden': 'true' });
      tag.appendChild(creer('rect', { x: -17, y: -6.5, width: 34, height: 11 }));
      var tagTxt = creer('text', { x: 0, y: 1.5, 'text-anchor': 'middle' });
      tag.appendChild(tagTxt);
      var pkt = creer('rect', { 'class': 'pkt sim', x: -3.5, y: -3.5, width: 7, height: 7 });
      svg.appendChild(pkt);
      svg.appendChild(tag);
      pas = { svg: svg, base: baseTxt.split(' ').map(Number), baseTxt: baseTxt, cam: CAMERA[svg.getAttribute('class')] || CAMERA.desktop,
        pts: pts, l: l, arrets: arrets, i: 0, d: 0, v: v, recit: recit, dst: dst, pkt: pkt, tag: tag, tagTxt: tagTxt,
        trunk: { y: sw[1], x1: fwD[0], x2: swG }, dernier: null, monte: true, image: 0, finir: null };
      placer(pts[0]);
      plan.classList.add('pas-en-cours');
      pasTete.textContent = pasTexte.textContent = pasFin.textContent = '';
      panneau.hidden = false;
      pasSuite.textContent = 'Continuer';
      pasSuite.focus({ preventScroll: true });
      requestAnimationFrame(function () { if (pas) { montrer(); } }); // la zone aria-live doit exister avant son texte, sinon l'étape 1 n'est pas lue
      plan.scrollIntoView({ block: 'start' });
      animer(600, function (k) { cadrer(pts[0][0], pts[0][1], k); }, function () {});
    });
    pasSuite.addEventListener('click', avancer);
    document.getElementById('pas-stop').addEventListener('click', function () { arreterPas(); boutonPas.focus(); });
    document.addEventListener('keydown', function (e) { if (pas && e.key === 'Escape') { arreterPas(); boutonPas.focus(); } });
    plan.addEventListener('click', function (e) { if (pas && e.target.closest('a')) { arreterPas(); } }); // le visiteur part vers une rubrique
    simu.hidden = false;
    if (location.hash === '#simulation') { simu.open = true; simu.scrollIntoView(); }
  }

  // Plan du site : le câble qui pend sous sw-coeur. Branché, il fait une boucle : tempête de broadcast
  var tempete = document.getElementById('tempete');
  if (plan && tempete && plan.querySelector('.cable-libre')) {
    var enCours = false;
    var tempeteFinie = function () {
      plan.classList.remove('boucle');
      enCours = false;
      tempete.textContent = 'Tempête de broadcast : ce câble reliait deux ports de sw-coeur et formait une boucle. Sans Spanning Tree (STP) pour bloquer l\'un des deux ports, chaque trame de broadcast est recopiée sans fin et sature le réseau. Câble débranché, le calme revient.';
    };
    var orage = function (depart) {
      var largeur = window.innerWidth - 8, hauteur = window.innerHeight - 8;
      var vol = [], debut = Date.now(), duree = 4000;
      var bouger = function (s, x, y) {
        var x2 = Math.random() * largeur, y2 = Math.random() * hauteur;
        var a = s.animate([
          { transform: 'translate(' + x + 'px, ' + y + 'px)' },
          { transform: 'translate(' + x2 + 'px, ' + y2 + 'px)' }
        ], { duration: 300 + Math.random() * 350, fill: 'forwards' });
        a.onfinish = function () {
          if (Date.now() - debut > duree) { return; }
          lancer(x2, y2); // chaque trame de broadcast est recopiée
          bouger(s, x2, y2);
        };
      };
      var lancer = function (x, y) {
        if (vol.length >= 96) { return; }
        var s = document.createElement('span');
        s.className = 'paquet-fou';
        s.setAttribute('aria-hidden', 'true');
        document.body.appendChild(s);
        vol.push(s);
        bouger(s, x, y);
      };
      for (var i = 0; i < 8; i++) { lancer(depart[0], depart[1]); }
      setTimeout(function () {
        vol.forEach(function (s) {
          var a = s.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 400, fill: 'forwards' });
          a.onfinish = function () { s.remove(); };
        });
        setTimeout(tempeteFinie, 420);
      }, duree);
    };
    var brancher = function (e) {
      if (e.type === 'keydown' && e.key !== 'Enter' && e.key !== ' ') { return; }
      e.preventDefault();
      if (enCours) { return; }
      enCours = true;
      plan.classList.add('boucle');
      tempete.textContent = 'Câble branché : sw-coeur est relié à lui-même…';
      var r = e.currentTarget.getBoundingClientRect();
      if (!document.body.animate) { setTimeout(tempeteFinie, 1500); return; }
      orage([r.left + r.width / 2, r.top]);
    };
    plan.querySelectorAll('.cable-libre').forEach(function (c) {
      c.addEventListener('click', brancher);
      c.addEventListener('keydown', brancher);
    });
    plan.classList.add('avec-cable');
  }

  // Plan du site : l'étiquette « trunk 802.1Q » se déplie et montre ses 4 octets
  var etiquette = document.getElementById('etiquette-8021q');
  if (plan && etiquette && plan.querySelector('.trunk-tag')) {
    var trunks = plan.querySelectorAll('.trunk-tag');
    var deplier = function (e) {
      if (e.type === 'keydown' && ((e.key !== 'Enter' && e.key !== ' ') || e.repeat)) { return; }
      e.preventDefault();
      etiquette.hidden = !etiquette.hidden;
      trunks.forEach(function (t) { t.setAttribute('aria-expanded', String(!etiquette.hidden)); });
      // Le panneau s'ouvre sous le plan, parfois hors de l'écran (surtout sur téléphone) : on l'amène à l'écran
      if (!etiquette.hidden && etiquette.getBoundingClientRect().bottom > window.innerHeight) {
        etiquette.scrollIntoView({ block: 'nearest' });
      }
    };
    trunks.forEach(function (t) {
      t.setAttribute('tabindex', '0');
      t.setAttribute('role', 'button');
      t.setAttribute('aria-label', 'trunk 802.1Q : déplier son étiquette');
      t.setAttribute('aria-controls', 'etiquette-8021q');
      t.setAttribute('aria-expanded', 'false');
      var bulle = document.createElementNS('http://www.w3.org/2000/svg', 'title');
      bulle.textContent = 'Que contient l\'étiquette 802.1Q ?';
      t.insertBefore(bulle, t.firstChild);
      t.addEventListener('click', deplier);
      t.addEventListener('keydown', deplier);
    });
    plan.classList.add('avec-trunk');
  }

  // Pour les curieux qui ouvrent les outils de développement, et pour l'onglet laissé de côté
  if (window.console && console.log) {
    console.log('Vous inspectez le trafic de ce site ? Parlons-en : https://forestmaxime-pf.fr/#contact\nLe code source est ouvert : https://github.com/maximeforest-cyber/portfolio');
  }
  var titre = document.title;
  document.addEventListener('visibilitychange', function () {
    document.title = document.hidden ? 'Connexion perdue… | Maxime Forest' : titre;
  });

  document.getElementById('annee').textContent = new Date().getFullYear();
})();
