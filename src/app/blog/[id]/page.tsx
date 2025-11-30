"use client";

import { motion } from "framer-motion";
import { Calendar, Clock, Tag, ArrowLeft, Share2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { marked } from "marked";
import { BlogPost } from "@/types";
import { useLanguage } from "@/hooks/useLanguage";
import { getBlogPost } from "@/lib/get-localized-data";
import { usePageView } from "@/hooks/usePageView";

export default function BlogPostPage() {
  const { language, t } = useLanguage();
  const params = useParams();
  const postId = parseInt(params.id as string);
  usePageView(`blog-${postId}`);
  const [blogPost, setBlogPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    async function fetchBlogPost() {
      setLoading(true);
      setNotFound(false);
      try {
        const data = await getBlogPost(language, postId);
        if (data) {
          setBlogPost(data);
        } else {
          setNotFound(true);
        }
      } catch (error) {
        console.error("Error fetching blog post:", error);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    }
    fetchBlogPost();
  }, [language, postId]);

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
  if (notFound || !blogPost) {
    return (
      <div className="min-h-screen pt-32 pb-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Blog Post Not Found</h1>
          <Link href="/blog" className="text-blue-600 hover:underline">
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <Link href="/blog">
            <motion.button
              whileHover={{ x: -5 }}
              className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Blog
            </motion.button>
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className={`inline-block px-4 py-2 rounded-full bg-gradient-to-r ${blogPost.color} text-white text-sm font-semibold mb-4`}>
            {blogPost.category}
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            {blogPost.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-gray-600 dark:text-gray-400 mb-6">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              <span>{new Date(blogPost.date).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              <span>{blogPost.readTime}</span>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {blogPost.tags.map((tag) => (
              <span
                key={tag}
                className="flex items-center gap-1 px-3 py-1 rounded-lg bg-gray-100 dark:bg-gray-800 text-sm font-medium"
              >
                <Tag className="w-3 h-3" />
                {tag}
              </span>
            ))}
          </div>

          {/* Share Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-4 py-2 rounded-lg glass hover:shadow-lg transition-all"
          >
            <Share2 className="w-4 h-4" />
            Share
          </motion.button>
        </motion.div>

        {/* Featured Image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="relative h-96 rounded-2xl overflow-hidden mb-12 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700"
        >
          <Image
            src={blogPost.image}
            alt={blogPost.title}
            fill
            className="object-contain p-12"
          />
        </motion.div>

        {/* Content */}
        {blogPost.content && blogPost.content.trim() !== '' && (
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="prose prose-lg dark:prose-invert max-w-none glass p-8 rounded-2xl"
            dangerouslySetInnerHTML={{ __html: marked.parse(blogPost.content) as string }}
          />
        )}

        {/* Author Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-12 glass p-8 rounded-2xl flex items-center gap-6"
        >
          <div className="relative w-24 h-24 rounded-full overflow-hidden flex-shrink-0">
            <Image
              src="/profile.jpg"
              alt="Mark Rahimi"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h3 className="text-xl font-bold mb-2">Mark Rahimi</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Backend & Full-Stack Developer with 4+ years of experience in Python, FastAPI, Django, and Next.js.
              Passionate about building scalable solutions and sharing knowledge.
            </p>
            <Link href="/contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold text-sm"
              >
                Get in Touch
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
    </>
  );
}
