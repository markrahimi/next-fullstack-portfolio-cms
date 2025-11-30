"use client";

import { motion } from "framer-motion";
import { MapPin, Briefcase, GraduationCap, Code } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { useEffect, useState } from "react";
import { AboutData } from "@/types";

export function AboutSection() {
  const { t, language } = useLanguage();
  const [aboutData, setAboutData] = useState<AboutData | null>(null);

  useEffect(() => {
    async function fetchAbout() {
      try {
        const response = await fetch("/api/about");
        if (response.ok) {
          const data = await response.json();
          setAboutData(data);
        }
      } catch (error) {
        console.error("Error fetching about:", error);
      }
    }
    fetchAbout();
  }, []);

  const stats = aboutData
    ? [
        {
          icon: <Code className="w-6 h-6" />,
          label: aboutData.stats.experience.label[language],
          value: aboutData.stats.experience.value,
        },
        {
          icon: <Briefcase className="w-6 h-6" />,
          label: aboutData.stats.projects.label[language],
          value: aboutData.stats.projects.value,
        },
        {
          icon: <GraduationCap className="w-6 h-6" />,
          label: aboutData.stats.technologies.label[language],
          value: aboutData.stats.technologies.value,
        },
        {
          icon: <MapPin className="w-6 h-6" />,
          label: aboutData.stats.location.label[language],
          value: aboutData.stats.location.value[language],
        },
      ]
    : [];

  return (
    <section className="py-20 relative" id="about">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            {aboutData?.title[language] || t("about.title")}
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left - Description */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="glass p-8 rounded-2xl">
              <h3 className="text-2xl font-bold mb-4">
                {aboutData?.professionalSummary[language] || t("about.professionalSummary")}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                {aboutData?.description[language] || t("about.description")}
              </p>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                {aboutData?.description2[language] || t("about.description2")}
              </p>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {aboutData?.description3[language] || t("about.description3")}
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="glass p-8 rounded-2xl"
            >
              <h3 className="text-2xl font-bold mb-4">
                {aboutData?.whatIDo[language] || t("about.whatIDo")}
              </h3>
              <ul className="space-y-3">
                {(aboutData?.whatIDoList[language] || (t("about.whatIDoList") as string[])).map((item: string, index: number) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 * index, duration: 0.4 }}
                    className="flex items-center gap-3 text-gray-600 dark:text-gray-400"
                  >
                    <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600" />
                    {item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-2 gap-6"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * index, duration: 0.4 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="glass p-6 rounded-2xl text-center group hover:shadow-xl transition-all"
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white mb-4"
                >
                  {stat.icon}
                </motion.div>
                <h4 className="text-3xl font-bold gradient-text mb-2">{stat.value}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
