import { useState } from "react";
import { uploadMedicalDocument } from "../services/api";

function MedicalDocumentUpload({ patientId, onDocumentUploaded }) {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];

        setError("");

        if (!selectedFile) {
            setFile(null);
            return;
        }

        if (selectedFile.type !== "application/pdf") {
            setFile(null);
            setError("Only PDF files are allowed.");
            return;
        }

        setFile(selectedFile);
    };

    const handleUpload = async (event) => {
        event.preventDefault();

        if (!file) {
            setError("Please select a PDF file.");
            return;
        }

        try {
            setLoading(true);
            setError("");

            const document = await uploadMedicalDocument(
                patientId,
                file
            );

            onDocumentUploaded(document);

            setFile(null);

            event.target.reset();
        } catch (error) {
            console.error(error);

            setError(
                error.response?.data?.detail ||
                "Failed to upload document."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div>
                <h2 className="text-lg font-semibold text-slate-900">
                    Upload Medical Document
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                    Upload medical reports, prescriptions, lab reports,
                    or other PDF documents.
                </p>
            </div>

            <form
                onSubmit={handleUpload}
                className="mt-6"
            >
                <label
                    htmlFor="medical-document"
                    className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-300 px-6 py-10 text-center transition hover:border-blue-400 hover:bg-blue-50/30"
                >
                    <div className="text-4xl">
                        📄
                    </div>

                    <p className="mt-3 font-medium text-slate-700">
                        {file
                            ? file.name
                            : "Click to select a PDF"}
                    </p>

                    <p className="mt-1 text-sm text-slate-500">
                        PDF files only
                    </p>

                    <input
                        id="medical-document"
                        type="file"
                        accept="application/pdf,.pdf"
                        onChange={handleFileChange}
                        className="hidden"
                    />
                </label>

                {error && (
                    <p className="mt-3 text-sm text-red-600">
                        {error}
                    </p>
                )}

                <button
                    type="submit"
                    disabled={loading || !file}
                    className="mt-4 w-full rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    {loading ? "Uploading..." : "Upload PDF"}
                </button>
            </form>
        </div>
    );
}

export default MedicalDocumentUpload;