"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Github, ExternalLink, Calendar, Tag, CheckCircle2, Lightbulb, Code2, Zap } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { ProjectDetail } from "@/types";
import { useLanguage } from "@/hooks/useLanguage";
import { getProjectDetail } from "@/lib/get-localized-data";
import { usePageView } from "@/hooks/usePageView";

export default function ProjectDetailPage() {
  const { language, t } = useLanguage();
  const params = useParams();
  const projectId = params.id as string;
  usePageView(`project-${projectId}`);
  const [project, setProject] = useState<ProjectDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    async function fetchProject() {
      setLoading(true);
      setNotFound(false);
      try {
        const data = await getProjectDetail(language, projectId);
        if (data) {
          setProject(data);
        } else {
          setNotFound(true);
        }
      } catch (error) {
        console.error("Error fetching project:", error);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    }
    fetchProject();
  }, [language, projectId]);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen pt-32 pb-20 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">{t("common.loading") || "Loading..."}</p>
        </div>
      </div>
    );
  }

  // Not found state
  if (notFound || !project) {
    return (
      <div className="min-h-screen pt-32 pb-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">{t("projects.detail.projectNotFound")}</h1>
          <Link href="/projects" className="text-blue-600 hover:underline">
            {t("projects.detail.backToProjects")}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 mb-8 group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            {t("projects.detail.backToProjects")}
          </Link>
        </motion.div>

        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          {/* Category Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="mb-4"
          >
            <span className={`inline-block px-4 py-2 rounded-full bg-gradient-to-r ${project.color} text-white text-sm font-semibold`}>
              {project.category}
            </span>
          </motion.div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-4">
            {project.title}
          </h1>
          <p className="text-2xl sm:text-3xl text-gray-600 dark:text-gray-400 mb-6">
            {project.subtitle}
          </p>

          <div className="flex flex-wrap items-center gap-6 mb-8">
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
              <Calendar className="w-5 h-5" />
              <span>{project.date}</span>
            </div>
            <div className="flex gap-4">
              <motion.a
                href={project.github}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg glass hover:shadow-xl transition-all"
              >
                <Github className="w-5 h-5" />
                {t("projects.viewCode")}
              </motion.a>
              <motion.a
                href={project.demo}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold hover:shadow-xl transition-all"
              >
                <ExternalLink className="w-5 h-5" />
                {t("projects.liveDemo")}
              </motion.a>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag, index) => (
              <motion.span
                key={tag}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + index * 0.05, duration: 0.3 }}
                className="glass px-3 py-1.5 rounded-lg text-sm font-medium text-gray-100"
              >
                {tag}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Main Image */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="relative w-full h-[400px] sm:h-[500px] lg:h-[600px] rounded-3xl overflow-hidden mb-16 glass"
        >
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-contain p-12"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Overview */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="glass p-8 rounded-2xl"
            >
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                <Code2 className="w-8 h-8 text-blue-600" />
                {t("projects.detail.overview")}
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                {project.description}
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                {project.longDescription}
              </p>
            </motion.section>

            {/* Key Features */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="glass p-8 rounded-2xl"
            >
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                <Zap className="w-8 h-8 text-blue-600" />
                {t("projects.detail.features")}
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {project.features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05, duration: 0.4 }}
                    className="flex items-start gap-3 group"
                  >
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                    <span className="text-gray-600 dark:text-gray-400">{feature}</span>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* Challenges & Solutions */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="glass p-8 rounded-2xl"
            >
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                <Lightbulb className="w-8 h-8 text-blue-600" />
                {t("projects.detail.challenges")}
              </h2>
              <div className="space-y-6">
                {project.challenges.map((challenge, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.4 }}
                    className="border-l-4 border-blue-600 pl-6"
                  >
                    <h3 className="text-xl font-bold mb-2 text-red-600 dark:text-red-400">
                      {t("projects.detail.challenge")}: {challenge.problem}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                      <span className="font-semibold text-green-600 dark:text-green-400">{t("projects.detail.solution")}:</span>{" "}
                      {challenge.solution}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* Tech Stack */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="glass p-8 rounded-2xl"
            >
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                <Tag className="w-8 h-8 text-blue-600" />
                {t("projects.detail.techStack")}
              </h2>
              <div className="space-y-6">
                {Object.entries(project.techStack).map(([category, technologies], index) => (
                  <motion.div
                    key={category}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.4 }}
                  >
                    <h3 className="text-lg font-semibold mb-3 gradient-text">{category}</h3>
                    <div className="flex flex-wrap gap-2">
                      {technologies.map((tech) => (
                        <span
                          key={tech}
                          className="glass px-3 py-1.5 rounded-lg text-sm font-medium text-gray-100"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Metrics */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="glass p-6 rounded-2xl sticky top-24"
            >
              <h3 className="text-2xl font-bold mb-6">{t("projects.detail.metrics")}</h3>
              <div className="space-y-6">
                {project.metrics.map((metric, index) => (
                  <motion.div
                    key={metric.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.4 }}
                    className="text-center p-4 rounded-xl bg-gradient-to-br from-blue-600/10 to-purple-600/10"
                  >
                    <div className="text-3xl font-bold gradient-text mb-2">
                      {metric.value}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {metric.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-20 text-center glass p-12 rounded-2xl"
        >
          <h2 className="text-3xl font-bold mb-4">{t("projects.detail.cta.title")}</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
            {t("projects.detail.cta.description")}
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <motion.a
              href="/contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block px-8 py-4 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold shadow-lg hover:shadow-xl transition-shadow"
            >
              {t("projects.detail.cta.getInTouch")}
            </motion.a>
            <motion.a
              href="/projects"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block px-8 py-4 rounded-lg glass font-semibold hover:shadow-xl transition-shadow"
            >
              {t("projects.detail.cta.viewMore")}
            </motion.a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
