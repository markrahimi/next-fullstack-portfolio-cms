"use client";

import { motion } from "framer-motion";
import { GraduationCap, Calendar, MapPin, BookOpen } from "lucide-react";
import { Education } from "@/types";
import { useLanguage } from "@/hooks/useLanguage";
import { getEducation } from "@/lib/get-localized-data";
import { useState, useEffect } from "react";

export function EducationSection() {
  const { language, t } = useLanguage();
  const [education, setEducation] = useState<Education[]>([]);

  useEffect(() => {
    async function fetchEducation() {
      const data = await getEducation(language);
      setEducation(data);
    }
    fetchEducation();
  }, [language]);

  return (
    <section className="py-20 relative" id="education">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="gradient-text">{t("education.title")}</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {education.map((edu, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="glass p-8 rounded-2xl hover:shadow-xl transition-all relative overflow-hidden group"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${edu.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />

              <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className={`p-4 rounded-xl bg-gradient-to-r ${edu.color} text-white`}
                  >
                    <GraduationCap className="w-8 h-8" />
                  </motion.div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    edu.status === "Ongoing"
                      ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                      : "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                  }`}>
                    {edu.status}
                  </span>
                </div>

                <h3 className="text-xl font-bold mb-3 group-hover:gradient-text transition-all">
                  {edu.degree}
                </h3>

                <div className="space-y-2 mb-4 text-gray-600 dark:text-gray-400">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4" />
                    <span className="font-medium">{edu.institution}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>{edu.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{edu.year}</span>
                  </div>
                </div>

                {edu.courses && edu.courses.length > 0 && (
                  <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                    <h4 className="text-sm font-semibold mb-3 text-gray-700 dark:text-gray-300">
                      {t("education.courses")}:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {edu.courses.map((course, i) => (
                        <motion.span
                          key={i}
                          initial={{ opacity: 0, scale: 0 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.2 + i * 0.05, duration: 0.3 }}
                          whileHover={{ scale: 1.05 }}
                          className="px-3 py-1 rounded-lg bg-gray-100 dark:bg-gray-800 text-xs font-medium text-gray-700 dark:text-gray-300"
                        >
                          {course}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
