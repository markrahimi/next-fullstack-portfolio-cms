import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function usePageView(pageName: string) {
  const pathname = usePathname();

  useEffect(() => {
    // Don't track admin panel pages
    const isAdminRoute = pathname?.startsWith('/admin');
    if (isAdminRoute) {
      return;
    }

    // Track page view
    async function trackView() {
      try {
        await fetch("/api/views", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ page: pageName }),
        });
      } catch (error) {
        // Silently fail - don't interrupt user experience
        console.error("Failed to track view:", error);
      }
    }

    trackView();
  }, [pageName, pathname]);
}
