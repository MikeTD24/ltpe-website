# Le Temple du Plein Évangile - Site Web Officiel

![LTPE Logo](images/ltpe-logo.png)

## 📖 Description

**Le Temple du Plein Évangile (LTPE)** est un site web professionnel et moderne conçu pour l'église évangélique LTPE basée à Bruxelles, Belgique. Le site offre une présence en ligne complète avec intégration YouTube dynamique, permettant aux membres et visiteurs de rester connectés aux enseignements et événements de l'église.

## ✨ Caractéristiques Principales

### 🏠 Pages Principales

1. **Accueil (Homepage)**
   - Hero section avec slogan de l'église
   - Section bienvenue avec présentation
   - Horaires des cultes et réunions de prière
   - Dernières prédications (synchronisées avec YouTube)
   - Départements de l'église (ECODIM, Louange, Prière, Logistique)
   - Présentation du Pasteur Martin Mfuamba
   - Formulaire de contact et localisation

2. **Qui Sommes-Nous (About)**
   - Timeline de l'histoire de l'église (depuis 2012)
   - Vision et Mission
   - Valeurs fondamentales
   - Affiliation Assemblées de DIEU
   - Équipe pastorale

3. **Enseignements (Teachings)**
   - Dernier enseignement en vedette
   - Grille complète de tous les enseignements
   - Recherche et filtrage par catégorie
   - Intégration YouTube complète
   - Pagination pour charger plus de vidéos

### 🎨 Design & UX

