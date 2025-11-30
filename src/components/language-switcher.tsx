"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/hooks/useLanguage";
import { Language } from "@/types/language";
import { Globe } from "lucide-react";

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  const languages: { code: Language; label: string; flag: string }[] = [
    { code: "en", label: "English", flag: "🇬🇧" },
    { code: "fr", label: "Français", flag: "🇫🇷" },
  ];

  return (
    <div className="relative group">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center gap-2 px-4 py-2 rounded-lg glass text-sm font-medium hover:shadow-lg transition-all"
      >
        <Globe className="w-4 h-4" />
        <span className="hidden sm:inline">
          {languages.find((l) => l.code === language)?.flag}
        </span>
      </motion.button>

      {/* Dropdown */}
      <motion.div
        initial={{ opacity: 0, y: 10, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        className="absolute top-full right-0 mt-2 w-40 glass rounded-lg overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 shadow-xl z-50"
      >
        {languages.map((lang) => (
          <motion.button
            key={lang.code}
            onClick={() => setLanguage(lang.code)}
            whileHover={{ backgroundColor: "rgba(59, 130, 246, 0.1)" }}
            className={`w-full px-4 py-3 text-left flex items-center gap-3 transition-colors ${
              language === lang.code
                ? "bg-blue-600/10 text-blue-600 font-semibold"
                : "text-gray-700 dark:text-gray-300"
            }`}
          >
            <span className="text-xl">{lang.flag}</span>
            <span className="text-sm">{lang.label}</span>
          </motion.button>
        ))}
      </motion.div>
    </div>
  );
}
