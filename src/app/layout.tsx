
import { Analytics } from "@vercel/analytics/next"
import { Figtree } from "next/font/google";
import localFont from "next/font/local"
import "./globals.css";
import { Toaster } from "sonner";

const figtree = Figtree({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-figtree",
})


const doto = localFont({
  src: "./fonts/Doto-Bold.ttf",
  weight: "900",
  variable: "--font-doto",
})

const adlam = localFont({
  src: "./fonts/Adlam-regular.ttf",
  variable: "--font-adlam",
  fallback: ["serif"],
})

const imperial = localFont({
  src: "./fonts/ImperialScript-Regular.ttf",
  variable: "--font-imperial",
  fallback: ["cursive"],
})

const kablammo = localFont({
  src: "./fonts/Kablammo-Regular-VariableFont.ttf",
  variable: "--font-kablammo",
  fallback: ["fantasy"],
})

const unifraktur = localFont({
  src: "./fonts/Unifrakturmaguntia-Regular.ttf",
  variable: "--font-unifraktur",
  fallback: ["serif"],
})

export const metadata = {
  title: "Imposter Keys Typo- Minimalist Typing Experience",
  description:
    "A beautiful, distraction-free typing environment with customizable colors, fonts, and themes. Just start typing and let your thoughts flow.",
  keywords: [
    "typing",
    "minimalist",
    "writing",
    "text editor",
    "distraction free",
    "clean interface",
    "typing app",
    "writing tool",
    "focus mode",
    "zen writing",
    "simple editor",
    "typewriter",
    "markdown",
    "notes",
    "creative writing",
  ],
  authors: [{ name: "Ankit Mohanty" }],
  creator: "Ankit Mohanty",
  publisher: "Ankit Mohanty",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Imposter Keys Typo- Minimalist Typing Experience",
    description:
      "A beautiful, distraction-free typing environment with customizable colors, fonts, and themes. Just start typing and let your thoughts flow.",
    url: "/",
    siteName: "Imposter Keys Typo",
    images: [
      {
        url: "/banner.png",
        width: 1200,
        height: 630,
        alt: "Imposter Keys Typo- Minimalist Typing Interface",
      },
      {
        url: "/banner.png",
        width: 1200,
        height: 1200,
        alt: "Imposter Keys TypoLogo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "./favicon.svg"
  },
  applicationName: "Imposter Keys",
  generator: "Next.js",
  abstract: "Minimalist typing environment for distraction-free writing",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${figtree.variable} ${doto.variable} ${adlam.variable} ${imperial.variable} ${kablammo.variable} ${unifraktur.variable}`}>
      <body
        className={`font-figtree antialiased`}
      >
        <Toaster position="top-center"/>
        {children}
        <Analytics/>
      </body>
    </html>
  );
}
