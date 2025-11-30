"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowLeft, Save, Plus, X } from "lucide-react";
import { toast } from "sonner";
import { PageLoading } from "@/components/page-loading";
import { AboutFormData } from "@/types";

export default function AboutManagement() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeLang, setActiveLang] = useState<"en" | "fr">("en");
  const [newWhatIDo, setNewWhatIDo] = useState({ en: "", fr: "" });

  const [formData, setFormData] = useState<AboutFormData>({
    title: { en: "", fr: "" },
    professionalSummary: { en: "", fr: "" },
    description: { en: "", fr: "" },
    description2: { en: "", fr: "" },
    description3: { en: "", fr: "" },
    whatIDo: { en: "", fr: "" },
    whatIDoList: { en: [], fr: [] },
    stats: {
      experience: { label: { en: "", fr: "" }, value: "" },
      projects: { label: { en: "", fr: "" }, value: "" },
      technologies: { label: { en: "", fr: "" }, value: "" },
      location: { label: { en: "", fr: "" }, value: { en: "", fr: "" } },
    },
  });

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/admin/login");
    }
  }, [status, router]);

  useEffect(() => {
    if (session) {
      fetchAbout();
    }
  }, [session]);

  const fetchAbout = async () => {
    try {
      const response = await fetch("/api/about");
      if (response.ok) {
        const data = await response.json();
        setFormData(data);
      }
    } catch (error) {
      console.error("Error fetching about:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddWhatIDo = () => {
    if (newWhatIDo.en.trim() && newWhatIDo.fr.trim()) {
      setFormData({
        ...formData,
        whatIDoList: {
          en: [...formData.whatIDoList.en, newWhatIDo.en],
          fr: [...formData.whatIDoList.fr, newWhatIDo.fr],
        },
      });
      setNewWhatIDo({ en: "", fr: "" });
      toast.success("Item added successfully!");
    } else {
      toast.error("Please fill in both languages");
    }
  };

  const handleRemoveWhatIDo = (index: number) => {
    setFormData({
      ...formData,
      whatIDoList: {
        en: formData.whatIDoList.en.filter((_, i) => i !== index),
        fr: formData.whatIDoList.fr.filter((_, i) => i !== index),
      },
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const response = await fetch("/api/about", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success("About content updated successfully!");
        setTimeout(() => router.push("/admin/dashboard"), 1000);
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

  if (status === "loading" || loading) {
    return <PageLoading isLoading={true} />;
  }

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900 py-8">
      <div className="max-w-5xl mx-auto px-4">
        <button
          onClick={() => router.push("/admin/dashboard")}
          className="flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </button>

        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">About Section Management</h1>
          <p className="text-gray-400">Manage your about page content in both languages</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Language Switcher */}
          <div className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-6">
            <div className="flex gap-2 mb-4">
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

            {/* Section Title */}
            <div className="mb-4">
              <label className="block text-gray-300 text-sm font-medium mb-2">
                Section Title ({activeLang.toUpperCase()})
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
              />
            </div>

            {/* Professional Summary Title */}
            <div className="mb-4">
              <label className="block text-gray-300 text-sm font-medium mb-2">
                Professional Summary Title ({activeLang.toUpperCase()})
              </label>
              <input
                type="text"
                value={formData.professionalSummary[activeLang]}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    professionalSummary: { ...formData.professionalSummary, [activeLang]: e.target.value },
                  })
                }
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
              />
            </div>
          </div>

          {/* Description Paragraphs */}
          <div className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Description Paragraphs</h3>

            <div className="space-y-4">
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Paragraph 1 ({activeLang.toUpperCase()})
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
                />
              </div>

              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Paragraph 2 ({activeLang.toUpperCase()})
                </label>
                <textarea
                  value={formData.description2[activeLang]}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      description2: { ...formData.description2, [activeLang]: e.target.value },
                    })
                  }
                  rows={3}
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 resize-none"
                />
              </div>

              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Paragraph 3 ({activeLang.toUpperCase()})
                </label>
                <textarea
                  value={formData.description3[activeLang]}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      description3: { ...formData.description3, [activeLang]: e.target.value },
                    })
                  }
                  rows={3}
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 resize-none"
                />
              </div>
            </div>
          </div>

          {/* What I Do Section */}
          <div className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-6">
            <h3 className="text-xl font-semibold text-white mb-4">What I Do Section</h3>

            <div className="mb-4">
              <label className="block text-gray-300 text-sm font-medium mb-2">
                Section Title ({activeLang.toUpperCase()})
              </label>
              <input
                type="text"
                value={formData.whatIDo[activeLang]}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    whatIDo: { ...formData.whatIDo, [activeLang]: e.target.value },
                  })
                }
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
              />
            </div>

            <div className="space-y-3 mb-4">
              <input
                type="text"
                value={newWhatIDo.en}
                onChange={(e) => setNewWhatIDo({ ...newWhatIDo, en: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
                placeholder="Item in English"
              />
              <input
                type="text"
                value={newWhatIDo.fr}
                onChange={(e) => setNewWhatIDo({ ...newWhatIDo, fr: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
                placeholder="Item in French"
              />
              <button
                type="button"
                onClick={handleAddWhatIDo}
                className="w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add Item
              </button>
            </div>

            <div className="space-y-2">
              {formData.whatIDoList.en.map((item, index) => (
                <div
                  key={index}
                  className="flex items-start justify-between p-3 rounded-lg bg-white/5 border border-white/10"
                >
                  <div className="flex-1">
                    <p className="text-white text-sm mb-1">🇬🇧 {item}</p>
                    <p className="text-gray-400 text-sm">🇫🇷 {formData.whatIDoList.fr[index]}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveWhatIDo(index)}
                    className="text-red-400 hover:text-red-300 transition-colors ml-3"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Statistics</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Experience */}
              <div className="space-y-3">
                <h4 className="text-white font-medium">Experience</h4>
                <input
                  type="text"
                  value={formData.stats.experience.label[activeLang]}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      stats: {
                        ...formData.stats,
                        experience: {
                          ...formData.stats.experience,
                          label: { ...formData.stats.experience.label, [activeLang]: e.target.value },
                        },
                      },
                    })
                  }
                  placeholder={`Label (${activeLang.toUpperCase()})`}
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
                />
                <input
                  type="text"
                  value={formData.stats.experience.value}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      stats: {
                        ...formData.stats,
                        experience: { ...formData.stats.experience, value: e.target.value },
                      },
                    })
                  }
                  placeholder="Value (e.g., 4+)"
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
                />
              </div>

              {/* Projects */}
              <div className="space-y-3">
                <h4 className="text-white font-medium">Projects</h4>
                <input
                  type="text"
                  value={formData.stats.projects.label[activeLang]}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      stats: {
                        ...formData.stats,
                        projects: {
                          ...formData.stats.projects,
                          label: { ...formData.stats.projects.label, [activeLang]: e.target.value },
                        },
                      },
                    })
                  }
                  placeholder={`Label (${activeLang.toUpperCase()})`}
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
                />
                <input
                  type="text"
                  value={formData.stats.projects.value}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      stats: {
                        ...formData.stats,
                        projects: { ...formData.stats.projects, value: e.target.value },
                      },
                    })
                  }
                  placeholder="Value (e.g., 20+)"
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
                />
              </div>

              {/* Technologies */}
              <div className="space-y-3">
                <h4 className="text-white font-medium">Technologies</h4>
                <input
                  type="text"
                  value={formData.stats.technologies.label[activeLang]}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      stats: {
                        ...formData.stats,
                        technologies: {
                          ...formData.stats.technologies,
                          label: { ...formData.stats.technologies.label, [activeLang]: e.target.value },
                        },
                      },
                    })
                  }
                  placeholder={`Label (${activeLang.toUpperCase()})`}
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
                />
                <input
                  type="text"
                  value={formData.stats.technologies.value}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      stats: {
                        ...formData.stats,
                        technologies: { ...formData.stats.technologies, value: e.target.value },
                      },
                    })
                  }
                  placeholder="Value (e.g., 15+)"
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
                />
              </div>

              {/* Location */}
              <div className="space-y-3">
                <h4 className="text-white font-medium">Location</h4>
                <input
                  type="text"
                  value={formData.stats.location.label[activeLang]}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      stats: {
                        ...formData.stats,
                        location: {
                          ...formData.stats.location,
                          label: { ...formData.stats.location.label, [activeLang]: e.target.value },
                        },
                      },
                    })
                  }
                  placeholder={`Label (${activeLang.toUpperCase()})`}
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
                />
                <input
                  type="text"
                  value={formData.stats.location.value[activeLang]}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      stats: {
                        ...formData.stats,
                        location: {
                          ...formData.stats.location,
                          value: { ...formData.stats.location.value, [activeLang]: e.target.value },
                        },
                      },
                    })
                  }
                  placeholder={`Value (${activeLang.toUpperCase()})`}
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
                />
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4 justify-end">
            <button
              type="button"
              onClick={() => router.push("/admin/dashboard")}
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
