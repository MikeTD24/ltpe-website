# Reprise du site LTPE — 17 novembre 2026

## Jeunesse, Femmes et Hommes — 19 novembre 2026

- Photo `images/Ltpe-Jeunesse.jpeg` ajoutée à la carte Groupe de Jeunesse de Grandir et servir ensemble et à `jeunesse.html`. Affichage complet pour préserver les visages.
- Groupes des Femmes et des Hommes ajoutés après la Jeunesse sur l’accueil, ainsi que dans les ministères d’À propos. Descriptifs, liens, icônes provisoires et pages `femmes.html` / `hommes.html` prêts à recevoir leurs contenus.
- Grille de sept départements : quatre cartes puis trois centrées sur grand écran, adaptation sur tablette et mobile.
- Traductions FR/NL/EN complétées. Style de code aéré conservé ; préférence consignée dans le fichier AGENTS.md du dossier de travail pour les reprises futures.

## Page À propos et lisibilité — 19 novembre 2026

- Code HTML, CSS, JavaScript et workflows réindenté avec Prettier ; configuration conservée dans `.prettierrc.json`. Les blocs et les attributs sont désormais espacés.
- Hauteur et point de cadrage des bandeaux Accueil/À propos ajustés pour préserver les visages sur les écrans larges.
- Frise par lieux, sans anciennes photos inventées : 2012 Bruxelles-Midi ; 2013–2020 Ixelles ; depuis 2022 Ruisbroek ; aujourd’hui. Une note publique précise que les dates de déménagement sont provisoires, dans l’attente de confirmation.
- Valeurs conservées comme textes explicatifs. Communion fraternelle mène à Événements ; Puissance du Saint-Esprit mène au groupe de prière. Les pasteurs invités pourront être présentés dans les événements de leur visite plutôt que dans l’équipe permanente.
- Logo officiel ADFB copié depuis https://adfb.be/wp-content/uploads/2017/06/Logo-ADFB.png vers `images/adfb-logo.png`. Nom d’affiliation harmonisé avec « Assemblées de Dieu francophones de Belgique ».
- Équipe permanente de trois personnes : Martin MFUAMBA MUAMBA, Paul BAMPALE et Abel TEBILY (rôle corrigé en Pasteur Stagiaire). Carte Autre Membre supprimée.
- Portrait de Paul préparé avec l’outil ImageGen intégré depuis la deuxième capture, originaux conservés. Asset : `images/paul-bampale-portrait.png`. Consigne : extraire le portrait photographique de Paul BAMPALE, préserver son identité, ses lunettes, son expression et ses vêtements, retirer les textes et le cadre, fond gris discret ; aucune modification volontaire des traits.
- Louange : photographie complète affichée sans recadrage des visages, y compris sur sa page dédiée. Prière : photo existante `Culte2.jpg` montrant l’assemblée en prière.
- Cinquième département Groupe de Jeunesse sur l’accueil et À propos, avec page `jeunesse.html` prête à recevoir photos et vidéos.
- Traductions FR/NL/EN complétées ; tests DOM réussis sur les onze pages. Chemins, ancres, composition de l’équipe et frise vérifiés.

## Langues et marché de Noël — 19 novembre 2026

