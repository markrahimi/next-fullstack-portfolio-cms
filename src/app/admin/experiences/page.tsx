"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Plus, Edit, Trash2, Briefcase } from "lucide-react";
import { PageLoading } from "@/components/page-loading";
import { ExperienceDB } from "@/types";

export default function AdminExperiences() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [experiences, setExperiences] = useState<ExperienceDB[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/admin/login");
    }
  }, [status, router]);

  useEffect(() => {
    if (session) {
      fetchExperiences();
    }
  }, [session]);

  const fetchExperiences = async () => {
    try {
      const response = await fetch("/api/admin/experiences");
      if (response.ok) {
        const data = await response.json();
        setExperiences(data);
      }
    } catch (error) {
      console.error("Error fetching experiences:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this experience?")) return;

    try {
      const response = await fetch(`/api/experiences/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        fetchExperiences();
      } else {
        alert("Failed to delete experience");
      }
    } catch (error) {
      console.error("Error deleting experience:", error);
      alert("An error occurred");
    }
  };

  if (status === "loading" || loading) {
    return <PageLoading isLoading={true} />;
  }

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <button
              onClick={() => router.push("/admin/dashboard")}
              className="flex items-center gap-2 text-gray-400 hover:text-white mb-4 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </button>
            <h1 className="text-4xl font-bold text-white mb-2">Work Experience</h1>
            <p className="text-gray-400">{experiences.length} total experiences</p>
          </div>
          <button
            onClick={() => router.push("/admin/experiences/create")}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all"
          >
            <Plus className="w-4 h-4" />
            New Experience
          </button>
        </div>

        {/* Experiences Grid */}
        <div className="grid grid-cols-1 gap-4">
          {experiences.length === 0 ? (
            <div className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-12 text-center">
              <Briefcase className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400 text-lg">No experiences yet</p>
            </div>
          ) : (
            experiences.map((experience, index) => (
              <motion.div
                key={experience._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all"
              >
                <div className="flex items-start justify-between">
                  <div className="flex gap-4 flex-1">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-xl font-semibold text-white">
                          {experience.role.en}
                        </h3>
                        <span className="text-sm text-gray-400">#{experience.order}</span>
                      </div>
                      <p className="text-purple-400 font-medium mb-1">
                        {experience.company.en}
                      </p>
                      <p className="text-gray-400 text-sm mb-2">
                        {experience.type?.en} • {experience.duration?.en} • {experience.location?.en}
                      </p>
                      <p className="text-gray-500 text-sm mb-3">
                        {experience.description?.en?.substring(0, 150)}...
                      </p>
                      <div className="flex gap-2 flex-wrap">
                        {experience.achievements?.en?.slice(0, 2).map((achievement, i) => (
                          <span
                            key={i}
                            className="text-xs bg-white/5 border border-white/10 text-gray-400 px-2 py-1 rounded"
                          >
                            ✓ {achievement.substring(0, 40)}...
                          </span>
                        ))}
                      </div>
                      <div className="flex gap-2 mt-3">
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                            experience.published
                              ? "bg-green-500/20 text-green-400"
                              : "bg-gray-500/20 text-gray-400"
                          }`}
                        >
                          {experience.published ? "Published" : "Draft"}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => router.push(`/admin/experiences/${experience._id}/edit`)}
                      className="p-2 bg-yellow-500/10 border border-yellow-500/50 text-yellow-400 rounded-lg hover:bg-yellow-500/20 transition-colors"
                      title="Edit"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(experience._id)}
                      className="p-2 bg-red-500/10 border border-red-500/50 text-red-400 rounded-lg hover:bg-red-500/20 transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
