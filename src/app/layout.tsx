import type { Metadata, Viewport } from "next";
import "@fontsource-variable/inter";
import "@fontsource-variable/jetbrains-mono";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Hossam Hassan Mohamed — Junior Penetration Tester",
    template: "%s | Hossam Hassan Mohamed",
  },
  description:
    "Portfolio of Hossam Hassan Mohamed, Junior Penetration Tester in Cairo, Egypt — web, API, Android, Active Directory, and network security testing, vulnerability assessment, and technical security reporting.",
  keywords: [
    "penetration tester",
    "junior penetration tester",
    "web security",
    "API security",
    "Active Directory",
    "Android security",
    "network penetration testing",
    "vulnerability assessment",
    "Cairo Egypt",
    "Hossam Hassan Mohamed",
  ],
  authors: [{ name: "Hossam Hassan Mohamed" }],
  openGraph: {
    type: "website",
    url: siteUrl,
    title: "Hossam Hassan Mohamed — Junior Penetration Tester",
    description:
      "Web, mobile, and infrastructure security testing — vulnerability identification, exploitation, and reporting.",
    siteName: "Hossam Hassan Mohamed",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hossam Hassan Mohamed — Junior Penetration Tester",
    description:
      "Web, mobile, and infrastructure security testing — vulnerability identification, exploitation, and reporting.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#090A0C",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-ink-950 font-sans text-zinc-200 antialiased">
        <noscript
          dangerouslySetInnerHTML={{
            __html: ".reveal{opacity:1 !important;transform:none !important}",
          }}
        />
        <a href="#main" className="skip-link">
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
