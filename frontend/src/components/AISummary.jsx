import { useState } from "react";
import { generateAISummary } from "../services/api";

function AISummary({
    patientId,
    initialSummary,
}) {
    const [summary, setSummary] = useState(
        initialSummary || ""
    );

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleGenerateSummary = async () => {
        try {
            setLoading(true);
            setError("");

            const data = await generateAISummary(
                patientId
            );

            setSummary(data.summary);
        } catch (error) {
            console.error(error);

            setError(
                error.response?.data?.detail ||
                "Failed to generate AI summary."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

            {/* Header */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                <div>
                    <div className="flex items-center gap-2">
                        <span className="text-xl">
                            ✨
                        </span>

                        <h2 className="text-lg font-semibold text-slate-900">
                            AI Medical Summary
                        </h2>
                    </div>

                    <p className="mt-1 text-sm text-slate-500">
                        AI-generated summary based on the
                        patient's uploaded medical documents.
                    </p>
                </div>

                <button
                    onClick={handleGenerateSummary}
                    disabled={loading}
                    className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    {loading
                        ? "Generating..."
                        : summary
                            ? "Regenerate Summary"
                            : "Generate Summary"}
                </button>

            </div>

            {/* Error */}
            {error && (
                <div className="mt-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
                    {error}
                </div>
            )}

            {/* Summary */}
            {summary ? (
                <div className="mt-6 rounded-xl bg-slate-50 p-5">
                    <div className="whitespace-pre-wrap text-sm leading-7 text-slate-700">
                        {summary}
                    </div>
                </div>
            ) : (
                <div className="mt-6 rounded-xl border border-dashed border-slate-300 p-8 text-center">

                    <div className="text-4xl">
                        ✨
                    </div>

                    <h3 className="mt-3 font-semibold text-slate-800">
                        No AI summary yet
                    </h3>

                    <p className="mt-2 text-sm text-slate-500">
                        Generate a summary from the patient's
                        uploaded medical documents.
                    </p>

                </div>
            )}

            {/* Disclaimer */}
            <p className="mt-4 text-xs leading-5 text-slate-400">
                AI-generated content is provided for
                informational purposes and should not be
                considered medical diagnosis or treatment
                advice.
            </p>

        </div>
    );
}

export default AISummary;