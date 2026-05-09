import type { Metadata } from "next";
import { DM_Sans, Playfair_Display, Space_Mono } from "next/font/google";
import AppShell from "@/components/app/AppShell";
import "./globals.css";

const display = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
});

const body = DM_Sans({
  variable: "--font-body",
  subsets: ["latin"],
});

const mono = Space_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://aurarisefoundation.org"),
  title: "Aura Rise Foundation",
  description:
    "A child-centered nonprofit focused on education, nutrition, healthcare, and empowerment.",
};

const themeScript = `
(function() {
  try {
    var stored = window.localStorage.getItem("aura-rise-theme");
    var theme = stored === "bloom" ? "bloom" : "sunrise";
    var root = document.documentElement;
    root.dataset.theme = theme;
    root.classList.remove("theme-sunrise", "theme-bloom");
    root.classList.add("theme-" + theme);
  } catch (error) {
    document.documentElement.dataset.theme = "sunrise";
    document.documentElement.classList.add("theme-sunrise");
  }
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${mono.variable} theme-sunrise antialiased`}
      data-theme="sunrise"
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-screen bg-brand-cream text-brand-charcoal font-body">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
