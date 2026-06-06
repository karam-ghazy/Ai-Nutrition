import { motion } from "framer-motion";

export const ResultsCard = ({ result, lang }) => {
  if (!result) return null;

  // دمج الـ Base URL مع مسار الصوت القادم من الخادم
  const audioUrl = `http://localhost:8000${result.audio_url}`;
  const isArabic = lang === "ar";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-2xl shadow-xl p-6 mt-8 border border-emerald-100"
    >
      <h3 className="text-xl font-bold text-gray-800 mb-4 border-b pb-3">
        {isArabic ? "التحليل الغذائي" : "Nutritional Analysis"}
      </h3>

      {/* عرض النص إذا كان الإدخال صوتياً وتم تفريغه بواسطة Whisper */}
      {result.transcribed_query && (
        <div className="mb-4 bg-gray-50 p-4 rounded-xl border border-gray-100">
          <span className="text-sm text-gray-500 block mb-2">
            {isArabic ? "النص المسموع:" : "Transcribed Text:"}
          </span>
          <p className="font-medium text-gray-800 italic">
            "{result.transcribed_query}"
          </p>
        </div>
      )}

      {/* عرض تفصيل الماكروز */}
      <div className="bg-emerald-50 p-5 rounded-xl mb-6 whitespace-pre-wrap text-gray-800 font-medium leading-relaxed border border-emerald-100 shadow-inner">
        {result.response_text}
      </div>

      {/* مشغل الصوت */}
      <div className="flex flex-col items-center bg-gray-50 p-4 rounded-xl">
        <span className="text-sm font-bold text-emerald-700 mb-3">
          {isArabic ? "🎧 استمع للتفاصيل" : "🎧 Listen to Details"}
        </span>
        <audio controls className="w-full max-w-md custom-audio">
          <source src={audioUrl} type="audio/mpeg" />
          {isArabic
            ? "متصفحك لا يدعم مشغل الصوت."
            : "Your browser does not support the audio element."}
        </audio>
      </div>
    </motion.div>
  );
};
