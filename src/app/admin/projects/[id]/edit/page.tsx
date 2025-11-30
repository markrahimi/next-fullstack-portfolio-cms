"use client";

import { useSession } from "next-auth/react";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Save, Plus, X, Globe } from "lucide-react";
import { toast } from "sonner";
import { PageLoading } from "@/components/page-loading";
import { ProjectFormData } from "@/types";

const colorOptions = [
  { value: "from-blue-600 to-cyan-600", label: "Blue → Cyan" },
  { value: "from-purple-600 to-pink-600", label: "Purple → Pink" },
  { value: "from-orange-600 to-red-600", label: "Orange → Red" },
  { value: "from-green-600 to-emerald-600", label: "Green → Emerald" },
];

export default function EditProject() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const params = useParams();
  const projectId = params.id as string;

  const [formData, setFormData] = useState<ProjectFormData | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeLang, setActiveLang] = useState<"en" | "fr">("en");
  const [currentTag, setCurrentTag] = useState("");
  const [currentFeature, setCurrentFeature] = useState({ en: "", fr: "" });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/admin/login");
    }
  }, [status, router]);

  useEffect(() => {
    if (session && projectId) {
      fetchProject();
    }
  }, [session, projectId]);

  const fetchProject = async () => {
    try {
      const response = await fetch(`/api/admin/projects/${projectId}`);
      if (response.ok) {
        const data = await response.json();
        setFormData(data);
      } else {
        toast.error("Failed to load project");
        router.push("/admin/projects");
      }
    } catch (error) {
      console.error("Error fetching project:", error);
      toast.error("An error occurred");
      router.push("/admin/projects");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData) return;

    setSaving(true);

    try {
      const response = await fetch(`/api/projects/${projectId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success("Project updated successfully!");
        router.push("/admin/projects");
      } else {
        const error = await response.json();
        toast.error(`Failed: ${error.error || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred");
    } finally {
      setSaving(false);
    }
  };

  const addTag = () => {
    if (!formData) return;
    if (currentTag && !formData.tags.includes(currentTag)) {
      setFormData({ ...formData, tags: [...formData.tags, currentTag] });
      setCurrentTag("");
    }
  };

  const removeTag = (tag: string) => {
    if (!formData) return;
    setFormData({ ...formData, tags: formData.tags.filter((t) => t !== tag) });
  };

  const addFeature = () => {
    if (!formData) return;
    if (currentFeature.en.trim() && currentFeature.fr.trim()) {
      setFormData({
        ...formData,
        features: {
          en: [...formData.features.en, currentFeature.en],
          fr: [...formData.features.fr, currentFeature.fr],
        },
      });
      setCurrentFeature({ en: "", fr: "" });
    } else {
      toast.error("Please fill in feature for both languages");
    }
  };

  const removeFeature = (index: number) => {
    if (!formData) return;
    setFormData({
      ...formData,
      features: {
        en: formData.features.en.filter((_, i) => i !== index),
        fr: formData.features.fr.filter((_, i) => i !== index),
      },
    });
  };

  if (status === "loading" || loading) {
    return <PageLoading isLoading={true} />;
  }

  if (!session || !formData) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <button
          onClick={() => router.push("/admin/projects")}
          className="flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Projects
        </button>

        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Edit Project</h1>
          <p className="text-gray-400">Update project details below</p>
        </div>

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
                Title ({activeLang.toUpperCase()}) *
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
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
                required
              />
            </div>

            {/* Subtitle */}
            <div className="mb-4">
              <label className="block text-gray-300 text-sm font-medium mb-2">
                Subtitle ({activeLang.toUpperCase()})
              </label>
              <input
                type="text"
                value={formData.subtitle[activeLang]}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    subtitle: { ...formData.subtitle, [activeLang]: e.target.value },
                  })
                }
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
              />
            </div>

            {/* Description */}
            <div className="mb-4">
              <label className="block text-gray-300 text-sm font-medium mb-2">
                Description ({activeLang.toUpperCase()}) *
              </label>
              <textarea
                value={formData.description[activeLang]}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    description: { ...formData.description, [activeLang]: e.target.value },
                  })
                }
                rows={3}
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 resize-none"
                required
              />
            </div>

            {/* Long Description */}
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">
                Long Description ({activeLang.toUpperCase()})
              </label>
              <textarea
                value={formData.longDescription[activeLang]}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    longDescription: { ...formData.longDescription, [activeLang]: e.target.value },
                  })
                }
                rows={5}
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 resize-none"
              />
            </div>
          </div>

          {/* Project Details */}
          <div className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Project Details</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">Project ID *</label>
                <input
                  type="text"
                  value={formData.id}
                  onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">Category *</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-purple-500"
                >
                  <option value="Backend" className="bg-gray-900">Backend</option>
                  <option value="Frontend" className="bg-gray-900">Frontend</option>
                  <option value="Full-Stack" className="bg-gray-900">Full-Stack</option>
                  <option value="AI/ML" className="bg-gray-900">AI/ML</option>
                  <option value="DevOps" className="bg-gray-900">DevOps</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">Image URL *</label>
                <input
                  type="text"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">GitHub URL</label>
                <input
                  type="url"
                  value={formData.github}
                  onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">Demo URL</label>
                <input
                  type="url"
                  value={formData.demo}
                  onChange={(e) => setFormData({ ...formData, demo: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">Date</label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">Color Theme</label>
                <select
                  value={formData.color}
                  onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-purple-500"
                >
                  {colorOptions.map((option) => (
                    <option key={option.value} value={option.value} className="bg-gray-900">
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Tags */}
          <div className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Technologies</h3>

            <div className="flex gap-2 mb-4">
              <input
                type="text"
                value={currentTag}
                onChange={(e) => setCurrentTag(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                className="flex-1 px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
                placeholder="Add technology (e.g., React, Node.js)"
              />
              <button
                type="button"
                onClick={addTag}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            <div className="flex flex-wrap gap-2">
              {formData.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300"
                >
                  {tag}
                  <button type="button" onClick={() => removeTag(tag)}>
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Features */}
          <div className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Key Features</h3>

            <div className="space-y-3 mb-4">
              <input
                type="text"
                value={currentFeature.en}
                onChange={(e) => setCurrentFeature({ ...currentFeature, en: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
                placeholder="Feature in English"
              />
              <input
                type="text"
                value={currentFeature.fr}
                onChange={(e) => setCurrentFeature({ ...currentFeature, fr: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
                placeholder="Feature in French"
              />
              <button
                type="button"
                onClick={addFeature}
                className="w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add Feature
              </button>
            </div>

            <div className="space-y-2">
              {formData.features.en.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-start justify-between p-3 rounded-lg bg-white/5 border border-white/10"
                >
                  <div className="flex-1">
                    <p className="text-white text-sm mb-1">🇬🇧 {feature}</p>
                    <p className="text-gray-400 text-sm">🇫🇷 {formData.features.fr[index]}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeFeature(index)}
                    className="text-red-400 hover:text-red-300 transition-colors ml-3"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Publishing */}
          <div className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-6">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.published}
                onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                className="w-5 h-5 rounded bg-white/5 border border-white/10 text-purple-600 focus:ring-2 focus:ring-purple-500"
              />
              <div>
                <div className="text-white font-medium">Published</div>
                <p className="text-sm text-gray-400">Make this project visible to the public</p>
              </div>
            </label>
          </div>

          {/* Actions */}
          <div className="flex gap-4 justify-end">
            <button
              type="button"
              onClick={() => router.push("/admin/projects")}
              className="px-6 py-3 rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 transition-all flex items-center gap-2 disabled:opacity-50"
            >
              {saving ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
