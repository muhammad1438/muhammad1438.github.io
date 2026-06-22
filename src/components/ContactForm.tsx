"use client";

import React, { useState } from "react";
import { Send, Mail, MapPin, Phone } from "lucide-react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    const subject = encodeURIComponent(formData.subject || `Message from ${formData.name}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`
    );
    window.location.href = `mailto:m.fahad1448@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-5 gap-8 items-stretch">
      {/* Contact Info Card */}
      <div className="lg:col-span-2 p-6 md:p-8 rounded-2xl bg-glass-bg border border-edge backdrop-blur-md flex flex-col justify-between space-y-8 shadow-xl">
        <div className="space-y-6">
          <h3 className="font-heading font-semibold text-lg text-ink">
            Connection Node
          </h3>
          <p className="text-sm leading-relaxed text-faint">
            Interested in postdoctoral research collaborations, computational modeling projects, or academic consults? Send a message and let's build the future of green science together.
          </p>

          <div className="space-y-4 pt-2">
            <div className="flex items-center gap-4 group">
              <div className="w-10 h-10 rounded-xl bg-glass-bg border border-edge flex items-center justify-center text-accent-primary group-hover:border-accent-primary/30 group-hover:bg-accent-primary/5 transition-all">
                <MapPin className="w-4 h-4" />
              </div>
              <div className="text-left">
                <div className="text-[10px] font-mono uppercase tracking-widest text-faint">Location</div>
                <div className="text-sm font-medium text-ink">Lahore, Pakistan</div>
              </div>
            </div>

            <div className="flex items-center gap-4 group">
              <div className="w-10 h-10 rounded-xl bg-glass-bg border border-edge flex items-center justify-center text-accent-primary group-hover:border-accent-primary/30 group-hover:bg-accent-primary/5 transition-all">
                <Mail className="w-4 h-4" />
              </div>
              <div className="text-left">
                <div className="text-[10px] font-mono uppercase tracking-widest text-faint">Email</div>
                <a
                  href="mailto:m.fahad1448@gmail.com"
                  className="text-sm font-mono text-accent-primary hover:underline"
                >
                  m.fahad1448@gmail.com
                </a>
              </div>
            </div>

            <div className="flex items-center gap-4 group">
              <div className="w-10 h-10 rounded-xl bg-glass-bg border border-edge flex items-center justify-center text-accent-primary group-hover:border-accent-primary/30 group-hover:bg-accent-primary/5 transition-all">
                <Phone className="w-4 h-4" />
              </div>
              <div className="text-left">
                <div className="text-[10px] font-mono uppercase tracking-widest text-faint">Phone</div>
                <div className="text-sm font-mono text-ink">+92-321-4881565</div>
              </div>
            </div>
          </div>
        </div>

        {/* Social Badges */}
        <div className="flex flex-wrap gap-2 pt-6 border-t border-edge">
          <a
            href="https://github.com/muhammad1438"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 rounded-lg border border-edge bg-glass-bg hover:bg-glass-bg text-xs font-mono text-faint hover:text-ink transition-all"
          >
            github
          </a>
          <a
            href="https://linkedin.com/in/mfahadarshad"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 rounded-lg border border-edge bg-glass-bg hover:bg-glass-bg text-xs font-mono text-faint hover:text-ink transition-all"
          >
            linkedin
          </a>
          <a
            href="https://orcid.org/0000-0003-1828-9458"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 rounded-lg border border-edge bg-glass-bg hover:bg-glass-bg text-xs font-mono text-faint hover:text-ink transition-all"
          >
            orcid
          </a>
        </div>
      </div>

      {/* Contact Form Element */}
      <div className="lg:col-span-3 p-6 md:p-8 rounded-2xl bg-glass-bg border border-edge backdrop-blur-md flex flex-col justify-center shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-4 text-left">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-mono uppercase tracking-widest text-faint">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl bg-glass-bg border border-edge text-sm text-foreground focus:outline-none focus:border-accent-primary/40 focus:bg-glass-bg transition-all"
                  placeholder="e.g. John Doe"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-mono uppercase tracking-widest text-faint">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl bg-glass-bg border border-edge text-sm text-foreground focus:outline-none focus:border-accent-primary/40 focus:bg-glass-bg transition-all"
                  placeholder="e.g. email@example.com"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-mono uppercase tracking-widest text-faint">
                Subject
              </label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl bg-glass-bg border border-edge text-sm text-foreground focus:outline-none focus:border-accent-primary/40 focus:bg-glass-bg transition-all"
                placeholder="How can we collaborate?"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-mono uppercase tracking-widest text-faint">
                Message
              </label>
              <textarea
                name="message"
                required
                rows={4}
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl bg-glass-bg border border-edge text-sm text-foreground focus:outline-none focus:border-accent-primary/40 focus:bg-glass-bg transition-all resize-none"
                placeholder="Write your scientific inquiry or opportunity details here..."
              />
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-accent-primary hover:bg-accent-primary/90 text-background font-heading font-medium text-sm transition-all hover:shadow-[0_8px_24px_color-mix(in_srgb,var(--accent-primary)_30%,transparent)] cursor-pointer"
            >
              <Send className="w-4 h-4" />
              Open Email Client
            </button>
            <p className="text-[10px] text-center text-muted-foreground font-mono">
              Opens your default email app with the message pre-filled.
            </p>
          </form>
      </div>
    </div>
  );
}