- Sélecteur **FR / NL / EN** sur les dix pages. La langue choisie est mémorisée dans le navigateur et transmise dans les liens (`?lang=nl`, par exemple).
- Traductions locales dans `js/translations.js`, appliquées par `js/i18n.js` : textes, boutons, formulaires, navigation, descriptions des pages et libellés accessibles. Aucun service de traduction tiers ni clé supplémentaire.
- Les noms officiels, coordonnées bancaires, titre du livre, titres/descriptions des vidéos et affiches originales sont conservés. Les dates, filtres et messages de l’interface vidéo suivent la langue du site.
- Marché de Noël publié : samedi **28 novembre 2026 de 13:00 à 19:00**, dimanche **29 novembre de 13:30 à 18:00**, Stationsstraat 1, 1601 Ruisbroek. Petite restauration, articles de Noël et concert gratuit.
- Les deux affiches FR et NL sont disponibles en entier et ouvrables séparément. Le programme écrit est disponible dans les trois langues.
- Bandeau d’accueil défilant avec lien vers l’événement et bouton pause ; arrêt au survol et au clavier ; respect de la préférence de réduction des animations. Il se masque après la dernière session de l’événement (heure de Bruxelles).
- **Pour ajouter un événement** : ajouter une entrée dans `data/events.json`, avec un identifiant unique, un titre FR/NL/EN, le lieu, les sessions (dates ISO avec fuseau), le programme et les chemins des affiches. Après publication, cette même source alimente la page Événements et le bandeau d’accueil. Ajouter au dictionnaire les nouveaux libellés de programme si nécessaire. Les événements terminés restent consultables dans les archives.
- Tests DOM réussis sur les dix pages : changements FR/NL/EN répétés, retour au français, mémorisation, liens, champs du formulaire, résultats vidéo, affiches, dates et expiration de l’annonce. Syntaxe et chemins contrôlés. La préparation visuelle d’À propos reste l’étape suivante.

## Améliorations de l’accueil — 19 novembre 2026

- Bouton Donner relié à `donner.html` sur toutes les pages : 2 Corinthiens 9 : 7, bénéficiaire L.TPE ASBL, IBAN BE24 0016 6583 3338, consigne de communication et remerciements. QR code à ajouter dès réception.
- Photo de bienvenue remplacée par `images/Ltpe-Temple.jpeg`.
- Section Horaire des Cultes/Événements : calendrier, horloge et soleil ; mention Zoom conservée ; quatrième carte vers `evenements.html`.
- Icônes propres aux ministères : enfants et Bible, musique, mains en prière, outils. Les liens de l’accueil continuent à mener à Grandir et servir ensemble ; ses quatre cartes ouvrent désormais `ecodim.html`, `louange.html`, `priere.html` et `logistique.html`.
- Page `pasteur.html` avec la même photo, la présentation fournie de Martin MFUAMBA MUAMBA et les références de son livre (OAS7200, EAN 9782369572008, éditeur Oasis).
- Soutenir l’église propose un lien vers la page de don et conserve le bouton de contact.
- Pages Événements et ministères préparées sans inventer d’annonces, de dates ni de contenus à venir.
- Workflow Pages adapté pour publier toutes les pages HTML. Contrôle des chemins, ancres, identifiants, icônes SVG et contenus demandés réussi sur les dix pages. Contrôle visuel automatisé non disponible dans cette session.

## Modifications locales

- Conservation du projet HTML/CSS/JavaScript et des photos existantes.
- En-tête, logo, navigation et pied de page communs aux trois pages.
- Mise en page adaptée aux maquettes : grands bandeaux photo, sections claires, cartes, boutons dorés et pied de page bleu nuit.
- Menu mobile, liens entre les sections, présentation des ministères et photos réparées.
- Formulaire honnête : il prépare un e-mail dans la messagerie du visiteur ; il ne prétend plus avoir envoyé un message. Le visiteur doit valider l’envoi.
- Coordonnées communes reprises de l’accueil local : Stationsstraat 1, 1601 Ruisbroek ; +32-497 11 82 14 ; letempledupleinevangile@gmail.com. Création : 2012. Noms et fonctions conservés depuis le fichier À propos local, conformément à la confirmation du propriétaire. Le quatrième profil reste « Autre Membre » à personnaliser.

## YouTube : fonctionnement prévu

Un domaine personnalisé n’est pas nécessaire. GitHub Pages fournit une adresse HTTPS utilisable. Le problème initial ne peut pas être attribué au domaine : la requête réelle vers Google n’a pas abouti depuis cet environnement, donc ni la validité de la clé ni la cause exacte de la panne ne sont confirmées.

