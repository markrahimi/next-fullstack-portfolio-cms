"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowLeft, Save, Plus, X } from "lucide-react";
import { PageLoading } from "@/components/page-loading";
import { SkillFormData } from "@/types";

const colorOptions = [
  { value: "from-blue-600 to-cyan-600", label: "Blue → Cyan" },
  { value: "from-purple-600 to-pink-600", label: "Purple → Pink" },
  { value: "from-orange-600 to-red-600", label: "Orange → Red" },
  { value: "from-green-600 to-emerald-600", label: "Green → Emerald" },
  { value: "from-pink-600 to-rose-600", label: "Pink → Rose" },
  { value: "from-yellow-600 to-orange-600", label: "Yellow → Orange" },
];

export default function CreateSkill() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [activeLang, setActiveLang] = useState<"en" | "fr">("en");
  const [saving, setSaving] = useState(false);
  const [newSkill, setNewSkill] = useState("");

  const [formData, setFormData] = useState<SkillFormData>({
    title: { en: "", fr: "" },
    skills: [],
    color: "from-blue-600 to-cyan-600",
    order: 0,
    published: true,
  });

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/admin/login");
    }
  }, [status, router]);

  const handleAddSkill = () => {
    if (newSkill.trim() && !formData.skills.includes(newSkill.trim())) {
      setFormData({
        ...formData,
        skills: [...formData.skills, newSkill.trim()],
      });
      setNewSkill("");
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter((s) => s !== skillToRemove),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title.en || !formData.title.fr) {
      alert("Please fill in titles for both languages");
      return;
    }

    if (formData.skills.length === 0) {
      alert("Please add at least one skill");
      return;
    }

    setSaving(true);

    try {
      const response = await fetch("/api/skills", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("✅ Skill category created successfully!");
        router.push("/admin/skills");
      } else {
        const error = await response.json();
        alert(`❌ Failed: ${error.error || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("❌ An error occurred");
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
      <div className="max-w-4xl mx-auto px-4">
        <button
          onClick={() => router.push("/admin/skills")}
          className="flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Skills
        </button>

        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Create New Skill Category</h1>
          <p className="text-gray-400">Add a new skill category with multiple skills</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Category Title (Bilingual) */}
          <div className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Category Title</h3>

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
              placeholder={`Category title in ${activeLang === "en" ? "English" : "French"} (e.g., Backend Development)`}
              required
            />
          </div>

          {/* Skills List */}
          <div className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Skills</h3>

            <div className="flex gap-2 mb-4">
              <input
                type="text"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), handleAddSkill())}
                className="flex-1 px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
                placeholder="Add a skill (e.g., Node.js, Python, React)"
              />
              <button
                type="button"
                onClick={handleAddSkill}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add
              </button>
            </div>

            {formData.skills.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {formData.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-purple-500/20 text-purple-300 text-sm"
                  >
                    {skill}
                    <button
                      type="button"
                      onClick={() => handleRemoveSkill(skill)}
                      className="hover:text-white transition-colors"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
            {formData.skills.length === 0 && (
              <p className="text-gray-500 text-sm">No skills added yet</p>
            )}
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
                <p className="text-sm text-gray-400">Make this skill category visible to the public</p>
              </div>
            </label>
          </div>

          {/* Actions */}
          <div className="flex gap-4 justify-end">
            <button
              type="button"
              onClick={() => router.push("/admin/skills")}
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
                  Create Skill Category
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
