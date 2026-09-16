import {
    getMedicalDocumentDownloadUrl,
    getMedicalDocumentViewUrl,
} from "../services/api";

function MedicalDocumentList({
    documents,
    patientId,
}) {
    const formatFileSize = (bytes) => {
        if (!bytes) {
            return "Unknown size";
        }

        if (bytes < 1024) {
            return `${bytes} B`;
        }

        if (bytes < 1024 * 1024) {
            return `${(bytes / 1024).toFixed(1)} KB`;
        }

        return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
    };

    const formatDate = (date) => {
        if (!date) {
            return "Unknown date";
        }

        return new Date(date).toLocaleDateString(
            "en-IN",
            {
                day: "2-digit",
                month: "short",
                year: "numeric",
            }
        );
    };

    if (documents.length === 0) {
        return (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
                <div className="text-4xl">
                    📁
                </div>

                <h3 className="mt-3 font-semibold text-slate-800">
                    No documents uploaded
                </h3>

                <p className="mt-2 text-sm text-slate-500">
                    Upload the patient's medical PDFs above.
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-3">
            {documents.map((document) => {
                const viewUrl =
                    getMedicalDocumentViewUrl(
                        patientId,
                        document.id
                    );

                const downloadUrl =
                    getMedicalDocumentDownloadUrl(
                        patientId,
                        document.id
                    );

                return (
                    <div
                        key={document.id}
                        className="rounded-xl border border-slate-200 bg-white p-5"
                    >
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                            {/* Document Information */}
                            <div className="flex min-w-0 items-center gap-4">

                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-red-50 text-xl">
                                    📄
                                </div>

                                <div className="min-w-0">
                                    <h3 className="truncate font-medium text-slate-900">
                                        {document.file_name}
                                    </h3>

                                    <p className="mt-1 text-sm text-slate-500">
                                        {formatFileSize(
                                            document.file_size
                                        )}
                                        {" • "}
                                        Uploaded{" "}
                                        {formatDate(
                                            document.uploaded_at
                                        )}
                                    </p>
                                </div>

                            </div>

                            {/* Actions */}
                            <div className="flex shrink-0 gap-2">

                                <a
                                    href={viewUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                                >
                                    Open
                                </a>

                                <a
                                    href={downloadUrl}
                                    className="rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
                                >
                                    Download
                                </a>

                            </div>

                        </div>

                        <div className="mt-3">
                            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                                PDF
                            </span>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default MedicalDocumentList;