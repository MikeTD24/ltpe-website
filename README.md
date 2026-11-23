# Le Temple du Plein Évangile — LTPE

<img src="images/Ltpe-logo.jpeg" alt="Logo du Temple du Plein Évangile" width="200" />

Site officiel de l’église **Le Temple du Plein Évangile**, à Ruisbroek, en Belgique.

**Site en ligne : [www.ltpe.be](https://www.ltpe.be/)**

[Français](https://www.ltpe.be/fr/index.html) · [Nederlands](https://www.ltpe.be/nl/index.html) · [English](https://www.ltpe.be/en/index.html)

Le site utilise HTML, CSS et JavaScript. Il est hébergé sur **GitHub Pages**, avec un domaine enregistré chez OVHcloud et une redirection vers HTTPS. Il n’y a pas de serveur applicatif ni d’interface d’administration.

## Fonctionnalités

- **14 pages sources**, générées en FR/NL/EN : **42 pages HTML statiques**. Les textes, liens de langue et métadonnées sont disponibles sans JavaScript.
- Accueil, présentation de l’église, histoire depuis 2012, équipe pastorale et sept départements.
- Enseignements YouTube : dernier message, recherche dans les titres, catégories, tri et boutons « Charger plus / moins » par groupes de neuf.
- Synchronisation des vidéos publiques **toutes les six heures**, indépendamment des visites.
- Événements : programme, affiches, bandeau d’annonce et archives après la fin des rencontres.
- Page **À la Brèche** avec affiche, programme daté et accès aux prières matinales sur Zoom.
- Page **Donner** avec coordonnées bancaires et QR code de virement.
- **Formulaire Web3Forms** : envoi depuis le site sans ouvrir la messagerie, confirmation du service et conservation du texte en cas d’échec. La réception réelle dans la boîte de l’église a été testée.
- Navigation mobile, carte Google Maps, liens sociaux et favicon LTPE.
- Titres et descriptions FR/NL/EN, URL canoniques, liens `hreflang`, aperçus de partage, sitemap et `robots.txt`. La propriété Search Console est validée et Google a lu le sitemap ; cela ne garantit pas l’indexation de toutes les pages.

JavaScript complète le HTML généré pour actualiser les catalogues, filtrer les vidéos, gérer la pagination et envoyer le formulaire.

## Démarrage local

Prérequis : **Git**, **Node.js 22 ou supérieur avec npm**, et **Python 3** pour le serveur d’aperçu ci-dessous.

```bash
git clone https://github.com/MikeTD24/ltpe-website.git
cd ltpe-website
npm ci --ignore-scripts
npm run build
npm test
python -m http.server 8765 --bind 127.0.0.1 --directory dist
```

Ouvrir :

- Français : <http://127.0.0.1:8765/fr/index.html>
- Néerlandais : <http://127.0.0.1:8765/nl/index.html>
- Anglais : <http://127.0.0.1:8765/en/index.html>

Arrêter le serveur avec `Ctrl+C`. Utiliser le serveur HTTP plutôt qu’une ouverture en `file://`, qui peut bloquer le chargement des catalogues. Aucune clé YouTube n’est nécessaire pour cet aperçu : la génération utilise le catalogue déjà présent dans le dépôt.

## Où modifier les contenus ?

| Contenu ou fonction                | Source                                                                                                         |
| ---------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| Accueil, horaires et contact       | `index.html`                                                                                                   |
| Présentation et équipe pastorale   | `about.html`                                                                                                   |
| Enseignements                      | `teachings.html`                                                                                               |
| Événements et bandeau d’annonce    | `data/events.json`, `evenements.html`, `js/events.js`                                                          |
| Don et QR de virement              | `donner.html`, `images/qr-don-ltpe.png`                                                                        |
| Présentation du pasteur            | `pasteur.html`                                                                                                 |
| Prières matinales À la Brèche      | `breche.html` et son affiche dans `images/`                                                                    |
| Départements                       | `ecodim.html`, `louange.html`, `priere.html`, `logistique.html`, `jeunesse.html`, `femmes.html`, `hommes.html` |
| Traductions                        | `js/translations.js`                                                                                           |
| Langues et navigation              | `js/i18n.js`                                                                                                   |
| Styles                             | `css/styles.css`, `css/refinements.css`                                                                        |
| Menu et envoi du formulaire        | `js/main.js`                                                                                                   |
| Configuration Web3Forms            | `scripts/contact.json`                                                                                         |
| Domaine et métadonnées FR/NL/EN    | `scripts/seo.json`                                                                                             |
| Logo dans l’onglet                 | `images/favicon.svg`, ajouté par `scripts/build-site.cjs`                                                      |
| Génération des pages et du sitemap | `scripts/build-site.cjs`                                                                                       |
| Catalogue YouTube automatique      | `data/youtube-videos.json`, `scripts/sync-youtube.py`                                                          |
| Vérifications                      | `scripts/check-teachings.cjs`, `scripts/check-localized.cjs`, `scripts/check-contact.cjs`                      |

Les HTML à la racine, les traductions et les JSON sont les sources de travail. **Ne pas modifier `dist/` manuellement** : ses pages, `sitemap.xml` et `robots.txt` sont régénérés à chaque publication. `dist/` est ignoré par Git.

## Modifier et publier

Le domaine ne change pas le circuit : **sources → génération → tests → commit → push → publication automatique sur www.ltpe.be**.

1. Récupérer les changements GitHub avant de commencer, notamment le catalogue YouTube actualisé par le robot.
2. Modifier les sources et maintenir les textes de l’interface en FR/NL/EN. Respecter le formatage de `.prettierrc.json` et conserver un code aéré.
3. Ajouter les nouvelles images à Git avant la génération : seuls les fichiers publics suivis par Git sont copiés dans le résultat. Exemple :

   ```bash
   git add images/nom-image.jpeg
   ```

4. Générer, tester et vérifier l’aperçu :

   ```bash
   npm run build
   npm test
   ```

5. Examiner les fichiers préparés, créer le commit et pousser sur `main`. Dans VS Code : **Commit**, puis **Synchroniser les changements** après vérification des fichiers inclus.
6. Contrôler la réussite de [GitHub Actions](https://github.com/MikeTD24/ltpe-website/actions) et le rendu en ligne.

Le workflow `.github/workflows/pages.yml` installe les versions verrouillées par `package-lock.json`, génère les pages, exécute les tests et déploie **`dist/`**. La source de publication Pages est **GitHub Actions**, et non une publication directe des fichiers de la branche.

Après l’envoi du paquet, une vérification attend que son identifiant exact soit visible deux fois dans l’API GitHub avant de lancer le déploiement. Elle réduit les échecs liés à un délai de disponibilité du paquet. Une notification rouge signale néanmoins un échec réel à examiner dans Actions ; le site continue alors à servir sa dernière version publiée avec succès.

Les anciennes adresses à la racine restent accessibles comme alias français. Les anciens liens `?lang=nl` ou `?lang=en` sont redirigés vers les nouvelles pages lorsque JavaScript est actif.

### Ajouter un événement

Modifier `data/events.json` avec un identifiant unique, un titre FR/NL/EN, le lieu, les sessions datées avec fuseau horaire et les affiches. Ajouter au dictionnaire les nouveaux textes à traduire. La page Événements et le bandeau d’accueil utilisent cette même source ; les événements terminés restent consultables dans les archives.

### Actualiser À la Brèche

Mettre à jour `breche.html`, l’affiche, les dates, le thème et les traductions correspondantes. Vérifier aussi les descriptions dans `scripts/seo.json`. Le programme actuel porte explicitement les dates du **23 au 27 novembre 2026**, de **6 h à 7 h**.

### Ajouter une page

Créer le HTML source, compléter `js/translations.js` et enregistrer ses titres/descriptions FR/NL/EN dans `scripts/seo.json`. Ajouter les liens de navigation nécessaires. Le générateur produit ensuite les trois versions et les entrées du sitemap.

## YouTube : clé et synchronisation

Le navigateur **ne contient pas de clé API YouTube** et n’appelle pas directement YouTube Data API. Il lit le catalogue `data/youtube-videos.json`.

Le workflow `.github/workflows/sync-youtube.yml` exécute `scripts/sync-youtube.py`, récupère jusqu’à 500 publications publiques et enregistre le catalogue dans Git. La clé est fournie uniquement par le secret GitHub Actions **`YOUTUBE_API_KEY`**, avec accès à YouTube Data API v3. Ne pas la copier dans le HTML, le JavaScript ou un commit.

La planification est `17 */6 * * *` en UTC, soit toutes les six heures ; GitHub peut retarder une exécution. Une synchronisation réussie déclenche ensuite la publication Pages. Le dernier catalogue est conservé si la synchronisation échoue.

Relance manuelle : **Actions → Synchroniser les vidéos YouTube → Run workflow**.

## Formulaire de contact

`scripts/contact.json` contient la **clé publique Web3Forms**, conçue pour figurer dans les formulaires HTML. Elle identifie la boîte destinataire ; ce n’est ni un mot de passe de messagerie ni la clé privée YouTube. La variable `LTPE_CONTACT_ACCESS_KEY` peut remplacer sa valeur lors de la génération.

Le formulaire transmet le nom, l’e-mail et le message à Web3Forms, avec une notice sur la page. Il limite les doubles envois, ajoute un piège anti-robot et conserve le texte en cas d’échec. La confirmation signifie que le service a accepté le message ; la réception dans la boîte principale doit être vérifiée séparément, y compris les spams.

Si la clé de configuration est vide, la génération conserve le formulaire de repli qui prépare un e-mail dans la messagerie du visiteur.

## Domaine et référencement

- Domaine principal : **`https://www.ltpe.be/`**.
- HTTP et le domaine sans `www` redirigent vers le domaine principal HTTPS.
- `scripts/seo.json` définit l’adresse de référence utilisée pour les URL canoniques, les liens de langue et les aperçus de partage.
- Sitemap : **<https://www.ltpe.be/sitemap.xml>**.
- La propriété de domaine `ltpe.be` est validée dans Google Search Console. Conserver son enregistrement TXT DNS de validation.
- Les contenus traduits et les premières vidéos sont prérendus lors de la génération ; les fonctions interactives sont ensuite prises en charge par JavaScript.

## Vérifications et dépannage

`npm test` s’exécute après `npm run build` et couvre les catégories et recherches YouTube, le tri, l’échappement des titres, les pages traduites, les métadonnées, les liens, les ancres, les images, le favicon et la pagination. Il teste aussi le formulaire avec des réponses simulées : acceptation, refus, erreur réseau, réponse invalide, prévention des doubles envois et conservation du texte.

Les tests **n’envoient aucun e-mail réel**. Après un changement de service ou de destinataire, effectuer aussi un essai réel et vérifier la réception dans la boîte de l’église.

Les pages incluent une politique CSP et une politique de référent ; les actions GitHub sont figées sur des SHA. Ces mesures et les tests ne constituent pas un audit de sécurité ou d’accessibilité exhaustif.

| Symptôme                                           | Vérifications                                                                                                    |
| -------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| Une modification n’apparaît pas                    | Contrôler le dernier workflow Pages et la source modifiée, puis actualiser sans cache.                           |
| Une nouvelle image manque                          | Ajouter le fichier à Git, vérifier le chemin et la casse, puis régénérer.                                        |
| Les vidéos ne sont plus actualisées                | Vérifier la synchronisation, le secret Actions et YouTube Data API v3. Ne pas ajouter la clé dans le navigateur. |
| Le formulaire signale un échec                     | Vérifier la connexion, la configuration Web3Forms et l’état du service ; le texte reste disponible.              |
| Le formulaire confirme, mais aucun e-mail n’arrive | Vérifier la boîte associée à la clé Web3Forms et les spams.                                                      |
| L’icône d’onglet reste ancienne                    | Fermer puis rouvrir l’onglet après une actualisation sans cache.                                                 |

## Contact de l’église

- **Adresse** : Stationsstraat 1, 1601 Ruisbroek, Belgique.
- **Téléphone** : +32 497 11 82 14.
- **E-mail** : [letempledupleinevangile@gmail.com](mailto:letempledupleinevangile@gmail.com).
- **YouTube** : [@ltpevangile](https://www.youtube.com/@ltpevangile).
- **Instagram** : [@ltpevangile](https://www.instagram.com/ltpevangile).

Les notes de reprise et l’historique détaillé se trouvent dans [REPRISE_PROJET.md](REPRISE_PROJET.md). Certains anciens guides du dépôt décrivent une configuration antérieure ; ce README décrit le fonctionnement actuel.

Dernière mise à jour : **23 novembre 2026**.
