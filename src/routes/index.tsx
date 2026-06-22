import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2, FileJson, Github, Terminal } from "lucide-react";
import { SiteHeader } from "@/components/site-header";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Evaluation Context Protocol — Portable evaluations for AI agents" },
      {
        name: "description",
        content:
          "ECP is a vendor-neutral JSON-RPC protocol for grading agent outputs, tool calls, and audit context across frameworks, models, and CI systems.",
      },
      {
        property: "og:title",
        content: "Evaluation Context Protocol — Portable evaluations for AI agents",
      },
      {
        property: "og:description",
        content:
          "A common evaluation contract for AI agents. Grade outputs, tool calls, and evaluator-safe audit context across frameworks and CI.",
      },
    ],
  }),
  component: Landing,
});

function Landing() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-[1100px] px-6">
        {/* Hero */}
        <section className="pt-20 pb-16 sm:pt-28 sm:pb-24">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-muted/40 px-3 py-1 text-xs text-muted-foreground">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary" />
              v0.3.3 · JSON-RPC 2.0
            </div>
            <h1 className="text-4xl font-semibold tracking-tight sm:text-6xl">
              Portable evaluations
              <br />
              <span className="text-muted-foreground">for AI agents.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              ECP is a vendor-neutral protocol for testing agent outputs, tool calls, and
              evaluator-visible audit context — across frameworks, models, eval platforms,
              and CI systems.
            </p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <Link
                to="/quickstart"
                className="group inline-flex items-center gap-1.5 rounded-md bg-foreground px-4 py-2.5 text-sm font-medium text-background transition hover:opacity-90"
              >
                Get started
                <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
              </Link>
              <Link
                to="/spec"
                className="inline-flex items-center gap-1.5 rounded-md border border-border bg-background px-4 py-2.5 text-sm font-medium transition hover:bg-muted"
              >
                Read the spec
              </Link>
              <a
                href="https://github.com/evaluation-context-protocol/ecp"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-md px-3 py-2.5 text-sm text-muted-foreground transition hover:text-foreground"
              >
                <Github className="h-3.5 w-3.5" />
                GitHub
              </a>
            </div>
          </div>

          {/* Code preview */}
          <div className="mx-auto mt-16 max-w-2xl overflow-hidden rounded-xl border border-border bg-[var(--code-bg)] shadow-2xl shadow-foreground/5">
            <div className="flex items-center gap-1.5 border-b border-white/10 px-4 py-2.5">
              <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
              <span className="ml-3 text-[11px] text-white/40">terminal</span>
            </div>
            <pre className="px-5 py-5 text-[13px] leading-relaxed text-[var(--code-fg)]">
              <code>
                <span className="text-white/40">$</span> pip install{" "}
                <span className="text-[oklch(0.82_0.14_140)]">"ecp-runtime==0.3.3"</span>{" "}
                <span className="text-[oklch(0.82_0.14_140)]">"ecp-sdk==0.3.3"</span>
                {"\n"}
                <span className="text-white/40">$</span> ecp init{"\n"}
                <span className="text-white/40">$</span> ecp run --manifest{" "}
                ecp_eval/manifest.yaml --json{"\n"}
                {"\n"}
                <span className="text-white/40">{"# 3 scenarios · 7 graders · "}</span>
                <span className="text-[oklch(0.82_0.14_140)]">all passed ✓</span>
              </code>
            </pre>
          </div>
        </section>

        {/* MCP contrast */}
        <section className="border-t border-border py-16">
          <div className="grid gap-10 md:grid-cols-2">
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                The evaluation contract layer
              </div>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight">
                MCP is for tools. ECP is for evals.
              </h2>
            </div>
            <p className="text-muted-foreground">
              MCP gives agents a common way to use tools. ECP gives evaluators a common
              way to inspect what an agent returned, what tools it used, and what audit
              evidence it exposed — independent of the framework that built the agent or
              the platform that runs the test.
            </p>
          </div>
        </section>

        {/* What ECP checks */}
        <section className="border-t border-border py-16">
          <div className="mb-10 max-w-2xl">
            <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              What ECP checks
            </div>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight">
              Beyond the final answer.
            </h2>
            <p className="mt-3 text-muted-foreground">
              Most evals start with the final answer. ECP also checks the behavior behind
              it.
            </p>
          </div>

          <div className="grid gap-px overflow-hidden rounded-xl border border-border bg-border md:grid-cols-2">
            {[
              {
                code: "public_output",
                label: "Did the user-visible answer satisfy the task?",
              },
              {
                code: "tool_calls",
                label: "Did the agent call the required tool with the right arguments?",
              },
              {
                code: "evaluation_context",
                label: "Did the agent expose evaluator-safe audit evidence?",
              },
              {
                code: "ecp run --manifest",
                label: "Can this run in CI and fail a build?",
              },
            ].map((row) => (
              <div key={row.code} className="flex flex-col gap-3 bg-card p-6">
                <code className="w-fit rounded bg-muted px-2 py-0.5 text-[13px] text-foreground">
                  {row.code}
                </code>
                <div className="text-sm text-muted-foreground">{row.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Features */}
        <section className="border-t border-border py-16">
          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                icon: Terminal,
                title: "Runs anywhere",
                body: "Run evals locally or wire ecp run into your CI. Exits non-zero on failure, so a regression breaks the build.",
              },
              {
                icon: CheckCircle2,
                title: "Framework neutral",
                body: "Wrap agents built with plain Python, LangChain, LlamaIndex, CrewAI, or PydanticAI behind one evaluation contract.",
              },
              {
                icon: FileJson,
                title: "JSON-RPC contract",
                body: "Implement the protocol in any language: agent/initialize, agent/step, agent/reset over stdio or Streamable HTTP.",
              },
            ].map((f) => (
              <div key={f.title}>
                <div className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-md border border-border bg-muted/40">
                  <f.icon className="h-4 w-4" />
                </div>
                <h3 className="text-base font-semibold">{f.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  {f.body}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Frameworks */}
        <section className="border-t border-border py-16">
          <div className="mb-8 text-center">
            <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Works with
            </div>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight">
              Your existing agent stack.
            </h2>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {[
              "Plain Python",
              "LangChain",
              "LlamaIndex",
              "CrewAI",
              "PydanticAI",
              "Streamable HTTP",
            ].map((n) => (
              <span
                key={n}
                className="rounded-full border border-border bg-card px-3.5 py-1.5 text-sm text-muted-foreground"
              >
                {n}
              </span>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="border-t border-border py-20">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-semibold tracking-tight">
              Start grading agents in five commands.
            </h2>
            <p className="mt-3 text-muted-foreground">
              Install the runtime, initialize a starter manifest, and run your first eval.
            </p>
            <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
              <Link
                to="/quickstart"
                className="inline-flex items-center gap-1.5 rounded-md bg-foreground px-4 py-2.5 text-sm font-medium text-background transition hover:opacity-90"
              >
                Quickstart
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <Link
                to="/introduction"
                className="inline-flex items-center gap-1.5 rounded-md border border-border px-4 py-2.5 text-sm font-medium transition hover:bg-muted"
              >
                Read the docs
              </Link>
            </div>
          </div>
        </section>

        <footer className="border-t border-border py-10 text-sm text-muted-foreground">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>Evaluation Context Protocol · Open source</div>
            <div className="flex gap-5">
              <Link to="/spec" className="hover:text-foreground">
                Spec
              </Link>
              <Link to="/quickstart" className="hover:text-foreground">
                Quickstart
              </Link>
              <a
                href="https://github.com/evaluation-context-protocol/ecp"
                target="_blank"
                rel="noreferrer"
                className="hover:text-foreground"
              >
                GitHub
              </a>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