- **Palette de couleurs** : Or/Doré (#D4AF37) et Bleu Foncé (#1A2332)
- **Typographie** : Montserrat (titres) et Open Sans (corps)
- **Responsive Design** : Optimisé pour desktop, tablette et mobile
- **Performance** : Chargement rapide et optimisation SEO
- **Accessibilité** : Normes WCAG respectées

### 🔌 Intégrations

- **YouTube API V3** : Synchronisation automatique des vidéos
- **Google Maps** : Localisation de l'église
- **Formulaires de Contact** : Collecte de messages des visiteurs
- **Réseaux Sociaux** : Liens vers Facebook, Instagram, YouTube

## 🚀 Démarrage Rapide

### Prérequis

- Navigateur web moderne (Chrome, Firefox, Safari, Edge)
- Serveur web (Apache, Nginx) ou serveur local

### Installation

1. **Cloner le repository**
   ```bash
   git clone https://github.com/votreusername/ltpe-website.git
   cd ltpe-website
   ```

2. **Configurer l'API YouTube**
   - Créer un projet sur [Google Cloud Console](https://console.cloud.google.com/)
   - Activer l'API YouTube Data V3
   - Créer une clé API
   - Remplacer `YOUR_YOUTUBE_API_KEY` dans `js/youtube-api.js`
   - Remplacer `UCYourChannelID` par l'ID réel de la chaîne LTPE

3. **Lancer un serveur local**
   ```bash
   # Avec Python 3
   python -m http.server 8000
   
   # Avec Node.js (http-server)
   npx http-server
   ```

4. **Accéder au site**
   - Ouvrir `http://localhost:8000` dans votre navigateur

## 📁 Structure du Projet

```
ltpe-website/
├── index.html              # Page d'accueil
├── about.html              # Page Qui Sommes-Nous
├── teachings.html          # Page Enseignements
├── css/
│   └── styles.css          # Styles principaux
├── js/
│   ├── main.js             # JavaScript principal
│   └── youtube-api.js      # Intégration API YouTube
├── images/                 # Dossier pour les images
├── assets/                 # Ressources supplémentaires
├── README.md               # Ce fichier
└── .gitignore              # Fichiers à ignorer dans Git
```

## 🔧 Configuration de l'API YouTube

### Étapes Détaillées

1. **Créer un projet Google Cloud**
   - Aller sur [Google Cloud Console](https://console.cloud.google.com/)
   - Créer un nouveau projet
   - Nommer le projet "LTPE Website"

2. **Activer l'API YouTube Data V3**
   - Aller à "APIs & Services" > "Library"
   - Rechercher "YouTube Data API v3"
   - Cliquer sur "Enable"

3. **Créer une clé API**
   - Aller à "APIs & Services" > "Credentials"
   - Cliquer sur "Create Credentials" > "API Key"
   - Copier la clé générée

4. **Configurer les restrictions**
   - Ajouter les domaines autorisés
   - Restreindre à l'API YouTube Data V3

5. **Mettre à jour le code**
   ```javascript
   // Dans js/youtube-api.js
   const YOUTUBE_API_KEY = 'YOUR_GENERATED_API_KEY';
   const YOUTUBE_CHANNEL_ID = 'UCltpevangile'; // ID réel de la chaîne
   ```

## 📝 Utilisation

### Ajouter une Image

1. Placer l'image dans le dossier `images/`
2. Référencer dans le HTML : `<img src="images/nom-image.jpg" alt="Description">`

### Modifier le Contenu

- **Texte** : Éditer directement dans les fichiers HTML
- **Styles** : Modifier `css/styles.css`
- **Fonctionnalités** : Ajouter du code dans `js/main.js` ou `js/youtube-api.js`

### Déployer le Site

1. **Hébergement Recommandé**
   - Netlify (gratuit)
   - Vercel (gratuit)
   - GitHub Pages (gratuit)
   - Hostinger (payant)

2. **Déployer sur Netlify**
   ```bash
   npm install -g netlify-cli
   netlify deploy
   ```

3. **Déployer sur GitHub Pages**
   - Pousser le code vers GitHub
   - Aller à Settings > Pages
   - Sélectionner la branche `main`

## 🎓 Apprentissage & Concepts Techniques

### Technologies Utilisées

- **HTML5** : Structure sémantique
- **CSS3** : Flexbox, Grid, Variables CSS
- **JavaScript (ES6+)** : Fetch API, Async/Await
- **YouTube Data API V3** : Récupération de vidéos
- **Google Maps API** : Intégration de carte

### Concepts Clés

1. **Fetch API** : Récupération de données depuis l'API YouTube
2. **Async/Await** : Gestion asynchrone des requêtes
3. **DOM Manipulation** : Modification dynamique du contenu
4. **Responsive Design** : Media queries et flexbox
5. **RESTful API** : Consommation d'API externe

### Ressources d'Apprentissage

- [MDN Web Docs](https://developer.mozilla.org/)
- [YouTube Data API Documentation](https://developers.google.com/youtube/v3)
- [CSS-Tricks](https://css-tricks.com/)
- [JavaScript.info](https://javascript.info/)

## 🐛 Dépannage

### Les vidéos YouTube ne s'affichent pas

**Problème** : Erreur "API key not valid"
**Solution** : Vérifier que la clé API est correcte et que l'API YouTube Data V3 est activée

### Le formulaire de contact ne fonctionne pas

**Problème** : Les messages ne sont pas envoyés
**Solution** : Implémenter un backend (Node.js, PHP, etc.) pour traiter les soumissions

### Le site n'est pas responsive

**Problème** : Affichage incorrect sur mobile
**Solution** : Vérifier que le viewport meta tag est présent dans le `<head>`

## 📞 Support & Contact

- **Email** : contact@ltpevangile.com
- **Téléphone** : +32 (0)2 333 00 33
- **Adresse** : 1, Stationsstraat - 1601 Ruisbroek, Brussels, Belgium
- **Réseaux Sociaux** :
  - [YouTube](https://www.youtube.com/@ltpevangile)
  - [Facebook](https://www.facebook.com/ltpevangile)
  - [Instagram](https://www.instagram.com/ltpevangile)

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 🙏 Remerciements

- Pasteur Martin Mfuamba et l'équipe de LTPE
- Tous les contributeurs et supporters
- La communauté de développeurs web

## 🔄 Historique des Versions

### v1.0.0 (2024-03-30)
- Lancement initial du site web
- Pages principales (Accueil, À Propos, Enseignements)
- Intégration YouTube API
- Design responsive

---

**Dernière mise à jour** : 30 Mars 2024

**Auteur** : Manus AI Assistant & Mike TOBY

**Pour les développeurs** : N'hésitez pas à forker ce projet et à contribuer !
