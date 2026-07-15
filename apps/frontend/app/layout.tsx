import type { Metadata } from "next";
import "./globals.css";
import { fontClassNames } from "@/lib/fonts";
import { AppProviders } from "@/providers/app-providers";

export const metadata: Metadata = {
  title: {
    default: "RecruitPilot",
    template: "%s | RecruitPilot",
  },
  description:
    "Enterprise-grade recruitment platform. Streamline hiring from job posting to offer.",
  keywords: ["recruitment", "ATS", "hiring", "talent acquisition", "interviews"],
  authors: [{ name: "RecruitPilot" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "RecruitPilot",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={fontClassNames} suppressHydrationWarning>
        <AppProviders>
          {children}
        </AppProviders>
      </body>
    </html>
  );
}
