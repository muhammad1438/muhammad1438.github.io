"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, SortAsc, ExternalLink } from "lucide-react";
import publicationsData from "../../data/publications.json";

interface Publication {
  title: string;
  year: number;
  venue: string;
  doi?: string | null;
  url?: string | null;
  authors: string[];
  cited_by_openalex?: number | null;
}

const TOPICS = [
  { id: "all", label: "All", terms: [] },
  { id: "methane", label: "Methane", terms: ["methane", "ch4"] },
  { id: "hydrogen", label: "Hydrogen", terms: ["hydrogen", "h2"] },
  { id: "co2", label: "CO2", terms: ["co2", "carbon dioxide"] },
  { id: "catalysis", label: "Catalysis", terms: ["catalyst", "catalytic", "catalysis"] },
  { id: "dft", label: "DFT", terms: ["dft", "ab initio", "thermodynamic"] },
] as const;

export default function PublicationsList() {
  const [searchQuery, setSearchQuery] = useState("");
  const [authorFilter, setAuthorFilter] = useState<"all" | "first" | "co">("all");
  const [topicFilter, setTopicFilter] = useState<(typeof TOPICS)[number]["id"]>("all");
  const [sortBy, setSortBy] = useState<"year-desc" | "year-asc" | "citations-desc">("year-desc");

  // Typecast imported JSON
  const publications = publicationsData as Publication[];

  // Calculate metrics
  const metrics = useMemo(() => {
    let totalCitations = 0;
    const citationList: number[] = [];

    publications.forEach((pub) => {
      const citations = pub.cited_by_openalex || 0;
      totalCitations += citations;
      citationList.push(citations);
    });

    // Sort citations descending for h-index
    citationList.sort((a, b) => b - a);

    // Calculate h-index
    let hIndex = 0;
    for (let i = 0; i < citationList.length; i++) {
      if (citationList[i] >= i + 1) {
        hIndex = i + 1;
      } else {
        break;
      }
    }

    // Calculate i10-index (publications with >= 10 citations)
    const i10Index = citationList.filter((citations) => citations >= 10).length;

    return {
      total: publications.length,
      citations: totalCitations,
      hIndex,
      i10Index,
    };
  }, [publications]);

  // Filter & sort publications
  const filteredAndSorted = useMemo(() => {
    let result = [...publications];

    // 1. Search Query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (pub) =>
          pub.title.toLowerCase().includes(query) ||
          pub.venue.toLowerCase().includes(query) ||
          pub.authors.some((author) => author.toLowerCase().includes(query))
      );
    }

    // 2. Author Role Filter
    if (authorFilter === "first") {
      result = result.filter((pub) => {
        // Highlight first author: check if first author contains Arshad & Fahad
        const firstAuthor = pub.authors[0] || "";
        return firstAuthor.includes("Arshad") && firstAuthor.includes("Fahad");
      });
    } else if (authorFilter === "co") {
      result = result.filter((pub) => {
        const firstAuthor = pub.authors[0] || "";
        const isFirst = firstAuthor.includes("Arshad") && firstAuthor.includes("Fahad");
        return !isFirst;
      });
    }

    if (topicFilter !== "all") {
      const topic = TOPICS.find((item) => item.id === topicFilter);
      if (topic) {
        result = result.filter((pub) => {
          const haystack = `${pub.title} ${pub.venue}`.toLowerCase();
          return topic.terms.some((term) => haystack.includes(term));
        });
      }
    }

    // 3. Sorting
    if (sortBy === "year-desc") {
      result.sort((a, b) => b.year - a.year);
    } else if (sortBy === "year-asc") {
      result.sort((a, b) => a.year - b.year);
    } else if (sortBy === "citations-desc") {
      result.sort((a, b) => (b.cited_by_openalex || 0) - (a.cited_by_openalex || 0));
    }

    return result;
  }, [publications, searchQuery, authorFilter, topicFilter, sortBy]);

  return (
    <div className="w-full space-y-8">
      {/* Metrics Banner */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-5 rounded-2xl bg-glass-bg border border-edge backdrop-blur-md">
        <div className="text-center space-y-1">
          <div className="text-2xl md:text-3xl font-heading font-bold text-accent-primary">{metrics.total}</div>
          <div className="text-label uppercase tracking-widest text-faint">Publications</div>
        </div>
        <div className="text-center space-y-1 border-l border-edge">
          <div className="text-2xl md:text-3xl font-heading font-bold text-accent-primary">{metrics.citations}</div>
          <div className="text-label uppercase tracking-widest text-faint">Citations</div>
        </div>
        <div className="text-center space-y-1 border-l border-edge">
          <div className="text-2xl md:text-3xl font-heading font-bold text-accent-secondary">{metrics.hIndex}</div>
          <div className="text-label uppercase tracking-widest text-faint">h-index</div>
        </div>
        <div className="text-center space-y-1 border-l border-edge">
          <div className="text-2xl md:text-3xl font-heading font-bold text-accent-secondary">{metrics.i10Index}</div>
          <div className="text-label uppercase tracking-widest text-faint">i10-index</div>
        </div>
      </div>

      {/* Filters Toolbar */}
      <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between pb-2">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-faint" />
          <input
            type="text"
            placeholder="Search publications, journals, authors..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-glass-bg border border-edge text-sm text-ink placeholder-faint/60 focus:outline-none focus:border-accent-primary/50 focus:bg-glass-bg transition-all"
          />
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap gap-3 items-center">
          {/* Author filter */}
          <div className="flex bg-glass-bg border border-edge rounded-xl p-1 text-xs">
            <button
              onClick={() => setAuthorFilter("all")}
              className={`px-3 py-1.5 rounded-lg font-mono transition-all cursor-pointer ${
                authorFilter === "all" ? "bg-glass-bg text-ink" : "text-faint/60 hover:text-ink"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setAuthorFilter("first")}
              className={`px-3 py-1.5 rounded-lg font-mono transition-all cursor-pointer ${
                authorFilter === "first" ? "bg-glass-bg text-ink" : "text-faint/60 hover:text-ink"
              }`}
            >
              First Author
            </button>
            <button
              onClick={() => setAuthorFilter("co")}
              className={`px-3 py-1.5 rounded-lg font-mono transition-all cursor-pointer ${
                authorFilter === "co" ? "bg-glass-bg text-ink" : "text-faint/60 hover:text-ink"
              }`}
            >
              Co-Author
            </button>
          </div>

          {/* Sort dropdown */}
          <div className="relative flex items-center bg-glass-bg border border-edge rounded-xl px-3 py-2 text-xs text-faint">
            <SortAsc className="w-3.5 h-3.5 mr-2" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as "year-desc" | "year-asc" | "citations-desc")}
              className="bg-transparent text-ink focus:outline-none cursor-pointer pr-1"
            >
              <option value="year-desc" className="bg-background">Newest First</option>
              <option value="citations-desc" className="bg-background">Most Cited</option>
              <option value="year-asc" className="bg-background">Oldest First</option>
            </select>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {TOPICS.map((topic) => (
          <button
            key={topic.id}
            onClick={() => setTopicFilter(topic.id)}
            className={`rounded-full border px-3 py-1.5 font-mono text-label transition-all ${
              topicFilter === topic.id
                ? "border-accent-primary/40 bg-accent-primary/10 text-accent-primary"
                : "border-edge bg-glass-bg text-faint hover:text-ink"
            }`}
          >
            {topic.label}
          </button>
        ))}
      </div>

      {/* Publications List */}
      <div className="space-y-4">
        {filteredAndSorted.length === 0 ? (
          <div className="text-center py-12 border border-dashed border-edge rounded-2xl text-faint/60">
            No publications found matching your search criteria.
          </div>
        ) : (
          <div className="grid gap-4">
            <AnimatePresence mode="popLayout">
              {filteredAndSorted.map((pub) => {
                const isFirstAuthor =
                  pub.authors[0]?.includes("Arshad") && pub.authors[0]?.includes("Fahad");

                return (
                  <motion.div
                    layout
                    key={pub.doi || pub.title}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.35, ease: "easeInOut" }}
                    className="group relative flex flex-col md:flex-row md:items-center justify-between p-6 rounded-xl border border-edge bg-glass-bg hover:bg-glass-bg hover:border-accent-primary/25 transition-all duration-300 shadow-lg"
                  >
                    {/* Highlight Border for First Author */}
                    {isFirstAuthor && (
                      <div className="absolute top-0 left-0 bottom-0 w-[3px] bg-accent-secondary rounded-l-xl" />
                    )}

                    <div className="flex-1 space-y-2.5 pr-0 md:pr-8">
                      {/* Badge / Year */}
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs text-accent-primary font-medium bg-accent-primary/5 border border-accent-primary/20 px-2.5 py-0.5 rounded-full">
                          {pub.year}
                        </span>
                        {isFirstAuthor && (
                          <span className="font-mono text-label text-accent-secondary uppercase tracking-wider font-semibold bg-accent-secondary/5 border border-accent-secondary/25 px-2.5 py-0.5 rounded-full">
                            ★ First Author
                          </span>
                        )}
                        {pub.cited_by_openalex !== undefined && pub.cited_by_openalex !== null && (
                          <span className="font-mono text-xs text-faint/60">
                            · {pub.cited_by_openalex} citations
                          </span>
                        )}
                      </div>

                      {/* Title */}
                      <h4 className="text-base font-heading font-medium leading-relaxed text-ink group-hover:text-accent-primary transition-colors">
                        {pub.url ? (
                          <a href={pub.url} target="_blank" rel="noopener noreferrer" className="hover:underline inline-flex items-center gap-1.5">
                            {pub.title}
                            <ExternalLink className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </a>
                        ) : (
                          pub.title
                        )}
                      </h4>

                      {/* Authors */}
                      <p className="text-xs text-faint leading-relaxed">
                        {pub.authors.map((author, index) => {
                          const isMe = author.includes("Arshad") && author.includes("Fahad");
                          return (
                            <span key={author}>
                              {isMe ? (
                                <strong className="text-ink font-semibold underline decoration-accent-secondary/60 underline-offset-2">
                                  {author}
                                </strong>
                              ) : (
                                author
                              )}
                              {index < pub.authors.length - 1 ? " · " : ""}
                            </span>
                          );
                        })}
                      </p>

                      {/* Venue */}
                      <p className="text-xs font-mono text-faint/60 italic font-light">
                        {pub.venue}
                      </p>
                    </div>

                    {/* Quick Link Buttons (Mobile: top-margin) */}
                    <div className="mt-4 md:mt-0 flex items-center gap-3">
                      {pub.doi && (
                        <a
                          href={`https://doi.org/${pub.doi}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center px-3 py-1.5 rounded-lg border border-edge hover:border-accent-primary/30 bg-glass-bg hover:bg-accent-primary/5 font-mono text-label text-faint hover:text-accent-primary transition-all cursor-pointer"
                        >
                          doi:{pub.doi}
                        </a>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}
