import { useState } from "react";
import { createMedicalRecord } from "../services/api";

function AddMedicalRecordForm({ patientId, onRecordAdded }) {
    const [formData, setFormData] = useState({
        record_type: "",
        diagnosis: "",
        description: "",
        record_date: "",
        doctor_name: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        setLoading(true);
        setError("");

        try {
            const record = await createMedicalRecord(
                patientId,
                {
                    record_type: formData.record_type,
                    diagnosis: formData.diagnosis || null,
                    description: formData.description || null,
                    record_date: formData.record_date || null,
                    doctor_name: formData.doctor_name || null,
                }
            );

            onRecordAdded(record);

            setFormData({
                record_type: "",
                diagnosis: "",
                description: "",
                record_date: "",
                doctor_name: "",
            });
        } catch (error) {
            console.error(error);
            setError("Failed to create medical record.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">
                Add Medical Record
            </h2>

            <p className="mt-1 text-sm text-slate-500">
                Add a diagnosis, visit, prescription, or other medical event.
            </p>

            <form
                onSubmit={handleSubmit}
                className="mt-6 grid gap-4 md:grid-cols-2"
            >
                <select
                    name="record_type"
                    value={formData.record_type}
                    onChange={handleChange}
                    required
                    className="rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
                >
                    <option value="">Select record type</option>
                    <option value="Diagnosis">Diagnosis</option>
                    <option value="Consultation">Consultation</option>
                    <option value="Prescription">Prescription</option>
                    <option value="Lab Test">Lab Test</option>
                    <option value="Surgery">Surgery</option>
                    <option value="Other">Other</option>
                </select>

                <input
                    name="diagnosis"
                    value={formData.diagnosis}
                    onChange={handleChange}
                    placeholder="Diagnosis"
                    className="rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
                />

                <input
                    name="doctor_name"
                    value={formData.doctor_name}
                    onChange={handleChange}
                    placeholder="Doctor name"
                    className="rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
                />

                <input
                    name="record_date"
                    type="date"
                    value={formData.record_date}
                    onChange={handleChange}
                    className="rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
                />

                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Description"
                    rows="4"
                    className="md:col-span-2 rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
                />

                {error && (
                    <p className="md:col-span-2 text-sm text-red-600">
                        {error}
                    </p>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    className="md:col-span-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    {loading ? "Adding..." : "Add Medical Record"}
                </button>
            </form>
        </div>
    );
}

export default AddMedicalRecordForm;