"use client";

import { useSession } from "next-auth/react";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowLeft, Save, Plus, X } from "lucide-react";
import { toast } from "sonner";
import { PageLoading } from "@/components/page-loading";
import { EducationFormData } from "@/types";

const colorOptions = [
  { value: "from-blue-600 to-cyan-600", label: "Blue → Cyan" },
  { value: "from-purple-600 to-pink-600", label: "Purple → Pink" },
  { value: "from-orange-600 to-red-600", label: "Orange → Red" },
  { value: "from-green-600 to-emerald-600", label: "Green → Emerald" },
];

export default function EditEducation() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const params = useParams();
  const educationId = params.id as string;

  const [formData, setFormData] = useState<EducationFormData | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeLang, setActiveLang] = useState<"en" | "fr">("en");
  const [newCourse, setNewCourse] = useState({ en: "", fr: "" });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/admin/login");
    }
  }, [status, router]);

  useEffect(() => {
    if (session && educationId) {
      fetchEducation();
    }
  }, [session, educationId]);

  const fetchEducation = async () => {
    try {
      const response = await fetch(`/api/education/${educationId}`);
      if (response.ok) {
        const data = await response.json();
        setFormData(data);
      } else {
        toast.error("Failed to load education");
        router.push("/admin/education");
      }
    } catch (error) {
      console.error("Error fetching education:", error);
      toast.error("An error occurred");
      router.push("/admin/education");
    } finally {
      setLoading(false);
    }
  };

  const handleAddCourse = () => {
    if (!formData) return;
    if (newCourse.en.trim() && newCourse.fr.trim()) {
      setFormData({
        ...formData,
        courses: {
          en: [...formData.courses.en, newCourse.en],
          fr: [...formData.courses.fr, newCourse.fr],
        },
      });
      setNewCourse({ en: "", fr: "" });
    } else {
      toast.error("Please fill in course for both languages");
    }
  };

  const handleRemoveCourse = (index: number) => {
    if (!formData) return;
    setFormData({
      ...formData,
      courses: {
        en: formData.courses.en.filter((_, i) => i !== index),
        fr: formData.courses.fr.filter((_, i) => i !== index),
      },
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData) return;

    setSaving(true);

    try {
      const response = await fetch(`/api/education/${educationId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success("Education updated successfully!");
        router.push("/admin/education");
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

  if (!session || !formData) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900 py-8">
      <div className="max-w-5xl mx-auto px-4">
        <button
          onClick={() => router.push("/admin/education")}
          className="flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Education
        </button>

        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Edit Education</h1>
          <p className="text-gray-400">Update education entry</p>
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

            <div className="grid grid-cols-1 gap-4 mb-4">
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Degree ({activeLang.toUpperCase()}) *
                </label>
                <input
                  type="text"
                  value={formData.degree[activeLang]}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      degree: { ...formData.degree, [activeLang]: e.target.value },
                    })
                  }
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Institution ({activeLang.toUpperCase()}) *
                </label>
                <input
                  type="text"
                  value={formData.institution[activeLang]}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      institution: { ...formData.institution, [activeLang]: e.target.value },
                    })
                  }
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
                  required
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
                />
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Details</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">Status *</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as "Ongoing" | "Completed" })}
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-purple-500"
                >
                  <option value="Completed" className="bg-gray-900">Completed</option>
                  <option value="Ongoing" className="bg-gray-900">Ongoing</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">Year</label>
                <input
                  type="text"
                  value={formData.year}
                  onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
                />
              </div>
            </div>
          </div>

          {/* Courses */}
          <div className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Key Courses</h3>

            <div className="space-y-3 mb-4">
              <input
                type="text"
                value={newCourse.en}
                onChange={(e) => setNewCourse({ ...newCourse, en: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
                placeholder="Course in English"
              />
              <input
                type="text"
                value={newCourse.fr}
                onChange={(e) => setNewCourse({ ...newCourse, fr: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
                placeholder="Course in French"
              />
              <button
                type="button"
                onClick={handleAddCourse}
                className="w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add Course
              </button>
            </div>

            <div className="space-y-2">
              {formData.courses.en.map((course, index) => (
                <div
                  key={index}
                  className="flex items-start justify-between p-3 rounded-lg bg-white/5 border border-white/10"
                >
                  <div className="flex-1">
                    <p className="text-white text-sm mb-1">🇬🇧 {course}</p>
                    <p className="text-gray-400 text-sm">🇫🇷 {formData.courses.fr[index]}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveCourse(index)}
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
                <p className="text-sm text-gray-400">Make this education visible to the public</p>
              </div>
            </label>
          </div>

          {/* Actions */}
          <div className="flex gap-4 justify-end">
            <button
              type="button"
              onClick={() => router.push("/admin/education")}
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
