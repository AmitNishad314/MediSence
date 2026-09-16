import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import AddMedicalRecordForm from "../components/AddMedicalRecordForm";
import AISummary from "../components/AISummary";
import MedicalDocumentList from "../components/MedicalDocumentList";
import MedicalDocumentUpload from "../components/MedicalDocumentUpload";

import {
    deleteMedicalRecord,
    getMedicalDocuments,
    getMedicalRecords,
    getPatient,
    getAISummary,
} from "../services/api";

function PatientDashboard() {
    const { patientId } = useParams();
    const navigate = useNavigate();

    const [patient, setPatient] = useState(null);
    const [records, setRecords] = useState([]);
    const [documents, setDocuments] = useState([]);
    const [aiSummary, setAiSummary] = useState("");

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const loadPatientData = async () => {
        try {
            setLoading(true);
            setError("");

            const [
                patientData,
                recordsData,
                documentsData,
                summaryData,
            ] = await Promise.all([
                getPatient(patientId),
                getMedicalRecords(patientId),
                getMedicalDocuments(patientId),
                getAISummary(patientId),
            ]);

            setPatient(patientData);
            setRecords(recordsData);
            setDocuments(documentsData);
            setAiSummary(summaryData.summary || "");
        } catch (error) {
            console.error(error);
            setError("Failed to load patient data.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadPatientData();
    }, [patientId]);

    const handleRecordAdded = (record) => {
        setRecords((previous) => [
            record,
            ...previous,
        ]);
    };

    const handleDeleteRecord = async (recordId) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this medical record?"
        );

        if (!confirmed) {
            return;
        }

        try {
            await deleteMedicalRecord(
                patientId,
                recordId
            );

            setRecords((previous) =>
                previous.filter(
                    (record) => record.id !== recordId
                )
            );
        } catch (error) {
            console.error(error);
            alert("Failed to delete medical record.");
        }
    };

    const handleDocumentUploaded = (document) => {
        setDocuments((previous) => [
            document,
            ...previous,
        ]);
    };

    if (loading) {
        return (
            <main className="mx-auto max-w-7xl px-6 py-10">
                <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center text-slate-500">
                    Loading patient...
                </div>
            </main>
        );
    }

    if (error || !patient) {
        return (
            <main className="mx-auto max-w-7xl px-6 py-10">
                <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-red-600">
                    {error || "Patient not found."}
                </div>

                <button
                    onClick={() => navigate("/patients")}
                    className="mt-5 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
                >
                    Back to Patients
                </button>
            </main>
        );
    }

    return (
        <main className="mx-auto max-w-7xl px-6 py-10">

            {/* Back Button */}
            <button
                onClick={() => navigate("/patients")}
                className="mb-6 text-sm font-medium text-blue-600 transition hover:text-blue-700"
            >
                ← Back to Patients
            </button>

            {/* Patient Information */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

                <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

                    <div className="flex items-center gap-4">

                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-2xl font-bold text-blue-600">
                            {patient.name
                                .charAt(0)
                                .toUpperCase()}
                        </div>

                        <div>
                            <h1 className="text-2xl font-bold text-slate-900">
                                {patient.name}
                            </h1>

                            <p className="mt-1 text-sm text-slate-500">
                                Patient ID:{" "}
                                {patient.patient_code}
                            </p>
                        </div>

                    </div>

                    <div className="rounded-xl bg-blue-50 px-5 py-3">
                        <p className="text-xs text-blue-500">
                            Medical Records
                        </p>

                        <p className="text-2xl font-bold text-blue-700">
                            {records.length}
                        </p>
                    </div>

                </div>

                {/* Patient Details */}
                <div className="mt-8 grid gap-4 sm:grid-cols-3">

                    <div className="rounded-xl bg-slate-50 p-4">
                        <p className="text-sm text-slate-500">
                            Age
                        </p>

                        <p className="mt-1 text-lg font-semibold text-slate-900">
                            {patient.age} years
                        </p>
                    </div>

                    <div className="rounded-xl bg-slate-50 p-4">
                        <p className="text-sm text-slate-500">
                            Gender
                        </p>

                        <p className="mt-1 text-lg font-semibold text-slate-900">
                            {patient.gender}
                        </p>
                    </div>

                    <div className="rounded-xl bg-slate-50 p-4">
                        <p className="text-sm text-slate-500">
                            Blood Group
                        </p>

                        <p className="mt-1 text-lg font-semibold text-slate-900">
                            {patient.blood_group ||
                                "Not specified"}
                        </p>
                    </div>

                </div>
            </div>

            {/* Medical History */}
            <section className="mt-8">

                <div className="mb-5">
                    <h2 className="text-xl font-bold text-slate-900">
                        Medical History
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                        Previous diagnoses, consultations,
                        tests, and other medical events.
                    </p>
                </div>

                {records.length === 0 ? (
                    <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">

                        <div className="text-4xl">
                            🩺
                        </div>

                        <h3 className="mt-3 font-semibold text-slate-800">
                            No medical records
                        </h3>

                        <p className="mt-2 text-sm text-slate-500">
                            Add the patient's first medical
                            record below.
                        </p>

                    </div>
                ) : (
                    <div className="space-y-4">

                        {records.map((record) => (
                            <div
                                key={record.id}
                                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
                            >

                                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">

                                    <div>

                                        <div className="flex flex-wrap items-center gap-3">

                                            <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600">
                                                {record.record_type}
                                            </span>

                                            {record.record_date && (
                                                <span className="text-sm text-slate-500">
                                                    {new Date(
                                                        record.record_date
                                                    ).toLocaleDateString(
                                                        "en-IN",
                                                        {
                                                            day: "2-digit",
                                                            month: "short",
                                                            year: "numeric",
                                                        }
                                                    )}
                                                </span>
                                            )}

                                        </div>

                                        {record.diagnosis && (
                                            <h3 className="mt-3 text-lg font-semibold text-slate-900">
                                                {record.diagnosis}
                                            </h3>
                                        )}

                                        {record.description && (
                                            <p className="mt-2 text-sm leading-6 text-slate-600">
                                                {record.description}
                                            </p>
                                        )}

                                        {record.doctor_name && (
                                            <p className="mt-4 text-sm text-slate-500">
                                                Doctor:{" "}
                                                <span className="font-medium text-slate-700">
                                                    {record.doctor_name}
                                                </span>
                                            </p>
                                        )}

                                    </div>

                                    <button
                                        onClick={() =>
                                            handleDeleteRecord(
                                                record.id
                                            )
                                        }
                                        className="self-start rounded-lg px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50"
                                    >
                                        Delete
                                    </button>

                                </div>

                            </div>
                        ))}

                    </div>
                )}

            </section>

            {/* Add Medical Record */}
            <section className="mt-8">

                <AddMedicalRecordForm
                    patientId={patientId}
                    onRecordAdded={handleRecordAdded}
                />

            </section>

            {/* Medical Documents */}
            <section className="mt-8">

                <div className="mb-5">
                    <h2 className="text-xl font-bold text-slate-900">
                        Medical Documents
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                        Patient reports and medical documents.
                    </p>
                </div>

                <div className="grid gap-6 lg:grid-cols-2">

                    <MedicalDocumentUpload
                        patientId={patientId}
                        onDocumentUploaded={
                            handleDocumentUploaded
                        }
                    />

                    <MedicalDocumentList
                        patientId={patientId}
                        documents={documents}
                    />

                </div>

            </section>

            {/* AI Summary */}
            <section className="mt-8">

                <AISummary
                    patientId={patientId}
                    initialSummary={aiSummary}
                />

            </section>

        </main>
    );
}

export default PatientDashboard;