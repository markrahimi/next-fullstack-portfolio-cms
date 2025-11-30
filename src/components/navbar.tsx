"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Github, Linkedin, Mail } from "lucide-react";
import { cn } from "@/lib/utils";
import { LanguageSwitcher } from "@/components/language-switcher";
import { useLanguage } from "@/hooks/useLanguage";
import { getSettings } from "@/lib/get-localized-data";
import { Settings } from "@/types";

export function Navbar() {
  const { t } = useLanguage();
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
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        isScrolled
          ? "glass shadow-lg"
          : "bg-transparent"
      )}
    >
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo & Desktop Navigation */}
          <div className="flex items-center space-x-8 lg:space-x-12">
            {/* Logo */}
            <Link href="/" className="flex items-center group">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative"
              >
                <span className="text-2xl sm:text-3xl font-bold gradient-text">
                  MR
                </span>
                <motion.span
                  className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600"
                  initial={{ width: 0 }}
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link key={item.href} href={item.href}>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative px-4 py-2"
                  >
                    <span
                      className={cn(
                        "text-sm lg:text-base font-medium transition-colors",
                        isActive
                          ? "gradient-text"
                          : "text-gray-700 dark:text-gray-300 hover:gradient-text"
                      )}
                    >
                      {item.name}
                    </span>
                    {isActive && (
                      <motion.div
                        layoutId="navbar-indicator"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </motion.div>
                </Link>
              );
            })}
            </div>
          </div>

          {/* Social Links & Language Switcher - Desktop */}
          <div className="hidden md:flex items-center space-x-3 lg:space-x-4">
            {settings?.socialLinks?.github && <SocialLink href={settings.socialLinks.github} icon={<Github className="w-5 h-5" />} />}
            {settings?.socialLinks?.linkedin && <SocialLink href={settings.socialLinks.linkedin} icon={<Linkedin className="w-5 h-5" />} />}
            {settings?.email && <SocialLink href={`mailto:${settings.email}`} icon={<Mail className="w-5 h-5" />} />}
            <LanguageSwitcher />
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </motion.button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden glass border-t border-white/20"
          >
            <div className="container mx-auto px-4 py-6 space-y-4">
              {navItems.map((item, index) => {
                const isActive = pathname === item.href;
                return (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={cn(
                        "block px-4 py-3 rounded-lg font-medium transition-all",
                        isActive
                          ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                          : "hover:bg-gray-100 dark:hover:bg-gray-800"
                      )}
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                );
              })}

              {/* Mobile Social Links */}
              <div className="flex items-center justify-center space-x-6 pt-4 border-t border-gray-200 dark:border-gray-800">
                {settings?.socialLinks?.github && <SocialLink href={settings.socialLinks.github} icon={<Github className="w-6 h-6" />} />}
                {settings?.socialLinks?.linkedin && <SocialLink href={settings.socialLinks.linkedin} icon={<Linkedin className="w-6 h-6" />} />}
                {settings?.email && <SocialLink href={`mailto:${settings.email}`} icon={<Mail className="w-6 h-6" />} />}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

function SocialLink({ href, icon }: { href: string; icon: React.ReactNode }) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.1, rotate: 5 }}
      whileTap={{ scale: 0.9 }}
      className="p-2 rounded-lg glass hover:shadow-lg transition-all text-gray-300 hover:text-white group"
    >
      <div className="group-hover:gradient-text transition-all">
        {icon}
      </div>
    </motion.a>
  );
}
