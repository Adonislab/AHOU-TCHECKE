import { Upload } from 'lucide-react';

/**
 * Carte d'upload avec apercu. Le cadre est en ratio 3/4, le format portrait
 * des photos de personne comme des photos de vetement, et l'apercu est en
 * object-contain : l'image est vue en entier, jamais rognee ni deformee.
 */
export default function UploadCard({ label, image, alt, onChange, buttonLabel, hint }) {
  return (
    <div className="flex flex-col rounded-[1.75rem] border border-line bg-base/90 p-6 shadow-xl shadow-shade/30">
      <span className="text-sm uppercase tracking-[0.24em] text-subtle">{label}</span>

      {/* max-h evite qu'une colonne large ne rende le cadre demesure */}
      <div className="mt-5 aspect-3/4 max-h-[420px] overflow-hidden rounded-3xl border border-line bg-panel/90">
        {image ? (
          <img src={image} alt={alt} className="h-full w-full object-contain" />
        ) : (
          <div className="flex h-full items-center justify-center text-subtle">
            <Upload className="h-10 w-10" />
          </div>
        )}
      </div>

      <label className="mt-4 inline-flex items-center justify-center rounded-3xl bg-accent px-4 py-3 text-sm font-semibold text-white transition hover:bg-accent-soft cursor-pointer">
        <input type="file" accept="image/*" onChange={onChange} className="hidden" />
        {buttonLabel}
      </label>

      <p className="mt-4 text-subtle text-sm">{hint}</p>
    </div>
  );
}
