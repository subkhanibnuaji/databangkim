import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DataBangkim — Pusat Data Dir. Pengembangan Kawasan Permukiman",
  description:
    "Pusat data, link, dan resource untuk Direktorat Pengembangan Kawasan Permukiman — Kementerian Perumahan dan Kawasan Permukiman (PKP)",
  keywords: [
    "DataBangkim",
    "Bangkim",
    "PKP",
    "Kementerian Perumahan",
    "Kawasan Permukiman",
    "data",
    "link hub",
  ],
  openGraph: {
    title: "DataBangkim — Pusat Data Dir. Pengembangan Kawasan Permukiman",
    description:
      "Pusat data, link, dan resource untuk Direktorat Bangkim — Kementerian PKP",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('databangkim-theme');
                  if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                    document.documentElement.setAttribute('data-theme', 'dark');
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body
        className="min-h-screen bg-background text-foreground antialiased"
        style={{ fontFamily: "'Inter', 'Plus Jakarta Sans', system-ui, sans-serif" }}
      >
        {children}
      </body>
    </html>
  );
}
