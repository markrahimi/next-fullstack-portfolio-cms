"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

interface PageLoadingProps {
  isLoading?: boolean;
}

export function PageLoading({ isLoading: externalIsLoading }: PageLoadingProps = {}) {
  const [internalIsLoading, setInternalIsLoading] = useState(true);

  useEffect(() => {
    // Only use internal timer if no external control is provided
    if (externalIsLoading === undefined) {
      const timer = setTimeout(() => {
        setInternalIsLoading(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [externalIsLoading]);

  // Use external loading state if provided, otherwise use internal
  const isLoading = externalIsLoading !== undefined ? externalIsLoading : internalIsLoading;

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0a0a0f]"
        >
          {/* Animated gradient background */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-full blur-3xl"
            />
          </div>

          {/* Loading content */}
          <div className="relative flex flex-col items-center gap-8">
            {/* Animated logo/initials */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 20,
              }}
              className="relative"
            >
              {/* Outer rotating ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute inset-0 rounded-full"
                style={{
                  background: "conic-gradient(from 0deg, transparent 0%, #3b82f6 50%, transparent 100%)",
                  padding: "3px",
                }}
              >
                <div className="w-full h-full rounded-full bg-[#0a0a0f]" />
              </motion.div>

              {/* Middle ring */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute inset-2 rounded-full"
                style={{
                  background: "conic-gradient(from 0deg, transparent 0%, #a855f7 50%, transparent 100%)",
                  padding: "2px",
                }}
              >
                <div className="w-full h-full rounded-full bg-[#0a0a0f]" />
              </motion.div>

              {/* Center content */}
              <div className="relative w-32 h-32 flex items-center justify-center glass rounded-full">
                <motion.span
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="text-5xl font-bold gradient-text"
                >
                  MR
                </motion.span>
              </div>
            </motion.div>

            {/* Loading text with dots animation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="flex items-center gap-2"
            >
              <span className="text-lg font-medium text-gray-300">Loading</span>
              <div className="flex gap-1">
                {[0, 1, 2].map((i) => (
                  <motion.span
                    key={i}
                    animate={{
                      opacity: [0.3, 1, 0.3],
                      y: [0, -5, 0],
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      delay: i * 0.2,
                    }}
                    className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-blue-600 to-purple-600"
                  />
                ))}
              </div>
            </motion.div>

            {/* Progress bar */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="w-64 h-1 bg-gray-800 rounded-full overflow-hidden"
            >
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.8, ease: "easeInOut" }}
                className="h-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600"
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
