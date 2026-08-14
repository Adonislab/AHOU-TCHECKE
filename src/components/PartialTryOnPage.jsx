import React from 'react';
import { Upload, Sparkles, RefreshCw, AlertCircle, CheckCircle2, ImageIcon, ShieldCheck } from 'lucide-react';

export default function PartialTryOnPage({
  humanImage,
  topImage,
  category,
  loading,
  resultImage,
  copySuccess,
  error,
  whatsappShareUrl,
  facebookShareUrl,
  handleCopyLink,
  handleNativeShare,
  onHumanImageUpload,
  onTopImageUpload,
  handleTryOn,
  setCategory,
}) {
  return (
    <>
      <section className="relative overflow-hidden rounded-[2rem] border border-line bg-panel/80 p-10 shadow-2xl shadow-shade/40">
        <div className="absolute inset-y-0 right-0 w-72 opacity-20 blur-3xl bg-gradient-to-br from-accent-soft via-accent to-accent-soft" />
        <div className="relative grid gap-10 lg:grid-cols-[1.1fr_0.9fr] items-center">
          <div className="space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-4 py-2 text-sm text-accent-ink font-medium">
              <Sparkles className="w-4 h-4" /> Essayage partiel
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-ink">
              Teste une tenue avec ta photo complète
            </h2>
            <p className="max-w-2xl text-muted text-lg leading-8">
              Charge une photo de ton vêtement, puis découvre un rendu.
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl border border-line bg-base/90 p-5 shadow-xl shadow-shade/20">
                <p className="text-sm uppercase tracking-[0.28em] text-subtle">Rapide</p>
                <p className="mt-3 text-ink text-lg font-semibold">Simple et efficace</p>
              </div>
              <div className="rounded-3xl border border-line bg-base/90 p-5 shadow-xl shadow-shade/20">
                <p className="text-sm uppercase tracking-[0.28em] text-subtle">Pratique</p>
                <p className="mt-3 text-ink text-lg font-semibold">Juste le vêtement</p>
              </div>
            </div>
          </div>

          <div className="relative rounded-[2rem] border border-line bg-base/95 p-7 shadow-2xl shadow-shade/30">
            <div className="absolute -left-8 -top-8 flex h-20 w-20 items-center justify-center rounded-full bg-accent/15 text-accent-ink shadow-lg shadow-shade/20">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div className="space-y-5">
              <div className="rounded-3xl bg-panel/90 p-5 border border-line">
                <p className="text-xs uppercase tracking-[0.28em] text-subtle">Partial</p>
                <h3 className="mt-3 text-xl font-semibold text-ink">Essayage rapide</h3>
                <p className="mt-2 text-muted text-sm">Un haut seul, une photo complète, une preview rapide.</p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-3xl bg-panel/90 p-4 border border-line">
                  <p className="text-sm text-muted">Photo complète</p>
                </div>
                <div className="rounded-3xl bg-panel/90 p-4 border border-line">
                  <p className="text-sm text-muted">Haut/Bas/Ensemble seul</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-[2rem] border border-line bg-panel/80 p-8 shadow-2xl shadow-shade/30">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-subtle">Essayage partiel</p>
            <h3 className="text-3xl font-semibold text-ink">Upload une photo complète et un vêtement</h3>
          </div>
          <div className="rounded-3xl bg-base/90 px-4 py-3 text-sm text-muted border border-line">
            Astuce : choisis un vêtement bien visible et une photo entière face caméra.
          </div>
        </div>

        <div className="grid gap-8 xl:grid-cols-[1.05fr_0.95fr]">
          <div className="grid gap-8 md:grid-cols-2">
            <div className="rounded-[1.75rem] border border-line bg-base/90 p-6 shadow-xl shadow-shade/30">
              <span className="text-sm uppercase tracking-[0.24em] text-subtle">Ton portrait</span>
              <div className="mt-5 flex flex-col gap-4">
                <div className="overflow-hidden rounded-3xl border border-line bg-panel/90">
                  {humanImage ? (
                    <img src={humanImage} alt="Prévisualisation photo" className="h-48 w-full object-contain" />
                  ) : (
                    <div className="flex h-48 items-center justify-center text-subtle">
                      <Upload className="h-10 w-10" />
                    </div>
                  )}
                </div>
                <label className="inline-flex items-center justify-center rounded-3xl bg-accent px-4 py-3 text-sm font-semibold text-white transition hover:bg-accent-soft cursor-pointer">
                  <input type="file" accept="image/*" onChange={onHumanImageUpload} className="hidden" />
                  Photo complète
                </label>
                <p className="text-subtle text-sm">Privilégie une photo entière pour un rendu cohérent.</p>
              </div>
            </div>
            <div className="rounded-[1.75rem] border border-line bg-base/90 p-6 shadow-xl shadow-shade/30">
              <span className="text-sm uppercase tracking-[0.24em] text-subtle">Tenue ou Pagne</span>
              <div className="mt-5 flex flex-col gap-4">
                <div className="overflow-hidden rounded-3xl border border-line bg-panel/90">
                  {topImage ? (
                    <img src={topImage} alt="Prévisualisation haut" className="h-48 w-full object-contain" />
                  ) : (
                    <div className="flex h-48 items-center justify-center text-subtle">
                      <Upload className="h-10 w-10" />
                    </div>
                  )}
                </div>
                <label className="inline-flex items-center justify-center rounded-3xl bg-accent px-4 py-3 text-sm font-semibold text-white transition hover:bg-accent-soft cursor-pointer">
                  <input type="file" accept="image/*" onChange={onTopImageUpload} className="hidden" />
                  Choisir un vêtement
                </label>
                <p className="text-subtle text-sm">Charge le vêtement que tu veux essayer.</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-[1.75rem] border border-line bg-base/90 p-6 shadow-xl shadow-shade/30">
              <span className="text-sm uppercase tracking-[0.24em] text-subtle">Catégorie</span>
              <div className="mt-4 flex flex-wrap gap-3 bg-panel/90 rounded-2xl border border-line p-3">
                <button
                  type="button"
                  onClick={() => setCategory("upper_body")}
                  className={`rounded-2xl px-4 py-2 text-sm font-semibold transition ${
                    category === "upper_body" ? "bg-accent-deep text-white" : "bg-raised text-muted hover:bg-raised-strong"
                  }`}
                >
                  Haut
                </button>
                <button
                  type="button"
                  onClick={() => setCategory("lower_body")}
                  className={`rounded-2xl px-4 py-2 text-sm font-semibold transition ${
                    category === "lower_body" ? "bg-accent-deep text-white" : "bg-raised text-muted hover:bg-raised-strong"
                  }`}
                >
                  Bas
                </button>
                <button
                  type="button"
                  onClick={() => setCategory("dresses")}
                  className={`rounded-2xl px-4 py-2 text-sm font-semibold transition ${
                    category === "dresses" ? "bg-accent-deep text-white" : "bg-raised text-muted hover:bg-raised-strong"
                  }`}
                >
                  Complet
                </button>
              </div>
            </div>

            <div className="rounded-[1.75rem] border border-line bg-base/90 p-6 shadow-xl shadow-shade/30">
              <p className="text-sm uppercase tracking-[0.24em] text-subtle">Générer</p>
              <button
                type="button"
                onClick={handleTryOn}
                disabled={!humanImage || !topImage || loading}
                className={`mt-4 w-full h-14 rounded-3xl font-semibold flex items-center justify-center gap-3 transition ${
                  !humanImage || !topImage || loading
                    ? "bg-raised text-subtle cursor-not-allowed"
                    : "bg-gradient-to-r from-accent to-accent-deep text-white shadow-lg shadow-accent/20 hover:from-accent-soft hover:to-accent"
                }`}
              >
                {loading ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin" />
                    Génération en cours...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    Lancer l'essayage partiel
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </section>

      {error && (
        <div className="rounded-[1.75rem] border border-red-500/20 bg-red-500/10 p-5 text-sm text-danger-ink shadow-lg shadow-red-950/10">
          <div className="flex items-center gap-3">
            <AlertCircle className="w-5 h-5" />
            <span>{error}</span>
          </div>
        </div>
      )}

      {resultImage && (
        <section className="rounded-[2rem] border border-line bg-panel/80 p-8 shadow-2xl shadow-shade/30">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between mb-8">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-subtle">Résultat</p>
              <h3 className="text-3xl font-semibold text-ink">Ton aperçu est prêt</h3>
            </div>
            <div className="rounded-3xl bg-base/90 px-4 py-3 text-sm text-muted border border-line">
              Clique pour ouvrir en haute résolution
            </div>
          </div>
          <div className="grid gap-6 xl:grid-cols-[1fr_0.55fr] items-start">
            <div className="flex justify-center rounded-[2rem] overflow-hidden border border-line bg-base/90 p-4 shadow-xl shadow-shade/20">
              <img src={resultImage} alt="Résultat d'essayage" className="mx-auto max-h-[75vh] w-auto object-contain" />
            </div>
            <div className="space-y-5 rounded-[2rem] border border-line bg-base/90 p-6 shadow-xl shadow-shade/20">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-6 h-6 text-success-ink" />
                <p className="text-ink font-semibold">Essayage terminé</p>
              </div>
              <p className="text-muted leading-7">Tu peux maintenant télécharger ton rendu ou le partager avec des amis pour obtenir un avis en direct.</p>
              <a
                href={resultImage}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-3xl bg-accent px-5 py-3 text-sm font-semibold text-white transition hover:bg-accent-soft"
              >
                Ouvrir l'image
              </a>
              <div className="mt-6 rounded-[1.75rem] border border-line bg-base/90 p-5 shadow-xl shadow-shade/20">
                <p className="text-sm uppercase tracking-[0.28em] text-subtle">Partage ton look</p>
                <p className="mt-3 text-muted">Envoie ce rendu sur WhatsApp, Facebook ou copie le lien.</p>
                <div className="mt-4 flex flex-wrap gap-3">
                  <a
                    href={whatsappShareUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-3xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-500"
                  >
                    WhatsApp
                  </a>
                  <a
                    href={facebookShareUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-3xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-500"
                  >
                    Facebook
                  </a>
                  <button
                    type="button"
                    onClick={handleCopyLink}
                    className="inline-flex items-center justify-center rounded-3xl bg-raised px-4 py-3 text-sm font-semibold text-ink transition hover:bg-raised-strong"
                  >
                    {copySuccess || "Copier mon look"}
                  </button>
                  {navigator.share && (
                    <button
                      type="button"
                      onClick={handleNativeShare}
                      className="inline-flex items-center justify-center rounded-3xl bg-accent px-4 py-3 text-sm font-semibold text-white transition hover:bg-accent-soft"
                    >
                      Partager
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}