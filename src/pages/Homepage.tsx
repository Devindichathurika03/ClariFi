import { useState } from "react";
import { Lightbulb, Copy, Check } from "lucide-react";

type Context = "Career" | "Study" | "Personal" | "Project";

interface Analysis {
  reality: string;
  variables: string[];
  nextStep: string;
}

export default function Home() {
  const [situation, setSituation] = useState("");
  const [context, setContext] = useState<Context>("Personal");
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");

  // API CALL
  const generateAnalysis = async () => {
    if (!situation.trim()) return;

    setError("");
    setLoading(true);
    setAnalysis(null);

    try {
      const res = await fetch("http://localhost:5000/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ situation, context }),
      });

      if (!res.ok) throw new Error("Failed to analyze");

      const data: Analysis = await res.json();
      setAnalysis(data);
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  //  COPY HANDLER
  const handleCopy = async () => {
    if (!analysis) return;
    const text = `
ClariFi Analysis

Reality Summary:
${analysis.reality}

Key Variables:
${analysis.variables.map((v, i) => `${i + 1}. ${v}`).join("\n")}

Suggested Next Step:
${analysis.nextStep}
    `.trim();

    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // RESET
  const handleReset = () => {
    setSituation("");
    setAnalysis(null);
    setError("");
    setCopied(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-4xl mx-auto">

        {/* HEADER */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Lightbulb className="w-8 h-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-blue-600">ClariFi</h1>
          </div>
          <p className="text-slate-600">
            Turn confusion into clarity. Get actionable decisions.
          </p>
        </div>

        {/* INPUT CARD */}
        <div className="bg-white p-6 rounded-lg shadow-lg space-y-4">

          {/* ERROR MESSAGE */}
          {error && <p className="text-red-600 font-semibold">{error}</p>}

          {/* TEXTAREA */}
          <div>
            <label className="block mb-2 text-slate-700">What's on your mind?</label>
            <textarea
              value={situation}
              onChange={(e) => setSituation(e.target.value)}
              placeholder="Describe your situation, dilemma, or what you're overthinking..."
              className="w-full min-h-[100px] p-3 border rounded-md outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              disabled={loading || !!analysis}
            />
          </div>

          {/* CONTEXT */}
          <div>
            <label className="block mb-3 text-slate-700">Context</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {(["Career", "Study", "Personal", "Project"] as const).map((ctx) => (
                <button
                  key={ctx}
                  onClick={() => setContext(ctx)}
                  disabled={loading || !!analysis}
                  className={`px-4 py-2 rounded-lg border-2 transition-all ${
                    context === ctx
                      ? "border-blue-600 bg-blue-50 text-blue-700"
                      : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
                  } disabled:opacity-50`}
                >
                  {ctx}
                </button>
              ))}
            </div>
          </div>

          {/* ACTION BUTTON */}
          {!analysis ? (
            <div className="flex justify-center pt-4">
              <button
                onClick={generateAnalysis}
                disabled={loading || !situation.trim()}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                {loading ? "Analyzing..." : "Get Clarity"}
              </button>
            </div>
          ) : (
            <div className="flex justify-center pt-4">
              <button
                onClick={handleReset}
                className="px-6 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50"
              >
                Analyze Another Situation
              </button>
            </div>
          )}
        </div>

        {/* OUTPUT */}
        {analysis && (
          <div className="bg-white p-6 rounded-lg shadow-lg mt-6 space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-slate-800">Your Clarity Report</h2>
              <button
                onClick={handleCopy}
                className="flex items-center gap-2 border px-3 py-1 rounded hover:bg-gray-100"
              >
                {copied ? <><Check className="w-4 h-4" /> Copied</> : <><Copy className="w-4 h-4" /> Copy</>}
              </button>
            </div>

            {/* REALITY */}
            <div>
              <h3 className="font-semibold text-slate-800 mb-2">Reality Summary</h3>
              <p className="text-slate-600">{analysis.reality}</p>
            </div>

            {/* VARIABLES */}
            <div>
              <h3 className="font-semibold text-slate-800 mb-2">Key Variables</h3>
              <ul className="space-y-2">
                {analysis.variables.map((v, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-blue-600 font-semibold">{i + 1}.</span>
                    <span className="text-slate-600">{v}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* NEXT STEP */}
            <div>
              <h3 className="font-semibold text-slate-800 mb-2">Suggested Next Step</h3>
              <div className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded">
                <p className="text-slate-700">{analysis.nextStep}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
