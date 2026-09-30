import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono, Figtree } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";


const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  weight: ["400", "500"],
});

const figtree = Figtree({
  subsets: ["latin"],
  variable: "--font-figtree",
  weight: ["400", "500", "600", "700"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
if (!siteUrl) {
  throw new Error("NEXT_PUBLIC_SITE_URL is not set");
}

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Ragnalizer | AI Code Analysis Assistant Using RAG",
    template: "%s | Ragnalizer",
  },
  description:
    "Ragnalizer is an AI code analysis assistant. Ask questions about your codebase in plain English and get answers grounded in your actual source code using RAG.",
  keywords: [
    "Ragnalizer",
    "code analysis",
    "RAG",
    "retrieval-augmented generation",
    "AI code assistant",
    "codebase question answering",
    "semantic code search",
    "LLM",
    "vector embeddings",
    "Next.js",
  ],
  authors: [{ name: "Argha Chandra Das", url: "https://www.linkedin.com/in/argha-chandra-das-b487a1215" }],
  creator: "Argha Chandra Das",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Ragnalizer",
    title: "Ragnalizer | AI Code Analysis Assistant Using RAG",
    description:
      "Ask questions about your codebase in plain English and get answers grounded in your actual source code.",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ragnalizer | AI Code Analysis Assistant Using RAG",
    description:
      "Ask questions about your codebase in plain English and get answers grounded in your actual source code.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} ${figtree.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
