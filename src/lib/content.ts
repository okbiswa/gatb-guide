import fs from "fs";
import path from "path";

/**
 * Reads a markdown file from the content/ directory and returns its contents.
 */
export function getContentMarkdown(slug: string): string {
  const filePath = path.join(process.cwd(), "content", `${slug}.md`);
  return fs.readFileSync(filePath, "utf-8");
}

/**
 * Converts basic markdown to HTML with dark mode support.
 */
export function markdownToHtml(md: string): string {
  const lines = md.split("\n");
  const html: string[] = [];
  let inList = false;

  for (const line of lines) {
    const trimmed = line.trim();

    // Horizontal rule
    if (/^---+$/.test(trimmed)) {
      if (inList) { html.push("</ul>"); inList = false; }
      html.push('<hr class="my-8 border-slate-200 dark:border-slate-700" />');
      continue;
    }

    // Headings
    if (trimmed.startsWith("# ")) {
      if (inList) { html.push("</ul>"); inList = false; }
      html.push(`<h1 class="text-3xl font-bold text-slate-900 dark:text-white mb-4">${processInline(trimmed.slice(2))}</h1>`);
      continue;
    }
    if (trimmed.startsWith("## ")) {
      if (inList) { html.push("</ul>"); inList = false; }
      html.push(`<h2 class="text-xl font-semibold text-slate-800 dark:text-slate-200 mt-8 mb-3">${processInline(trimmed.slice(3))}</h2>`);
      continue;
    }
    if (trimmed.startsWith("### ")) {
      if (inList) { html.push("</ul>"); inList = false; }
      html.push(`<h3 class="text-lg font-semibold text-slate-800 dark:text-slate-200 mt-6 mb-2">${processInline(trimmed.slice(4))}</h3>`);
      continue;
    }

    // List items
    if (trimmed.startsWith("- ")) {
      if (!inList) { html.push('<ul class="list-disc list-inside space-y-1.5 text-slate-600 dark:text-slate-400 my-3">'); inList = true; }
      html.push(`<li>${processInline(trimmed.slice(2))}</li>`);
      continue;
    }

    // Empty line
    if (trimmed === "") {
      if (inList) { html.push("</ul>"); inList = false; }
      continue;
    }

    // Paragraph
    if (inList) { html.push("</ul>"); inList = false; }
    html.push(`<p class="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">${processInline(trimmed)}</p>`);
  }

  if (inList) html.push("</ul>");
  return html.join("\n");
}

/** Process inline markdown: bold, italic, links */
function processInline(text: string): string {
  return text
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">$1</a>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong class="text-slate-700 dark:text-slate-300 font-semibold">$1</strong>')
    .replace(/\*([^*]+)\*/g, "<em>$1</em>");
}
