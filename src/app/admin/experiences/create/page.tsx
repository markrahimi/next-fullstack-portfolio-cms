"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowLeft, Save, Plus, X } from "lucide-react";
import { toast } from "sonner";
import { PageLoading } from "@/components/page-loading";
import { ExperienceFormData } from "@/types";

const colorOptions = [
  { value: "from-blue-600 to-cyan-600", label: "Blue → Cyan" },
  { value: "from-purple-600 to-pink-600", label: "Purple → Pink" },
  { value: "from-orange-600 to-red-600", label: "Orange → Red" },
  { value: "from-green-600 to-emerald-600", label: "Green → Emerald" },
];

export default function CreateExperience() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [activeLang, setActiveLang] = useState<"en" | "fr">("en");
  const [saving, setSaving] = useState(false);
  const [newAchievement, setNewAchievement] = useState({ en: "", fr: "" });

  const [formData, setFormData] = useState<ExperienceFormData>({
    company: { en: "", fr: "" },
    role: { en: "", fr: "" },
    position: { en: "", fr: "" },
    type: { en: "Full-time", fr: "Temps plein" },
    duration: { en: "", fr: "" },
    location: { en: "", fr: "" },
    description: { en: "", fr: "" },
    achievements: { en: [], fr: [] },
    startDate: "",
    endDate: "",
    current: false,
    color: "from-blue-600 to-cyan-600",
    order: 0,
    published: true,
  });

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/admin/login");
    }
  }, [status, router]);

  const handleAddAchievement = () => {
    if (newAchievement.en.trim() && newAchievement.fr.trim()) {
      setFormData({
        ...formData,
        achievements: {
          en: [...formData.achievements.en, newAchievement.en],
          fr: [...formData.achievements.fr, newAchievement.fr],
        },
      });
      setNewAchievement({ en: "", fr: "" });
    } else {
      toast.error("Please fill in achievement for both languages");
    }
  };

  const handleRemoveAchievement = (index: number) => {
    setFormData({
      ...formData,
      achievements: {
        en: formData.achievements.en.filter((_, i) => i !== index),
        fr: formData.achievements.fr.filter((_, i) => i !== index),
      },
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const response = await fetch("/api/experiences", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success("Experience created successfully!");
        router.push("/admin/experiences");
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

  if (status === "loading") {
    return <PageLoading isLoading={true} />;
  }

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900 py-8">
      <div className="max-w-5xl mx-auto px-4">
        <button
          onClick={() => router.push("/admin/experiences")}
          className="flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Experiences
        </button>

        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Create New Experience</h1>
          <p className="text-gray-400">Add a new work experience entry</p>
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Company ({activeLang.toUpperCase()}) *
                </label>
                <input
                  type="text"
                  value={formData.company[activeLang]}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      company: { ...formData.company, [activeLang]: e.target.value },
                    })
                  }
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Role ({activeLang.toUpperCase()}) *
                </label>
                <input
                  type="text"
                  value={formData.role[activeLang]}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      role: { ...formData.role, [activeLang]: e.target.value },
                    })
                  }
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Type ({activeLang.toUpperCase()})
                </label>
                <input
                  type="text"
                  value={formData.type[activeLang]}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      type: { ...formData.type, [activeLang]: e.target.value },
                    })
                  }
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
                  placeholder="Full-time / Remote"
                />
              </div>

              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Duration ({activeLang.toUpperCase()})
                </label>
                <input
                  type="text"
                  value={formData.duration[activeLang]}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      duration: { ...formData.duration, [activeLang]: e.target.value },
                    })
                  }
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
                  placeholder="2020 - Present"
                />
              </div>

              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Location ({activeLang.toUpperCase()})
                </label>
                <input
                  type="text"
                  value={formData.location[activeLang]}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      location: { ...formData.location, [activeLang]: e.target.value },
                    })
                  }
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
                  placeholder="City, Country"
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">
                Description ({activeLang.toUpperCase()})
              </label>
              <textarea
                value={formData.description[activeLang]}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    description: { ...formData.description, [activeLang]: e.target.value },
                  })
                }
                rows={4}
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 resize-none"
              />
            </div>
          </div>

          {/* Achievements */}
          <div className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Key Achievements</h3>

            <div className="space-y-3 mb-4">
              <input
                type="text"
                value={newAchievement.en}
                onChange={(e) => setNewAchievement({ ...newAchievement, en: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
                placeholder="Achievement in English"
              />
              <input
                type="text"
                value={newAchievement.fr}
                onChange={(e) => setNewAchievement({ ...newAchievement, fr: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
                placeholder="Achievement in French"
              />
              <button
                type="button"
                onClick={handleAddAchievement}
                className="w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add Achievement
              </button>
            </div>

            <div className="space-y-2">
              {formData.achievements.en.map((achievement, index) => (
                <div
                  key={index}
                  className="flex items-start justify-between p-3 rounded-lg bg-white/5 border border-white/10"
                >
                  <div className="flex-1">
                    <p className="text-white text-sm mb-1">🇬🇧 {achievement}</p>
                    <p className="text-gray-400 text-sm">🇫🇷 {formData.achievements.fr[index]}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveAchievement(index)}
                    className="text-red-400 hover:text-red-300 transition-colors ml-3"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Settings */}
          <div className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Settings</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
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

              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">Display Order</label>
                <input
                  type="number"
                  value={formData.order}
                  onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-purple-500"
                />
              </div>
            </div>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.published}
                onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                className="w-5 h-5 rounded bg-white/5 border border-white/10 text-purple-600 focus:ring-2 focus:ring-purple-500"
              />
              <div>
                <div className="text-white font-medium">Published</div>
                <p className="text-sm text-gray-400">Make this experience visible to the public</p>
              </div>
            </label>
          </div>

          {/* Actions */}
          <div className="flex gap-4 justify-end">
            <button
              type="button"
              onClick={() => router.push("/admin/experiences")}
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
                  Creating...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Create Experience
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
