import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Russell J - Software Developer & Designer",
  description: "Experienced software developer showcasing projects, skills, and expertise in full-stack development, web design, and software engineering.",
  keywords: [
    "Russell J",
    "software developer",
    "web developer",
    "full-stack developer",
    "software engineer",
    "portfolio",
    "web design",
    "JavaScript",
    "React",
    "Next.js",
  ],
  authors: [
    {
      name: "Russell J",
      url: "https://rjoarder.com",
    },
  ],
  creator: "Russell J",
  publisher: "Russell J",
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
    googleBot: "index, follow",
  },
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://rjoarder.com",
    siteName: "Russell J",
    title: "Russell J - Software Developer & Designer",
    description:
      "Experienced software developer showcasing projects, skills, and expertise in full-stack development, web design, and software engineering.",

  },
  twitter: {
    card: "summary_large_image",
    title: "Russell J - Software Developer & Designer",
    description:
      "Experienced software developer showcasing projects, skills, and expertise in full-stack development, web design, and software engineering.",
    creator: "@yourhandle", // Update with your Twitter handle
  },
  alternates: {
    canonical: "https://rjoarder.com",
  },
  formatDetection: {
    telephone: false,
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
