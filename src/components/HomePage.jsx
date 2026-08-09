import { Rocket, Heart, ShieldCheck } from 'lucide-react';

export default function HomePage({ onNavigateToTryOn, onNavigateToPartial }) {
  return (
    <section className="rounded-[2rem] border border-slate-800 bg-slate-900/80 p-10 shadow-2xl shadow-slate-950/40">
      <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] items-center">
        <div className="space-y-6">
          <span className="inline-flex items-center gap-2 rounded-full bg-amber-500/10 px-4 py-2 text-sm text-amber-300 font-medium">
            <Rocket className="w-4 h-4" /> Bienvenue
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white">
            Bienvenue sur AHOU TCHECKE
          </h2>
          <p className="max-w-2xl text-slate-400 text-lg leading-8">
            Découvre l’application de try-on béninoise. Navigue vers l'essayage pour tester un haut et un bas, ou estime tes mensurations à partir de ta photo.
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl border border-slate-800 bg-slate-950/90 p-5 shadow-xl shadow-slate-950/20">
              <p className="text-sm uppercase tracking-[0.28em] text-slate-500">Projet</p>
              <p className="mt-3 text-white text-lg font-semibold">Try-on virtuel</p>
            </div>
            <div className="rounded-3xl border border-slate-800 bg-slate-950/90 p-5 shadow-xl shadow-slate-950/20">
              <p className="text-sm uppercase tracking-[0.28em] text-slate-500">Valeur</p>
              <p className="mt-3 text-white text-lg font-semibold">Style local</p>
            </div>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <button
              type="button"
              onClick={onNavigateToTryOn}
              className="rounded-3xl bg-amber-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-amber-400"
            >
              Essai complet
            </button>
            <button
              type="button"
              onClick={onNavigateToPartial}
              className="rounded-3xl border border-slate-700 bg-slate-800 px-6 py-3 text-sm font-semibold text-slate-100 transition hover:bg-slate-700"
            >
              Essai partiel
            </button>
          </div>
        </div>

        <div className="relative rounded-[2rem] border border-slate-800 bg-slate-950/95 p-7 shadow-2xl shadow-slate-950/30">
          <div className="absolute -left-8 -top-8 flex h-20 w-20 items-center justify-center rounded-full bg-orange-500/15 text-orange-300 shadow-lg shadow-orange-950/20">
            <Heart className="w-8 h-8" />
          </div>
          <div className="space-y-5">
            <div className="rounded-3xl bg-slate-900/90 p-5 border border-slate-800">
              <p className="text-xs uppercase tracking-[0.28em] text-slate-500">Attraction</p>
              <h3 className="mt-3 text-xl font-semibold text-white">IA & culture</h3>
              <p className="mt-2 text-slate-400 text-sm">Une expérience innovante inspirée de la mode béninoise.</p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-3xl bg-slate-900/90 p-4 border border-slate-800">
                <p className="text-sm text-slate-300">Rapide</p>
              </div>
              <div className="rounded-3xl bg-slate-900/90 p-4 border border-slate-800">
                <p className="text-sm text-slate-300">Immersif</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
