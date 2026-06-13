import { Check, Copy } from "lucide-react";
import { useState, type ReactNode } from "react";

export function CodeBlock({
  children,
  className,
}: {
  children?: ReactNode;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);
  const lang = className?.replace("language-", "") ?? "";
  const text = typeof children === "string" ? children : String(children ?? "");

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(text.replace(/\n$/, ""));
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* noop */
    }
  };

  return (
    <div className="group relative my-4">
      {lang && (
        <div className="absolute left-3 top-2 text-[10px] font-medium uppercase tracking-wider text-muted-foreground/70">
          {lang}
        </div>
      )}
      <button
        onClick={onCopy}
        className="absolute right-2 top-2 inline-flex h-7 w-7 items-center justify-center rounded-md border border-border/40 bg-background/10 text-muted-foreground opacity-0 transition group-hover:opacity-100 hover:text-foreground"
        aria-label="Copy"
      >
        {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
      </button>
      <pre className={lang ? "pt-7" : ""}>
        <code className={className}>{children}</code>
      </pre>
    </div>
  );
}