L’ancien navigateur appelait directement l’API et exposait la clé dans le JavaScript. Le nouveau fonctionnement est :

1. GitHub Actions utilise le secret `YOUTUBE_API_KEY` pour retrouver `@ltpevangile` puis sa playlist de publications.
2. Le script récupère jusqu’à 500 vidéos publiques et écrit uniquement leurs métadonnées dans `data/youtube-videos.json`.
3. Le site lit ce catalogue, affiche les trois derniers messages sur l’accueil, le dernier lecteur sur Enseignements, puis les vidéos avec recherche, catégorie, tri et bouton Charger plus.
4. La synchronisation est programmée toutes les six heures ; une publication Pages suit sa réussite. Les horaires GitHub peuvent être retardés. Les catégories sont déduites des mots dans les titres/descriptions, sans inventer les prédicateurs.
5. En cas d’échec, le dernier catalogue reste intact. Sans catalogue initial, le site propose un lien vers la chaîne, sans fausses vidéos.

## Activation sur GitHub — reste à effectuer

### État après publication

- Connexion Git officielle validée avec le compte MikeTD24.
- Modifications locales publiées sur `main` dans le commit `577a68d`, après intégration des deux changements distants du README.
- GitHub Pages configuré avec le mode **GitHub Actions**, HTTPS conservé.
- Adresse du site : https://miketd24.github.io/ltpe-website/.
- Premier workflow de publication réussi : https://github.com/MikeTD24/ltpe-website/actions/runs/44364147465.
- Nouvelle clé YouTube créée par le propriétaire et enregistrée uniquement dans le secret de dépôt `YOUTUBE_API_KEY`.
- Première synchronisation réelle réussie le 18 novembre 2026 : **493 vidéos publiques** récupérées. Le catalogue a aussi été récupéré dans le projet local.
- Exécution de synchronisation : https://github.com/MikeTD24/ltpe-website/actions/runs/44402632049.
- La publication du catalogue est déclenchée automatiquement après chaque synchronisation réussie.
- Fréquence conservée : toutes les six heures.

Les notes de vérification ci-dessous décrivent les étapes antérieures ; cet état de publication est le plus récent.

### Installer et connecter l’intégration GitHub

La connexion à github.com dans le navigateur ne connecte pas automatiquement GitHub à ChatGPT/Codex.

1. Dans l’application ChatGPT sur ordinateur, ouvrir l’onglet **Plugins**. Le catalogue est aussi accessible à https://chatgpt.com/plugins.
2. Rechercher **GitHub**, ouvrir sa fiche et sélectionner le bouton **+** d’installation.
3. Suivre la demande de connexion GitHub avec le compte **MikeTD24**. Si un choix de dépôts est proposé, sélectionner **ltpe-website**.
4. Vérifier les autorisations demandées puis terminer la connexion sur GitHub.
5. Revenir dans la conversation et signaler que la connexion est terminée. Si les outils n’apparaissent pas dans cette conversation, démarrer une nouvelle conversation avec le dossier local du projet et demander de reprendre l’activation décrite dans ce fichier.

L’extension IDE ne prend pas en charge l’installation des plugins ; utiliser l’application ChatGPT sur ordinateur pour cette étape.

Source : https://learn.chatgpt.com/docs/plugins

### Fréquence de synchronisation

La configuration actuelle vérifie les vidéos toutes les six heures, soit quatre fois par jour, indépendamment du nombre de visiteurs. Le script consomme au maximum 21 unités par exécution pour 500 vidéos, soit 84 unités par jour, sur le quota standard de 10 000 unités/jour des méthodes utilisées. Ce n’est donc pas une fréquence excessive pour le quota.

Une vérification quotidienne, avec lancement manuel possible après une publication, peut suffire si un délai d’environ un jour est acceptable. Une fréquence plus élevée réduit le délai d’apparition des nouvelles vidéos. Aucune modification de fréquence n’a été faite à ce stade.

