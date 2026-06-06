import { defaultPrompts } from "../../../data/prompts";

export const QuickPrompts = ({ lang, onSelect }) => {
  const isAr = lang === "ar";

  return (
    <div className="mb-8">
      <p className="text-sm font-bold text-gray-500 mb-3">
        {isAr ? "جرب أحد الأمثلة السريعة:" : "Try a quick example:"}
      </p>
      <div className="flex flex-wrap gap-2">
        {defaultPrompts[lang].map((prompt, idx) => (
          <button
            key={idx}
            onClick={() => onSelect(prompt)}
            className="text-xs bg-white border border-gray-200 text-gray-600 px-3 py-2 rounded-full hover:bg-emerald-50 hover:border-emerald-200 transition-colors shadow-sm"
          >
            {prompt}
          </button>
        ))}
      </div>
    </div>
  );
};
