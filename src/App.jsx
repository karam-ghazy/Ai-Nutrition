import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useNutritionApi } from "./features/nutrition/hooks/useNutritionApi";
import { useAudioRecorder } from "./features/nutrition/hooks/useAudioRecorder";
import {
  validateTextQuery,
  validateAudioBlob,
} from "./core/validation/nutritionValidators";

// استيراد المكونات التي قمنا بفصلها
import { Header } from "./shared/components/Header";
import { QuickPrompts } from "./features/nutrition/components/QuickPrompts";
import { TextInputTab } from "./features/nutrition/components/TextInputTab";
import { VoiceInputTab } from "./features/nutrition/components/VoiceInputTab";
import { ResultsCard } from "./features/nutrition/components/ResultsCard";

function App() {
  const [lang, setLang] = useState("ar");
  const [activeTab, setActiveTab] = useState("text");
  const [textInput, setTextInput] = useState("");
  const [validationError, setValidationError] = useState("");

  const {
    isLoading,
    error: apiError,
    result,
    analyzeText,
    analyzeVoice,
    resetState,
  } = useNutritionApi();
  const audioRecorder = useAudioRecorder(); // نجمعها في كائن واحد لتمريرها بسهولة

  const isAr = lang === "ar";

  const handleTextSubmit = () => {
    const { isValid, error } = validateTextQuery(textInput);
    if (!isValid) return setValidationError(error);

    setValidationError("");
    analyzeText(textInput);
  };

  const handleVoiceSubmit = () => {
    const { isValid, error } = validateAudioBlob(audioRecorder.audioBlob);
    if (!isValid) return setValidationError(error);

    setValidationError("");
    analyzeVoice(audioRecorder.audioBlob);
  };

  const switchTab = (tab) => {
    setActiveTab(tab);
    resetState();
    setValidationError("");
    audioRecorder.clearAudio();
  };

  const handlePromptClick = (prompt) => {
    setTextInput(prompt);
    setActiveTab("text");
    setValidationError("");
    analyzeText(prompt);
  };

  return (
    <div
      className={`min-h-screen bg-gray-50 pb-12 ${isAr ? "rtl" : "ltr"}`}
      dir={isAr ? "rtl" : "ltr"}
    >
      <Header lang={lang} setLang={setLang} />

      <main className="max-w-3xl mx-auto px-4">
        <QuickPrompts lang={lang} onSelect={handlePromptClick} />

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
          {/* Tabs Navigation */}
          <div className="flex border-b border-gray-100">
            <button
              onClick={() => switchTab("text")}
              className={`flex-1 py-4 font-bold transition-colors ${activeTab === "text" ? "bg-emerald-50 text-emerald-700 border-b-2 border-emerald-500" : "text-gray-500 hover:bg-gray-50"}`}
            >
              {isAr ? "✍️ تحليل نصي" : "✍️ Text Analysis"}
            </button>
            <button
              onClick={() => switchTab("voice")}
              className={`flex-1 py-4 font-bold transition-colors ${activeTab === "voice" ? "bg-emerald-50 text-emerald-700 border-b-2 border-emerald-500" : "text-gray-500 hover:bg-gray-50"}`}
            >
              {isAr ? "🎙️ تحليل صوتي" : "🎙️ Voice Analysis"}
            </button>
          </div>

          {/* Form Content */}
          <div className="p-6">
            <AnimatePresence mode="wait">
              {activeTab === "text" ? (
                <TextInputTab
                  textInput={textInput}
                  setTextInput={setTextInput}
                  onSubmit={handleTextSubmit}
                  isLoading={isLoading}
                  lang={lang}
                />
              ) : (
                <VoiceInputTab
                  recorderOptions={audioRecorder}
                  onSubmit={handleVoiceSubmit}
                  isLoading={isLoading}
                  lang={lang}
                />
              )}
            </AnimatePresence>

            {/* Error Message */}
            {(validationError || apiError) && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm font-bold border border-red-200"
              >
                ⚠️ {validationError || apiError}
              </motion.div>
            )}
          </div>
        </div>

        <ResultsCard result={result} lang={lang} />
      </main>
    </div>
  );
}

export default App;
