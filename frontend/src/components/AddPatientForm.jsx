import { useState } from "react";
import api from "../services/api";

function AddPatientForm({ onPatientAdded, onCancel }) {
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

        setError("");
        setLoading(true);

        try {
            const response = await api.post("/patients/", {
                name: formData.name,
                age: Number(formData.age),
                gender: formData.gender,
                blood_group: formData.blood_group || null,
            });

            onPatientAdded(response.data);

            setFormData({
                name: "",
                age: "",
                gender: "",
                blood_group: "",
            });
        } catch (error) {
            console.error(error);

            setError(
                "Unable to create patient. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mb-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            {/* Header */}
            <div className="mb-6 flex items-start justify-between">
                <div>
                    <h2 className="text-xl font-semibold text-slate-900">
                        Add New Patient
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                        Enter the patient's basic information.
                    </p>
                </div>

                <button
                    onClick={onCancel}
                    className="text-2xl leading-none text-slate-400 transition hover:text-slate-700"
                >
                    ×
                </button>
            </div>

            {/* Error */}
            {error && (
                <div className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    {error}
                </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit}>
                <div className="grid gap-5 md:grid-cols-2">
                    {/* Name */}
                    <div className="md:col-span-2">
                        <label className="mb-2 block text-sm font-medium text-slate-700">
                            Patient Name
                        </label>

                        <input
                            type="text"
                            name="name"
                            placeholder="Enter patient name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />
                    </div>

                    {/* Age */}
                    <div>
                        <label className="mb-2 block text-sm font-medium text-slate-700">
                            Age
                        </label>

                        <input
                            type="number"
                            name="age"
                            placeholder="Enter age"
                            min="0"
                            max="150"
                            value={formData.age}
                            onChange={handleChange}
                            required
                            className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />
                    </div>

                    {/* Gender */}
                    <div>
                        <label className="mb-2 block text-sm font-medium text-slate-700">
                            Gender
                        </label>

                        <select
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            required
                            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        >
                            <option value="">
                                Select gender
                            </option>

                            <option value="Male">
                                Male
                            </option>

                            <option value="Female">
                                Female
                            </option>

                            <option value="Other">
                                Other
                            </option>
                        </select>
                    </div>

                    {/* Blood group */}
                    <div>
                        <label className="mb-2 block text-sm font-medium text-slate-700">
                            Blood Group
                        </label>

                        <select
                            name="blood_group"
                            value={formData.blood_group}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        >
                            <option value="">
                                Select blood group
                            </option>

                            <option value="A+">A+</option>
                            <option value="A-">A-</option>
                            <option value="B+">B+</option>
                            <option value="B-">B-</option>
                            <option value="AB+">AB+</option>
                            <option value="AB-">AB-</option>
                            <option value="O+">O+</option>
                            <option value="O-">O-</option>
                        </select>
                    </div>
                </div>

                {/* Actions */}
                <div className="mt-7 flex justify-end gap-3">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                    >
                        Cancel
                    </button>

                    <button
                        type="submit"
                        disabled={loading}
                        className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {loading
                            ? "Creating..."
                            : "Create Patient"}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default AddPatientForm;