Source : https://developers.google.com/youtube/data/determine_quota_cost

### Vérifications du 18 novembre 2026

- Accès réseau au dépôt confirmé ; les deux modifications distantes concernant le README ont été récupérées sans écraser les fichiers locaux.
- L’accès en écriture n’est pas encore authentifié. L’intégration GitHub a été proposée pour poursuivre la publication et les réglages.
- Diagnostic réel Google : HTTP 400, « API key not valid. Please pass a valid API key. » La clé locale existante n’est donc pas utilisable pour la synchronisation.
- Contrôles réussis : syntaxe JavaScript/Python ; chemins des images et ancres des trois pages ; absence de clé API dans les fichiers publics ; recherche avec accents, catégories, tri, durées et échappement des titres ; synchronisation sur réponse simulée et conservation du catalogue en cas d’erreur.
- Aucune publication ni modification des réglages GitHub n’a encore été effectuée.

Les fichiers sont modifiés localement, sans commit, push ou publication pendant cette intervention.

1. Dans Google Cloud, activer **YouTube Data API v3**. Remplacer la clé précédemment présente dans le code public et limiter la nouvelle clé à cette API. Une restriction par référent navigateur ne convient pas à cette tâche exécutée sur GitHub.
2. Dans le dépôt GitHub : **Settings → Secrets and variables → Actions → New repository secret** ; nom : `YOUTUBE_API_KEY`, valeur : la nouvelle clé.
3. Dans **Settings → Pages**, sélectionner **GitHub Actions** comme source. Les deux workflows sont fournis dans `.github/workflows/`.
4. Publier les fichiers du projet sur la branche par défaut. Lancer **Actions → Synchroniser les vidéos YouTube → Run workflow**. Vérifier la réussite, puis celle de **Publier le site LTPE**.
5. Vérifier les vraies vidéos et leur lecture sur le site HTTPS. L’affichage dépend aussi des restrictions de lecture définies par YouTube pour chaque vidéo.

La clé locale préexistante est conservée dans `.env.local`, ignoré par Git. Le script ne charge pas automatiquement ce fichier : il lit une variable d’environnement. Aucun secret n’est inclus dans le paquet Pages.

## Enseignements et contrôle global — 20 novembre 2026

- Bannière : photo en costume bordeaux (`images/teachings-banner-2.png`), titre et message superposés. Hauteur limitée à 380–500 px sur ordinateur et 360 px sur mobile. Photo centrale sans déformation et fond flouté issu de la même image pour remplir la largeur sans couper le visage ou la Bible. La première proposition est conservée dans `images/teachings-banner-1.png`. Pour changer de photo, modifier à la fois la source dans `teachings.html` et le fond `.hero-teachings::before` dans `css/refinements.css`.
- Recherche : titres uniquement, sans les descriptions YouTube qui répètent les horaires de tous les cultes. Les recherches « prière », « culte » et « étude » utilisent les catégories déduites des titres, avec variantes FR/NL/EN. Les titres génériques restent dans « Tous les enseignements ».
- Pagination : « Charger plus » et « Charger moins » par groupes de neuf, avec maintien des filtres. Traductions FR/NL/EN conservées.
- Tests : `node scripts/check-teachings.cjs` couvre les catégories, les descriptions trompeuses, les recherches multilingues, le tri et l’échappement HTML. Vérifications DOM complémentaires des treize pages et du catalogue réel : langues, liens, événements et pagination.

### Sécurité : portée et limites du contrôle

