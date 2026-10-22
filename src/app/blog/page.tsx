import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BLOG_POSTS } from "./data";
import BlogCTA from "./BlogCTA";
import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { blogIndex, breadcrumbs, OG_IMAGE } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Cleaning Guides & Tips",
  description: "Practical guides from Clean Tenancy on end of tenancy cleaning, deep cleans, after builders cleaning, carpets, ovens and pressure washing.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Cleaning Guides & Tips | Clean Tenancy",
    description: "Practical guides on end of tenancy cleaning, deep cleans, carpets, ovens and more.",
    url: "/blog",
    images: [{ url: OG_IMAGE, width: 1200, height: 630 }],
  },
};

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <JsonLd data={[blogIndex(BLOG_POSTS), breadcrumbs([{ name: "Cleaning Guides", path: "/blog" }])]} />
      {/* Header */}
      <section className="pt-20 pb-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 mb-4 leading-tight">Cleaning Insights & Tips</h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">Expert guides, insider tips, and everything you need to know about keeping your home spotless.</p>
          </div>
        </div>
      </section>

      {/* Blog Cards Grid */}
      <section className="pb-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {BLOG_POSTS.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="group overflow-hidden rounded-2xl bg-white border border-slate-200 hover:border-accent hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                {/* Image */}
                <div className="relative h-48 bg-gradient-to-br from-accent/10 to-accent/5 overflow-hidden">
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                </div>

                {/* Content */}
                <div className="p-6">
                  <p className="text-accent text-xs font-bold  mb-2">{post.category}</p>
                  <h2 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-accent transition-colors line-clamp-2">{post.title}</h2>
                  <p className="text-slate-600 text-sm mb-4 line-clamp-3 leading-relaxed">{post.excerpt}</p>

                  {/* Meta & CTA */}
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-500">{post.readTime} min read</span>
                    <span className="inline-flex items-center gap-2 text-accent font-semibold group-hover:gap-3 transition-all">
                      Read More
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-gradient-to-r from-accent via-blue-600 to-accent py-20 text-center relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl"></div>
        </div>
        <div className="mx-auto max-w-2xl px-6 relative z-10">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-4 leading-tight">Ready for a Spotless Home?</h2>
          <p className="text-white/90 text-lg mb-10 max-w-lg mx-auto leading-relaxed">Book in under 2 minutes. Get a free quote from our professional cleaning teams. Satisfaction guaranteed.</p>
          <BlogCTA />
        </div>
      </section>
    </div>
  );
}
