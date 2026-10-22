import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Clock, CalendarDays } from "lucide-react";
import { BLOG_DATA, BLOG_POSTS } from "../data";
import { notFound } from "next/navigation";
import BlogPostCTA from "./BlogPostCTA";
import JsonLd from "@/components/JsonLd";
import { blogPosting, breadcrumbs } from "@/lib/seo";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const post = BLOG_DATA[slug as keyof typeof BLOG_DATA];
  if (!post) return { title: "Guide not found", robots: { index: false } };
  return {
    title: { absolute: post.metaTitle },
    description: post.metaDescription,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.metaTitle,
      description: post.metaDescription,
      url: `/blog/${post.slug}`,
      images: [{ url: encodeURI(post.image), width: 1200, height: 630, alt: post.title }],
      type: "article",
      publishedTime: post.published,
      section: post.category,
    },
    twitter: {
      card: "summary_large_image",
      title: post.metaTitle,
      description: post.metaDescription,
      images: [encodeURI(post.image)],
    },
  };
}

function applyInline(text: string): string {
  return text
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" class="text-accent font-medium underline decoration-accent/30 underline-offset-2 hover:text-accent-light transition-colors">$1</a>')
    .replace(/\*\*(.+?)\*\*/g, '<strong class="font-semibold text-slate-900">$1</strong>')
    .replace(/\*(.+?)\*/g, "<em>$1</em>");
}

