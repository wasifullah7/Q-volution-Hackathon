import { Card, CardTitle } from "@/components/ui";
import { Send } from "lucide-react";
import { useState } from "react";
import type { ChatMessage } from "@/types";

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    role: "ai",
    content:
      "Ready to analyze your QAOA results. Run a simulation to get started.",
  },
  {
    role: "user",
    content: "explain this to me",
  },
  {
    role: "ai",
    content:
      "The QAOA circuit shows good convergence with p=2 layers. The cost landscape has a clear minimum at the reported optimal value. The approximation ratio of 0.601 indicates moderate solution quality — increasing layers to p=3 could improve this.",
  },
];

export function AIAnalysis() {
  const [messages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState("");

  return (
    <div className="flex flex-1 flex-col gap-4">
      <CardTitle>AI Analysis</CardTitle>

      <Card className="flex flex-1 flex-col overflow-hidden p-0">
        {/* Messages */}
        <div className="flex-1 space-y-3 overflow-y-auto p-4">
          {messages.map((msg, i) => (
            <div key={i} className="space-y-1">
              <span
                className={`font-body text-xs font-medium uppercase tracking-wider ${
                  msg.role === "ai"
                    ? "text-accent-primary"
                    : "text-accent-secondary"
                }`}
              >
                {msg.role === "ai" ? "AI:" : "You:"}
              </span>
              <p
                className={`font-body text-sm leading-relaxed ${
                  msg.role === "ai"
                    ? "text-text-primary"
                    : "text-accent-secondary"
                }`}
              >
                {msg.content}
              </p>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="border-t border-border-subtle p-3">
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about results..."
              className="flex-1 rounded-lg border border-border-subtle bg-bg-surface-2 px-3 py-2 font-body text-sm text-text-primary placeholder:text-text-tertiary focus:border-accent-primary focus:outline-none focus:ring-1 focus:ring-accent-primary/50 transition-colors"
            />
            <button className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent-primary text-bg-base transition-colors hover:bg-accent-primary-hover">
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
}
