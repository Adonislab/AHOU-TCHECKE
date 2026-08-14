import { Rocket, Heart } from 'lucide-react';
import logoFull from '../assets/logo-full.png';

export default function HomePage({ onNavigateToTryOn, onNavigateToPartial }) {
  return (
    <section className="rounded-[2rem] border border-line bg-panel/80 p-10 shadow-2xl shadow-shade/40">
      <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] items-center">
        <div className="space-y-6">
          <span className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-4 py-2 text-sm text-accent-ink font-medium">
            <Rocket className="w-4 h-4" /> Bienvenue
          </span>
          <img
            src={logoFull}
            alt="AWÙ TCHECKE"
            className="w-full max-w-[280px]"
          />
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-ink">
            L'essayage virtuel béninois
          </h2>
          <p className="max-w-2xl text-muted text-lg leading-8">
            Découvre l’application de try-on béninoise. Navigue vers l'essayage pour tester un haut et un bas, ou estime tes mensurations à partir de ta photo.
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl border border-line bg-base/90 p-5 shadow-xl shadow-shade/20">
              <p className="text-sm uppercase tracking-[0.28em] text-subtle">Projet</p>
              <p className="mt-3 text-ink text-lg font-semibold">Try-on virtuel</p>
            </div>
            <div className="rounded-3xl border border-line bg-base/90 p-5 shadow-xl shadow-shade/20">
              <p className="text-sm uppercase tracking-[0.28em] text-subtle">Valeur</p>
              <p className="mt-3 text-ink text-lg font-semibold">Style local</p>
            </div>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <button
              type="button"
              onClick={onNavigateToTryOn}
              className="rounded-3xl bg-accent px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-accent-soft"
            >
              Essai complet
            </button>
            <button
              type="button"
              onClick={onNavigateToPartial}
              className="rounded-3xl border border-line-strong bg-raised px-6 py-3 text-sm font-semibold text-ink transition hover:bg-raised-strong"
            >
              Essai partiel
            </button>
          </div>
        </div>

        <div className="relative rounded-[2rem] border border-line bg-base/95 p-7 shadow-2xl shadow-shade/30">
          <div className="absolute -left-8 -top-8 flex h-20 w-20 items-center justify-center rounded-full bg-accent/15 text-accent-ink shadow-lg shadow-shade/20">
            <Heart className="w-8 h-8" />
          </div>
          <div className="space-y-5">
            <div className="rounded-3xl bg-panel/90 p-5 border border-line">
              <p className="text-xs uppercase tracking-[0.28em] text-subtle">Attraction</p>
              <h3 className="mt-3 text-xl font-semibold text-ink">IA & culture</h3>
              <p className="mt-2 text-muted text-sm">Une expérience innovante inspirée de la mode béninoise.</p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-3xl bg-panel/90 p-4 border border-line">
                <p className="text-sm text-muted">Rapide</p>
              </div>
              <div className="rounded-3xl bg-panel/90 p-4 border border-line">
                <p className="text-sm text-muted">Immersif</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
