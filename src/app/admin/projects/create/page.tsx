"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Save, Plus, X, Globe } from "lucide-react";
import { toast } from "sonner";
import { PageLoading } from "@/components/page-loading";
import { ProjectFormData } from "@/types";

const initialFormData: ProjectFormData = {
  id: "",
  title: { en: "", fr: "" },
  subtitle: { en: "", fr: "" },
  description: { en: "", fr: "" },
  longDescription: { en: "", fr: "" },
  image: "/logo.png",
  tags: [],
  github: "",
  demo: "",
  date: new Date().toISOString().split('T')[0],
  category: "Backend",
  color: "from-blue-600 to-cyan-600",
  features: { en: [], fr: [] },
  featured: false,
  published: true,
  order: 0,
};

export default function CreateProject() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [formData, setFormData] = useState<ProjectFormData>(initialFormData);
  const [activeLang, setActiveLang] = useState<"en" | "fr">("en");
  const [currentTag, setCurrentTag] = useState("");
  const [currentFeature, setCurrentFeature] = useState({ en: "", fr: "" });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/admin/login");
    }
  }, [status, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    // Add default values for required fields
    const submitData = {
      ...formData,
      challenges: [],
      techStack: { en: {}, fr: {} },
      metrics: [],
    };

    try {
      const response = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submitData),
      });

      if (response.ok) {
        toast.success("Project created successfully!");
        router.push("/admin/projects");
      } else {
        const error = await response.json();
        toast.error(`Failed: ${error.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred");
    } finally {
      setSaving(false);
    }
  };

  const addTag = () => {
    if (currentTag && !formData.tags.includes(currentTag)) {
      setFormData({ ...formData, tags: [...formData.tags, currentTag] });
      setCurrentTag("");
    }
  };

  const removeTag = (tag: string) => {
    setFormData({ ...formData, tags: formData.tags.filter(t => t !== tag) });
  };

  const addFeature = () => {
    if (currentFeature.en && currentFeature.fr) {
      setFormData({
        ...formData,
        features: {
          en: [...formData.features.en, currentFeature.en],
          fr: [...formData.features.fr, currentFeature.fr],
        },
      });
      setCurrentFeature({ en: "", fr: "" });
    } else {
      toast.error("Please fill both English and French features");
    }
  };

  const removeFeature = (index: number) => {
    setFormData({
      ...formData,
      features: {
        en: formData.features.en.filter((_, i) => i !== index),
        fr: formData.features.fr.filter((_, i) => i !== index),
      },
    });
  };

  if (status === "loading") {
    return <PageLoading isLoading={true} />;
  }

  if (!session) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900">
      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => router.push("/admin/projects")}
            className="flex items-center gap-2 text-gray-400 hover:text-white mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Projects
          </button>
          <h1 className="text-4xl font-bold text-white">Create New Project</h1>
          <p className="text-gray-400 mt-2">Fill in the details for your new project</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Language Tabs */}
          <div className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-6">
            <div className="flex gap-2 mb-6">
              <button
                type="button"
                onClick={() => setActiveLang("en")}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
                  activeLang === "en"
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                    : "bg-white/5 text-gray-400 hover:text-white"
                }`}
              >
                <Globe className="w-4 h-4" />
                English
              </button>
              <button
                type="button"
                onClick={() => setActiveLang("fr")}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
                  activeLang === "fr"
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                    : "bg-white/5 text-gray-400 hover:text-white"
                }`}
              >
                <Globe className="w-4 h-4" />
                French
              </button>
            </div>

            <div className="space-y-4">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Project Title * ({activeLang.toUpperCase()})
                </label>
                <input
                  type="text"
                  required
                  value={formData.title[activeLang]}
                  onChange={(e) => setFormData({
                    ...formData,
                    title: { ...formData.title, [activeLang]: e.target.value }
                  })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder={`Enter project title in ${activeLang === 'en' ? 'English' : 'French'}`}
                />
              </div>

              {/* Subtitle */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Subtitle * ({activeLang.toUpperCase()})
                </label>
                <input
                  type="text"
                  required
                  value={formData.subtitle[activeLang]}
                  onChange={(e) => setFormData({
                    ...formData,
                    subtitle: { ...formData.subtitle, [activeLang]: e.target.value }
                  })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Brief tagline"
                />
              </div>

              {/* Short Description */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Short Description * ({activeLang.toUpperCase()})
                </label>
                <textarea
                  required
                  rows={3}
                  value={formData.description[activeLang]}
                  onChange={(e) => setFormData({
                    ...formData,
                    description: { ...formData.description, [activeLang]: e.target.value }
                  })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                  placeholder="Short description for project card (150-200 characters)"
                />
              </div>

              {/* Long Description */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Full Description * ({activeLang.toUpperCase()})
                </label>
                <textarea
                  required
                  rows={6}
                  value={formData.longDescription[activeLang]}
                  onChange={(e) => setFormData({
                    ...formData,
                    longDescription: { ...formData.longDescription, [activeLang]: e.target.value }
                  })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                  placeholder="Detailed project description"
                />
              </div>
            </div>
          </div>

          {/* General Info */}
          <div className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-6">
            <h2 className="text-2xl font-bold text-white mb-6">General Information</h2>

            <div className="space-y-4">
              {/* Project ID */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Project ID (URL slug) *
                </label>
                <input
                  type="text"
                  required
                  value={formData.id}
                  onChange={(e) => setFormData({ ...formData, id: e.target.value.toLowerCase().replace(/\s+/g, '-') })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="e.g., crm-platform"
                />
                <p className="text-xs text-gray-500 mt-1">Used in URL: /projects/{formData.id || 'your-project-id'}</p>
              </div>

              {/* Category, Date */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Category *
                  </label>
                  <select
                    required
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="Backend">Backend</option>
                    <option value="Frontend">Frontend</option>
                    <option value="Full-Stack">Full-Stack</option>
                    <option value="AI/ML">AI/ML</option>
                    <option value="DevOps">DevOps</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Project Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>

              {/* Color Theme */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Color Theme
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { value: "from-blue-600 to-cyan-600", label: "Blue", colors: "bg-gradient-to-r from-blue-600 to-cyan-600" },
                    { value: "from-purple-600 to-pink-600", label: "Purple", colors: "bg-gradient-to-r from-purple-600 to-pink-600" },
                    { value: "from-green-600 to-teal-600", label: "Green", colors: "bg-gradient-to-r from-green-600 to-teal-600" },
                    { value: "from-orange-600 to-red-600", label: "Orange", colors: "bg-gradient-to-r from-orange-600 to-red-600" },
                  ].map((color) => (
                    <button
                      key={color.value}
                      type="button"
                      onClick={() => setFormData({ ...formData, color: color.value })}
                      className={`p-3 rounded-lg border-2 transition-all ${
                        formData.color === color.value
                          ? "border-white"
                          : "border-white/10 hover:border-white/30"
                      }`}
                    >
                      <div className={`h-8 rounded ${color.colors}`} />
                      <p className="text-xs text-gray-400 mt-1">{color.label}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Links */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    GitHub URL
                  </label>
                  <input
                    type="url"
                    value={formData.github}
                    onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="https://github.com/..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Live Demo URL
                  </label>
                  <input
                    type="url"
                    value={formData.demo}
                    onChange={(e) => setFormData({ ...formData, demo: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="https://demo.example.com"
                  />
                </div>
              </div>

              {/* Image URL */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Project Image URL *
                </label>
                <input
                  type="text"
                  required
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="/project-image.png or https://..."
                />
                {formData.image && (
                  <div className="mt-3 p-2 bg-white/5 rounded-lg">
                    <img src={formData.image} alt="Preview" className="w-32 h-32 object-contain mx-auto" />
                  </div>
                )}
              </div>

              {/* Tags */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Technology Tags
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={currentTag}
                    onChange={(e) => setCurrentTag(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                    className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="e.g., React, Node.js, PostgreSQL"
                  />
                  <button
                    type="button"
                    onClick={addTag}
                    className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-2 px-3 py-1 bg-purple-500/20 border border-purple-500/50 rounded-full text-sm text-purple-300"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="text-red-400 hover:text-red-300"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Features */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Key Features (Bilingual)
                </label>
                <div className="space-y-2 mb-2">
                  <input
                    type="text"
                    value={currentFeature.en}
                    onChange={(e) => setCurrentFeature({ ...currentFeature, en: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Feature in English"
                  />
                  <input
                    type="text"
                    value={currentFeature.fr}
                    onChange={(e) => setCurrentFeature({ ...currentFeature, fr: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Feature in French"
                  />
                </div>
                <button
                  type="button"
                  onClick={addFeature}
                  className="w-full px-4 py-3 bg-purple-600/20 border border-purple-500/50 text-purple-300 rounded-lg hover:bg-purple-600/30 transition-colors"
                >
                  Add Feature
                </button>
                <div className="mt-4 space-y-2">
                  {formData.features.en.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3 bg-white/5 p-4 rounded-lg">
                      <div className="flex-1 space-y-1">
                        <div className="text-sm font-medium">🇬🇧 {feature}</div>
                        <div className="text-sm text-gray-400">🇫🇷 {formData.features.fr[index]}</div>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFeature(index)}
                        className="text-red-400 hover:text-red-300 mt-1"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Published */}
              <div className="flex items-center gap-3 p-4 bg-white/5 rounded-lg">
                <input
                  type="checkbox"
                  id="published"
                  checked={formData.published}
                  onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                  className="w-5 h-5 rounded border-white/10 bg-white/5 text-purple-600 focus:ring-purple-500"
                />
                <div>
                  <label htmlFor="published" className="text-sm font-medium text-white cursor-pointer">
                    Publish immediately
                  </label>
                  <p className="text-xs text-gray-400">Make this project visible to the public</p>
                </div>
              </div>
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => router.push("/admin/projects")}
              className="flex-1 px-6 py-4 bg-white/5 border border-white/10 text-white rounded-lg hover:bg-white/10 transition-all font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex-1 px-6 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 font-medium"
            >
              <Save className="w-5 h-5" />
              {saving ? "Creating Project..." : "Create Project"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
