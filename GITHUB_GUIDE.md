# Guide GitHub - Publier Votre Projet LTPE

## 📚 Table des Matières

1. [Introduction](#introduction)
2. [Préparation du Projet](#préparation-du-projet)
3. [Créer un Repository GitHub](#créer-un-repository-github)
4. [Pousser le Code](#pousser-le-code)
5. [Configurer GitHub Pages](#configurer-github-pages)
6. [Optimiser pour les Recruteurs](#optimiser-pour-les-recruteurs)
7. [Maintenance](#maintenance)

---

## Introduction

GitHub est une plateforme essentielle pour les développeurs. Publier votre projet LTPE sur GitHub vous permet de :

- 📌 **Montrer votre travail** aux recruteurs et employeurs
- 🔄 **Collaborer** avec d'autres développeurs
- 📚 **Documenter** votre processus de développement
- 🚀 **Héberger gratuitement** votre site web (GitHub Pages)
- 📊 **Tracker les changements** avec Git

---

## Préparation du Projet

### Étape 1 : Initialiser Git Localement

Avant de pousser vers GitHub, initialisez Git dans votre dossier de projet :

```bash
# Naviguer vers le dossier du projet
cd /home/ubuntu/ltpe-website

# Initialiser un repository Git
git init

# Vérifier le statut
git status
```

### Étape 2 : Vérifier le .gitignore

Le fichier `.gitignore` est déjà configuré. Vérifiez qu'il contient :

```
# Fichiers à ignorer
.env
.env.local
config/keys.js
node_modules/
*.log
```

### Étape 3 : Créer un Commit Initial

```bash
# Ajouter tous les fichiers
git add .

# Créer un commit
git commit -m "Initial commit: LTPE website with YouTube integration"

# Vérifier le log
git log
```

### Étape 4 : Créer un Fichier de Configuration (Optionnel)

Créez un fichier `config.example.js` pour montrer comment configurer l'API :

```javascript
// config.example.js
// Copier ce fichier en config.js et remplir vos valeurs

const CONFIG = {
    YOUTUBE_API_KEY: 'YOUR_API_KEY_HERE',
    YOUTUBE_CHANNEL_ID: 'YOUR_CHANNEL_ID_HERE',
    MAX_RESULTS: 12
};

export default CONFIG;
```

---

## Créer un Repository GitHub

### Étape 1 : Créer un Compte GitHub

Si vous n'avez pas de compte :

1. Aller sur [https://github.com/](https://github.com/)
2. Cliquer sur "Sign up"
3. Suivre les instructions

### Étape 2 : Créer un Nouveau Repository

1. **Cliquer sur le "+" en haut à droite**
   - Sélectionner "New repository"

2. **Remplir les Informations**
   - **Repository name** : `ltpe-website`
   - **Description** : "Site web professionnel pour l'église LTPE avec intégration YouTube"
   - **Visibility** : Public (pour que les recruteurs puissent voir)
   - **Initialize** : Ne pas initialiser (vous avez déjà Git localement)

3. **Cliquer sur "Create repository"**

### Étape 3 : Copier l'URL du Repository

GitHub affichera une URL comme :
```
https://github.com/votreusername/ltpe-website.git
```

Copiez cette URL.

---

## Pousser le Code

### Étape 1 : Ajouter le Remote

```bash
# Ajouter le repository distant
git remote add origin https://github.com/votreusername/ltpe-website.git

# Vérifier que le remote est ajouté
git remote -v
```

### Étape 2 : Renommer la Branche (si nécessaire)

```bash
# Renommer master en main (standard moderne)
git branch -M main
```

### Étape 3 : Pousser le Code

```bash
# Pousser le code vers GitHub
git push -u origin main

# Pour les prochains push
git push
```

### Étape 4 : Vérifier sur GitHub

1. Aller sur votre repository GitHub
2. Vérifier que tous les fichiers sont présents
3. Vérifier que le README s'affiche bien

---

## Configurer GitHub Pages

GitHub Pages vous permet d'héberger votre site gratuitement.

### Étape 1 : Accéder aux Paramètres

1. Aller sur votre repository GitHub
2. Cliquer sur "Settings" (en haut à droite)
3. Cliquer sur "Pages" (dans la barre latérale)

### Étape 2 : Configurer la Source

1. Sous "Build and deployment"
2. Sélectionner "Deploy from a branch"
3. Sélectionner la branche : `main`
4. Sélectionner le dossier : `/ (root)`
5. Cliquer sur "Save"

### Étape 3 : Attendre le Déploiement

GitHub va construire et déployer votre site. Cela prend quelques minutes.

### Étape 4 : Accéder à Votre Site

Une fois déployé, votre site sera accessible à :
```
https://votreusername.github.io/ltpe-website/
```

---

## Optimiser pour les Recruteurs

### 📌 Profil GitHub Professionnel

1. **Ajouter une Photo de Profil**
   - Cliquer sur l'avatar
   - Sélectionner "Settings"
   - Ajouter une photo professionnelle

2. **Remplir la Bio**
   - Ajouter votre nom et titre
   - Exemple : "Développeur Web | HTML/CSS/JavaScript"

3. **Ajouter un Lien vers Votre Portfolio**
   - Ajouter le lien de votre site LTPE

### 📝 README Excellent

Votre README doit être clair et professionnel. Éléments clés :

- ✅ Description claire du projet
- ✅ Fonctionnalités principales
- ✅ Technologies utilisées
- ✅ Instructions d'installation
- ✅ Captures d'écran (optionnel)
- ✅ Guide de configuration (API)
- ✅ Licence

### 🏷️ Topics

Ajouter des topics à votre repository pour améliorer la découverte :

1. Aller à "Settings"
2. Sous "Topics", ajouter :
   - `html5`
   - `css3`
   - `javascript`
   - `youtube-api`
   - `responsive-design`
   - `church-website`

### 📊 Statistiques du Repository

Les recruteurs regardent :

- **Commits** : Montrer une activité régulière
- **Branches** : Utiliser des branches pour les features
- **Pull Requests** : Montrer votre processus de développement
- **Issues** : Documenter les bugs et améliorations

### 💡 Bonnes Pratiques de Commits

```bash
# ✅ BON commit
git commit -m "Add YouTube API integration for dynamic video loading"

# ✅ BON commit
git commit -m "Fix responsive design issues on mobile devices"

# ❌ MAUVAIS commit
git commit -m "Fix stuff"

# ❌ MAUVAIS commit
git commit -m "Update"
```

---

## Maintenance

### Mettre à Jour le Code

Quand vous faites des changements :

```bash
# Voir les changements
git status

# Ajouter les changements
git add .

# Créer un commit descriptif
git commit -m "Description du changement"

# Pousser vers GitHub
git push
```

### Créer des Branches pour les Features

```bash
# Créer une nouvelle branche
git checkout -b feature/add-donation-page

# Faire vos changements et commits
git add .
git commit -m "Add donation page"

# Pousser la branche
git push -u origin feature/add-donation-page

# Sur GitHub, créer une Pull Request
# Une fois approuvée, fusionner dans main
```

### Gérer les Versions

Utiliser les tags pour marquer les versions :

```bash
# Créer un tag
git tag -a v1.0.0 -m "Version 1.0.0 - Initial Release"

# Pousser les tags
git push origin --tags
```

---

## Exemple de Workflow Complet

### Jour 1 : Créer le Repository

```bash
cd /home/ubuntu/ltpe-website
git init
git add .
git commit -m "Initial commit: LTPE website"
git branch -M main
git remote add origin https://github.com/votreusername/ltpe-website.git
git push -u origin main
```

### Jour 2 : Ajouter une Feature

```bash
# Créer une branche
git checkout -b feature/improve-mobile-design

# Faire des changements
# ... modifier les fichiers ...

# Commit
git add .
git commit -m "Improve mobile responsiveness"

# Pousser
git push -u origin feature/improve-mobile-design

# Sur GitHub : créer une Pull Request et fusionner
```

### Jour 3 : Corriger un Bug

```bash
# Créer une branche pour le bug
git checkout -b bugfix/youtube-api-error

# Corriger le bug
# ... modifier youtube-api.js ...

# Commit
git add .
git commit -m "Fix YouTube API error handling"

# Pousser
git push -u origin bugfix/youtube-api-error

# Fusionner dans main
```

---

## Ressources Utiles

| Ressource | Lien |
|-----------|------|
| Documentation GitHub | https://docs.github.com |
| GitHub Pages | https://pages.github.com |
| Git Cheat Sheet | https://github.github.com/training-kit/ |
| Markdown Guide | https://www.markdownguide.org/ |
| Conventional Commits | https://www.conventionalcommits.org/ |

---

## Checklist Finale

Avant de considérer votre projet comme "publié" :

- [ ] Repository créé sur GitHub
- [ ] Tous les fichiers poussés
- [ ] README bien formaté
- [ ] .gitignore configuré
- [ ] GitHub Pages activé
- [ ] Site accessible publiquement
- [ ] Topics ajoutés
- [ ] Profil GitHub complété
- [ ] Lien vers le site dans la bio
- [ ] Commits descriptifs et clairs

---

## Support et Questions

Si vous avez des questions :

1. Consulter la [documentation GitHub](https://docs.github.com)
2. Chercher sur Stack Overflow
3. Demander dans les communautés de développeurs

---

**Dernière mise à jour** : 30 Mars 2024

**Auteur** : Manus AI Assistant

**Bonne chance avec votre projet ! 🚀**
