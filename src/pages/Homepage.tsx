import React, { useState } from 'react';
import { Lightbulb, Copy, Check } from 'lucide-react';

type Context = 'Career' | 'Study' | 'Personal' | 'Project';

interface Analysis {
  reality: string;
  variables: string[];
  nextStep: string;
}

export default function Home() {
  const [situation, setSituation] = useState('');
  const [context, setContext] = useState<Context>('Personal');
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [copied, setCopied] = useState(false);

  const generateAnalysis = () => {
    if (!situation.trim()) return;

    const analysis: Analysis = {
      reality: `You are facing a ${context.toLowerCase()}-related decision regarding ${situation.slice(
        0,
        50
      )}${situation.length > 50 ? '...' : ''}. This situation requires a structured approach to evaluate your options objectively and move forward with confidence.`,
      variables: [
        'Time constraints and available resources',
        'Short-term vs. long-term implications',
        'Risk tolerance and potential consequences',
        'Alignment with your core values and goals',
        'External dependencies and stakeholder impact',
      ],
      nextStep:
        'Write down the specific outcome you want to achieve in the next 7 days, then identify the single smallest action you can take today to move toward that outcome. Set a 2-hour block in your calendar this week to execute it.',
    };

    setAnalysis(analysis);
  };

  const handleCopy = async () => {
    if (!analysis) return;

    const text = `
ClariFi Analysis

Reality Summary:
${analysis.reality}

Key Variables:
${analysis.variables.map((v, i) => `${i + 1}. ${v}`).join('\n')}

Suggested Next Step:
${analysis.nextStep}
    `.trim();

    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setSituation('');
    setAnalysis(null);
    setCopied(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Lightbulb className="w-8 h-8 text-blue-600" />
            <h1 className="text-blue-600 text-2xl font-bold">ClariFi</h1>
          </div>
          <p className="text-slate-600">Turn confusion into clarity. Get actionable decisions.</p>
        </div>

        {/* Input Section */}
        <div className="p-6 mb-6 shadow-lg bg-white rounded-lg space-y-4">
          {/* Textarea */}
          <div>
            <label className="block mb-2 text-slate-700">What's on your mind?</label>
            <textarea
              value={situation}
              onChange={(e) => setSituation(e.target.value)}
              placeholder="Describe your situation, dilemma, or what you're overthinking..."
              className="w-full min-h-[100px] p-3 border rounded-md bg-white text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-teal-500 outline-none resize-none"
              disabled={!!analysis}
            />
          </div>

          {/* Context Buttons */}
          <div>
            <label className="block mb-3 text-slate-700">Context</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {(['Career', 'Study', 'Personal', 'Project'] as const).map((ctx) => (
                <button
                  key={ctx}
                  onClick={() => setContext(ctx)}
                  disabled={!!analysis}
                  className={`px-4 py-2 rounded-lg border-2 transition-all ${
                    context === ctx
                      ? 'border-blue-600 bg-blue-50 text-blue-700'
                      : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {ctx}
                </button>
              ))}
            </div>
          </div>

          {/* Get Clarity / Reset Button */}
          {!analysis ? (
            <div className="flex justify-center mt-4">
              <button
                onClick={generateAnalysis}
                disabled={!situation.trim()}
                className="w-full sm:w-auto px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                Get Clarity
              </button>
            </div>
          ) : (
            <div className="flex justify-center mt-4">
              <button
                onClick={handleReset}
                className="w-full sm:w-auto px-6 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
              >
                Analyze Another Situation
              </button>
            </div>
          )}
        </div>

        {/* Analysis Output */}
        {analysis && (
          <div className="p-6 shadow-lg bg-white rounded-lg mt-6 space-y-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-slate-800">Your Clarity Report</h2>
              <button
                onClick={handleCopy}
                className="flex items-center gap-2 border border-gray-300 px-3 py-1 rounded hover:bg-gray-100 transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    Copy
                  </>
                )}
              </button>
            </div>

            {/* Reality Summary */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-1 h-6 bg-blue-600 rounded-full"></div>
                <h3 className="text-slate-800">Reality Summary</h3>
              </div>
              <p className="text-slate-600 leading-relaxed pl-4">{analysis.reality}</p>
            </div>

            {/* Key Variables */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-1 h-6 bg-blue-600 rounded-full"></div>
                <h3 className="text-slate-800">Key Variables</h3>
              </div>
              <ul className="space-y-2 pl-4">
                {analysis.variables.map((variable, index) => (
                  <li key={index} className="flex gap-3">
                    <span className="text-blue-600 font-semibold">{index + 1}.</span>
                    <span className="text-slate-600">{variable}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Suggested Next Step */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-1 h-6 bg-blue-600 rounded-full"></div>
                <h3 className="text-slate-800">Suggested Next Step</h3>
              </div>
              <div className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded-r">
                <p className="text-slate-700 leading-relaxed">{analysis.nextStep}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
