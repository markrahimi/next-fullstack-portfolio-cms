"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Mail, Phone, MapPin, Send, Github, Linkedin, CheckCircle2 } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { usePageView } from "@/hooks/usePageView";

export default function ContactPage() {
  usePageView("contact");
  const { t } = useLanguage();

  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6" />,
      label: t("contact.info.email"),
      value: "imarkrahimi@gmail.com",
      href: "mailto:imarkrahimi@gmail.com",
      color: "from-blue-600 to-cyan-600",
    },
    {
      icon: <Phone className="w-6 h-6" />,
      label: t("contact.info.phone"),
      value: "+33 6 35 04 71 30",
      href: "tel:+33635047130",
      color: "from-purple-600 to-pink-600",
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      label: t("contact.info.location"),
      value: "Lyon & Saint-Étienne (Remote Worldwide, Hybrid EU)",
      href: "#",
      color: "from-green-600 to-teal-600",
    },
  ];

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsSubmitted(true);
        setFormData({ name: "", email: "", subject: "", message: "" });

        // Reset success message after 3 seconds
        setTimeout(() => setIsSubmitted(false), 3000);
      } else {
        alert("Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6">
            {t("contact.title")} <span className="gradient-text">{t("contact.titleHighlight")}</span>
          </h1>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full mb-8" />
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {t("contact.subtitle")}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-3xl font-bold mb-4">{t("contact.connect.title")}</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-8">
                {t("contact.connect.description")}
              </p>
            </div>

            {/* Contact Cards */}
            <div className="space-y-4">
              {contactInfo.map((info, index) => (
                <motion.a
                  key={index}
                  href={info.href}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + index * 0.1, duration: 0.6 }}
                  whileHover={{ x: 10, scale: 1.02 }}
                  className="flex items-center gap-4 glass p-6 rounded-2xl hover:shadow-xl transition-all group"
                >
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className={`p-4 rounded-xl bg-gradient-to-r ${info.color} text-white`}
                  >
                    {info.icon}
                  </motion.div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{info.label}</p>
                    <p className="font-semibold text-lg">{info.value}</p>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="glass p-6 rounded-2xl"
            >
              <h3 className="text-xl font-bold mb-4">{t("contact.social")}</h3>
              <div className="flex gap-4">
                <SocialButton
                  href="https://github.com/markrahimi"
                  icon={<Github className="w-6 h-6" />}
                  label="GitHub"
                  color="from-gray-700 to-gray-900"
                />
                <SocialButton
                  href="https://linkedin.com/in/markrahimi"
                  icon={<Linkedin className="w-6 h-6" />}
                  label="LinkedIn"
                  color="from-blue-600 to-blue-800"
                />
              </div>
            </motion.div>

            {/* Availability */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="glass p-6 rounded-2xl border-2 border-green-500/20"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                <h3 className="text-xl font-bold">{t("contact.availability.title")}</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                {t("contact.availability.description")}
              </p>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="glass p-8 rounded-2xl"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  {t("contact.form.yourName")} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-white/50 dark:bg-black/50 border border-gray-300 dark:border-gray-700 focus:border-blue-600 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-600/20 outline-none transition-all"
                  placeholder="John Doe"
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  {t("contact.form.yourEmail")} <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-white/50 dark:bg-black/50 border border-gray-300 dark:border-gray-700 focus:border-blue-600 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-600/20 outline-none transition-all"
                  placeholder="john@example.com"
                />
              </div>

              {/* Subject */}
              <div>
                <label htmlFor="subject" className="block text-sm font-medium mb-2">
                  {t("contact.form.subject")} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-white/50 dark:bg-black/50 border border-gray-300 dark:border-gray-700 focus:border-blue-600 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-600/20 outline-none transition-all"
                  placeholder="Project Inquiry"
                />
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  {t("contact.form.message")} <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 rounded-lg bg-white/50 dark:bg-black/50 border border-gray-300 dark:border-gray-700 focus:border-blue-600 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-600/20 outline-none transition-all resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full py-4 rounded-lg font-semibold text-white shadow-lg transition-all flex items-center justify-center gap-2 ${
                  isSubmitting
                    ? "bg-gray-400 cursor-not-allowed"
                    : isSubmitted
                    ? "bg-green-600"
                    : "bg-gradient-to-r from-blue-600 to-purple-600 hover:shadow-xl"
                }`}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    {t("contact.form.sending")}
                  </>
                ) : isSubmitted ? (
                  <>
                    <CheckCircle2 className="w-5 h-5" />
                    {t("contact.form.sent")}
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    {t("contact.form.send")}
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function SocialButton({
  href,
  icon,
  label,
  color,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  color: string;
}) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ y: -5, scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`flex-1 p-4 rounded-xl bg-gradient-to-r ${color} text-white text-center hover:shadow-xl transition-all group`}
    >
      <motion.div
        whileHover={{ rotate: 360 }}
        transition={{ duration: 0.6 }}
        className="inline-block mb-2"
      >
        {icon}
      </motion.div>
      <p className="text-sm font-medium">{label}</p>
    </motion.a>
  );
}
