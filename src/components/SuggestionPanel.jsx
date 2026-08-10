import { useState } from 'react';
import { Sparkles, RefreshCw, Copy, Share2, Share } from 'lucide-react';

export default function SuggestionPanel({
  resultImage,
  measurements,
  suggestions,
  onFetchSuggestions,
  llmLoading,
}) {
  const [copySuccess, setCopySuccess] = useState("");

  const labelMap = {
    user_height_cm: 'Hauteur en cm',
    longueur_bras_cm: 'Longueur bras en cm',
    longueur_jambe_entrejambe_cm: 'Longueur jambe en cm',
    hauteur_buste_cm: 'Hauteur buste en cm',
    carrure_epaules_cm: 'Largeur épaule en cm',
    largeur_taille_cm: 'Largeur taille en cm',
    largeur_bassin_cm: 'Largeur bassin en cm',
    largeur_poitrine_cm: 'Largeur poitrine en cm',
    tour_de_poitrine_cm: 'Tour de poitrine en cm',
    tour_de_taille_cm: 'Tour de taille en cm',
    tour_de_hanches_cm: 'Tour de hanche en cm',
  };

  const formatLabel = (key) => labelMap[key] || key;

  const buildShareText = () => {
    const lines = [];

    if (measurements) {
      lines.push('Mesures estimées:');
      if (measurements.user_height_cm !== undefined) {
        lines.push(`${formatLabel('user_height_cm')}: ${measurements.user_height_cm}`);
      }
      const longueurs = measurements.estimated_measurements?.longueurs || {};
      const largeurs = measurements.estimated_measurements?.largeurs_a_plat || {};
      const circonferences = measurements.estimated_measurements?.circonferences_estimees || {};

      Object.entries(longueurs).forEach(([key, value]) => {
        lines.push(`${formatLabel(key)}: ${value}`);
      });
      Object.entries(largeurs).forEach(([key, value]) => {
        lines.push(`${formatLabel(key)}: ${value}`);
      });
      Object.entries(circonferences).forEach(([key, value]) => {
        lines.push(`${formatLabel(key)}: ${value}`);
      });
    }

    if (suggestions) {
      lines.push('');
      lines.push('Suggestions:');
      lines.push(suggestions);
    }

    return lines.join('\n');
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(buildShareText());
      setCopySuccess("Copié !");
      setTimeout(() => setCopySuccess(""), 2500);
    } catch (err) {
      setCopySuccess("Impossible de copier.");
      setTimeout(() => setCopySuccess(""), 2500);
    }
  };

  const shareText = buildShareText();
  const whatsappShareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;
  const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
    resultImage || window.location.href,
  )}&quote=${encodeURIComponent(shareText)}`;

  return (
    <div className="rounded-[1.75rem] border border-slate-800 bg-slate-950/90 p-6 shadow-xl shadow-slate-950/30">
      <div className="flex items-center justify-between gap-4 mb-5">
        <div>
          <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Suggestion</p>
          <h3 className="mt-2 text-xl font-semibold text-white">Conseils de style</h3>
        </div>
      </div>

      <p className="text-sm leading-6 text-slate-400">
        Obtiens une suggestion de style personnalisée basée sur tes mesures et ton style.
      </p>

      <button
        type="button"
        disabled={!resultImage || llmLoading}
        onClick={onFetchSuggestions}
        className={`mt-6 w-full rounded-3xl px-4 py-3 text-sm font-semibold transition ${
          !resultImage || llmLoading
            ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
            : 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg shadow-orange-500/20 hover:from-amber-400 hover:to-orange-400'
        }`}
      >
        {llmLoading ? (
          <span className="inline-flex items-center gap-2">
            <RefreshCw className="h-4 w-4 animate-spin" /> Génération en cours...
          </span>
        ) : (
          <span className="inline-flex items-center gap-2">
            <Sparkles className="h-4 w-4" /> Obtenir une suggestion
          </span>
        )}
      </button>

      {suggestions && (
        <div className="mt-6 rounded-3xl border border-slate-800 bg-slate-900/90 p-4 text-slate-200">
          <div className="flex flex-col gap-4">
            <div>
              <p className="text-sm text-slate-400">Suggestions</p>
              <div className="mt-3 whitespace-pre-line text-sm leading-6">{suggestions}</div>
              {measurements && (
                <p className="mt-4 text-xs text-slate-500">Basé sur tes mesures estimées.</p>
              )}
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex items-center justify-center rounded-3xl bg-slate-800 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
              >
                <Copy className="mr-2 h-4 w-4" /> {copySuccess || 'Copier'}
              </button>
              <a
                href={whatsappShareUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-3xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-500"
              >
                <Share2 className="mr-2 h-4 w-4" /> WhatsApp
              </a>
              <a
                href={facebookShareUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-3xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-500"
              >
                <Share className="mr-2 h-4 w-4" /> Facebook
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
