"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Heart } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { useEffect, useState } from "react";
import { getSettings } from "@/lib/get-localized-data";
import { Settings } from "@/types";

export function Footer() {
  const { t, language } = useLanguage();
  const currentYear = new Date().getFullYear();
  const [settings, setSettings] = useState<Settings | null>(null);

  useEffect(() => {
    async function fetchSettings() {
      const data = await getSettings();
      setSettings(data);
    }
    fetchSettings();
  }, []);

  const navItems = [
    { name: t("nav.home"), href: "/" },
    { name: t("nav.projects"), href: "/projects" },
    { name: t("nav.blog"), href: "/blog" },
    { name: t("nav.contact"), href: "/contact" },
  ];

  return (
    <footer className="relative z-10 mt-20 glass border-t border-white/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* About */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-lg font-bold gradient-text mb-4">{settings?.fullName || "Mark Rahimi"}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {settings?.footerText?.[language] || t("footer.description")}
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="text-lg font-semibold mb-4">{t("footer.quickLinks")}</h3>
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Connect */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-lg font-semibold mb-4">{t("footer.connect")}</h3>
            <div className="flex space-x-4">
              {settings?.socialLinks?.github && <SocialButton href={settings.socialLinks.github} icon={<Github className="w-5 h-5" />} />}
              {settings?.socialLinks?.linkedin && <SocialButton href={settings.socialLinks.linkedin} icon={<Linkedin className="w-5 h-5" />} />}
              {settings?.email && <SocialButton href={`mailto:${settings.email}`} icon={<Mail className="w-5 h-5" />} />}
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="pt-8 border-t border-gray-200 dark:border-gray-800"
        >
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-1">
              © {currentYear} {settings?.fullName || "Mark Rahimi"}. {settings?.copyrightText?.[language] || t("footer.madeWith")} <Heart className="w-4 h-4 text-red-500" /> {t("footer.using")} Next.js
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {settings?.location?.[language] || t("footer.location")}
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}

function SocialButton({ href, icon }: { href: string; icon: React.ReactNode }) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.1, y: -2 }}
      whileTap={{ scale: 0.95 }}
      className="p-3 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 hover:text-white transition-all duration-300"
    >
      {icon}
    </motion.a>
  );
}
