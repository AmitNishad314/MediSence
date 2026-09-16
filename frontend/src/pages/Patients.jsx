import { useEffect, useState } from "react";
import AddPatientForm from "../components/AddPatientForm";
import PatientCard from "../components/PatientCard";
import {
    deletePatient,
    getPatients,
} from "../services/api";

function Patients() {
    const [patients, setPatients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const loadPatients = async () => {
        try {
            setLoading(true);
            setError("");

            const data = await getPatients();
            setPatients(data);
        } catch (error) {
            console.error(error);
            setError("Failed to load patients.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        void (async () => {
            await loadPatients();
        })();
    }, []);

    const handlePatientAdded = (patient) => {
        setPatients((previous) => [patient, ...previous]);
    };

    const handleDelete = async (patientId) => {
        try {
            await deletePatient(patientId);

            setPatients((previous) =>
                previous.filter((patient) => patient.id !== patientId)
            );
        } catch (error) {
            console.error(error);
            alert("Failed to delete patient.");
        }
    };

    return (
        <main className="mx-auto max-w-7xl px-6 py-10">
            <div className="mb-10">
                <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                    Patients
                </h1>

                <p className="mt-2 text-slate-500">
                    Manage patient information and medical history.
                </p>
            </div>

            <AddPatientForm onPatientAdded={handlePatientAdded} />

            <div className="mt-10">
                <div className="mb-5 flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-slate-900">
                        Patient Records
                    </h2>

                    <span className="rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-600">
                        {patients.length} patients
                    </span>
                </div>

                {loading && (
                    <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-slate-500">
                        Loading patients...
                    </div>
                )}

                {error && (
                    <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-red-600">
                        {error}
                    </div>
                )}

                {!loading && !error && patients.length === 0 && (
                    <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
                        <h3 className="text-lg font-semibold text-slate-800">
                            No patients yet
                        </h3>

                        <p className="mt-2 text-sm text-slate-500">
                            Add your first patient using the form above.
                        </p>
                    </div>
                )}

                {!loading && !error && patients.length > 0 && (
                    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                        {patients.map((patient) => (
                            <PatientCard
                                key={patient.id}
                                patient={patient}
                                onDelete={handleDelete}
                            />
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
}

export default Patients;