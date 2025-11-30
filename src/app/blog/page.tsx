"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, Tag, ArrowRight, TrendingUp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { PageLoading } from "@/components/page-loading";
import { BlogPost } from "@/types";
import { useLanguage } from "@/hooks/useLanguage";
import { getBlogPosts } from "@/lib/get-localized-data";
import { usePageView } from "@/hooks/usePageView";

const categories = ["All", "Backend", "Frontend", "DevOps", "Automation", "AI/ML"];

export default function BlogPage() {
  const { language, t } = useLanguage();
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  usePageView("blog");

  useEffect(() => {
    async function fetchBlogPosts() {
      try {
        const posts = await getBlogPosts(language);
        setBlogPosts(posts);
      } catch (error) {
        console.error("Error fetching blog posts:", error);
      }
    }
    fetchBlogPosts();
  }, [language]);

  // Featured posts - always shown without filter
  const featuredPosts = blogPosts.filter((post) => post.featured);

  // Filter regular posts based on selected category
  const regularPosts = selectedCategory === "All"
    ? blogPosts.filter((post) => !post.featured)
    : blogPosts.filter((post) => !post.featured && post.category === selectedCategory);

  return (
    <>
      <PageLoading />
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
            {t("blog.title")} <span className="gradient-text">{t("blog.titleHighlight")}</span>
          </h1>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full mb-8" />
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            {t("blog.subtitle")}
          </p>
        </motion.div>

        {/* Featured Posts */}
        {featuredPosts.length > 0 && (
          <div className="mb-20">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="flex items-center gap-2 mb-8"
            >
              <TrendingUp className="w-6 h-6 text-blue-600" />
              <h2 className="text-3xl font-bold">Featured Posts</h2>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              {featuredPosts.map((post, index) => (
                <FeaturedPostCard key={post.id} post={post} index={index} />
              ))}
            </div>
          </div>
        )}

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="flex flex-wrap justify-center gap-4 mb-16"
        >
          {categories.map((category, index) => (
            <motion.button
              key={category}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + index * 0.1, duration: 0.4 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-full font-medium transition-all ${
                category === selectedCategory
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                  : "glass hover:shadow-lg"
              }`}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* All Posts */}
        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="text-3xl font-bold mb-8"
        >
          All Posts
        </motion.h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {regularPosts.map((post, index) => (
            <BlogPostCard key={post.id} post={post} index={index} />
          ))}
        </div>

        {/* Newsletter CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-20 glass p-12 rounded-2xl text-center"
        >
          <h2 className="text-3xl font-bold mb-4">
            Stay Updated
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
            Subscribe to get notified about new blog posts, tutorials, and insights on software development.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg bg-white/50 dark:bg-black/50 border border-gray-300 dark:border-gray-700 focus:border-blue-600 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-600/20 outline-none"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold shadow-lg hover:shadow-xl transition-shadow"
            >
              Subscribe
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
    </>
  );
}

function FeaturedPostCard({ post, index }: { post: BlogPost; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 + index * 0.1, duration: 0.6 }}
      className="group glass rounded-2xl overflow-hidden hover:shadow-2xl transition-all"
    >
      <Link href={`/blog/${post.id}`}>
        {/* Image */}
        <div className="relative h-64 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700">
          <div className="relative w-full h-full">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-contain p-8"
            />
          </div>

          {/* Featured Badge */}
          <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs font-semibold flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            Featured
          </div>

          {/* Category Badge */}
          <div className={`absolute top-4 right-4 px-3 py-1 rounded-full bg-gradient-to-r ${post.color} text-white text-xs font-semibold`}>
            {post.category}
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-3">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>{new Date(post.date).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{post.readTime}</span>
            </div>
          </div>

          <h3 className="text-2xl font-bold mb-3 group-hover:gradient-text transition-all line-clamp-2">
            {post.title}
          </h3>

          <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
            {post.excerpt}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 rounded-md bg-gray-100 dark:bg-gray-800 text-xs font-medium"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Read More */}
          <motion.div
            whileHover={{ x: 5 }}
            className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-medium group-hover:underline"
          >
            Read more
            <ArrowRight className="w-4 h-4" />
          </motion.div>
        </div>
      </Link>
    </motion.article>
  );
}

function BlogPostCard({ post, index }: { post: BlogPost; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7 + index * 0.1, duration: 0.6 }}
      className="group glass rounded-2xl overflow-hidden hover:shadow-2xl transition-all"
    >
      <Link href={`/blog/${post.id}`}>
        {/* Image */}
        <div className="relative h-48 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700">
          <div className="relative w-full h-full">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-contain p-8"
            />
          </div>

          {/* Category Badge */}
          <div className={`absolute top-4 right-4 px-3 py-1 rounded-full bg-gradient-to-r ${post.color} text-white text-xs font-semibold`}>
            {post.category}
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-3">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>{new Date(post.date).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{post.readTime}</span>
            </div>
          </div>

          <h3 className="text-xl font-bold mb-3 group-hover:gradient-text transition-all line-clamp-2">
            {post.title}
          </h3>

          <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">
            {post.excerpt}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 rounded-md bg-gray-100 dark:bg-gray-800 text-xs font-medium"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Read More */}
          <motion.div
            whileHover={{ x: 5 }}
            className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-medium text-sm group-hover:underline"
          >
            Read more
            <ArrowRight className="w-4 h-4" />
          </motion.div>
        </div>
      </Link>
    </motion.article>
  );
}
