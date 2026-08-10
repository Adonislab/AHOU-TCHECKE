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
      <section className="relative overflow-hidden rounded-[2rem] border border-slate-800 bg-slate-900/80 p-10 shadow-2xl shadow-slate-950/40">
        <div className="absolute inset-y-0 right-0 w-72 opacity-20 blur-3xl bg-gradient-to-br from-amber-400 via-orange-500 to-emerald-400" />
        <div className="relative grid gap-10 lg:grid-cols-[1.1fr_0.9fr] items-center">
          <div className="space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full bg-amber-500/10 px-4 py-2 text-sm text-amber-300 font-medium">
              <Sparkles className="w-4 h-4" /> Essayage partiel
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white">
              Teste une tenue avec ta photo complète
            </h2>
            <p className="max-w-2xl text-slate-400 text-lg leading-8">
              Charge une photo de ton vêtement, puis découvre un rendu.
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl border border-slate-800 bg-slate-950/90 p-5 shadow-xl shadow-slate-950/20">
                <p className="text-sm uppercase tracking-[0.28em] text-slate-500">Rapide</p>
                <p className="mt-3 text-white text-lg font-semibold">Simple et efficace</p>
              </div>
              <div className="rounded-3xl border border-slate-800 bg-slate-950/90 p-5 shadow-xl shadow-slate-950/20">
                <p className="text-sm uppercase tracking-[0.28em] text-slate-500">Pratique</p>
                <p className="mt-3 text-white text-lg font-semibold">Juste le vêtement</p>
              </div>
            </div>
          </div>

          <div className="relative rounded-[2rem] border border-slate-800 bg-slate-950/95 p-7 shadow-2xl shadow-slate-950/30">
            <div className="absolute -left-8 -top-8 flex h-20 w-20 items-center justify-center rounded-full bg-orange-500/15 text-orange-300 shadow-lg shadow-orange-950/20">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div className="space-y-5">
              <div className="rounded-3xl bg-slate-900/90 p-5 border border-slate-800">
                <p className="text-xs uppercase tracking-[0.28em] text-slate-500">Partial</p>
                <h3 className="mt-3 text-xl font-semibold text-white">Essayage rapide</h3>
                <p className="mt-2 text-slate-400 text-sm">Un haut seul, une photo complète, une preview rapide.</p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-3xl bg-slate-900/90 p-4 border border-slate-800">
                  <p className="text-sm text-slate-300">Photo complète</p>
                </div>
                <div className="rounded-3xl bg-slate-900/90 p-4 border border-slate-800">
                  <p className="text-sm text-slate-300">Haut/Bas/Ensemble seul</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-[2rem] border border-slate-800 bg-slate-900/80 p-8 shadow-2xl shadow-slate-950/30">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Essayage partiel</p>
            <h3 className="text-3xl font-semibold text-white">Upload une photo complète et un vêtement</h3>
          </div>
          <div className="rounded-3xl bg-slate-950/90 px-4 py-3 text-sm text-slate-400 border border-slate-800">
            Astuce : choisis un vêtement bien visible et une photo entière face caméra.
          </div>
        </div>

        <div className="grid gap-8 xl:grid-cols-[1.05fr_0.95fr]">
          <div className="grid gap-8 md:grid-cols-2">
            <div className="rounded-[1.75rem] border border-slate-800 bg-slate-950/90 p-6 shadow-xl shadow-slate-950/30">
              <span className="text-sm uppercase tracking-[0.24em] text-slate-500">Ton portrait</span>
              <div className="mt-5 flex flex-col gap-4">
                <div className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/90">
                  {humanImage ? (
                    <img src={humanImage} alt="Prévisualisation photo" className="h-48 w-full object-cover" />
                  ) : (
                    <div className="flex h-48 items-center justify-center text-slate-500">
                      <Upload className="h-10 w-10" />
                    </div>
                  )}
                </div>
                <label className="inline-flex items-center justify-center rounded-3xl bg-amber-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-amber-400 cursor-pointer">
                  <input type="file" accept="image/*" onChange={onHumanImageUpload} className="hidden" />
                  Photo complète
                </label>
                <p className="text-slate-500 text-sm">Privilégie une photo entière pour un rendu cohérent.</p>
              </div>
            </div>
            <div className="rounded-[1.75rem] border border-slate-800 bg-slate-950/90 p-6 shadow-xl shadow-slate-950/30">
              <span className="text-sm uppercase tracking-[0.24em] text-slate-500">Tenue ou Pagne</span>
              <div className="mt-5 flex flex-col gap-4">
                <div className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/90">
                  {topImage ? (
                    <img src={topImage} alt="Prévisualisation haut" className="h-48 w-full object-cover" />
                  ) : (
                    <div className="flex h-48 items-center justify-center text-slate-500">
                      <Upload className="h-10 w-10" />
                    </div>
                  )}
                </div>
                <label className="inline-flex items-center justify-center rounded-3xl bg-amber-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-amber-400 cursor-pointer">
                  <input type="file" accept="image/*" onChange={onTopImageUpload} className="hidden" />
                  Choisir un vêtement
                </label>
                <p className="text-slate-500 text-sm">Charge le vêtement que tu veux essayer.</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-[1.75rem] border border-slate-800 bg-slate-950/90 p-6 shadow-xl shadow-slate-950/30">
              <span className="text-sm uppercase tracking-[0.24em] text-slate-500">Catégorie</span>
              <div className="mt-4 flex flex-wrap gap-3 bg-slate-900/90 rounded-2xl border border-slate-800 p-3">
                <button
                  type="button"
                  onClick={() => setCategory("upper_body")}
                  className={`rounded-2xl px-4 py-2 text-sm font-semibold transition ${
                    category === "upper_body" ? "bg-amber-600 text-white" : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                  }`}
                >
                  Haut
                </button>
                <button
                  type="button"
                  onClick={() => setCategory("lower_body")}
                  className={`rounded-2xl px-4 py-2 text-sm font-semibold transition ${
                    category === "lower_body" ? "bg-amber-600 text-white" : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                  }`}
                >
                  Bas
                </button>
                <button
                  type="button"
                  onClick={() => setCategory("dresses")}
                  className={`rounded-2xl px-4 py-2 text-sm font-semibold transition ${
                    category === "dresses" ? "bg-amber-600 text-white" : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                  }`}
                >
                  Complet
                </button>
              </div>
            </div>

            <div className="rounded-[1.75rem] border border-slate-800 bg-slate-950/90 p-6 shadow-xl shadow-slate-950/30">
              <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Générer</p>
              <button
                type="button"
                onClick={handleTryOn}
                disabled={!humanImage || !topImage || loading}
                className={`mt-4 w-full h-14 rounded-3xl font-semibold flex items-center justify-center gap-3 transition ${
                  !humanImage || !topImage || loading
                    ? "bg-slate-800 text-slate-500 cursor-not-allowed"
                    : "bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg shadow-orange-500/20 hover:from-amber-400 hover:to-orange-400"
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
        <div className="rounded-[1.75rem] border border-red-500/20 bg-red-500/10 p-5 text-sm text-red-200 shadow-lg shadow-red-950/10">
          <div className="flex items-center gap-3">
            <AlertCircle className="w-5 h-5" />
            <span>{error}</span>
          </div>
        </div>
      )}

      {resultImage && (
        <section className="rounded-[2rem] border border-slate-800 bg-slate-900/80 p-8 shadow-2xl shadow-slate-950/30">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between mb-8">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Résultat</p>
              <h3 className="text-3xl font-semibold text-white">Ton aperçu est prêt</h3>
            </div>
            <div className="rounded-3xl bg-slate-950/90 px-4 py-3 text-sm text-slate-400 border border-slate-800">
              Clique pour ouvrir en haute résolution
            </div>
          </div>
          <div className="grid gap-6 xl:grid-cols-[1fr_0.55fr] items-start">
            <div className="rounded-[2rem] overflow-hidden border border-slate-800 bg-slate-950/90 shadow-xl shadow-slate-950/20">
              <img src={resultImage} alt="Résultat d'essayage" className="w-full h-full object-cover" />
            </div>
            <div className="space-y-5 rounded-[2rem] border border-slate-800 bg-slate-950/90 p-6 shadow-xl shadow-slate-950/20">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                <p className="text-white font-semibold">Essayage terminé</p>
              </div>
              <p className="text-slate-400 leading-7">Tu peux maintenant télécharger ton rendu ou le partager avec des amis pour obtenir un avis en direct.</p>
              <a
                href={resultImage}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-3xl bg-amber-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-amber-400"
              >
                Ouvrir l'image
              </a>
              <div className="mt-6 rounded-[1.75rem] border border-slate-800 bg-slate-950/90 p-5 shadow-xl shadow-slate-950/20">
                <p className="text-sm uppercase tracking-[0.28em] text-slate-500">Partage ton look</p>
                <p className="mt-3 text-slate-400">Envoie ce rendu sur WhatsApp, Facebook ou copie le lien.</p>
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
                    className="inline-flex items-center justify-center rounded-3xl bg-slate-800 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
                  >
                    {copySuccess || "Copier mon look"}
                  </button>
                  {navigator.share && (
                    <button
                      type="button"
                      onClick={handleNativeShare}
                      className="inline-flex items-center justify-center rounded-3xl bg-amber-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-amber-400"
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