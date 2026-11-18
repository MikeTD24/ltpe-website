# Reprise du site LTPE — 17 novembre 2026

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
- Reste à effectuer : créer une clé YouTube valide, l’enregistrer dans le secret de dépôt `YOUTUBE_API_KEY`, lancer la première synchronisation et vérifier les vidéos réelles.
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

## Aperçu local

Depuis le dossier du projet :

```powershell
python -m http.server 8765 --bind 127.0.0.1
```

Ouvrir http://127.0.0.1:8765/index.html. Arrêter le serveur avec Ctrl+C. Éviter l’ouverture directe en `file://` : le navigateur peut empêcher la lecture du catalogue JSON.

## Vérification

Les contrôles locaux couvrent les chemins d’images et les ancres, la syntaxe, la recherche sans accents, le tri, l’échappement des titres et la synchronisation simulée avec conservation du catalogue lors d’une erreur. La synchronisation réelle et le déploiement restent à valider après configuration GitHub.

Les anciens README et guides reflètent l’ancienne intégration ; ce document décrit le fonctionnement actuel.
