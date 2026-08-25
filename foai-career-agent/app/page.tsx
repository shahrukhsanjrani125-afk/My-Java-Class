"use client";

import { useState } from "react";

export default function Home() {
  const [message, setMessage] = useState("");

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col px-6 py-8">
        <header className="flex items-center justify-between border-b border-slate-800 pb-6">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">FOAI Career Agent</h1>
            <p className="mt-1 text-sm text-slate-400">
              AI-powered career intelligence platform
            </p>
          </div>

          <div className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-sm text-emerald-400">
            AI Agent Online
          </div>
        </header>

        <section className="grid flex-1 items-center gap-10 py-16 lg:grid-cols-2">
          <div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-cyan-400">
              Career Intelligence
            </p>

            <h2 className="max-w-3xl text-5xl font-bold leading-tight sm:text-6xl">
              Build your career with an
              <span className="text-cyan-400"> AI Career Agent.</span>
            </h2>

            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-400">
              Analyze your skills, improve your CV, discover suitable career
              paths, prepare for interviews, and get personalized AI guidance.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {[
                "CV Analysis",
                "Job Matching",
                "Skill Gap",
                "Interview Prep",
              ].map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-slate-700 bg-slate-900 px-4 py-2 text-sm text-slate-300"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-2xl">
            <div className="mb-6">
              <h3 className="text-xl font-semibold">Career Assistant</h3>
              <p className="mt-1 text-sm text-slate-400">
                Tell the agent what you want to achieve.
              </p>
            </div>

            <div className="mb-4 min-h-40 rounded-2xl border border-slate-800 bg-slate-950 p-5">
              <p className="text-sm text-slate-500">
                AI responses will appear here...
              </p>
            </div>

            <div className="flex gap-3">
              <input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Ask about your career..."
                className="min-w-0 flex-1 rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm outline-none placeholder:text-slate-600 focus:border-cyan-400"
              />

              <button
                onClick={() => setMessage("")}
                className="rounded-xl bg-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
              >
                Send
              </button>
            </div>
          </div>
        </section>

        <footer className="border-t border-slate-800 pt-5 text-center text-sm text-slate-500">
          FOAI Career Agent • Local Development
        </footer>
      </div>
    </main>
  );
}