- Aucun secret YouTube dans les fichiers publics actuels ; clé de synchronisation conservée dans Actions. L’ancienne clé invalide reste dans l’historique Git : ne pas la réactiver ni la réutiliser.
- Ajout d’une politique CSP dans chaque document : scripts locaux seulement, connexions locales, intégrations YouTube et Google Maps autorisées, objets et balise base interdits. Les styles intégrés restent autorisés pour les mises en page existantes.
- Politique de référent ajoutée ; liens externes en nouvel onglet protégés ; identifiants YouTube validés et titres échappés avant insertion HTML.
- Le formulaire prépare un e-mail, sans envoi automatique ni stockage serveur. Son repli sans JavaScript évite les coordonnées dans l’URL.
- Actions GitHub figées sur des SHA, temps d’exécution limité et publication après synchronisation restreinte à la branche par défaut. Fréquence de synchronisation inchangée : six heures.
- HTTPS et HSTS constatés sur Pages ; fichiers `.env.local`, `.git/config` et ancien fichier de clé inaccessibles aux URL vérifiées. Le paquet public exclut outils locaux, documentation et configuration privée.
- Ce contrôle du code, de la configuration et des comportements n’est pas un test d’intrusion exhaustif. Les réglages du compte GitHub (dont 2FA) et ceux de Google Cloud ne sont pas audités ici.
- Une CSP par balise meta ne remplace pas tous les en-têtes serveur : par exemple `frame-ancestors` exige un en-tête HTTP. Un hébergement/proxy configurable permettrait ces protections supplémentaires.
- Le site actuel est public, sans espace administrateur ni données privées. Un guard Angular ne protège pas les données côté serveur ; une future zone privée devra utiliser une authentification et des autorisations vérifiées côté serveur.

