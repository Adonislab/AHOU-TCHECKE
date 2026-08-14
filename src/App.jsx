import React, { useState } from 'react';
import { Sun, Moon } from 'lucide-react';
import logoMark from './assets/logo-mark.png';
import useTheme from './hooks/useTheme';
import HomePage from './components/HomePage';
import TryOnPage from './components/TryOnPage';
import PartialTryOnPage from './components/PartialTryOnPage';
import MeasurementEstimator from './components/MeasurementEstimator';
import SuggestionPanel from './components/SuggestionPanel';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://vto-api-n7ie.onrender.com";
const ESTIMATE_URL = import.meta.env.VITE_API_ESTIMATE_URL || `${API_BASE_URL}/estimate-measurements`;
const TRY_ON_URL = import.meta.env.VITE_API_TRY_ON_URL || `${API_BASE_URL}/try-on`;
const TRY_ON_OUTFIT_URL = import.meta.env.VITE_API_TRY_ON_OUTFIT_URL || `${API_BASE_URL}/try-on-outfit`;

export default function App() {
  const { theme, toggleTheme } = useTheme();

  const [humanImage, setHumanImage] = useState(null);
  const [humanFile, setHumanFile] = useState(null);

  const [topImage, setTopImage] = useState(null);
  const [topFile, setTopFile] = useState(null);

  const [bottomImage, setBottomImage] = useState(null);
  const [bottomFile, setBottomFile] = useState(null);

  const [category, setCategory] = useState("upper_body");
  const [heightCm, setHeightCm] = useState(150);
  const [loading, setLoading] = useState(false);
  const [resultImage, setResultImage] = useState(null);
  const [copySuccess, setCopySuccess] = useState("");
  const [measurements, setMeasurements] = useState(null);
  const [measurementNote, setMeasurementNote] = useState("");
  const [suggestions, setSuggestions] = useState("");
  const [llmLoading, setLlmLoading] = useState(false);
  const [measurementsLoading, setMeasurementsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activePage, setActivePage] = useState("home");

  const handleImageUpload = (e, setImage, setFile) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file);
      setImage(URL.createObjectURL(file));
      setError(null);
    }
  };

  const parseEstimatedMeasurements = (data) => {
    if (!data) return null;
    return {
      success: data.success,
      user_height_cm: data.user_height_cm,
      estimated_measurements: data.estimated_measurements || {},
      note: data.note || "",
    };
  };

  const handleEstimateMeasurements = async () => {
    if (!humanFile) {
      setError("Sélectionne d'abord une photo pour estimer tes mensurations.");
      return;
    }

    setMeasurementsLoading(true);
    setError(null);
    setSuggestions("");
    setMeasurementNote("");

    try {
      const formData = new FormData();
      formData.append("human_image", humanFile);
      formData.append("height_cm", heightCm);

      const response = await fetch(ESTIMATE_URL, {
        method: "POST",
        body: formData,
      });

      const responseText = await response.text();
      let data = null;
      try {
        data = JSON.parse(responseText);
      } catch (parseError) {
        console.warn("Estimate response is not JSON:", parseError, responseText);
      }

      if (response.ok && data?.success) {
        setMeasurements(parseEstimatedMeasurements(data));
        setMeasurementNote(data.note || "");
      } else {
        setError(
          `Erreur ${response.status}: ${data?.detail || data?.message || responseText || "Impossible d'estimer les mesures."}`,
        );
      }
    } catch (err) {
      console.error(err);
      setError("Impossible de contacter le service d'estimation des mesures.");
    } finally {
      setMeasurementsLoading(false);
    }
  };

  const fetchLLMSuggestions = async () => {
    if (!measurements) {
      setError("Estime d'abord tes mensurations avant de demander des suggestions.");
      return;
    }
    setLlmLoading(true);
    setError(null);
    const LLM_API = import.meta.env.VITE_LLM_API_URL || "";
    const prompt = `Tu es un assistant mode vestimentaire. Donne 3 suggestions de style courtes (2-3 phrases chacune) pour une personne avec ces mesures: ${JSON.stringify(
      measurements,
      null,
      2,
    )} et le type de vêtement: ${category}. Propose aussi des conseils sur les couleurs, accessoires, sorties.`;
    try {
      if (LLM_API) {
        const resp = await fetch(LLM_API, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt }),
        });
        const text = await resp.text();
        let parsed = null;
        try {
          parsed = JSON.parse(text);
        } catch (_) {}
        const resultText = parsed?.text || parsed?.message || text || "";
        setSuggestions(resultText.trim());
      } else {
        const chest = measurements.estimated_measurements?.circonferences_estimees?.tour_de_poitrine_cm;
        const hips = measurements.estimated_measurements?.circonferences_estimees?.tour_de_hanches_cm;
        const s = [];
        s.push(
          `Opte pour une coupe ajustée en haut et tissus wax légers pour mettre en valeur la silhouette (tour_de_poitrine_cm: ${chest ?? 'inconnu'} cm).`,
        );
        s.push(
          `Pour le bas, une taille haute et une longueur 3/4 créent un beau tombé (tour_de_hanches_cm: ${hips ?? 'inconnu'} cm).`,
        );
        s.push(
          `Accessoirise avec des couleurs chaudes et bijoux locaux pour renforcer le style béninois.`,
        );
        setSuggestions(s.join("\n\n"));
      }
    } catch (err) {
      setError("Impossible d'obtenir des suggestions depuis le LLM.");
      console.error(err);
    } finally {
      setLlmLoading(false);
    }
  };

  const handleTryOn = async () => {
    if (!humanFile || !topFile) {
      setError("Veuillez sélectionner la photo complète et l'image du haut avant de lancer l'essayage partiel.");
      return;
    }

    setLoading(true);
    setError(null);
    setResultImage(null);

    try {
      const formData = new FormData();
      formData.append('human_image', humanFile);
      formData.append('garment_image', topFile);
      formData.append('category', category);

      const response = await fetch(TRY_ON_URL, {
        method: 'POST',
        body: formData,
      });

      const responseText = await response.text();
      let data = null;
      try {
        data = JSON.parse(responseText);
      } catch (parseError) {
        console.warn('Response is not JSON:', parseError, responseText);
      }

      if (response.ok && data?.result_url) {
        setResultImage(data.result_url);
      } else {
        const errorDetail = data?.detail || data?.message || responseText;
        const errorMessage = typeof errorDetail === 'object' ? JSON.stringify(errorDetail) : errorDetail;
        setError(`Erreur ${response.status}: ${errorMessage || 'Réponse invalide du serveur'}`);
      }
    } catch (err) {
      setError("Impossible de contacter le serveur d'essayage partiel. Vérifiez que l'API est active.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleTryOnOutfit = async () => {
    if (!humanFile || !topFile || !bottomFile) {
      setError("Veuillez sélectionner la photo et les images du haut et du bas avant de lancer l'essayage complet.");
      return;
    }

    setLoading(true);
    setError(null);
    setResultImage(null);

    try {
      const formData = new FormData();
      formData.append('human_image', humanFile);
      formData.append('top_image', topFile);
      formData.append('bottom_image', bottomFile);

      const response = await fetch(TRY_ON_OUTFIT_URL, {
        method: 'POST',
        body: formData,
      });

      const responseText = await response.text();
      let data = null;
      try {
        data = JSON.parse(responseText);
      } catch (parseError) {
        console.warn('Response is not JSON:', parseError, responseText);
      }

      if (response.ok && data?.result_url) {
        setResultImage(data.result_url);
      } else {
        setError(
          `Erreur ${response.status}: ${data?.detail || data?.message || responseText || 'Réponse invalide du serveur'}`,
        );
      }
    } catch (err) {
      setError("Impossible de contacter le serveur d'essayage complet. Vérifiez que l'API est active.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const formatMeasurements = (m) => {
    if (!m) return "";
    const parts = [];
    if (m.user_height_cm !== undefined) parts.push(`user_height_cm: ${m.user_height_cm} cm`);
    if (m.estimated_measurements?.longueurs) {
      const longueurs = m.estimated_measurements.longueurs;
      if (longueurs.longueur_bras_cm !== undefined) parts.push(`longueur_bras_cm: ${longueurs.longueur_bras_cm} cm`);
      if (longueurs.longueur_jambe_entrejambe_cm !== undefined) parts.push(`longueur_jambe_entrejambe_cm: ${longueurs.longueur_jambe_entrejambe_cm} cm`);
      if (longueurs.hauteur_buste_cm !== undefined) parts.push(`hauteur_buste_cm: ${longueurs.hauteur_buste_cm} cm`);
    }
    if (m.estimated_measurements?.largeurs_a_plat) {
      const largeurs = m.estimated_measurements.largeurs_a_plat;
      if (largeurs.carrure_epaules_cm !== undefined) parts.push(`carrure_epaules_cm: ${largeurs.carrure_epaules_cm} cm`);
      if (largeurs.largeur_taille_cm !== undefined) parts.push(`largeur_taille_cm: ${largeurs.largeur_taille_cm} cm`);
      if (largeurs.largeur_bassin_cm !== undefined) parts.push(`largeur_bassin_cm: ${largeurs.largeur_bassin_cm} cm`);
    }
    if (m.estimated_measurements?.circonferences_estimees) {
      const circonferences = m.estimated_measurements.circonferences_estimees;
      if (circonferences.tour_de_poitrine_cm !== undefined) parts.push(`tour_de_poitrine_cm: ${circonferences.tour_de_poitrine_cm} cm`);
      if (circonferences.tour_de_taille_cm !== undefined) parts.push(`tour_de_taille_cm: ${circonferences.tour_de_taille_cm} cm`);
      if (circonferences.tour_de_hanches_cm !== undefined) parts.push(`tour_de_hanches_cm: ${circonferences.tour_de_hanches_cm} cm`);
    }
    return parts.join(' | ');
  };

  const shareText = resultImage
    ? `Découvre mon essayage virtuel AWÙ TCHECKE : ${resultImage}${measurements ? "\n\nMesures: " + formatMeasurements(measurements) : ""}${suggestions ? "\n\nSuggestions: " + suggestions : ""}`
    : "";

  const whatsappShareUrl = resultImage
    ? `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`
    : "#";

  const facebookShareUrl = resultImage
    ? `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(resultImage)}`
    : "#";

  const handleCopyLink = async () => {
    if (!resultImage) return;
    try {
      await navigator.clipboard.writeText(shareText || resultImage);
      setCopySuccess("Partage copié !");
      setTimeout(() => setCopySuccess(""), 2500);
    } catch (err) {
      setCopySuccess("Impossible de copier le partage.");
      setTimeout(() => setCopySuccess(""), 2500);
    }
  };

  const handleNativeShare = async () => {
    if (!resultImage || !navigator.share) return;
    try {
      await navigator.share({
        title: "Essayage AWÙ TCHECKE",
        text: shareText,
        url: resultImage,
      });
    } catch (err) {
      // annulation du partage
    }
  };

  return (
    <div className="min-h-screen bg-base text-ink font-sans antialiased selection:bg-accent selection:text-slate-950">
      <header className="border-b border-line bg-panel/70 backdrop-blur-xl sticky top-0 z-50 shadow-shade/30">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img src={logoMark} alt="" aria-hidden="true" className="h-11 w-auto shrink-0" />
            <div>
              <h1 className="text-lg font-extrabold uppercase tracking-[0.14em] leading-none text-ink">
                AWÙ TCHECKE
              </h1>
              <p className="mt-1.5 text-xs uppercase tracking-[0.32em] text-subtle">Try-On Bénin</p>
            </div>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <button
              type="button"
              onClick={() => setActivePage("home")}
              className={`rounded-full px-4 py-2 font-semibold transition ${
                activePage === "home"
                  ? "bg-accent text-slate-950"
                  : "bg-raised text-muted hover:bg-raised-strong"
              }`}
            >
              Accueil
            </button>
            <button
              type="button"
              onClick={() => setActivePage("outfit")}
              className={`rounded-full px-4 py-2 font-semibold transition ${
                activePage === "outfit"
                  ? "bg-accent text-slate-950"
                  : "bg-raised text-muted hover:bg-raised-strong"
              }`}
            >
              Essayage complet
            </button>
            <button
              type="button"
              onClick={() => setActivePage("partial")}
              className={`rounded-full px-4 py-2 font-semibold transition ${
                activePage === "partial"
                  ? "bg-accent text-slate-950"
                  : "bg-raised text-muted hover:bg-raised-strong"
              }`}
            >
              Essayage partiel
            </button>
          </div>
          <div className="flex items-center gap-3 text-sm text-muted">
            <span className="hidden md:inline rounded-full bg-raised/80 px-3 py-2 border border-line-strong">Rapide</span>
            <span className="hidden md:inline rounded-full bg-raised/80 px-3 py-2 border border-line-strong">Stylé</span>
            <span className="hidden md:inline rounded-full bg-raised/80 px-3 py-2 border border-line-strong">IA</span>
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={theme === "dark" ? "Passer en thème clair" : "Passer en thème sombre"}
              title={theme === "dark" ? "Passer en thème clair" : "Passer en thème sombre"}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-line-strong bg-raised/80 text-muted transition hover:bg-raised-strong hover:text-ink"
            >
              {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12 space-y-12">
        {activePage === "home" ? (
          <HomePage
            onNavigateToTryOn={() => setActivePage("outfit")}
            onNavigateToPartial={() => setActivePage("partial")}
          />
        ) : activePage === "partial" ? (
          <PartialTryOnPage
            humanImage={humanImage}
            topImage={topImage}
            category={category}
            loading={loading}
            resultImage={resultImage}
            copySuccess={copySuccess}
            error={error}
            whatsappShareUrl={whatsappShareUrl}
            facebookShareUrl={facebookShareUrl}
            handleCopyLink={handleCopyLink}
            handleNativeShare={handleNativeShare}
            onHumanImageUpload={(e) => handleImageUpload(e, setHumanImage, setHumanFile)}
            onTopImageUpload={(e) => handleImageUpload(e, setTopImage, setTopFile)}
            handleTryOn={handleTryOn}
            setCategory={setCategory}
          />
        ) : (
          <TryOnPage
            humanImage={humanImage}
            topImage={topImage}
            bottomImage={bottomImage}
            loading={loading}
            resultImage={resultImage}
            copySuccess={copySuccess}
            measurements={measurements}
            measurementNote={measurementNote}
            suggestions={suggestions}
            llmLoading={llmLoading}
            measurementsLoading={measurementsLoading}
            error={error}
            whatsappShareUrl={whatsappShareUrl}
            facebookShareUrl={facebookShareUrl}
            handleCopyLink={handleCopyLink}
            handleNativeShare={handleNativeShare}
            onHumanImageUpload={(e) => handleImageUpload(e, setHumanImage, setHumanFile)}
            onTopImageUpload={(e) => handleImageUpload(e, setTopImage, setTopFile)}
            onBottomImageUpload={(e) => handleImageUpload(e, setBottomImage, setBottomFile)}
            handleTryOn={handleTryOnOutfit}
          />
        )}
        {resultImage && (
          <section className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
            <MeasurementEstimator
              humanImage={humanImage}
              heightCm={heightCm}
              onHeightChange={setHeightCm}
              onEstimateMeasurements={handleEstimateMeasurements}
              measurements={measurements}
              measurementNote={measurementNote}
              loading={measurementsLoading}
            />
            <SuggestionPanel
              resultImage={resultImage}
              measurements={measurements}
              suggestions={suggestions}
              onFetchSuggestions={fetchLLMSuggestions}
              llmLoading={llmLoading}
            />
          </section>
        )}
      </main>
    </div>
  );
}