import { Upload, Sparkles, RefreshCw, AlertCircle, CheckCircle2, ImageIcon, ShieldCheck } from 'lucide-react';

export default function TryOnPage({
  humanImage,
  topImage,
  bottomImage,
  loading,
  resultImage,
  copySuccess,
  measurements,
  measurementNote,
  suggestions,
  llmLoading,
  measurementsLoading,
  error,
  whatsappShareUrl,
  facebookShareUrl,
  handleCopyLink,
  handleNativeShare,
  onHumanImageUpload,
  onTopImageUpload,
  onBottomImageUpload,
  handleTryOn,
  handleEstimateMeasurements,
  fetchLLMSuggestions,
}) {
  return (
    <>
      <section className="relative overflow-hidden rounded-[2rem] border border-slate-800 bg-slate-900/80 p-10 shadow-2xl shadow-slate-950/40">
        <div className="absolute inset-y-0 right-0 w-72 opacity-20 blur-3xl bg-gradient-to-br from-amber-400 via-orange-500 to-emerald-400" />
        <div className="relative grid gap-10 lg:grid-cols-[1.1fr_0.9fr] items-center">
          <div className="space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full bg-amber-500/10 px-4 py-2 text-sm text-amber-300 font-medium">
              <Sparkles className="w-4 h-4" /> Essayage instantané
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white">
              Ton complet béninois, réinventé en un clic
            </h2>
            <p className="max-w-2xl text-slate-400 text-lg leading-8">
              Upload ta photo et les images du haut et du bas, puis découvre un rendu virtuel grâce à l'IA.
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl border border-slate-800 bg-slate-950/90 p-5 shadow-xl shadow-slate-950/20">
                <p className="text-sm uppercase tracking-[0.28em] text-slate-500">Expérience</p>
                <p className="mt-3 text-white text-lg font-semibold">Simple et fluide</p>
              </div>
              <div className="rounded-3xl border border-slate-800 bg-slate-950/90 p-5 shadow-xl shadow-slate-950/20">
                <p className="text-sm uppercase tracking-[0.28em] text-slate-500">Résultat</p>
                <p className="mt-3 text-white text-lg font-semibold">Immersif et élégant</p>
              </div>
            </div>
          </div>

          <div className="relative rounded-[2rem] border border-slate-800 bg-slate-950/95 p-7 shadow-2xl shadow-slate-950/30">
            <div className="absolute -left-8 -top-8 flex h-20 w-20 items-center justify-center rounded-full bg-orange-500/15 text-orange-300 shadow-lg shadow-orange-950/20">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div className="space-y-5">
              <div className="rounded-3xl bg-slate-900/90 p-5 border border-slate-800">
                <p className="text-xs uppercase tracking-[0.28em] text-slate-500">Studio</p>
                <h3 className="mt-3 text-xl font-semibold text-white">Preview pro</h3>
                <p className="mt-2 text-slate-400 text-sm">Visualise ton look avant de l’adopter.</p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-3xl bg-slate-900/90 p-4 border border-slate-800">
                  <p className="text-sm text-slate-300">Interface claire</p>
                </div>
                <div className="rounded-3xl bg-slate-900/90 p-4 border border-slate-800">
                  <p className="text-sm text-slate-300">Design moderne</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-10 xl:grid-cols-[1.05fr_0.95fr]">
        <div className="space-y-8">
          <div className="rounded-[2rem] border border-slate-800 bg-slate-900/90 p-8 shadow-2xl shadow-slate-950/20">
            <div className="flex items-center gap-3 text-slate-300 mb-5">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm uppercase tracking-[0.28em] text-slate-500">À propos</p>
                <h3 className="text-2xl font-semibold text-white">Une plateforme pensée pour le style</h3>
              </div>
            </div>
            <p className="text-slate-400 leading-8">
              AHOU TCHECKE permet de tester un look béninois sans prise de tête. Télécharge ta photo et ton vêtement, et laisse l'IA générer un aperçu réaliste et stylisé.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl border border-slate-800 bg-slate-950/90 p-5">
                <p className="text-sm text-slate-400">Accessible</p>
                <p className="mt-3 text-white font-semibold">Sans installation</p>
              </div>
              <div className="rounded-3xl border border-slate-800 bg-slate-950/90 p-5">
                <p className="text-sm text-slate-400">Optimisé</p>
                <p className="mt-3 text-white font-semibold">Desktop & mobile</p>
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-800 bg-slate-900/90 p-8 shadow-2xl shadow-slate-950/20">
            <h3 className="text-xl font-semibold text-white mb-4">Comment ça marche ?</h3>
            <div className="space-y-4 text-slate-400">
              <div className="rounded-3xl border border-slate-800 bg-slate-950/90 p-5">
                <p className="font-semibold text-white">1. Choisis ta photo</p>
                <p className="text-sm">Importe une photo frontale avec un fond neutre.</p>
              </div>
              <div className="rounded-3xl border border-slate-800 bg-slate-950/90 p-5">
                <p className="font-semibold text-white">2. Uploade ton vêtement</p>
                <p className="text-sm">Un vêtement bien visible et propre donne le meilleur rendu.</p>
              </div>
              <div className="rounded-3xl border border-slate-800 bg-slate-950/90 p-5">
                <p className="font-semibold text-white">3. Observe le résultat</p>
                <p className="text-sm">L'IA génère ton aperçu en quelques secondes.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-[2rem] border border-slate-800 bg-gradient-to-br from-slate-950/95 via-amber-950/90 to-orange-950/90 p-8 shadow-2xl shadow-slate-950/30">
          <div className="flex items-center gap-3 text-slate-300 mb-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
              <ImageIcon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.28em] text-slate-500">Essayage</p>
              <h3 className="text-2xl font-semibold text-white">Ton look en un aperçu</h3>
            </div>
          </div>
          <p className="text-slate-400 leading-7 mb-8">
            Laisse-toi surprendre par la magie du try-on à la sauce béninoise. Plus besoin d’essayer plusieurs tenues, visualise rapidement le rendu et partage ton style.
          </p>
          <div className="grid gap-4">
            <div className="rounded-3xl border border-slate-800 bg-slate-950/90 p-5 shadow-xl shadow-slate-950/20">
              <p className="text-sm text-slate-400">Interface immersive</p>
              <p className="mt-2 text-white font-semibold">Un rendu clair et engageant</p>
            </div>
            <div className="rounded-3xl border border-slate-800 bg-slate-950/90 p-5 shadow-xl shadow-slate-950/20">
              <p className="text-sm text-slate-400">Expérience fun</p>
              <p className="mt-2 text-white font-semibold">Amuse-toi avec tes looks</p>
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-[2rem] border border-slate-800 bg-slate-900/80 p-8 shadow-2xl shadow-slate-950/30">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Essayage</p>
            <h3 className="text-3xl font-semibold text-white">Prêt à tester ton prochain look ?</h3>
          </div>
          <div className="rounded-3xl bg-slate-950/90 px-4 py-3 text-sm text-slate-400 border border-slate-800">
            Astuce : photographie-toi face caméra avec un fond neutre.
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
                  <input
                    type="file"
                    accept="image/*"
                    onChange={onHumanImageUpload}
                    className="hidden"
                  />
                  Choisir une photo
                </label>
                <p className="text-slate-500 text-sm">Une bonne image donne un rendu plus réaliste.</p>
              </div>
            </div>
            <div className="rounded-[1.75rem] border border-slate-800 bg-slate-950/90 p-6 shadow-xl shadow-slate-950/30">
              <span className="text-sm uppercase tracking-[0.24em] text-slate-500">Ton haut</span>
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
                  <input
                    type="file"
                    accept="image/*"
                    onChange={onTopImageUpload}
                    className="hidden"
                  />
                  Choisir un haut
                </label>
                <p className="text-slate-500 text-sm">Charge une image de haut pour l’essayage.</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-[1.75rem] border border-slate-800 bg-slate-950/90 p-6 shadow-xl shadow-slate-950/30">
              <span className="text-sm uppercase tracking-[0.24em] text-slate-500">Ton bas</span>
              <div className="mt-5 flex flex-col gap-4">
                <div className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/90">
                  {bottomImage ? (
                    <img src={bottomImage} alt="Prévisualisation bas" className="h-48 w-full object-cover" />
                  ) : (
                    <div className="flex h-48 items-center justify-center text-slate-500">
                      <Upload className="h-10 w-10" />
                    </div>
                  )}
                </div>
                <label className="inline-flex items-center justify-center rounded-3xl bg-amber-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-amber-400 cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={onBottomImageUpload}
                    className="hidden"
                  />
                  Choisir un bas
                </label>
                <p className="text-slate-500 text-sm">Charge une image de bas pour l’essayage.</p>
              </div>
            </div>
            <div className="rounded-[1.75rem] border border-slate-800 bg-slate-950/90 p-6 shadow-xl shadow-slate-950/30">
              <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Générer</p>
              <button
                onClick={handleTryOn}
                disabled={!humanImage || !topImage || !bottomImage || loading}
                className={`mt-4 w-full h-14 rounded-3xl font-semibold flex items-center justify-center gap-3 transition ${
                  !humanImage || !topImage || !bottomImage || loading
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
                    Lancer l'essayage
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
