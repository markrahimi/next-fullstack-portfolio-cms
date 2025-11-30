"use client";

import { motion } from "framer-motion";
import { ArrowDown, Download, Github, Linkedin, Mail } from "lucide-react";
import Image from "next/image";
import { useLanguage } from "@/hooks/useLanguage";
import { useEffect, useState } from "react";
import { getSettings } from "@/lib/get-localized-data";
import { Settings } from "@/types";

export function HeroSection() {
  const { t, language } = useLanguage();
  const [settings, setSettings] = useState<Settings | null>(null);

  useEffect(() => {
    async function fetchSettings() {
      const data = await getSettings();
      setSettings(data);
    }
    fetchSettings();
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-6 z-10"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <span className="inline-block px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-medium mb-4">
                👋 {settings?.heroGreeting[language] || t("hero.greeting")}
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-4xl sm:text-5xl lg:text-7xl font-bold"
            >
              <span className="gradient-text">
                {settings?.fullName || "Mark Rahimi"}
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-700 dark:text-gray-300"
            >
              {settings?.heroTitle[language] || t("hero.title")}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-xl"
            >
              {settings?.heroSubtitle[language] || t("hero.subtitle")}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="flex flex-wrap gap-4"
            >
              <motion.a
                href={settings?.resumeUrl || "/cv.pdf"}
                download
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative px-8 py-4 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <Download className="w-5 h-5" />
                  {t("hero.cta.downloadCV")}
                </span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600"
                  initial={{ x: "100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>

              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 rounded-lg border-2 border-gray-300 dark:border-gray-700 hover:border-blue-600 dark:hover:border-blue-400 font-semibold transition-colors"
              >
                {t("hero.cta.getInTouch")}
              </motion.a>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="flex items-center gap-4 pt-4"
            >
              <span className="text-sm text-gray-600 dark:text-gray-400">{t("contact.social")}:</span>
              {settings?.socialLinks?.github && <SocialIcon href={settings.socialLinks.github} icon={<Github />} />}
              {settings?.socialLinks?.linkedin && <SocialIcon href={settings.socialLinks.linkedin} icon={<Linkedin />} />}
              {settings?.email && <SocialIcon href={`mailto:${settings.email}`} icon={<Mail />} />}
            </motion.div>
          </motion.div>

          {/* Right Content - Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="relative z-10"
          >
            <div className="relative w-full max-w-lg mx-auto">
              {/* Glowing background effect - Minimal blur for performance */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-full blur-xl opacity-15" />

              {/* Profile Image Container - Performance Optimized */}
              <div className="relative aspect-square rounded-full overflow-hidden border-8 border-white dark:border-gray-800 shadow-2xl">
                <Image
                  src={settings?.profileImage || "/profile.jpg"}
                  alt={settings?.fullName || "Mark Rahimi"}
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              {/* Floating elements */}
              {(settings?.heroBadges || ["Python", "FastAPI", "Next.js", "Django"]).map((badge, index) => {
                const positions = [
                  "top-0 -left-4",
                  "top-20 -right-8",
                  "bottom-20 -left-8",
                  "bottom-0 -right-4",
                ];
                return (
                  <FloatingBadge
                    key={index}
                    text={badge}
                    delay={index * 0.2}
                    position={positions[index % positions.length]}
                  />
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="flex flex-col items-center gap-2 text-gray-600 dark:text-gray-400"
          >
            <span className="text-sm">{t("common.scrollToExplore")}</span>
            <ArrowDown className="w-5 h-5" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function SocialIcon({ href, icon }: { href: string; icon: React.ReactNode }) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.2, rotate: 5 }}
      whileTap={{ scale: 0.9 }}
      className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
    >
      {icon}
    </motion.a>
  );
}

function FloatingBadge({ text, delay, position }: { text: string; delay: number; position: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1 + delay, duration: 0.5 }}
      className={`absolute ${position} z-20`}
    >
      <motion.div
        animate={{
          y: [0, -10, 0],
          rotate: [0, 5, 0, -5, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
          delay: delay,
        }}
        className="px-4 py-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 shadow-xl text-sm font-semibold text-white whitespace-nowrap border-2 border-white/20"
      >
        {text}
      </motion.div>
    </motion.div>
  );
}
