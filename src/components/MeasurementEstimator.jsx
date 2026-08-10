import { RefreshCw } from 'lucide-react';

export default function MeasurementEstimator({
  humanImage,
  heightCm,
  onHeightChange,
  onEstimateMeasurements,
  measurements,
  measurementNote,
  loading,
}) {
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

  const renderMeasurements = (measurementsData) => {
    if (!measurementsData) return null;

    return (
      <div className="space-y-4 text-sm text-slate-200">
        {measurementsData.user_height_cm !== undefined && (
          <p>{formatLabel('user_height_cm')}: {measurementsData.user_height_cm}</p>
        )}

        {measurementsData.estimated_measurements &&
          Object.entries(measurementsData.estimated_measurements).map(([section, values]) => (
            <div key={section} className="rounded-3xl border border-slate-800 bg-slate-900/90 p-4">
              <p className="text-xs uppercase tracking-[0.24em] text-slate-400">{section}</p>
              <div className="mt-3 space-y-2">
                {values &&
                  Object.entries(values).map(([key, value]) => (
                    <p key={key}>
                      {formatLabel(key)}: {value}
                    </p>
                  ))}
              </div>
            </div>
          ))}
      </div>
    );
  };

  return (
    <div className="rounded-[1.75rem] border border-slate-800 bg-slate-950/90 p-6 shadow-xl shadow-slate-950/30">
      <div className="flex items-center justify-between gap-4 mb-5">
        <div>
          <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Estimation</p>
          <h3 className="mt-2 text-xl font-semibold text-white">Estime tes mensurations</h3>
        </div>
      </div>

      <div className="space-y-4">
        <label className="block text-sm font-semibold text-slate-300">
          Ta taille en cm
          <input
            type="number"
            min="100"
            value={heightCm}
            onChange={(e) => onHeightChange(e.target.value)}
            className="mt-2 w-full rounded-3xl border border-slate-800 bg-slate-900/90 px-4 py-3 text-slate-100 outline-none transition focus:border-amber-500"
            placeholder="150"
          />
        </label>

        <button
          type="button"
          disabled={!humanImage || !heightCm || loading}
          onClick={onEstimateMeasurements}
          className={`w-full rounded-3xl px-4 py-3 text-sm font-semibold transition ${
            !humanImage || !heightCm || loading
              ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
              : 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg shadow-orange-500/20 hover:from-amber-400 hover:to-orange-400'
          }`}
        >
          {loading ? (
            <span className="inline-flex items-center gap-2">
              <RefreshCw className="h-4 w-4 animate-spin" /> Estimation en cours...
            </span>
          ) : (
            'Estimer mes mesures'
          )}
        </button>

        {measurements && (
          <div className="rounded-3xl border border-slate-800 bg-slate-900/90 p-4 text-slate-200">
            <p className="text-sm text-slate-400">Résultats</p>
            {renderMeasurements(measurements)}
            {measurementNote && <p className="mt-4 text-xs text-slate-500">{measurementNote}</p>}
          </div>
        )}
      </div>
    </div>
  );
}
