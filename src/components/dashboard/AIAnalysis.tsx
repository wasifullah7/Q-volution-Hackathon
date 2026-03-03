import { CardTitle } from "@/components/ui";
import { Send, Download } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import type { ChatMessage } from "@/types";
import type { SimulationStatus } from "@/types/simulation";

const AI_RESPONSES: Record<string, string> = {
  convergence:
    "The QAOA circuit shows strong convergence behavior with p=2 layers on the Rigetti QPU. The cost function decreased steadily over 73 iterations, reaching an optimal value of -10.57. The approximation ratio of 0.731 indicates good solution quality for this graph topology.",
  energy:
    "The simulation achieved approximately 10% energy savings compared to classical brute-force approaches. Carbon footprint was reduced by 0.12kg CO\u2082e per run, aligned with EPA Portfolio Manager benchmarks for quantum workloads.",
  gates:
    "The compiled circuit uses 46 single-qubit gates and 25 two-qubit (CZ/CNOT) gates with a circuit depth of 38. The 2-qubit gate count is the primary bottleneck on the Rigetti QPU due to native gate fidelity constraints (~99.5% for 1Q, ~97% for 2Q).",
  results:
    "The measurement results show a clear dominant bitstring '0000111' with 520 counts out of 2690 total shots. This corresponds to a Max-Cut partition that separates 3 nodes from the remaining 6, achieving a cut value of -10.57. The top 3 bitstrings account for ~49% of all measurements, indicating strong solution concentration.",
  optimal:
    "The optimal value of -10.57 represents the best Max-Cut objective found. For this 9-node graph with 29 edges, the theoretical maximum cut is approximately -12.0, giving an approximation ratio of ~0.88. Increasing QAOA layers to p=3 could improve this to ~0.92 based on typical scaling behavior.",
  meps:
    "MEPS (Mean Energy Per Shot) of 0.731 quantifies the average solution quality across all measurement shots. Values closer to 1.0 indicate that most shots return near-optimal solutions. The current value suggests moderate concentration around the optimal — increasing shot count from 1024 to 4096 could help identify better solutions.",
  depth:
    "Circuit depth of 38 is within the coherence window of the Rigetti Ankaa-2 processor (T1 ~ 20\u03bcs, gate time ~ 60ns). However, for deeper circuits (p=3,4), decoherence effects may become significant. Consider using error mitigation techniques like ZNE (Zero Noise Extrapolation) for improved results.",
  summary:
    "Simulation complete! The QAOA circuit with p=2 layers converged in 73 iterations on the Rigetti QPU. Optimal cut value: -10.57 with MEPS 0.731. Circuit compiled to 71 total gates (depth 38). Energy savings: ~10% vs classical. Ask me about any specific metric for deeper analysis.",
  default:
    "Based on the current QAOA simulation: The 9-node graph was optimized using p=2 layers on the Rigetti QPU. Key findings include an optimal cut value of -10.57, 73 optimization iterations, and a MEPS of 0.731. The circuit compiled to 46 single-qubit and 25 two-qubit gates with depth 38. Try asking about specific metrics like 'gates', 'energy savings', 'convergence', or 'optimal value'.",
};

function getAIResponse(question: string, simStatus: SimulationStatus): string {
  if (simStatus !== "completed") {
    return "No simulation data available yet. Please run a simulation first, then ask me about the results.";
  }

  const q = question.toLowerCase();

  if (q.includes("summar") || q.includes("overview") || q.includes("analyz") || q.includes("analys") || q.includes("report"))
    return AI_RESPONSES.summary;
  if (q.includes("converg") || q.includes("iteration") || q.includes("optimiz"))
    return AI_RESPONSES.convergence;
  if (q.includes("energy") || q.includes("carbon") || q.includes("sustain") || q.includes("green") || q.includes("eco"))
    return AI_RESPONSES.energy;
  if (q.includes("gate") || q.includes("qubit") || q.includes("circuit") || q.includes("compile"))
    return AI_RESPONSES.gates;
  if (q.includes("result") || q.includes("measurement") || q.includes("bitstring") || q.includes("shot") || q.includes("count"))
    return AI_RESPONSES.results;
  if (q.includes("optimal") || q.includes("cut") || q.includes("max") || q.includes("value") || q.includes("objective"))
    return AI_RESPONSES.optimal;
  if (q.includes("meps") || q.includes("mean energy") || q.includes("quality"))
    return AI_RESPONSES.meps;
  if (q.includes("depth") || q.includes("coherence") || q.includes("noise") || q.includes("error"))
    return AI_RESPONSES.depth;
  return AI_RESPONSES.default;
}

interface AIAnalysisProps {
  simStatus: SimulationStatus;
  onExport?: () => void;
  isExporting?: boolean;
}

export function AIAnalysis({ simStatus, onExport, isExporting }: AIAnalysisProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "ai",
      content: "Ready to analyze your QAOA results. Run a simulation and then ask me anything about the results.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // When simulation completes, update the status message (no auto AI response)
  useEffect(() => {
    if (simStatus === "completed") {
      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          content: "Simulation finished. Ask me anything — try 'summary', 'gates', 'energy', 'convergence', 'optimal', 'meps', or 'depth'.",
        },
      ]);
    }
  }, [simStatus]);

  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    setMessages((prev) => [...prev, { role: "user", content: trimmed }]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const response = getAIResponse(trimmed, simStatus);
      setMessages((prev) => [...prev, { role: "ai", content: response }]);
      setIsTyping(false);
    }, 800 + Math.random() * 700);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-1 flex-col gap-4">
      <CardTitle>AI Analysis</CardTitle>

      <div className="flex flex-1 flex-col overflow-hidden rounded-lg border border-border-subtle bg-bg-surface-1">
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
                className={`font-mono text-sm leading-relaxed ${
                  msg.role === "ai"
                    ? "text-text-secondary"
                    : "text-accent-secondary"
                }`}
              >
                {msg.content}
              </p>
            </div>
          ))}
          {isTyping && (
            <div className="space-y-1">
              <span className="font-body text-xs font-medium uppercase tracking-wider text-accent-primary">
                AI:
              </span>
              <div className="flex items-center gap-1">
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-accent-primary [animation-delay:0ms]" />
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-accent-primary [animation-delay:150ms]" />
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-accent-primary [animation-delay:300ms]" />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="border-t border-border-subtle p-3">
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about results..."
              className="flex-1 rounded-lg border border-border-subtle bg-bg-surface-2 px-3 py-2 font-body text-sm text-text-primary placeholder:text-text-tertiary focus:border-accent-primary focus:outline-none focus:ring-1 focus:ring-accent-primary/50 transition-colors"
            />
            <button
              onClick={handleSend}
              disabled={isTyping || !input.trim()}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-bg-surface-2 text-text-secondary transition-colors hover:bg-bg-surface-3 hover:text-text-primary disabled:opacity-50"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Export Report */}
      <button
        onClick={onExport}
        disabled={isExporting}
        className="flex w-full items-center justify-center gap-2 rounded-lg border border-border-subtle bg-bg-surface-2 px-4 py-3 font-display text-sm font-semibold uppercase tracking-wider text-text-primary transition-colors hover:border-accent-primary hover:text-accent-primary disabled:opacity-50"
      >
        <Download className={`h-4 w-4 ${isExporting ? "animate-bounce" : ""}`} />
        {isExporting ? "Generating PDF..." : "Export Report"}
      </button>
    </div>
  );
}
