import { motion } from "framer-motion";
import { Button } from "../../../shared/components/Button";

export const TextInputTab = ({
  textInput,
  setTextInput,
  onSubmit,
  isLoading,
  lang,
}) => {
  const isAr = lang === "ar";

  return (
    <motion.div
      key="text"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
    >
      <textarea
        value={textInput}
        onChange={(e) => setTextInput(e.target.value)}
        placeholder={
          isAr
            ? "ماذا أكلت اليوم؟ (مثال: أكلت بيضتين وتفاحة)"
            : "What did you eat today?"
        }
        className="w-full h-32 p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none resize-none mb-4 bg-gray-50"
      />
      <Button onClick={onSubmit} disabled={isLoading} className="w-full">
        {isLoading
          ? isAr
            ? "جاري التحليل..."
            : "Analyzing..."
          : isAr
            ? "تحليل الوجبة"
            : "Analyze Meal"}
      </Button>
    </motion.div>
  );
};