function renderMarkdown(content: string): string {
  const lines = content.trim().split("\n");
  const out: string[] = [];
  let inList = false;
  let inOrderedList = false;
  let firstHeading = true;

  for (const raw of lines) {
    const line = raw.trim();

    if (line === "") {
      if (inList) {
        out.push("</ul>");
        inList = false;
      }
      if (inOrderedList) {
        out.push("</ol>");
        inOrderedList = false;
      }
      continue;
    }

    // Skip the first # heading, it duplicates the page <h1>
    if (line.startsWith("# ") && firstHeading) {
      firstHeading = false;
      continue;
    }
    firstHeading = false;

    const numberedMatch = line.match(/^(\d+)\. (.*)/);

    if (line.startsWith("### ")) {
      if (inList) {
        out.push("</ul>");
        inList = false;
      }
      if (inOrderedList) {
        out.push("</ol>");
        inOrderedList = false;
      }
      // Sub-section label styled as a pill
      out.push(`<div class="mt-7 mb-3"><span class="inline-block text-xs font-bold text-accent  bg-accent/10 px-3 py-1.5 rounded-full">${applyInline(line.slice(4))}</span></div>`);
    } else if (line.startsWith("## ")) {
      if (inList) {
        out.push("</ul>");
        inList = false;
      }
      if (inOrderedList) {
        out.push("</ol>");
        inOrderedList = false;
      }
      // Section heading with bottom border
      out.push(`<h3 class="text-xl font-bold text-slate-900 mt-10 mb-4 pb-3 border-b-2 border-slate-100">${applyInline(line.slice(3))}</h3>`);
    } else if (line.startsWith("# ")) {
      if (inList) {
        out.push("</ul>");
        inList = false;
      }
      if (inOrderedList) {
        out.push("</ol>");
        inOrderedList = false;
      }
      // Major heading with left accent bar + light bg
      out.push(`<h2 class="text-2xl font-extrabold text-slate-900 mt-12 mb-5 px-4 py-3 bg-slate-50 rounded-xl border-l-4 border-accent">${applyInline(line.slice(2))}</h2>`);
    } else if (line.startsWith("- ")) {
      if (inOrderedList) {
        out.push("</ol>");
        inOrderedList = false;
      }
      if (!inList) {
        out.push(`<ul class="my-4 space-y-2">`);
        inList = true;
      }
      // Card-style list item with checkmark
      out.push(`<li class="flex gap-3 items-start px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 text-slate-700 text-[16px] leading-relaxed"><span class="text-accent font-bold text-base shrink-0 mt-0.5">✓</span><span>${applyInline(line.slice(2))}</span></li>`);
    } else if (numberedMatch) {
      if (inList) {
        out.push("</ul>");
        inList = false;
      }
      if (!inOrderedList) {
        out.push(`<ol class="my-5 space-y-3">`);
        inOrderedList = true;
      }
      // Numbered step card with solid accent badge
      out.push(
        `<li class="flex gap-4 items-start p-4 rounded-xl bg-slate-50 border border-slate-100"><span class="shrink-0 w-7 h-7 rounded-full bg-accent text-white text-sm font-bold flex items-center justify-center">${numberedMatch[1]}</span><span class="text-slate-700 text-[16.5px] leading-relaxed pt-0.5">${applyInline(numberedMatch[2])}</span></li>`,
      );
    } else {
      if (inList) {
        out.push("</ul>");
        inList = false;
      }
      if (inOrderedList) {
        out.push("</ol>");
        inOrderedList = false;
      }
      out.push(`<p class="text-slate-600 leading-[1.9] mb-5 text-[17px]">${applyInline(line)}</p>`);
    }
  }

  if (inList) out.push("</ul>");
  if (inOrderedList) out.push("</ol>");
  return out.join("\n");
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = BLOG_DATA[slug as keyof typeof BLOG_DATA];
  if (!post) notFound();

  const relatedPosts = BLOG_POSTS.filter((p) => p.slug !== slug).slice(0, 3);
  const html = renderMarkdown(post.content);

  return (
    <div className="min-h-screen bg-slate-50">
      <JsonLd
        data={[
          blogPosting(post),
          breadcrumbs([
            { name: "Cleaning Guides", path: "/blog" },
            { name: post.title, path: `/blog/${post.slug}` },
          ]),
        ]}
      />
      {/* ── White content card ── */}
      <div className="max-w-3xl mx-auto bg-white shadow-sm sm:rounded-b-2xl px-6 pt-28 pb-14">
        <Link href="/blog" className="inline-flex items-center gap-2 text-slate-400 hover:text-accent text-sm font-medium transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" />
          Back to Blog
        </Link>

        {/* Image */}
        <div className="relative w-full h-56 sm:h-72 rounded-2xl overflow-hidden shadow-sm border border-slate-100 mb-8">
          <Image src={post.image} alt={post.title} fill className="object-cover" priority />
        </div>

        {/* Category */}
        <span className="inline-block text-accent text-xs font-bold  px-3 py-1.5 bg-accent/10 rounded-full mb-4">{post.category}</span>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-snug mb-4">{post.title}</h1>

        {/* Excerpt as lead */}
        <p className="text-slate-500 text-[17px] leading-relaxed border-l-4 border-accent/30 pl-4 mb-6">{post.excerpt}</p>

        {/* Meta */}
        <div className="flex items-center gap-4 text-slate-400 text-sm mb-10">
          <span className="flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-accent" />
            {post.readTime} min read
          </span>
          <span className="w-1 h-1 rounded-full bg-slate-300" />
          <span className="flex items-center gap-1.5">
            <CalendarDays className="w-4 h-4 text-accent" />9 May 2026
          </span>
        </div>

        <hr className="border-slate-100 mb-10" />

        {/* ── Article Body ── */}
        <article dangerouslySetInnerHTML={{ __html: html }} />

        <hr className="border-slate-100 mt-10" />
      </div>

      {/* ── CTA ── */}
      <div className="max-w-3xl mx-auto px-6 mt-12 mb-16">
        <div className="relative rounded-3xl bg-accent overflow-hidden py-14 px-8 text-center">
          {/* decorative circles */}
          <div className="pointer-events-none absolute -top-16 -right-16 w-56 h-56 rounded-full bg-white/10" />
          <div className="pointer-events-none absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-white/10" />

          <h2 className="relative text-3xl sm:text-4xl font-extrabold text-white mb-3 leading-tight">
            Ready to Get Your<br />Home Cleaned?
          </h2>
          <p className="relative text-white/70 mb-8 max-w-sm mx-auto leading-relaxed text-[15px]">
            Professional, certified cleaning teams. Satisfaction guaranteed or we return free.
          </p>
          <BlogPostCTA />
        </div>
      </div>

      {/* ── Related Posts ── */}
      <section className="py-16 px-6 bg-white border-t border-slate-200">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-slate-900">Related Articles</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedPosts.map((rel) => (
              <Link key={rel.slug} href={`/blog/${rel.slug}`} className="group flex flex-col overflow-hidden rounded-2xl bg-white border border-slate-200 hover:border-accent hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="relative h-40 overflow-hidden">
                  <Image src={rel.image} alt={rel.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <p className="text-accent text-xs font-bold  mb-1.5">{rel.category}</p>
                  <h3 className="text-base font-bold text-slate-900 mb-auto group-hover:text-accent transition-colors line-clamp-2 leading-snug">{rel.title}</h3>
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-100">
                    <span className="text-xs text-slate-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {rel.readTime} min
                    </span>
                    <span className="text-accent text-sm font-semibold group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                      Read <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
