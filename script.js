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
      '#contact': { nom: 'fw-contact', vlan: 0, rub: 'Contact' },
      '#a-propos': { nom: 'pc-maxime', vlan: 10, rub: 'À propos' },
      '#competences': { nom: 'srv-competences', vlan: 10, rub: 'Compétences' },
      '#parcours': { nom: 'nas-parcours', vlan: 10, rub: 'Parcours' },
      '#projets': { nom: 'srv-projets', vlan: 20, rub: 'Projets et stages' },
      '#certifications': { nom: 'pki-certifs', vlan: 20, rub: 'Certifications' },
      '#veille': { nom: 'ids-veille', vlan: 20, rub: 'Veille' }
    };
    var regles = { 1: 'Web_public', 2: 'Web_redirection', 3: 'Admin_poste', 4: 'Défaut' };
    var choixSrc = document.getElementById('simu-src');
    var choixDst = document.getElementById('simu-dst');
    var choixSvc = document.getElementById('simu-svc');
    var verdict = document.getElementById('simu-verdict');
    var minuteur;

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
      document.querySelectorAll('.folio.arrivee').forEach(function (e) { e.classList.remove('arrivee'); });
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
    var afficher = function (v) {
      verdict.textContent = '';
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
        if (!libre) { arriver(section); } // le visiteur est allé ailleurs : on ne lui prend pas le focus
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

    document.getElementById('simu-go').addEventListener('click', function () {
      var src = choixSrc.value, dst = choixDst.value;
      var v = juger(src, dst, choixSvc.value);
      nettoyer();
      verdict.textContent = '';
      var svg = svgAffiche();
      if (!svg || v.etat === 'meme') { afficher(v); return; }
      var pts = chemin(svg, src, dst, v.etat === 'non');
      var fin = function () {
        marquer(svg, pts, v);
        afficher(v);
        if (plan.classList.contains('en-pause')) { return; }
        if (v.etat === 'non') { jeter(pkt); return; }
        minuteur = setTimeout(function () { voyager(svg, arrivee, dst); }, 450);
      };
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
