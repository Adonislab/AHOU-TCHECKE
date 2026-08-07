# AHOU TCHECKE — Try-On Bénin

Une application React + Vite pour visualiser un essayage virtuel inspiré du style béninois.

## Description

Cette application permet de :

- importer une photo de soi et une photo de vêtement
- choisir une catégorie de tenue (haut, pantalon, robe)
- lancer un essayage virtuel avec un rendu IA
- visualiser et ouvrir le résultat en haute résolution

Le design utilise une palette chaude et africaine, avec une ambiance inspirée du Bénin.

## Technologies

- React 19
- Vite
- Tailwind CSS 4
- lucide-react
- API d'essayage via `fetch` et `FormData`

## Installation

1. Cloner le dépôt ou copier le projet sur votre machine.
2. Installer les dépendances :

```bash
npm install
```

3. Lancer le serveur de développement :

```bash
npm run dev
```

4. Ouvrir l’application dans le navigateur via l’URL indiquée par Vite.

## Configuration de l’API

Le point de terminaison d’essayage est lu depuis la variable d’environnement `VITE_API_URL`.

Par défaut, le code utilise :

```js
const API_URL = import.meta.env.VITE_API_URL || "https://vto-api-n7ie.onrender.com/try-on";
```

Pour utiliser votre propre API, créez un fichier `.env` à la racine du projet :

```env
VITE_API_URL=https://votre-api/try-on
```

Puis redémarrez le serveur de développement.

### Mesures et suggestions (LLM)

Le projet propose désormais une génération de mesures aléatoires (placeholder) et des suggestions de style.

- Pour activer un service LLM open-source, définissez la variable d'environnement `VITE_LLM_API_URL` pointant vers un endpoint capable de recevoir un JSON `{ prompt: string }` et de répondre par du texte brut ou JSON contenant `text`.

Example `.env`:

```env
VITE_LLM_API_URL=https://mon-llm-open-source/complete
```

Si `VITE_LLM_API_URL` n'est pas configuré, l'application proposera un fallback local simple pour générer des suggestions.

## Scripts

- `npm run dev` : démarre le serveur de développement
- `npm run build` : génère la version de production
- `npm run preview` : prévisualise la build
- `npm run lint` : lance ESLint sur le projet

## Structure du projet

- `src/main.jsx` : point d’entrée de l’application
- `src/App.jsx` : composant principal avec l’interface d’essayage
- `src/index.css` : styles globaux et import Tailwind
- `vite.config.js` : configuration Vite avec plugin Tailwind

## Notes

- L’application est conçue pour un rendu rapide et une expérience fluide.
- Le branding actuel est centré sur `AHOU TCHECKE` et un univers africain béninois.

## Contribution

Tu peux personnaliser les textes, les couleurs ou les catégories dans `src/App.jsx`.

---

Bon développement !