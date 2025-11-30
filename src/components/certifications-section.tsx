"use client";

import { motion } from "framer-motion";
import { Award, Calendar, ExternalLink, CheckCircle } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { useEffect, useState } from "react";
import { Certificate } from "@/types";

const colors = [
  "from-blue-600 to-cyan-600",
  "from-purple-600 to-pink-600",
  "from-green-600 to-teal-600",
  "from-orange-600 to-red-600",
  "from-indigo-600 to-purple-600",
  "from-yellow-600 to-orange-600",
];

const icons = ["🎓", "🐍", "🤖", "📜", "🏆", "⭐"];

export function CertificationsSection() {
  const { t, language } = useLanguage();
  const [certifications, setCertifications] = useState<Certificate[]>([]);

  useEffect(() => {
    async function fetchCertifications() {
      try {
        const response = await fetch("/api/certificates");
        if (response.ok) {
          const data = await response.json();
          setCertifications(data);
        }
      } catch (error) {
        console.error("Error fetching certifications:", error);
      }
    }
    fetchCertifications();
  }, []);

  if (certifications.length === 0) {
    return null;
  }

  return (
    <section className="py-20 relative" id="certifications">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="gradient-text">{t("certifications.title")}</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full" />
          <p className="mt-6 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {t("certifications.subtitle")}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert, index) => {
            const color = colors[index % colors.length];
            const icon = icons[index % icons.length];

            return (
              <motion.div
                key={cert._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.6 }}
                whileHover={{ y: -10, scale: 1.03 }}
                className="glass p-6 rounded-2xl hover:shadow-xl transition-all relative overflow-hidden group cursor-pointer"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />

                <div className="relative z-10">
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.15 + 0.2, duration: 0.6, type: "spring" }}
                    className="text-5xl mb-4 flex items-center justify-center"
                  >
                    {icon}
                  </motion.div>

                  <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r ${color} text-white text-xs font-semibold mb-4`}>
                    <CheckCircle className="w-3 h-3" />
                    {t("certifications.verified")}
                  </div>

                  <h3 className="text-lg font-bold mb-2 group-hover:gradient-text transition-all">
                    {cert.name[language]}
                  </h3>

                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    {cert.issuer[language]}
                  </p>

                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                    {cert.description[language]}
                  </p>

                  <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                    {cert.credentialID && (
                      <div className="flex items-center gap-2">
                        <Award className="w-4 h-4" />
                        <span className="truncate">{cert.credentialID}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(cert.issueDate).toLocaleDateString(language === "en" ? "en-US" : "fr-FR", { year: "numeric", month: "long" })}</span>
                    </div>
                    {cert.expiryDate && (
                      <div className="flex items-center gap-2 text-orange-600 dark:text-orange-400">
                        <Calendar className="w-4 h-4" />
                        <span>{t("certifications.expires")}: {new Date(cert.expiryDate).toLocaleDateString(language === "en" ? "en-US" : "fr-FR", { year: "numeric", month: "long" })}</span>
                      </div>
                    )}
                  </div>

                  {cert.credentialURL && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700"
                    >
                      <a
                        href={cert.credentialURL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        {t("certifications.viewCertificate")}
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
