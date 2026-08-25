"use client";

import { useLanguage } from "@/context/LanguageContext";

export function LanguageToggle() {
  const { lang, toggleLanguage } = useLanguage();

  return (
    <button
      onClick={toggleLanguage}
      className="bg-green-600 hover:bg-green-500 text-white font-bold py-1 px-3 rounded flex items-center shadow"
    >
      {lang === "en" ? "A / अ" : "अ / A"}
    </button>
  );
}
