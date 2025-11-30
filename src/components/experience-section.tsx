"use client";

import { motion } from "framer-motion";
import { Briefcase, Calendar, MapPin, ExternalLink } from "lucide-react";
import { Experience } from "@/types";
import { useLanguage } from "@/hooks/useLanguage";
import { getExperience } from "@/lib/get-localized-data";
import { useState, useEffect } from "react";

export function ExperienceSection() {
  const { language, t } = useLanguage();
  const [experiences, setExperiences] = useState<Experience[]>([]);

  useEffect(() => {
    async function fetchExperiences() {
      const data = await getExperience(language);
      setExperiences(data);
    }
    fetchExperiences();
  }, [language]);

  return (
    <section className="py-20 relative" id="experience">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            {t("experience.title")} <span className="gradient-text">{t("experience.titleHighlight")}</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full" />
          <p className="mt-6 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {t("experience.subtitle")}
          </p>
        </motion.div>

        <div className="relative">
          <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-blue-600 to-purple-600" />

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                className={`relative grid lg:grid-cols-2 gap-8 items-center ${
                  index % 2 === 0 ? "" : "lg:flex-row-reverse"
                }`}
              >
                <div className="hidden lg:block absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 + 0.3, duration: 0.4 }}
                    className={`w-6 h-6 rounded-full bg-gradient-to-r ${exp.color} border-4 border-white dark:border-gray-900`}
                  />
                </div>

                <div className={index % 2 === 0 ? "lg:col-start-1" : "lg:col-start-2"}>
                  <motion.div
                    whileHover={{ y: -5, scale: 1.02 }}
                    className="glass p-8 rounded-2xl hover:shadow-xl transition-all"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r ${exp.color} text-white text-xs font-semibold mb-3`}>
                          <Briefcase className="w-3 h-3" />
                          {exp.type}
                        </div>
                        <h3 className="text-2xl font-bold mb-1">{exp.role}</h3>
                        <a
                          href="#"
                          className="text-lg text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1 group"
                        >
                          {exp.company}
                          <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </a>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-4 mb-4 text-sm text-gray-600 dark:text-gray-400">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {exp.duration}
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {exp.location}
                      </div>
                    </div>

                    <p className="text-gray-600 dark:text-gray-400 italic mb-4">
                      {exp.description}
                    </p>

                    <ul className="space-y-3">
                      {exp.achievements?.map((achievement, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.2 + i * 0.1, duration: 0.4 }}
                          className="flex items-start gap-3 text-gray-700 dark:text-gray-300"
                        >
                          <div className={`mt-1.5 w-2 h-2 rounded-full bg-gradient-to-r ${exp.color} flex-shrink-0`} />
                          <span>{achievement}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                </div>

                {index % 2 === 0 ? (
                  <div className="hidden lg:block" />
                ) : (
                  <div className="hidden lg:block lg:col-start-1" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
