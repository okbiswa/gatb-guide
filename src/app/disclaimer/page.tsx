import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/footer";
import { ThemeToggle } from "@/components/theme-toggle";
import { getContentMarkdown, markdownToHtml } from "@/lib/content";

export const metadata: Metadata = {
  title: "Disclaimer — GAT-B Guide",
  description: "Disclaimer for the GAT-B Guide platform.",
};

export default function DisclaimerPage() {
  const md = getContentMarkdown("disclaimer");
  const html = markdownToHtml(md);

  return (
    <main className="min-h-screen bg-science-pattern">
      <div className="sticky top-0 z-40 bg-white/80 dark:bg-slate-950/80 backdrop-blur-lg border-b border-slate-100 dark:border-slate-800">
        <div className="mx-auto max-w-3xl px-4 py-3 flex items-center justify-between">
          <Link href="/">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Button>
          </Link>
          <ThemeToggle />
        </div>
      </div>
      <div className="mx-auto max-w-3xl px-4 py-12">
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </div>
      <Footer />
    </main>
  );
}