Références : [Angular — route guards](https://angular.dev/guide/routing/route-guards), [MDN — CSP](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CSP), [GitHub — sécuriser Actions](https://docs.github.com/en/actions/reference/security/secure-use).

## Référencement et domaine OVHcloud

### État actuel — 22 novembre 2026

Le domaine officiel est désormais `https://www.ltpe.be/`. Les quatre entrées A GitHub Pages et le CNAME `www` vers `miketd24.github.io` sont en place ; les MX OVH sont conservés. GitHub a approuvé le certificat couvrant `ltpe.be` et `www.ltpe.be` après retrait/réajout immédiat du domaine selon sa procédure officielle de dépannage. L’option `https_enforced` a ensuite été activée et vérifiée.

La source `scripts/seo.json` utilise maintenant le domaine officiel. La génération fournit les URL canoniques, liens de langue, cartes de partage et sitemap correspondants. Ne pas remettre l’ancien préfixe `/ltpe-website/` dans les liens du domaine propre.

Pour terminer Search Console, le propriétaire doit ouvrir `https://search.google.com/search-console/`, ajouter une propriété de type **Domaine** nommée `ltpe.be` (sans protocole, chemin ni www), puis obtenir sa valeur de vérification TXT. Ajouter cette valeur comme nouvelle entrée TXT à la racine chez OVH, en préservant les entrées SPF/MX existantes. Valider la propriété avec le compte Google qui doit en garder la maîtrise, puis soumettre `https://www.ltpe.be/sitemap.xml`. Aucune propriété Google n’a été créée ni validée automatiquement pendant le raccordement.

Les paragraphes suivants relatent la préparation initiale ; l’état ci-dessus les remplace pour les adresses du domaine.

Le mail du 20 novembre confirme les serveurs DNS OVHcloud, pas le raccordement à Pages. Le résolveur public interrogé ne trouvait pas encore `ltpe.be` et `www.ltpe.be` au moment du contrôle. Ne pas commander de nouveau domaine.

- Titres et descriptions propres aux treize pages, rédigés en FR/NL/EN et mentionnant Ruisbroek quand pertinent.
- Depuis le 21 novembre : 39 pages HTML statiques dans `/fr/`, `/nl/` et `/en/`, avec contenu, métadonnées et liens de langue disponibles sans JavaScript. Les titres YouTube, noms propres, coordonnées et références bibliographiques gardent leur forme originale.
- Les pages racines restent accessibles comme alias français avec une URL canonique `/fr/`. Les anciens liens `?lang=nl` et `?lang=en` redirigent côté navigateur vers la nouvelle page de langue lorsque JavaScript est actif.
- URL canoniques et liens réciproques `hreflang` FR/NL/EN avec repli français. Les cartes de partage sont maintenant localisées directement dans le HTML.
- `sitemap.xml` contient les 39 URL linguistiques. `robots.txt` et sitemap sont inclus dans le paquet Pages. Sur l’hébergement actuel dans un sous-chemin, le `robots.txt` du projet n’est pas celui de la racine du domaine github.io : soumettre le sitemap directement dans Search Console. Après raccordement du domaine propre, il sera à la racine du domaine.
- Aucune modification DNS ni inscription Search Console effectuée pendant cette préparation. Aucun suivi publicitaire ajouté. Les redirections de compatibilité concernent uniquement les anciennes URL de langue.

### Régénérer les métadonnées

Les sources éditoriales restent les treize HTML à la racine, `js/translations.js`, `scripts/seo.json` et les catalogues JSON. Ne pas modifier les fichiers générés dans `dist/`. Le générateur `scripts/build-site.cjs` partage les CSS, scripts et images ; il génère aussi le sitemap et les alias des anciennes pages. Les originaux ignorés ne sont pas copiés : seuls les fichiers publics suivis par Git sont admis dans l’artifact.

Installer Node.js 22 ou supérieur, puis lancer `npm ci --ignore-scripts`, `npm run build` et `npm test`. Le verrouillage `package-lock.json` est versionné. GitHub Actions exécute automatiquement cette génération et les tests avant chaque déploiement, y compris après les synchronisations YouTube toutes les six heures. Aucune clé n’est nécessaire à la génération.

Conserver l’adresse GitHub actuellement fonctionnelle dans `base_url` jusqu’à validation du domaine propre et de son HTTPS. Le sitemap est généré pour cette adresse à chaque publication.

Au passage à `https://www.ltpe.be/`, modifier `base_url`, régénérer puis publier. Vérifier le domaine dans GitHub avant d’orienter la zone DNS vers Pages ; préserver les entrées de messagerie. Contrôler les deux adresses avec/sans www et HTTPS avant de déclarer le sitemap final à Google Search Console.

### Limites et suite

Le contenu traduit, les événements et les premières vidéos sont prérendus lors de la génération. JavaScript apporte ensuite l’actualisation des événements, la recherche, les filtres et la pagination YouTube. Le changement de langue utilise une navigation réelle et ne dépend plus du stockage local ; l’URL choisie est prioritaire. L’indexation réelle reste à contrôler avec Google. L’ajout de données structurées fiables, l’optimisation du poids des grandes photos et l’examen d’une éventuelle fiche locale existante pourront compléter cette première passe. Ne pas créer de doublon de fiche.

Search Console demande une validation de propriété et reste à connecter avec le propriétaire. Ne pas promettre de classement ni d’indexation automatique. Références : [Google — versions linguistiques](https://developers.google.com/search/docs/specialty/international/localized-versions), [Google — URL canoniques](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls).

## Formulaire de contact et icône d’onglet

Le propriétaire a confirmé la réception réelle du message test dans la boîte de l’église et l’affichage du favicon. La chaîne d’envoi est donc validée au-delà des simulations automatiques.

L’icône `images/favicon.svg` reprend la partie LTPE du logo original dans un carré adapté aux onglets, sans changer les lettres. Le générateur l’ajoute aux 39 pages et aux anciennes adresses.

Le formulaire direct Web3Forms est configuré dans le générateur et `js/main.js`. Le propriétaire a fourni la clé publique reçue à l’adresse de l’église ; elle est renseignée dans `scripts/contact.json` (`access_key`). Cette clé est prévue pour le HTML. Une variable d’environnement `LTPE_CONTACT_ACCESS_KEY` peut aussi fournir cette valeur au build. Ne jamais y mettre une clé SMTP, un mot de passe ou la clé YouTube.

Tant que cette valeur est vide, la version publiée conserve le formulaire « Préparer mon e-mail ». Dès qu’elle est renseignée, le build produit un formulaire POST direct : retour de réussite uniquement après acceptation par le service, texte conservé en cas d’échec, délai limité, bouton désactivé pendant l’envoi et piège anti-robot. La notice de transmission à Web3Forms et les messages sont traduits. La CSP autorise uniquement l’endpoint nécessaire sur les pages de contact activées. Sans JavaScript, le formulaire POST est traité par le service externe.

Les tests `scripts/check-contact.cjs` simulent les retours sans envoyer d’e-mail. La réception réelle doit encore être vérifiée dans la boîte de l’église après activation de sa clé. Un retour accepté du service ne prouve pas à lui seul l’arrivée dans la boîte principale (vérifier aussi les spams).

### Modifier le site après connexion du domaine

Le domaine ne change pas le circuit : récupérer les changements GitHub, modifier les HTML sources à la racine, `js/translations.js` et les JSON concernés, exécuter `npm run build` puis `npm test`, vérifier l’aperçu, committer et pousser. GitHub Actions génère et publie `dist/` sur `https://www.ltpe.be/`. Ne pas modifier `dist/` manuellement. Les vidéos restent synchronisées automatiquement toutes les six heures. Il n’y a pas d’interface CRUD d’administration à ce stade.

Référence du service : https://docs.web3forms.com/getting-started/installation

## Dons et prières matinales — mise à jour du 22 novembre 2026

- Le favicon est `images/favicon.svg`, ajouté par `scripts/build-site.cjs` via `tag('link', { rel: 'icon', ... })`.
- `images/qr-don-ltpe.png` est extrait du premier exemplaire du PDF original, remis à l’endroit sans redessin du code. Sa lecture retrouve exactement le contenu original : virement SEPA vers `BE24001665833338`, sans montant fixé, avec communication « Dimes ou offrandes ». Décodage vérifié également à 320 et 280 pixels. Le PDF original `images/QR CODE DON.pdf` reste local et ignoré par Git.
- Le QR est affiché sur la page Donner, avec un lien vers sa version agrandie et le virement classique conservé.
- Les réunions du mercredi et vendredi commencent à 19 h ; fin inchangée à 20 h 30.
- La carte « Prières Matinales » de l’accueil mène à `breche.html`. Cette page présente le programme daté du 23 au 27 novembre 2026, de 6 h à 7 h, le thème de l’affiche et l’identifiant Zoom fourni. L’affiche originale est en français ; les textes de page et les informations pratiques sont disponibles en FR/NL/EN.
- Pour le mois suivant, mettre à jour l’affiche, les dates, le thème et les traductions. Les dates de novembre restent explicites afin de ne pas présenter ce programme comme un rendez-vous permanent.
- La génération couvre désormais 14 pages sources, soit 42 pages de langue ; les tests et le sitemap calculent ce nombre automatiquement.

## Aperçu local (lancer le site)

Depuis le dossier du projet :

```powershell
npm run build
python -m http.server 8765 --bind 127.0.0.1 --directory dist
```

Ouvrir http://127.0.0.1:8765/fr/index.html, puis les versions `/nl/` et `/en/`. Arrêter le serveur avec Ctrl+C. Éviter l’ouverture directe en `file://` : le navigateur peut empêcher la lecture du catalogue JSON.

## Vérification

Les contrôles locaux couvrent les chemins d’images et les ancres, la syntaxe, la recherche sans accents, le tri, l’échappement des titres et la synchronisation simulée avec conservation du catalogue lors d’une erreur. La synchronisation réelle et le déploiement restent à valider après configuration GitHub.

Les anciens README et guides reflètent l’ancienne intégration ; ce document décrit le fonctionnement actuel.
