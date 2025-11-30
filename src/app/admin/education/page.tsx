"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Plus, Edit, Trash2, GraduationCap } from "lucide-react";
import { toast } from "sonner";
import { PageLoading } from "@/components/page-loading";
import { EducationDB } from "@/types";

export default function AdminEducation() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [education, setEducation] = useState<EducationDB[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/admin/login");
    }
  }, [status, router]);

  useEffect(() => {
    if (session) {
      fetchEducation();
    }
  }, [session]);

  const fetchEducation = async () => {
    try {
      const response = await fetch("/api/admin/education");
      if (response.ok) {
        const data = await response.json();
        setEducation(data);
      }
    } catch (error) {
      console.error("Error fetching education:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this education entry?")) return;

    try {
      const response = await fetch(`/api/education/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        toast.success("Education deleted successfully!");
        fetchEducation();
      } else {
        toast.error("Failed to delete education");
      }
    } catch (error) {
      console.error("Error deleting education:", error);
      toast.error("An error occurred");
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
            <h1 className="text-4xl font-bold text-white mb-2">Education</h1>
            <p className="text-gray-400">{education.length} total entries</p>
          </div>
          <button
            onClick={() => router.push("/admin/education/create")}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all"
          >
            <Plus className="w-4 h-4" />
            New Education
          </button>
        </div>

        {/* Education Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {education.length === 0 ? (
            <div className="col-span-2 backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-12 text-center">
              <GraduationCap className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400 text-lg">No education entries yet</p>
            </div>
          ) : (
            education.map((edu, index) => (
              <motion.div
                key={edu._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-xl font-semibold text-white">
                        {edu.degree.en}
                      </h3>
                      <span className="text-sm text-gray-400">#{edu.order}</span>
                    </div>
                    <p className="text-purple-400 font-medium mb-1">
                      {edu.institution.en}
                    </p>
                    <p className="text-gray-400 text-sm mb-2">
                      {edu.location?.en} • {edu.year}
                    </p>
                    <div className="flex gap-2 flex-wrap mb-3">
                      {edu.courses?.en?.slice(0, 3).map((course, i) => (
                        <span
                          key={i}
                          className="text-xs bg-white/5 border border-white/10 text-gray-400 px-2 py-1 rounded"
                        >
                          {course}
                        </span>
                      ))}
                      {edu.courses?.en?.length > 3 && (
                        <span className="text-xs text-gray-500">
                          +{edu.courses.en.length - 3} more
                        </span>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                          edu.status === "Ongoing"
                            ? "bg-green-500/20 text-green-400"
                            : "bg-blue-500/20 text-blue-400"
                        }`}
                      >
                        {edu.status}
                      </span>
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                          edu.published
                            ? "bg-green-500/20 text-green-400"
                            : "bg-gray-500/20 text-gray-400"
                        }`}
                      >
                        {edu.published ? "Published" : "Draft"}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 justify-end">
                  <button
                    onClick={() => router.push(`/admin/education/${edu._id}/edit`)}
                    className="p-2 bg-yellow-500/10 border border-yellow-500/50 text-yellow-400 rounded-lg hover:bg-yellow-500/20 transition-colors"
                    title="Edit"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(edu._id)}
                    className="p-2 bg-red-500/10 border border-red-500/50 text-red-400 rounded-lg hover:bg-red-500/20 transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
