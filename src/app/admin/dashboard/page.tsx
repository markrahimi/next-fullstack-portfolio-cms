"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FileText,
  Briefcase,
  Mail,
  GraduationCap,
  Code,
  BookOpen,
  LogOut,
  Settings,
  User,
  Award
} from "lucide-react";
import { signOut } from "next-auth/react";
import { PageLoading } from "@/components/page-loading";
import { Stats } from "@/types";

const adminSections = [
  { title: "About Section", icon: User, href: "/admin/about", color: "from-cyan-500 to-blue-500" },
  { title: "Projects", icon: Briefcase, href: "/admin/projects", color: "from-blue-500 to-cyan-500" },
  { title: "Blog Posts", icon: FileText, href: "/admin/blogs", color: "from-purple-500 to-pink-500" },
  { title: "Experience", icon: Code, href: "/admin/experiences", color: "from-orange-500 to-red-500" },
  { title: "Education", icon: GraduationCap, href: "/admin/education", color: "from-indigo-500 to-purple-500" },
  { title: "Skills", icon: BookOpen, href: "/admin/skills", color: "from-yellow-500 to-orange-500" },
  { title: "Certifications", icon: Award, href: "/admin/certificates", color: "from-pink-500 to-rose-500" },
  { title: "Messages", icon: Mail, href: "/admin/messages", color: "from-green-500 to-emerald-500" },
  { title: "Site Settings", icon: Settings, href: "/admin/settings", color: "from-teal-500 to-cyan-500" },
];

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [stats, setStats] = useState<Stats>({
    projects: 0,
    blogs: 0,
    messages: 0,
    totalViews: 0,
  });
  const [loadingStats, setLoadingStats] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/admin/login");
    }
  }, [status, router]);

  useEffect(() => {
    async function fetchStats() {
      try {
        const response = await fetch("/api/stats");
        if (response.ok) {
          const data = await response.json();
          setStats(data);
        }
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoadingStats(false);
      }
    }
    if (status === "authenticated") {
      fetchStats();
    }
  }, [status]);

  if (status === "loading") {
    return <PageLoading isLoading={true} />;
  }

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Admin Dashboard</h1>
            <p className="text-gray-400">Welcome back, {session.user?.name}</p>
          </div>
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="flex items-center gap-2 px-4 py-2 bg-red-500/10 border border-red-500/50 text-red-400 rounded-lg hover:bg-red-500/20 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>

        {/* Sections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {adminSections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <button
                onClick={() => router.push(section.href)}
                className="w-full group"
              >
                <div className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 h-full">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${section.color} flex items-center justify-center mb-4`}>
                    <section.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-purple-300 transition-colors">
                    {section.title}
                  </h3>
                  <p className="text-gray-400 text-sm">
                    Manage your {section.title.toLowerCase()}
                  </p>
                </div>
              </button>
            </motion.div>
          ))}
        </div>

        {/* Quick Stats */}
        <div className="mt-12 backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-6">
          <h2 className="text-2xl font-bold text-white mb-4">Quick Stats</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <motion.button
              onClick={() => router.push("/admin/projects")}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="text-center hover:bg-white/5 rounded-lg p-4 transition-colors cursor-pointer group"
            >
              <div className="text-3xl font-bold text-purple-400 group-hover:scale-110 transition-transform">
                {loadingStats ? "..." : stats.projects}
              </div>
              <div className="text-gray-400 text-sm mt-1 group-hover:text-gray-300">Projects</div>
            </motion.button>
            <motion.button
              onClick={() => router.push("/admin/blogs")}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="text-center hover:bg-white/5 rounded-lg p-4 transition-colors cursor-pointer group"
            >
              <div className="text-3xl font-bold text-blue-400 group-hover:scale-110 transition-transform">
                {loadingStats ? "..." : stats.blogs}
              </div>
              <div className="text-gray-400 text-sm mt-1 group-hover:text-gray-300">Blog Posts</div>
            </motion.button>
            <motion.button
              onClick={() => router.push("/admin/messages")}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="text-center hover:bg-white/5 rounded-lg p-4 transition-colors cursor-pointer group"
            >
              <div className="text-3xl font-bold text-green-400 group-hover:scale-110 transition-transform">
                {loadingStats ? "..." : stats.messages}
              </div>
              <div className="text-gray-400 text-sm mt-1 group-hover:text-gray-300">Messages</div>
            </motion.button>
            <motion.button
              onClick={() => router.push("/admin/analytics")}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              className="text-center hover:bg-white/5 rounded-lg p-4 transition-colors cursor-pointer group"
            >
              <div className="text-3xl font-bold text-orange-400 group-hover:scale-110 transition-transform">
                {loadingStats ? "..." : stats.totalViews}
              </div>
              <div className="text-gray-400 text-sm mt-1 group-hover:text-gray-300">Total Views</div>
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
}
