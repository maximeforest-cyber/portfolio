import subprocess, os, sys
# Images d'aperçu (LinkedIn, og:image) des pages du homelab, 1200 x 627.
# Usage : python3 -I _outils/apercu.py <dossier-temporaire> projets/img
# Ajouter la page dans « pages » ci-dessous, puis la balise og:image dans la page.
D=sys.argv[1]; OUT=sys.argv[2]
SANS='/usr/share/fonts/truetype/liberation/LiberationSans-Regular.ttf'
BOLD='/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf'
MONO='/usr/share/fonts/truetype/dejavu/DejaVuSansMono-Bold.ttf'
MONOR='/usr/share/fonts/truetype/dejavu/DejaVuSansMono.ttf'
pages={
 'homelab':("PROJET PERSONNEL · HOMELAB",["Un ancien PC de jeu","devenu serveur"],"Audit et surveillance des sites de mes clients, étape par étape"),
 'homelab-etape-1':("HOMELAB · ÉTAPE 1 SUR 10",["Installer un serveur Ubuntu","sur un ancien PC"],"Ubuntu Server 24.04 · SSH par clé seulement · adresse fixe"),
 'homelab-etape-2':("HOMELAB · ÉTAPE 2 SUR 10",["Le socle logiciel","du serveur"],"Pare-feu ufw · mises à jour automatiques · Docker · Git privé"),
 'homelab-etape-3':("HOMELAB · ÉTAPE 3 SUR 10",["L'accès à distance","au serveur"],"VPN WireGuard · Wake-on-LAN · extinction à distance · test en 4G"),
 'homelab-etape-4':("HOMELAB · ÉTAPE 4 SUR 10",["L'audit DNS et courrier","d'un nom de domaine"],"MX · SPF · DMARC · DKIM · DNSSEC · 30 tests automatiques"),
 'homelab-etape-5':("HOMELAB · ÉTAPE 5 SUR 10",["L'audit web","d'un site"],"HTTPS · en-têtes de sécurité · expiration du domaine · 65 tests"),
}
def t(name,txt):
    p=os.path.join(D,name); open(p,'w').write(txt); return p
for slug,(kick,title,sub) in pages.items():
    f=[ "drawbox=x=80:y=64:w=88:h=88:color=0x1f1d1b:t=fill",
        "drawbox=x=80:y=142:w=88:h=10:color=0x8e2f3c:t=fill",
        f"drawtext=fontfile={MONO}:textfile={t(slug+'-mf','MF')}:fontsize=36:fontcolor=0xefe9df:x=124-text_w/2:y=103-text_h/2",
        f"drawtext=fontfile={BOLD}:textfile={t(slug+'-nom','Maxime Forest')}:fontsize=32:fontcolor=0x1f1d1b:x=196:y=74",
        f"drawtext=fontfile={SANS}:textfile={t(slug+'-sous','BTS SIO option SISR · portfolio')}:fontsize=24:fontcolor=0x57514b:x=196:y=118",
        f"drawtext=fontfile={MONO}:textfile={t(slug+'-k',kick)}:fontsize=25:fontcolor=0x8e2f3c:x=80:y=218"]
    y=274
    for i,l in enumerate(title):
        f.append(f"drawtext=fontfile={BOLD}:textfile={t(slug+f'-t{i}',l)}:fontsize=66:fontcolor=0x1f1d1b:x=80:y={y}"); y+=78
    f.append(f"drawtext=fontfile={SANS}:textfile={t(slug+'-s',sub)}:fontsize=29:fontcolor=0x57514b:x=80:y={y+18}")
    f+=[ "drawbox=x=0:y=539:w=1200:h=8:color=0x8e2f3c:t=fill",
         "drawbox=x=0:y=547:w=1200:h=80:color=0x1f1d1b:t=fill",
         f"drawtext=fontfile={MONOR}:textfile={t(slug+'-u','forestmaxime-pf.fr')}:fontsize=26:fontcolor=0xefe9df:x=80:y=587-text_h/2",
         f"drawtext=fontfile={SANS}:textfile={t(slug+'-r','Objectif · configuration · tests · problèmes rencontrés')}:fontsize=22:fontcolor=0xc9c1b5:x=1120-text_w:y=587-text_h/2"]
    subprocess.run(["ffmpeg","-v","error","-y","-f","lavfi","-i","color=c=0xefe9df:s=1200x627","-frames:v","1","-vf",",".join(f),os.path.join(OUT,f"apercu-{slug}.png")],check=True)
