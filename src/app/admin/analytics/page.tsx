"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, TrendingUp, Eye, Calendar } from "lucide-react";
import { PageLoading } from "@/components/page-loading";
import { PageView, ViewsData } from "@/types";

export default function AnalyticsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [viewsData, setViewsData] = useState<ViewsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/admin/login");
    }
  }, [status, router]);

  useEffect(() => {
    if (session) {
      fetchViewsData();
    }
  }, [session]);

  const fetchViewsData = async () => {
    try {
      const response = await fetch("/api/views");
      if (response.ok) {
        const data = await response.json();
        // Sort pages by view count (descending)
        const sortedPages = data.pages.sort((a: PageView, b: PageView) => b.count - a.count);
        setViewsData({
          ...data,
          pages: sortedPages,
        });
      }
    } catch (error) {
      console.error("Error fetching views data:", error);
    } finally {
      setLoading(false);
    }
  };

  if (status === "loading" || loading) {
    return <PageLoading isLoading={true} />;
  }

  if (!session) {
    return null;
  }

  const formatPageName = (page: string) => {
    // Capitalize and format page names
    if (page === "home") return "Home Page";
    if (page === "blog") return "Blog List";
    if (page === "projects") return "Projects List";
    return page.charAt(0).toUpperCase() + page.slice(1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => router.push("/admin/dashboard")}
            className="flex items-center gap-2 text-gray-400 hover:text-white mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </button>
          <div className="flex items-center gap-4 mb-2">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white">Page Views Analytics</h1>
              <p className="text-gray-400 mt-1">
                Track visitor engagement across your site
              </p>
            </div>
          </div>
        </div>

        {/* Total Views Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-6 mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm mb-1">Total Page Views</p>
              <p className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400">
                {viewsData?.totalViews.toLocaleString() || 0}
              </p>
            </div>
            <div className="w-20 h-20 rounded-full bg-gradient-to-r from-orange-500/20 to-red-500/20 flex items-center justify-center">
              <Eye className="w-10 h-10 text-orange-400" />
            </div>
          </div>
        </motion.div>

        {/* Views Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl overflow-hidden"
        >
          <div className="p-6 border-b border-white/10">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <Calendar className="w-6 h-6" />
              Page Views Breakdown
            </h2>
            <p className="text-gray-400 text-sm mt-1">
              View counts for each page on your site
            </p>
          </div>

          {viewsData && viewsData.pages.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      #
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Page Name
                    </th>
                    <th className="px-6 py-4 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Total Views
                    </th>
                    <th className="px-6 py-4 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Percentage
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {viewsData.pages.map((pageView, index) => {
                    const percentage = ((pageView.count / viewsData.totalViews) * 100).toFixed(1);
                    return (
                      <motion.tr
                        key={pageView.page}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="border-b border-white/5 hover:bg-white/5 transition-colors"
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                          {index + 1}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-3">
                            <div className={`w-2 h-2 rounded-full ${
                              index === 0 ? 'bg-green-400' :
                              index === 1 ? 'bg-blue-400' :
                              index === 2 ? 'bg-purple-400' :
                              'bg-gray-400'
                            }`} />
                            <span className="text-white font-medium">
                              {formatPageName(pageView.page)}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          <span className="text-2xl font-bold text-white">
                            {pageView.count.toLocaleString()}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          <div className="flex items-center justify-end gap-3">
                            <div className="w-24 h-2 bg-gray-700 rounded-full overflow-hidden">
                              <div
                                className={`h-full ${
                                  index === 0 ? 'bg-green-400' :
                                  index === 1 ? 'bg-blue-400' :
                                  index === 2 ? 'bg-purple-400' :
                                  'bg-gray-400'
                                }`}
                                style={{ width: `${percentage}%` }}
                              />
                            </div>
                            <span className="text-gray-300 font-medium w-12 text-right">
                              {percentage}%
                            </span>
                          </div>
                        </td>
                      </motion.tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-12 text-center">
              <Eye className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400 text-lg">No page views recorded yet</p>
              <p className="text-gray-500 text-sm mt-2">
                Views will appear here as visitors browse your site
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
