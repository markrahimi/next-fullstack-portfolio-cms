"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Plus, X, Save } from "lucide-react";
import { toast } from "sonner";
import { PageLoading } from "@/components/page-loading";
import { ImageUpload } from "@/components/image-upload";
import { BlogFormData } from "@/types";

const colorThemes = [
  { name: "Blue to Purple", value: "from-blue-600 to-purple-600", preview: "linear-gradient(to right, rgb(37, 99, 235), rgb(147, 51, 234))" },
  { name: "Emerald to Teal", value: "from-emerald-600 to-teal-600", preview: "linear-gradient(to right, rgb(5, 150, 105), rgb(13, 148, 136))" },
  { name: "Orange to Red", value: "from-orange-600 to-red-600", preview: "linear-gradient(to right, rgb(234, 88, 12), rgb(220, 38, 38))" },
  { name: "Pink to Rose", value: "from-pink-600 to-rose-600", preview: "linear-gradient(to right, rgb(219, 39, 119), rgb(225, 29, 72))" },
];

const categories = ["Technology", "AI/ML", "Web Development", "DevOps", "Career", "Tutorial"];

export default function CreateBlog() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [activeLang, setActiveLang] = useState<"en" | "fr">("en");
  const [newTag, setNewTag] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState<BlogFormData>({
    id: Date.now(),
    title: { en: "", fr: "" },
    excerpt: { en: "", fr: "" },
    content: { en: "", fr: "" },
    image: "",
    date: new Date().toISOString().split("T")[0],
    readTime: "5 min read",
    category: "Technology",
    tags: [],
    color: "from-blue-600 to-purple-600",
    featured: false,
    published: false,
    order: 0,
  });

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/admin/login");
    }
  }, [status, router]);

  const handleAddTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData({
        ...formData,
        tags: [...formData.tags, newTag.trim()],
      });
      setNewTag("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter((tag) => tag !== tagToRemove),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.title.en || !formData.title.fr) {
      toast.error("Please fill in titles for both languages");
      return;
    }
    if (!formData.excerpt.en || !formData.excerpt.fr) {
      toast.error("Please fill in excerpts for both languages");
      return;
    }
    if (!formData.content.en || !formData.content.fr) {
      toast.error("Please fill in content for both languages");
      return;
    }
    if (!formData.image) {
      toast.error("Please provide an image URL");
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch("/api/blogs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success("Blog created successfully!");
        router.push("/admin/blogs");
      } else {
        const error = await response.json();
        toast.error(`Failed to create blog: ${error.error}`);
      }
    } catch (error) {
      console.error("Error creating blog:", error);
      toast.error("An error occurred while creating the blog");
    } finally {
      setSubmitting(false);
    }
  };

  if (status === "loading") {
    return <PageLoading isLoading={true} />;
  }

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900 py-8">
      <div className="max-w-5xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => router.push("/admin/blogs")}
            className="flex items-center gap-2 text-gray-400 hover:text-white mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blogs
          </button>
          <h1 className="text-4xl font-bold text-white mb-2">Create New Blog Post</h1>
          <p className="text-gray-400">Fill in the details below to create a new blog post</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Language Tabs */}
          <div className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-6">
            <div className="flex gap-2 mb-6">
              <button
                type="button"
                onClick={() => setActiveLang("en")}
                className={`px-6 py-2 rounded-lg font-medium transition-all ${
                  activeLang === "en"
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                    : "bg-white/5 text-gray-400 hover:text-white"
                }`}
              >
                English
              </button>
              <button
                type="button"
                onClick={() => setActiveLang("fr")}
                className={`px-6 py-2 rounded-lg font-medium transition-all ${
                  activeLang === "fr"
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                    : "bg-white/5 text-gray-400 hover:text-white"
                }`}
              >
                Français
              </button>
            </div>

            {/* Title */}
            <div className="mb-4">
              <label className="block text-gray-300 text-sm font-medium mb-2">
                Title ({activeLang.toUpperCase()}) <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                value={formData.title[activeLang]}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    title: { ...formData.title, [activeLang]: e.target.value },
                  })
                }
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                placeholder={`Enter blog title in ${activeLang === "en" ? "English" : "French"}`}
                required
              />
            </div>

            {/* Excerpt */}
            <div className="mb-4">
              <label className="block text-gray-300 text-sm font-medium mb-2">
                Excerpt ({activeLang.toUpperCase()}) <span className="text-red-400">*</span>
              </label>
              <textarea
                value={formData.excerpt[activeLang]}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    excerpt: { ...formData.excerpt, [activeLang]: e.target.value },
                  })
                }
                rows={3}
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors resize-none"
                placeholder={`Enter blog excerpt in ${activeLang === "en" ? "English" : "French"}`}
                required
              />
            </div>

            {/* Content */}
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">
                Content ({activeLang.toUpperCase()}) <span className="text-red-400">*</span>
              </label>
              <textarea
                value={formData.content[activeLang]}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    content: { ...formData.content, [activeLang]: e.target.value },
                  })
                }
                rows={12}
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors resize-none font-mono text-sm"
                placeholder={`Enter blog content in ${activeLang === "en" ? "English" : "French"} (Markdown supported)`}
                required
              />
              <p className="text-xs text-gray-500 mt-1">You can use Markdown formatting</p>
            </div>
          </div>

          {/* Media & Details */}
          <div className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Media & Details</h3>

            {/* Image Upload */}
            <div className="mb-4">
              <ImageUpload
                value={formData.image}
                onChange={(url) => setFormData({ ...formData, image: url })}
                label="Featured Image"
                placeholder="https://example.com/image.jpg"
              />
            </div>

            {/* Category & Read Time */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-purple-500 transition-colors"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat} className="bg-gray-900">
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">Read Time</label>
                <input
                  type="text"
                  value={formData.readTime}
                  onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                  placeholder="5 min read"
                />
              </div>
            </div>

            {/* Date */}
            <div className="mb-4">
              <label className="block text-gray-300 text-sm font-medium mb-2">Publication Date</label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-purple-500 transition-colors"
              />
            </div>

            {/* Color Theme */}
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-3">Color Theme</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {colorThemes.map((theme) => (
                  <button
                    key={theme.value}
                    type="button"
                    onClick={() => setFormData({ ...formData, color: theme.value })}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      formData.color === theme.value
                        ? "border-purple-500 bg-white/10"
                        : "border-white/10 bg-white/5 hover:border-white/30"
                    }`}
                  >
                    <div
                      className="w-full h-12 rounded-lg mb-2"
                      style={{ background: theme.preview }}
                    />
                    <p className="text-xs text-gray-300 text-center">{theme.name}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Tags */}
          <div className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Tags</h3>

            <div className="mb-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), handleAddTag())}
                  className="flex-1 px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                  placeholder="Add a tag (e.g., React, TypeScript)"
                />
                <button
                  type="button"
                  onClick={handleAddTag}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add
                </button>
              </div>
            </div>

            {formData.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {formData.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-sm"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag)}
                      className="hover:text-white transition-colors"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Publishing Options */}
          <div className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Publishing Options</h3>

            <div className="space-y-4">
              {/* Featured */}
              <label className="flex items-start gap-3 cursor-pointer group">
                <div className="relative flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    className="w-5 h-5 rounded bg-white/5 border border-white/10 text-purple-600 focus:ring-2 focus:ring-purple-500 focus:ring-offset-0"
                  />
                </div>
                <div>
                  <div className="text-white font-medium group-hover:text-purple-400 transition-colors">
                    Featured Post
                  </div>
                  <p className="text-sm text-gray-400">
                    Mark this post as featured to display it prominently
                  </p>
                </div>
              </label>

              {/* Published */}
              <label className="flex items-start gap-3 cursor-pointer group">
                <div className="relative flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.published}
                    onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                    className="w-5 h-5 rounded bg-white/5 border border-white/10 text-purple-600 focus:ring-2 focus:ring-purple-500 focus:ring-offset-0"
                  />
                </div>
                <div>
                  <div className="text-white font-medium group-hover:text-purple-400 transition-colors">
                    Publish Immediately
                  </div>
                  <p className="text-sm text-gray-400">
                    Make this post visible to the public right away
                  </p>
                </div>
              </label>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 justify-end">
            <button
              type="button"
              onClick={() => router.push("/admin/blogs")}
              className="px-6 py-3 rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-6 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Create Blog Post
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
