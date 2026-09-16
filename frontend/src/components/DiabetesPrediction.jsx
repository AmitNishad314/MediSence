import { useState } from "react";

import { predictDiabetes } from "../services/api";


function DiabetesPrediction() {
    const [formData, setFormData] = useState({
        pregnancies: "",
        glucose: "",
        blood_pressure: "",
        skin_thickness: "",
        insulin: "",
        bmi: "",
        diabetes_pedigree_function: "",
        age: "",
    });

    const [result, setResult] = useState(null);
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

        try {
            setLoading(true);
            setError("");
            setResult(null);

            const predictionData = {
                pregnancies: Number(
                    formData.pregnancies
                ),

                glucose: Number(
                    formData.glucose
                ),

                blood_pressure: Number(
                    formData.blood_pressure
                ),

                skin_thickness: Number(
                    formData.skin_thickness
                ),

                insulin: Number(
                    formData.insulin
                ),

                bmi: Number(
                    formData.bmi
                ),

                diabetes_pedigree_function: Number(
                    formData.diabetes_pedigree_function
                ),

                age: Number(
                    formData.age
                ),
            };


            const data = await predictDiabetes(
                predictionData
            );

            setResult(data);

        } catch (error) {
            console.error(error);

            setError(
                error.response?.data?.detail ||
                "Failed to generate prediction."
            );

        } finally {
            setLoading(false);
        }
    };


    const probabilityPercentage = result
        ? (result.probability * 100).toFixed(1)
        : null;


    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

            {/* Header */}

            <div>
                <div className="flex items-center gap-2">

                    <span className="text-xl">
                        🧠
                    </span>

                    <h2 className="text-lg font-semibold text-slate-900">
                        Diabetes Risk Prediction
                    </h2>

                </div>

                <p className="mt-1 text-sm text-slate-500">
                    Enter patient measurements to generate
                    an ML-based risk prediction.
                </p>
            </div>


            {/* Form */}

            <form
                onSubmit={handleSubmit}
                className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
            >

                {/* Pregnancies */}

                <div>
                    <label
                        htmlFor="pregnancies"
                        className="mb-1.5 block text-sm font-medium text-slate-700"
                    >
                        Pregnancies
                    </label>

                    <input
                        id="pregnancies"
                        name="pregnancies"
                        type="number"
                        min="0"
                        step="1"
                        value={formData.pregnancies}
                        onChange={handleChange}
                        required
                        className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500"
                    />
                </div>


                {/* Glucose */}

                <div>
                    <label
                        htmlFor="glucose"
                        className="mb-1.5 block text-sm font-medium text-slate-700"
                    >
                        Glucose
                    </label>

                    <input
                        id="glucose"
                        name="glucose"
                        type="number"
                        min="0"
                        step="0.1"
                        value={formData.glucose}
                        onChange={handleChange}
                        required
                        className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500"
                    />
                </div>


                {/* Blood Pressure */}

                <div>
                    <label
                        htmlFor="blood_pressure"
                        className="mb-1.5 block text-sm font-medium text-slate-700"
                    >
                        Blood Pressure
                    </label>

                    <input
                        id="blood_pressure"
                        name="blood_pressure"
                        type="number"
                        min="0"
                        step="0.1"
                        value={formData.blood_pressure}
                        onChange={handleChange}
                        required
                        className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500"
                    />
                </div>


                {/* Skin Thickness */}

                <div>
                    <label
                        htmlFor="skin_thickness"
                        className="mb-1.5 block text-sm font-medium text-slate-700"
                    >
                        Skin Thickness
                    </label>

                    <input
                        id="skin_thickness"
                        name="skin_thickness"
                        type="number"
                        min="0"
                        step="0.1"
                        value={formData.skin_thickness}
                        onChange={handleChange}
                        required
                        className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500"
                    />
                </div>


                {/* Insulin */}

                <div>
                    <label
                        htmlFor="insulin"
                        className="mb-1.5 block text-sm font-medium text-slate-700"
                    >
                        Insulin
                    </label>

                    <input
                        id="insulin"
                        name="insulin"
                        type="number"
                        min="0"
                        step="0.1"
                        value={formData.insulin}
                        onChange={handleChange}
                        required
                        className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500"
                    />
                </div>


                {/* BMI */}

                <div>
                    <label
                        htmlFor="bmi"
                        className="mb-1.5 block text-sm font-medium text-slate-700"
                    >
                        BMI
                    </label>

                    <input
                        id="bmi"
                        name="bmi"
                        type="number"
                        min="0"
                        step="0.1"
                        value={formData.bmi}
                        onChange={handleChange}
                        required
                        className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500"
                    />
                </div>


                {/* Diabetes Pedigree Function */}

                <div>
                    <label
                        htmlFor="diabetes_pedigree_function"
                        className="mb-1.5 block text-sm font-medium text-slate-700"
                    >
                        Diabetes Pedigree
                    </label>

                    <input
                        id="diabetes_pedigree_function"
                        name="diabetes_pedigree_function"
                        type="number"
                        min="0"
                        step="0.001"
                        value={
                            formData.diabetes_pedigree_function
                        }
                        onChange={handleChange}
                        required
                        className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500"
                    />
                </div>


                {/* Age */}

                <div>
                    <label
                        htmlFor="age"
                        className="mb-1.5 block text-sm font-medium text-slate-700"
                    >
                        Age
                    </label>

                    <input
                        id="age"
                        name="age"
                        type="number"
                        min="0"
                        max="150"
                        step="1"
                        value={formData.age}
                        onChange={handleChange}
                        required
                        className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500"
                    />
                </div>


                {/* Submit */}

                <button
                    type="submit"
                    disabled={loading}
                    className="sm:col-span-2 lg:col-span-4 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    {loading
                        ? "Generating Prediction..."
                        : "Generate Prediction"}
                </button>

            </form>


            {/* Error */}

            {error && (
                <div className="mt-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
                    {error}
                </div>
            )}


            {/* Result */}

            {result && (
                <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-6">

                    <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

                        <div>
                            <p className="text-sm text-slate-500">
                                Model Prediction
                            </p>

                            <h3 className="mt-1 text-2xl font-bold text-slate-900">
                                {result.prediction === 1
                                    ? "Higher Predicted Risk"
                                    : "Lower Predicted Risk"}
                            </h3>
                        </div>


                        <div className="rounded-xl bg-white px-6 py-4 text-center shadow-sm">

                            <p className="text-xs text-slate-500">
                                Predicted Probability
                            </p>

                            <p className="mt-1 text-3xl font-bold text-blue-600">
                                {probabilityPercentage}%
                            </p>

                        </div>

                    </div>

                </div>
            )}


            {/* Disclaimer */}

            <p className="mt-5 text-xs leading-5 text-slate-400">
                This prediction is generated by a machine
                learning model for educational and
                demonstration purposes. It is not a medical
                diagnosis or treatment recommendation.
            </p>

        </div>
    );
}


export default DiabetesPrediction;