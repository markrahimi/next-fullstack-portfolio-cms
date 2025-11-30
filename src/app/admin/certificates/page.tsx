"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Plus, Edit, Trash2, Award, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { PageLoading } from "@/components/page-loading";
import { Certificate } from "@/types";

export default function CertificatesPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/admin/login");
    }
  }, [status, router]);

  useEffect(() => {
    fetchCertificates();
  }, []);

  const fetchCertificates = async () => {
    try {
      const response = await fetch("/api/certificates");
      if (response.ok) {
        const data = await response.json();
        setCertificates(data);
      }
    } catch (error) {
      console.error("Error fetching certificates:", error);
      toast.error("Failed to fetch certificates");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this certificate?")) {
      return;
    }

    try {
      const response = await fetch(`/api/certificates/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        toast.success("Certificate deleted successfully!");
        fetchCertificates();
      } else {
        toast.error("Failed to delete certificate");
      }
    } catch (error) {
      console.error("Error deleting certificate:", error);
      toast.error("Failed to delete certificate");
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
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push("/admin/dashboard")}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-6 h-6 text-white" />
            </button>
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">Certifications</h1>
              <p className="text-gray-400">Manage your certifications and credentials</p>
            </div>
          </div>
          <button
            onClick={() => router.push("/admin/certificates/create")}
            className="flex items-center gap-2 px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors"
          >
            <Plus className="w-5 h-5" />
            Add Certificate
          </button>
        </div>

        {/* Certificates List */}
        {certificates.length === 0 ? (
          <div className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-12 text-center">
            <Award className="w-16 h-16 text-gray-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No Certificates Yet</h3>
            <p className="text-gray-400 mb-6">Get started by adding your first certificate</p>
            <button
              onClick={() => router.push("/admin/certificates/create")}
              className="px-6 py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors"
            >
              Add Your First Certificate
            </button>
          </div>
        ) : (
          <div className="grid gap-6">
            {certificates.map((cert, index) => (
              <motion.div
                key={cert._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0">
                        <Award className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-white mb-1">
                          {cert.name.en}
                        </h3>
                        <p className="text-purple-300 mb-2">{cert.issuer.en}</p>
                        <p className="text-gray-400 text-sm mb-3">
                          {cert.description.en}
                        </p>
                        <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                          <div>
                            <span className="font-semibold">Issue Date:</span> {cert.issueDate}
                          </div>
                          {cert.expiryDate && (
                            <div>
                              <span className="font-semibold">Expiry:</span> {cert.expiryDate}
                            </div>
                          )}
                          {cert.credentialID && (
                            <div>
                              <span className="font-semibold">ID:</span> {cert.credentialID}
                            </div>
                          )}
                          <div>
                            <span className="font-semibold">Order:</span> {cert.order}
                          </div>
                        </div>
                        {cert.credentialURL && (
                          <a
                            href={cert.credentialURL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block mt-3 text-purple-400 hover:text-purple-300 text-sm"
                          >
                            View Credential →
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => router.push(`/admin/certificates/${cert._id}/edit`)}
                      className="p-2 hover:bg-blue-500/20 text-blue-400 rounded-lg transition-colors"
                    >
                      <Edit className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(cert._id)}
                      className="p-2 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
