"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Mail, MessageSquare, User, Send } from "lucide-react";

export default function ContactForm() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });
    const [loading, setLoading] = useState(false);

    const onChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
            toast.error("Please fill in your name, email, and message.");
            return;
        }
        setLoading(true);
        window.setTimeout(() => {
            setLoading(false);
            toast.success(
                "Thanks! Your message was noted. We’ll get back to you soon."
            );
            setForm({ name: "", email: "", subject: "", message: "" });
        }, 900);
    };

    return (
        <form
            onSubmit={onSubmit}
            data-testid="contact-form"
            className="space-y-5 rounded-3xl border border-ink-300/60 bg-cream-50 p-6 sm:p-8 lg:col-span-8"
        >
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <label className="block">
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-500">
                        Your name
                    </span>
                    <div className="mt-2 flex items-center gap-2 rounded-xl border border-ink-300 bg-white px-3 py-2.5 focus-within:border-ink-900 focus-within:ring-2 focus-within:ring-[#FACC15]/50">
                        <User className="h-4 w-4 text-ink-500" />
                        <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={onChange}
                            data-testid="contact-name"
                            placeholder="Jane Doe"
                            className="w-full bg-transparent text-sm text-ink-900 placeholder:text-ink-300 focus:outline-none"
                        />
                    </div>
                </label>
                <label className="block">
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-500">
                        Email
                    </span>
                    <div className="mt-2 flex items-center gap-2 rounded-xl border border-ink-300 bg-white px-3 py-2.5 focus-within:border-ink-900 focus-within:ring-2 focus-within:ring-[#FACC15]/50">
                        <Mail className="h-4 w-4 text-ink-500" />
                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={onChange}
                            data-testid="contact-email"
                            placeholder="jane@example.com"
                            className="w-full bg-transparent text-sm text-ink-900 placeholder:text-ink-300 focus:outline-none"
                        />
                    </div>
                </label>
            </div>

            <label className="block">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-500">
                    Subject
                </span>
                <div className="mt-2 rounded-xl border border-ink-300 bg-white px-3 py-2.5 focus-within:border-ink-900 focus-within:ring-2 focus-within:ring-[#FACC15]/50">
                    <input
                        type="text"
                        name="subject"
                        value={form.subject}
                        onChange={onChange}
                        data-testid="contact-subject"
                        placeholder="What is this about?"
                        className="w-full bg-transparent text-sm text-ink-900 placeholder:text-ink-300 focus:outline-none"
                    />
                </div>
            </label>

            <label className="block">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-500">
                    Message
                </span>
                <div className="mt-2 flex gap-2 rounded-xl border border-ink-300 bg-white px-3 py-2.5 focus-within:border-ink-900 focus-within:ring-2 focus-within:ring-[#FACC15]/50">
                    <MessageSquare className="mt-1 h-4 w-4 flex-shrink-0 text-ink-500" />
                    <textarea
                        name="message"
                        value={form.message}
                        onChange={onChange}
                        data-testid="contact-message"
                        rows={6}
                        placeholder="Tell us what you have on your mind…"
                        className="w-full resize-none bg-transparent text-sm leading-relaxed text-ink-900 placeholder:text-ink-300 focus:outline-none"
                    />
                </div>
            </label>

            <div className="flex items-center justify-between pt-2">
                <p className="text-xs text-ink-500">
                    We reply to most messages within 48 hours.
                </p>
                <button
                    type="submit"
                    disabled={loading}
                    data-testid="contact-submit"
                    className="inline-flex items-center gap-2 rounded-full bg-[#FACC15] px-6 py-3 text-sm font-bold text-ink-900 shadow-[0_2px_0_#1A1A14] ring-1 ring-ink-900 transition-transform hover:-translate-y-0.5 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {loading ? "Sending…" : "Send message"}
                    {!loading && <Send className="h-4 w-4" />}
                </button>
            </div>
        </form>
    );
}
