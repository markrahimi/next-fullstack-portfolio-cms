"use client";

import { useSession } from "next-auth/react";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowLeft, Save } from "lucide-react";
import { toast } from "sonner";
import { PageLoading } from "@/components/page-loading";

export default function EditCertificatePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const params = useParams();
  const [activeLanguage, setActiveLanguage] = useState<"en" | "fr">("en");
  const [formData, setFormData] = useState({
    name: { en: "", fr: "" },
    issuer: { en: "", fr: "" },
    issueDate: "",
    expiryDate: "",
    credentialID: "",
    credentialURL: "",
    description: { en: "", fr: "" },
    order: 0,
    isActive: true,
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/admin/login");
    }
  }, [status, router]);

  useEffect(() => {
    if (params.id) {
      fetchCertificate();
    }
  }, [params.id]);

  const fetchCertificate = async () => {
    try {
      const response = await fetch(`/api/certificates/${params.id}`);
      if (response.ok) {
        const data = await response.json();
        setFormData({
          name: data.name,
          issuer: data.issuer,
          issueDate: data.issueDate,
          expiryDate: data.expiryDate || "",
          credentialID: data.credentialID || "",
          credentialURL: data.credentialURL || "",
          description: data.description,
          order: data.order,
          isActive: data.isActive,
        });
      } else {
        toast.error("Certificate not found");
        router.push("/admin/certificates");
      }
    } catch (error) {
      console.error("Error fetching certificate:", error);
      toast.error("Failed to fetch certificate");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.name.en ||
      !formData.name.fr ||
      !formData.issuer.en ||
      !formData.issuer.fr ||
      !formData.description.en ||
      !formData.description.fr ||
      !formData.issueDate
    ) {
      toast.error("Please fill in all required fields for both languages");
      return;
    }

    setSaving(true);

    try {
      const response = await fetch(`/api/certificates/${params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success("Certificate updated successfully!");
        setTimeout(() => router.push("/admin/certificates"), 1000);
      } else {
        const error = await response.json();
        toast.error(`Failed to update certificate: ${error.error || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Error updating certificate:", error);
      toast.error("Failed to update certificate");
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => router.push("/admin/certificates")}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-white" />
          </button>
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Edit Certificate</h1>
            <p className="text-gray-400">Update certificate information</p>
          </div>
        </div>

        {/* Language Tabs */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setActiveLanguage("en")}
            className={`px-6 py-2 rounded-lg transition-colors ${
              activeLanguage === "en"
                ? "bg-purple-500 text-white"
                : "bg-white/5 text-gray-400 hover:bg-white/10"
            }`}
          >
            English
          </button>
          <button
            onClick={() => setActiveLanguage("fr")}
            className={`px-6 py-2 rounded-lg transition-colors ${
              activeLanguage === "fr"
                ? "bg-purple-500 text-white"
                : "bg-white/5 text-gray-400 hover:bg-white/10"
            }`}
          >
            Français
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-6">
            {/* Certificate Name */}
            <div className="mb-6">
              <label className="block text-white mb-2">
                Certificate Name <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                value={formData.name[activeLanguage]}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    name: { ...formData.name, [activeLanguage]: e.target.value },
                  })
                }
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
                placeholder={`Enter certificate name in ${activeLanguage === "en" ? "English" : "French"}`}
              />
            </div>

            {/* Issuer */}
            <div className="mb-6">
              <label className="block text-white mb-2">
                Issuer/Organization <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                value={formData.issuer[activeLanguage]}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    issuer: { ...formData.issuer, [activeLanguage]: e.target.value },
                  })
                }
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
                placeholder={`Enter issuer name in ${activeLanguage === "en" ? "English" : "French"}`}
              />
            </div>

            {/* Description */}
            <div className="mb-6">
              <label className="block text-white mb-2">
                Description <span className="text-red-400">*</span>
              </label>
              <textarea
                value={formData.description[activeLanguage]}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    description: { ...formData.description, [activeLanguage]: e.target.value },
                  })
                }
                rows={4}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
                placeholder={`Enter description in ${activeLanguage === "en" ? "English" : "French"}`}
              />
            </div>

            {/* Dates and Other Fields (Language Independent) */}
            {activeLanguage === "en" && (
              <>
                <div className="grid grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-white mb-2">
                      Issue Date <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="month"
                      value={formData.issueDate}
                      onChange={(e) =>
                        setFormData({ ...formData, issueDate: e.target.value })
                      }
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-white mb-2">
                      Expiry Date (Optional)
                    </label>
                    <input
                      type="month"
                      value={formData.expiryDate}
                      onChange={(e) =>
                        setFormData({ ...formData, expiryDate: e.target.value })
                      }
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-white mb-2">Credential ID (Optional)</label>
                  <input
                    type="text"
                    value={formData.credentialID}
                    onChange={(e) =>
                      setFormData({ ...formData, credentialID: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
                    placeholder="Enter credential ID"
                  />
                </div>

                <div className="mb-6">
                  <label className="block text-white mb-2">Credential URL (Optional)</label>
                  <input
                    type="url"
                    value={formData.credentialURL}
                    onChange={(e) =>
                      setFormData({ ...formData, credentialURL: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
                    placeholder="https://example.com/credential"
                  />
                </div>

                <div className="mb-6">
                  <label className="block text-white mb-2">Display Order</label>
                  <input
                    type="number"
                    value={formData.order}
                    onChange={(e) =>
                      setFormData({ ...formData, order: parseInt(e.target.value) || 0 })
                    }
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-500"
                    min="0"
                  />
                  <p className="text-gray-500 text-sm mt-1">Lower numbers appear first</p>
                </div>

                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="isActive"
                    checked={formData.isActive}
                    onChange={(e) =>
                      setFormData({ ...formData, isActive: e.target.checked })
                    }
                    className="w-5 h-5 rounded bg-white/5 border-white/10"
                  />
                  <label htmlFor="isActive" className="text-white">
                    Active (visible on website)
                  </label>
                </div>
              </>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => router.push("/admin/certificates")}
              className="px-6 py-3 bg-white/5 hover:bg-white/10 text-white rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors disabled:opacity-50"
            >
              <Save className="w-5 h-5" />
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
