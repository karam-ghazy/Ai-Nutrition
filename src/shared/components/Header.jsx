export const Header = ({ lang, setLang }) => {
  const isAr = lang === "ar";

  return (
    <header className="bg-white shadow-sm py-4 px-6 flex justify-between items-center mb-8">
      <h1 className="text-2xl font-black text-emerald-600 tracking-tight">
        🍏 AI Nutrition
      </h1>
      <button
        onClick={() => setLang(isAr ? "en" : "ar")}
        className="bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg font-bold text-gray-700 transition"
      >
        {isAr ? "English" : "عربي"}
      </button>
    </header>
  );
};
