"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowLeft, Save, Globe, Mail, MapPin, Phone, Link as LinkIcon, Image as ImageIcon, Code2 } from "lucide-react";
import { toast } from "sonner";
import { PageLoading } from "@/components/page-loading";
import { SettingsFormData } from "@/types";

export default function AdminSettings() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeLang, setActiveLang] = useState<"en" | "fr">("en");
  const [activeTab, setActiveTab] = useState<"general" | "contact" | "social" | "content" | "scripts">("general");

  const [formData, setFormData] = useState<SettingsFormData>({
    fullName: "",
    role: { en: "", fr: "" },
    logo: "",
    profileImage: "",
    resumeUrl: "",
    email: "",
    phone: "",
    heroGreeting: { en: "", fr: "" },
    heroTitle: { en: "", fr: "" },
    heroSubtitle: { en: "", fr: "" },
    socialLinks: {
      github: "",
      linkedin: "",
      twitter: "",
      instagram: "",
      facebook: "",
      youtube: "",
    },
  });

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/admin/login");
    }
  }, [status, router]);

  useEffect(() => {
    if (session) {
      fetchSettings();
    }
  }, [session]);

  const fetchSettings = async () => {
    try {
      const response = await fetch("/api/settings");
      if (response.ok) {
        const data = await response.json();
        setFormData(data);
      }
    } catch (error) {
      console.error("Error fetching settings:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const response = await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success("Settings saved successfully!");
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

  const tabs = [
    { id: "general", label: "General", icon: Globe },
    { id: "contact", label: "Contact", icon: Mail },
    { id: "social", label: "Social Links", icon: LinkIcon },
    { id: "content", label: "Content", icon: ImageIcon },
    { id: "scripts", label: "Scripts & Analytics", icon: Code2 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <button
          onClick={() => router.push("/admin/dashboard")}
          className="flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </button>

        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Site Settings</h1>
          <p className="text-gray-400">Manage general site configuration and content</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                    : "bg-white/5 text-gray-400 hover:text-white"
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* General Settings */}
          {activeTab === "general" && (
            <>
              <div className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-6">
                <h3 className="text-xl font-semibold text-white mb-4">Site Information</h3>

                <div className="flex gap-2 mb-4">
                  <button
                    type="button"
                    onClick={() => setActiveLang("en")}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      activeLang === "en"
                        ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                        : "bg-white/5 text-gray-400"
                    }`}
                  >
                    EN
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveLang("fr")}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      activeLang === "fr"
                        ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                        : "bg-white/5 text-gray-400"
                    }`}
                  >
                    FR
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      Site Name ({activeLang.toUpperCase()})
                    </label>
                    <input
                      type="text"
                      value={formData.siteName?.[activeLang] || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          siteName: { ...(formData.siteName || { en: "", fr: "" }), [activeLang]: e.target.value },
                        })
                      }
                      className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      Site Description ({activeLang.toUpperCase()})
                    </label>
                    <input
                      type="text"
                      value={formData.siteDescription?.[activeLang] || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          siteDescription: { ...(formData.siteDescription || { en: "", fr: "" }), [activeLang]: e.target.value },
                        })
                      }
                      className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">Full Name</label>
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      Role/Title ({activeLang.toUpperCase()})
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
                    />
                  </div>
                </div>
              </div>

              <div className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-6">
                <h3 className="text-xl font-semibold text-white mb-4">Images</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">Logo URL</label>
                    <input
                      type="text"
                      value={formData.logo}
                      onChange={(e) => setFormData({ ...formData, logo: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">Profile Image</label>
                    <input
                      type="text"
                      value={formData.profileImage}
                      onChange={(e) => setFormData({ ...formData, profileImage: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">Resume/CV URL</label>
                    <input
                      type="text"
                      value={formData.resumeUrl}
                      onChange={(e) => setFormData({ ...formData, resumeUrl: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
                    />
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Contact Settings */}
          {activeTab === "contact" && (
            <div className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-6">
              <h3 className="text-xl font-semibold text-white mb-4">Contact Information</h3>

              <div className="flex gap-2 mb-4">
                <button
                  type="button"
                  onClick={() => setActiveLang("en")}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    activeLang === "en"
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                      : "bg-white/5 text-gray-400"
                  }`}
                >
                  EN
                </button>
                <button
                  type="button"
                  onClick={() => setActiveLang("fr")}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    activeLang === "fr"
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                      : "bg-white/5 text-gray-400"
                  }`}
                >
                  FR
                </button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">Email</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">Phone</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Location ({activeLang.toUpperCase()})
                  </label>
                  <input
                    type="text"
                    value={formData.location?.[activeLang] || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        location: { ...(formData.location || { en: "", fr: "" }), [activeLang]: e.target.value },
                      })
                    }
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Address ({activeLang.toUpperCase()})
                  </label>
                  <textarea
                    value={formData.address?.[activeLang] || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        address: { ...(formData.address || { en: "", fr: "" }), [activeLang]: e.target.value },
                      })
                    }
                    rows={3}
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 resize-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Social Links */}
          {activeTab === "social" && (
            <div className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-6">
              <h3 className="text-xl font-semibold text-white mb-4">Social Media Links</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">GitHub</label>
                  <input
                    type="url"
                    value={formData.socialLinks.github}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        socialLinks: { ...formData.socialLinks, github: e.target.value },
                      })
                    }
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
                    placeholder="https://github.com/username"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">LinkedIn</label>
                  <input
                    type="url"
                    value={formData.socialLinks.linkedin}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        socialLinks: { ...formData.socialLinks, linkedin: e.target.value },
                      })
                    }
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
                    placeholder="https://linkedin.com/in/username"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">Twitter</label>
                  <input
                    type="url"
                    value={formData.socialLinks.twitter}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        socialLinks: { ...formData.socialLinks, twitter: e.target.value },
                      })
                    }
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
                    placeholder="https://twitter.com/username"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">Instagram</label>
                  <input
                    type="url"
                    value={formData.socialLinks.instagram}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        socialLinks: { ...formData.socialLinks, instagram: e.target.value },
                      })
                    }
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
                    placeholder="https://instagram.com/username"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">Facebook</label>
                  <input
                    type="url"
                    value={formData.socialLinks.facebook}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        socialLinks: { ...formData.socialLinks, facebook: e.target.value },
                      })
                    }
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
                    placeholder="https://facebook.com/username"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">YouTube</label>
                  <input
                    type="url"
                    value={formData.socialLinks.youtube}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        socialLinks: { ...formData.socialLinks, youtube: e.target.value },
                      })
                    }
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
                    placeholder="https://youtube.com/@username"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Content Settings */}
          {activeTab === "content" && (
            <>
              <div className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-6">
                <h3 className="text-xl font-semibold text-white mb-4">Hero Section</h3>

                <div className="flex gap-2 mb-4">
                  <button
                    type="button"
                    onClick={() => setActiveLang("en")}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      activeLang === "en"
                        ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                        : "bg-white/5 text-gray-400"
                    }`}
                  >
                    EN
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveLang("fr")}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      activeLang === "fr"
                        ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                        : "bg-white/5 text-gray-400"
                    }`}
                  >
                    FR
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      Greeting ({activeLang.toUpperCase()})
                    </label>
                    <input
                      type="text"
                      value={formData.heroGreeting[activeLang]}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          heroGreeting: { ...formData.heroGreeting, [activeLang]: e.target.value },
                        })
                      }
                      className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      Title ({activeLang.toUpperCase()})
                    </label>
                    <input
                      type="text"
                      value={formData.heroTitle[activeLang]}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          heroTitle: { ...formData.heroTitle, [activeLang]: e.target.value },
                        })
                      }
                      className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      Subtitle ({activeLang.toUpperCase()})
                    </label>
                    <textarea
                      value={formData.heroSubtitle[activeLang]}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          heroSubtitle: { ...formData.heroSubtitle, [activeLang]: e.target.value },
                        })
                      }
                      rows={3}
                      className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 resize-none"
                    />
                  </div>
                </div>
              </div>

              <div className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-6">
                <h3 className="text-xl font-semibold text-white mb-4">Hero Floating Badges</h3>
                <p className="text-gray-400 text-sm mb-4">
                  These badges appear around the profile image on the hero section
                </p>
                <div className="space-y-4">
                  {formData.heroBadges && formData.heroBadges.map((badge, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        value={badge}
                        onChange={(e) => {
                          const newBadges = [...formData.heroBadges!];
                          newBadges[index] = e.target.value;
                          setFormData({ ...formData, heroBadges: newBadges });
                        }}
                        className="flex-1 px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
                        placeholder={`Badge ${index + 1}`}
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const newBadges = formData.heroBadges!.filter((_, i) => i !== index);
                          setFormData({ ...formData, heroBadges: newBadges });
                        }}
                        className="px-4 py-3 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-all"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => {
                      setFormData({
                        ...formData,
                        heroBadges: [...(formData.heroBadges || []), ""],
                      });
                    }}
                    className="w-full px-4 py-3 rounded-lg bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 transition-all"
                  >
                    + Add Badge
                  </button>
                </div>
              </div>

              <div className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-6">
                <h3 className="text-xl font-semibold text-white mb-4">Footer</h3>

                <div className="flex gap-2 mb-4">
                  <button
                    type="button"
                    onClick={() => setActiveLang("en")}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      activeLang === "en"
                        ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                        : "bg-white/5 text-gray-400"
                    }`}
                  >
                    EN
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveLang("fr")}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      activeLang === "fr"
                        ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                        : "bg-white/5 text-gray-400"
                    }`}
                  >
                    FR
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      Footer Text ({activeLang.toUpperCase()})
                    </label>
                    <input
                      type="text"
                      value={formData.footerText?.[activeLang] || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          footerText: { ...(formData.footerText || { en: "", fr: "" }), [activeLang]: e.target.value },
                        })
                      }
                      className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      Copyright Text ({activeLang.toUpperCase()})
                    </label>
                    <input
                      type="text"
                      value={formData.copyrightText?.[activeLang] || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          copyrightText: { ...(formData.copyrightText || { en: "", fr: "" }), [activeLang]: e.target.value },
                        })
                      }
                      className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
                    />
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Scripts & Analytics Settings */}
          {activeTab === "scripts" && (
            <>
              <div className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-6">
                <h3 className="text-xl font-semibold text-white mb-4">Analytics Integration</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      Google Analytics ID
                    </label>
                    <input
                      type="text"
                      value={formData.googleAnalyticsId || ""}
                      onChange={(e) => setFormData({ ...formData, googleAnalyticsId: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 font-mono text-sm"
                      placeholder="G-XXXXXXXXXX"
                    />
                    <p className="text-gray-500 text-xs mt-1">
                      Enter your Google Analytics 4 Measurement ID (starts with G-)
                    </p>
                  </div>

                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      Google Tag Manager ID
                    </label>
                    <input
                      type="text"
                      value={formData.googleTagManagerId || ""}
                      onChange={(e) => setFormData({ ...formData, googleTagManagerId: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 font-mono text-sm"
                      placeholder="GTM-XXXXXXX"
                    />
                    <p className="text-gray-500 text-xs mt-1">
                      Enter your Google Tag Manager Container ID (starts with GTM-)
                    </p>
                  </div>
                </div>
              </div>

              <div className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-6">
                <h3 className="text-xl font-semibold text-white mb-4">Custom Scripts</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      Custom Head Scripts
                    </label>
                    <textarea
                      value={formData.customHeadScripts || ""}
                      onChange={(e) => setFormData({ ...formData, customHeadScripts: e.target.value })}
                      rows={8}
                      className="w-full px-4 py-3 rounded-lg bg-gray-900/50 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 resize-none font-mono text-sm"
                      placeholder="<!-- Scripts to inject in <head> -->"
                    />
                    <p className="text-gray-500 text-xs mt-1">
                      Scripts added here will be injected into the &lt;head&gt; section of all pages
                    </p>
                  </div>

                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      Custom Body Scripts
                    </label>
                    <textarea
                      value={formData.customBodyScripts || ""}
                      onChange={(e) => setFormData({ ...formData, customBodyScripts: e.target.value })}
                      rows={8}
                      className="w-full px-4 py-3 rounded-lg bg-gray-900/50 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 resize-none font-mono text-sm"
                      placeholder="<!-- Scripts to inject before </body> -->"
                    />
                    <p className="text-gray-500 text-xs mt-1">
                      Scripts added here will be injected at the end of the &lt;body&gt; section of all pages
                    </p>
                  </div>

                  <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                    <p className="text-blue-300 text-sm">
                      <strong>Note:</strong> Scripts will be injected as-is. Make sure to include proper{" "}
                      <code className="bg-blue-500/20 px-1 rounded">&lt;script&gt;</code> tags and ensure they are safe and valid.
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Save Button */}
          <div className="flex gap-4 justify-end">
            <button
              type="submit"
              disabled={saving}
              className="px-8 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 transition-all flex items-center gap-2 disabled:opacity-50"
            >
              {saving ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Save Settings
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
