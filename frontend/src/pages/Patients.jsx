import { useEffect, useState } from "react";
import PatientCard from "../components/PatientCard";
import AddPatientForm from "../components/AddPatientForm";
import api from "../services/api";

function Patients() {
    const [patients, setPatients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        const loadPatients = async () => {
            try {
                setError("");
                const response = await api.get("/patients/");
                setPatients(response.data);
            } catch (error) {
                console.error(error);
                setError(
                    "Unable to load patients. Make sure the backend is running."
                );
            } finally {
                setLoading(false);
            }
        };

        loadPatients();
    }, []);

    const handlePatientAdded = (newPatient) => {
        setPatients((previous) => [
            newPatient,
            ...previous,
        ]);

        setShowForm(false);
    };

    const handleDelete = async (patientId) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this patient?"
        );

        if (!confirmed) {
            return;
        }

        try {
            await api.delete(`/patients/${patientId}`);

            setPatients((previous) =>
                previous.filter(
                    (patient) => patient.id !== patientId
                )
            );
        } catch (error) {
            console.error(error);

            alert(
                "Unable to delete patient. Please try again."
            );
        }
    };

    return (
        <main className="mx-auto min-h-[calc(100vh-64px)] max-w-7xl px-6 py-10">
            {/* Page header */}
            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                        Patients
                    </h1>

                    <p className="mt-2 text-sm text-slate-500">
                        Manage patient records and medical history.
                    </p>
                </div>

                <button
                    onClick={() => setShowForm(true)}
                    className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
                >
                    + Add Patient
                </button>
            </div>

            {/* Add patient form */}
            {showForm && (
                <AddPatientForm
                    onPatientAdded={handlePatientAdded}
                    onCancel={() => setShowForm(false)}
                />
            )}

            {/* Loading */}
            {loading && (
                <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center shadow-sm">
                    <p className="text-sm text-slate-500">
                        Loading patients...
                    </p>
                </div>
            )}

            {/* Error */}
            {error && (
                <div className="rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700">
                    {error}
                </div>
            )}

            {/* Empty state */}
            {!loading &&
                !error &&
                patients.length === 0 && (
                    <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-16 text-center">
                        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-blue-50 text-2xl">
                            +
                        </div>

                        <h2 className="text-lg font-semibold text-slate-900">
                            No patients yet
                        </h2>

                        <p className="mt-2 text-sm text-slate-500">
                            Add your first patient to get started.
                        </p>
                    </div>
                )}

            {/* Patient list */}
            {!loading &&
                !error &&
                patients.length > 0 && (
                    <div className="space-y-4">
                        {patients.map((patient) => (
                            <PatientCard
                                key={patient.id}
                                patient={patient}
                                onDelete={handleDelete}
                            />
                        ))}
                    </div>
                )}
        </main>
    );
}

export default Patients;