import { useState } from "react";
import { createPatient } from "../services/api";

function AddPatientForm({ onPatientAdded }) {
    const [formData, setFormData] = useState({
        name: "",
        age: "",
        gender: "",
        blood_group: "",
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
            const patient = await createPatient({
                name: formData.name,
                age: Number(formData.age),
                gender: formData.gender,
                blood_group: formData.blood_group || null,
            });

            onPatientAdded(patient);

            setFormData({
                name: "",
                age: "",
                gender: "",
                blood_group: "",
            });
        } catch (error) {
            console.error(error);
            setError("Failed to create patient.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">
                Add New Patient
            </h2>

            <p className="mt-1 text-sm text-slate-500">
                Create a patient record.
            </p>

            <form
                onSubmit={handleSubmit}
                className="mt-6 grid gap-4 md:grid-cols-2"
            >
                <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Patient name"
                    required
                    className="rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
                />

                <input
                    name="age"
                    type="number"
                    value={formData.age}
                    onChange={handleChange}
                    placeholder="Age"
                    min="0"
                    max="150"
                    required
                    className="rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
                />

                <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    required
                    className="rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
                >
                    <option value="">Select gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                </select>

                <input
                    name="blood_group"
                    value={formData.blood_group}
                    onChange={handleChange}
                    placeholder="Blood group (e.g. B+)"
                    className="rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
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
                    {loading ? "Adding..." : "Add Patient"}
                </button>
            </form>
        </div>
    );
}

export default AddPatientForm;