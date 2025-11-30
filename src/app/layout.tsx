import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { LanguageProvider } from "@/providers/language-provider";
import SessionProvider from "@/providers/session-provider";
import { Toaster } from "sonner";
import Settings from "@/models/Settings";
import dbConnect from "@/lib/mongodb";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

export const metadata: Metadata = {
  title: "Mark Rahimi - Backend & Full-Stack Developer",
  description: "Portfolio of Mark Rahimi, a motivated master's student and backend/full-stack developer specializing in Python, FastAPI, Django, Next.js, and modern data workflows.",
  keywords: ["Mark Rahimi", "Backend Developer", "Full-Stack Developer", "Python", "FastAPI", "Django", "Next.js", "TypeScript"],
  authors: [{ name: "Mark Rahimi" }],
  openGraph: {
    title: "Mark Rahimi - Backend & Full-Stack Developer",
    description: "Portfolio of Mark Rahimi",
    type: "website",
  },
};

async function getSettings() {
  try {
    await dbConnect();
    const settings = await Settings.findOne().lean();
    return settings;
  } catch (error) {
    console.error("Error fetching settings:", error);
    return null;
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSettings();

  return (
    <html lang="en" className="dark">
      <head>
        {/* Google Analytics */}
        {settings?.googleAnalyticsId && (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${settings.googleAnalyticsId}`} />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${settings.googleAnalyticsId}');
                `,
              }}
            />
          </>
        )}

        {/* Google Tag Manager */}
        {settings?.googleTagManagerId && (
          <script
            dangerouslySetInnerHTML={{
              __html: `
                (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','${settings.googleTagManagerId}');
              `,
            }}
          />
        )}

        {/* Custom Head Scripts */}
        {settings?.customHeadScripts && settings.customHeadScripts.trim() !== '' && (
          <script
            dangerouslySetInnerHTML={{
              __html: settings.customHeadScripts,
            }}
          />
        )}
      </head>
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-sans antialiased`}>
        <div className="relative min-h-screen flex flex-col">
          {/* Dark Background with gradient */}
          <div className="fixed inset-0 -z-20 bg-[#0a0a0f]" />
          <div className="fixed inset-0 -z-10 bg-gradient-to-b from-[#0a0a0f] via-[#0f0f1a] to-[#1a1a2e]" />

          {/* Grid pattern overlay - Simplified */}
          <div className="fixed inset-0 -z-10 opacity-10"
               style={{
                 backgroundImage: `linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
                                   linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)`,
                 backgroundSize: '100px 100px'
               }}
          />

          {/* Static neon orbs - Minimal blur for performance */}
          <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
            {/* Blue neon orb */}
            <div className="absolute top-1/4 -left-48 w-96 h-96 bg-blue-500/10 rounded-full blur-xl opacity-40" />

            {/* Purple neon orb */}
            <div className="absolute top-1/3 -right-48 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-xl opacity-40" />

            {/* Pink neon orb */}
            <div className="absolute -bottom-48 left-1/3 w-96 h-96 bg-pink-500/10 rounded-full blur-xl opacity-40" />
          </div>

          <SessionProvider>
            <LanguageProvider>
              <Navbar />

              <main className="flex-1 relative z-0">
                {children}
              </main>

              <Footer />
            </LanguageProvider>
          </SessionProvider>
        </div>

        {/* Toast Notifications */}
        <Toaster
          position="bottom-center"
          richColors
          closeButton
          toastOptions={{
            style: {
              background: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(16px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '12px',
              color: '#fff',
              padding: '16px',
              boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
            },
            className: '',
            descriptionClassName: 'text-gray-400',
          }}
        />

        {/* Google Tag Manager noscript */}
        {settings?.googleTagManagerId && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${settings.googleTagManagerId}`}
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            />
          </noscript>
        )}

        {/* Custom Body Scripts */}
        {settings?.customBodyScripts && settings.customBodyScripts.trim() !== '' && (
          <script
            dangerouslySetInnerHTML={{
              __html: settings.customBodyScripts,
            }}
          />
        )}
      </body>
    </html>
  );
}
