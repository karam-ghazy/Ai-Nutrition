import { motion } from "framer-motion";
import { Button } from "../../../shared/components/Button";

export const VoiceInputTab = ({
  recorderOptions,
  onSubmit,
  isLoading,
  lang,
}) => {
  const {
    isRecording,
    audioBlob,
    recordingTime,
    startRecording,
    stopRecording,
    clearAudio,
  } = recorderOptions;
  const isAr = lang === "ar";

  return (
    <motion.div
      key="voice"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="flex flex-col items-center py-6"
    >
      <motion.button
        animate={
          isRecording
            ? {
                scale: [1, 1.1, 1],
                boxShadow: [
                  "0px 0px 0px rgba(16, 185, 129, 0)",
                  "0px 0px 20px rgba(16, 185, 129, 0.5)",
                  "0px 0px 0px rgba(16, 185, 129, 0)",
                ],
              }
            : {}
        }
        transition={{ repeat: isRecording ? Infinity : 0, duration: 1.5 }}
        onClick={isRecording ? stopRecording : startRecording}
        className={`w-24 h-24 rounded-full flex items-center justify-center text-3xl text-white shadow-lg mb-4 ${isRecording ? "bg-red-500" : "bg-emerald-500 hover:bg-emerald-600"}`}
      >
        {isRecording ? "⏹️" : "🎙️"}
      </motion.button>

      <p className="text-gray-600 font-bold mb-6 text-lg">
        {isRecording
          ? `${isAr ? "جاري التسجيل..." : "Recording..."} ${recordingTime}s`
          : audioBlob
            ? isAr
              ? "✅ تم تسجيل الصوت بنجاح"
              : "✅ Audio recorded successfully"
            : isAr
              ? "اضغط للتحدث عن وجبتك"
              : "Tap to speak about your meal"}
      </p>

      {audioBlob && !isRecording && (
        <div className="flex gap-4 w-full">
          <Button variant="outline" onClick={clearAudio} className="flex-1">
            {isAr ? "إعادة التسجيل" : "Record Again"}
          </Button>
          <Button onClick={onSubmit} disabled={isLoading} className="flex-1">
            {isLoading
              ? isAr
                ? "جاري التحليل..."
                : "Analyzing..."
              : isAr
                ? "إرسال وتحليل"
                : "Submit & Analyze"}
          </Button>
        </div>
      )}
    </motion.div>
  );
};
