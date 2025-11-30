"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Mail, Clock, Eye, EyeOff, Trash2 } from "lucide-react";
import { PageLoading } from "@/components/page-loading";
import { toast } from "sonner";
import { ContactMessage } from "@/types";

export default function AdminMessages() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/admin/login");
    }
  }, [status, router]);

  useEffect(() => {
    if (session) {
      fetchMessages();
    }
  }, [session]);

  const fetchMessages = async () => {
    try {
      const response = await fetch("/api/contact");
      if (response.ok) {
        const data = await response.json();
        setMessages(data);
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleReadStatus = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === "read" ? "unread" : "read";

    try {
      const response = await fetch(`/api/contact/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        setMessages(messages.map(msg =>
          msg._id === id ? { ...msg, status: newStatus } : msg
        ));
        toast.success(`Message marked as ${newStatus}`);
      } else {
        toast.error("Failed to update message status");
      }
    } catch (error) {
      console.error("Error updating message:", error);
      toast.error("An error occurred");
    }
  };

  const deleteMessage = async (id: string) => {
    if (!confirm("Are you sure you want to delete this message?")) {
      return;
    }

    try {
      const response = await fetch(`/api/contact/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setMessages(messages.filter(msg => msg._id !== id));
        toast.success("Message deleted successfully");
      } else {
        toast.error("Failed to delete message");
      }
    } catch (error) {
      console.error("Error deleting message:", error);
      toast.error("An error occurred");
    }
  };

  const formatFrenchDateTime = (dateInput: string | Date) => {
    const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;
    return date.toLocaleString("fr-FR", {
      timeZone: "Europe/Paris",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
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
        <div className="mb-8">
          <button
            onClick={() => router.push("/admin/dashboard")}
            className="flex items-center gap-2 text-gray-400 hover:text-white mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </button>
          <h1 className="text-4xl font-bold text-white mb-2">Contact Messages</h1>
          <p className="text-gray-400">{messages.length} total messages</p>
        </div>

        {/* Messages List */}
        <div className="space-y-4">
          {messages.length === 0 ? (
            <div className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-12 text-center">
              <Mail className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400 text-lg">No messages yet</p>
            </div>
          ) : (
            messages.map((message, index) => (
              <motion.div
                key={message._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-white mb-1">
                      {message.subject}
                    </h3>
                    <p className="text-gray-400 text-sm">
                      From: {message.name} ({message.email})
                    </p>
                    <div className="flex items-center gap-2 text-sm text-gray-500 mt-2">
                      <Clock className="w-4 h-4" />
                      {formatFrenchDateTime(message.createdAt)}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => toggleReadStatus(message._id, message.status)}
                      className={`p-2 rounded-lg transition-all ${
                        message.status === "read"
                          ? "bg-gray-500/20 text-gray-400 hover:bg-gray-500/30"
                          : "bg-green-500/20 text-green-400 hover:bg-green-500/30"
                      }`}
                      title={message.status === "read" ? "Mark as unread" : "Mark as read"}
                    >
                      {message.status === "read" ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                    <button
                      onClick={() => deleteMessage(message._id)}
                      className="p-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-all"
                      title="Delete message"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                <p className="text-gray-300 whitespace-pre-wrap">{message.message}</p>
                <div className="mt-4">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                      message.status === "unread"
                        ? "bg-green-500/20 text-green-400"
                        : message.status === "read"
                        ? "bg-blue-500/20 text-blue-400"
                        : "bg-gray-500/20 text-gray-400"
                    }`}
                  >
                    {message.status}
                  </span>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
