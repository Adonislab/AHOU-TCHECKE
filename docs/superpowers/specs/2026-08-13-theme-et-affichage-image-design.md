# Thème clair/sombre et affichage du résultat d'essayage

Date : 2026-08-13
Statut : validé, prêt à implémenter

## Contexte

Deux retours de test utilisateur sur le frontend AWÙ TCHECKE :

1. L'application n'offre aucun choix de thème — elle est en sombre imposé.
2. Le résultat d'essayage n'est pas visible en entier. Les testeurs doivent
   ouvrir l'image dans un autre onglet ou réduire la fenêtre pour la voir
   complètement, et l'image rend mieux sur les petits écrans.

## Problème 1 — Résultat d'essayage tronqué

### Cause

`TryOnPage.jsx:287` et `PartialTryOnPage.jsx:209` affichent le résultat avec
`w-full h-full object-cover`. Deux effets se combinent :

- `w-full` dans une colonne de grille large (~700 px sur un écran de bureau)
  donne à une photo portrait une hauteur d'environ 1000 px, supérieure à la
  hauteur de fenêtre disponible.
- `object-cover` recadre l'image pour remplir le conteneur, ce qui coupe le
  haut ou le bas du rendu.

Sur un petit écran la colonne rétrécit, donc l'image tient : c'est exactement
l'inversion observée par les testeurs.

Les vignettes d'aperçu d'upload (`TryOnPage.jsx:167`, `:191`, `:218` et
`PartialTryOnPage.jsx:89`, `:108`) souffrent du même `object-cover` : une photo
de haut ou de pantalon y est rognée.

### Correctif

Remplacer sur l'image de résultat :

```
w-full h-full object-cover  →  mx-auto max-h-[75vh] w-auto object-contain
```

Le conteneur passe en `flex justify-center` pour centrer une image portrait plus
étroite que sa colonne.

Sur les vignettes d'upload, `object-cover` devient `object-contain` en gardant
`h-48` : le vêtement est vu en entier, avec le fond de la carte autour.

Le lien « Ouvrir l'image » vers un nouvel onglet est conservé : il reste utile
pour inspecter les détails en pleine résolution, mais cesse d'être obligatoire.

Hors périmètre : pas de visionneuse plein écran ni de zoom intégré, pas de
refonte de la mise en page de la section résultat.

## Problème 2 — Thème clair/sombre

### Cause

Les couleurs sont écrites en dur : environ 350 classes `slate-*`, `text-white`
et dérivées réparties sur `App.jsx` et les quatre composants, plus un
`body { background-color: #0f172a; color: #e2e8f0 }` dans `index.css`. Aucun
niveau d'indirection ne permet de basculer les couleurs.

### Approche retenue — tokens sémantiques

Ajouter des variables CSS de thème dans `index.css` via `@theme` (sans le
mot-clé `inline`, qui figerait les valeurs à la compilation), puis les
surcharger sous `html[data-theme="light"]`. Tailwind v4 compile les utilitaires
en `var(--color-*)`, donc la surcharge s'applique à l'exécution, modificateurs
d'opacité compris (`bg-panel/90` devient un `color-mix` sur la variable).

Alternative écartée : préfixer chaque classe d'un variant `dark:`. Cela double
le nombre de classes sur 350 occurrences, alourdit le balisage et rend chaque
futur ajout de couleur sujet à l'oubli d'un variant.

### Tokens

Surfaces et texte :

| Token | Sombre | Clair | Remplace |
|---|---|---|---|
| `--color-base` | `#020617` | `#ffffff` | `slate-950` |
| `--color-panel` | `#0f172a` | `#f8fafc` | `slate-900` |
| `--color-raised` | `#1e293b` | `#e2e8f0` | `slate-800` |
| `--color-raised-strong` | `#334155` | `#cbd5e1` | `slate-700` |
| `--color-line` | `#1e293b` | `#e2e8f0` | `border-slate-800` |
| `--color-line-strong` | `#334155` | `#cbd5e1` | `border-slate-700` |
| `--color-ink` | `#ffffff` | `#0f172a` | `text-white`, `slate-100`, `slate-200` |
| `--color-muted` | `#94a3b8` | `#475569` | `slate-300`, `slate-400` |
| `--color-subtle` | `#64748b` | `#64748b` | `slate-500` |
| `--color-shade` | `#020617` | `#64748b` | couleur d'ombre |

Textes d'accent posés sur un fond teinté translucide, illisibles en clair s'ils
restent en nuance 300 :

| Token | Sombre | Clair | Remplace |
|---|---|---|---|
| `--color-accent-ink` | `#fcd34d` | `#b45309` | `text-amber-300` |
| `--color-accent-alt-ink` | `#fdba74` | `#c2410c` | `text-orange-300` |
| `--color-success-ink` | `#6ee7b7` | `#047857` | `text-emerald-300/400` |
| `--color-danger-ink` | `#fecaca` | `#b91c1c` | `text-red-200` |

Le dégradé de la carte immersive (`TryOnPage.jsx:123`) passe par trois tokens
dédiés : sombre `#020617 → #451a03 → #431407`, clair `#ffffff → #fef3c7 →
#ffedd5`.

L'ambre et l'orange des boutons d'action restent identiques dans les deux
thèmes : c'est l'identité visuelle du produit et le contraste tient sur fond
blanc comme sur fond noir.

### Cas particuliers traités à la main

- `text-white` posé sur un bouton coloré (ambre, orange, émeraude WhatsApp,
  bleu Facebook) reste `text-white`. Seuls les `text-white` sur fond neutre
  deviennent `text-ink`. Une substitution aveugle donnerait du texte foncé sur
  fond vert ou bleu en thème clair.
- `selection:text-slate-950` et les `text-slate-950` posés sur une pastille
  ambre restent littéraux : ils sont corrects dans les deux thèmes.

### Bascule

Un hook `useTheme` dans `src/hooks/useTheme.js` :

- lit `localStorage.theme` au démarrage ; à défaut suit
  `prefers-color-scheme` ;
- écrit `data-theme` sur `document.documentElement` et met à jour
  `color-scheme` pour que les contrôles natifs suivent ;
- persiste le choix dans `localStorage`.

Un bouton Soleil/Lune (icônes `lucide-react`, déjà en dépendance) est ajouté
dans le header d'`App.jsx`, à côté des pastilles de navigation, avec un
`aria-label` décrivant l'action.

Le thème sombre reste le défaut quand l'OS n'exprime pas de préférence.

### Nettoyage associé

`src/App.css` est du template Vite résiduel, importé nulle part. Il est
supprimé. Les règles `body` en dur d'`index.css` disparaissent au profit des
tokens.

## Vérification

- `npm run build` passe.
- Aucune classe `slate-*` ne subsiste dans `src/` en dehors des littéraux
  volontairement conservés (`text-slate-950` sur pastille ambre).
- Les trois pages (accueil, essayage complet, essayage partiel) sont lisibles
  dans les deux thèmes.
- Une image de résultat en portrait tient dans la fenêtre sur un écran large,
  sans recadrage.
- Le choix de thème survit à un rechargement de page.
