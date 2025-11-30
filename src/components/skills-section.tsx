"use client";

import { motion } from "framer-motion";
import { SkillCategory } from "@/types";
import { useLanguage } from "@/hooks/useLanguage";
import { getSkills } from "@/lib/get-localized-data";
import { useState, useEffect } from "react";

export function SkillsSection() {
  const { language, t } = useLanguage();
  const [skillCategories, setSkillCategories] = useState<SkillCategory[]>([]);

  useEffect(() => {
    async function fetchSkills() {
      const data = await getSkills(language);
      setSkillCategories(data.categories || []);
    }
    fetchSkills();
  }, [language]);

  return (
    <section className="py-20 relative" id="skills">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            {t("skills.title")} <span className="gradient-text">{t("skills.titleHighlight")}</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full" />
          <p className="mt-6 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {t("skills.subtitle")}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: categoryIndex * 0.1, duration: 0.6 }}
              whileHover={{ y: -5 }}
              className="glass p-6 rounded-2xl hover:shadow-xl transition-all"
            >
              <div className={`inline-flex items-center justify-center px-4 py-2 rounded-full bg-gradient-to-r ${category.color} text-white text-sm font-semibold mb-4`}>
                {category.title}
              </div>

              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, skillIndex) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: categoryIndex * 0.1 + skillIndex * 0.05, duration: 0.3 }}
                    whileHover={{ scale: 1.1 }}
                    className="glass px-3 py-1.5 rounded-lg text-sm font-medium text-gray-100 hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 hover:text-white transition-all cursor-default"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
