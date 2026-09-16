import { useNavigate } from "react-router-dom";

function PatientCard({ patient, onDelete }) {
    const navigate = useNavigate();

    const handleDelete = async () => {
        const confirmed = window.confirm(
            `Are you sure you want to delete ${patient.name}?`
        );

        if (!confirmed) return;

        await onDelete(patient.id);
    };

    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md">
            <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-lg font-bold text-blue-600">
                        {patient.name.charAt(0).toUpperCase()}
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold text-slate-900">
                            {patient.name}
                        </h3>

                        <p className="text-sm text-slate-500">
                            {patient.patient_code}
                        </p>
                    </div>
                </div>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-3">
                <div className="rounded-xl bg-slate-50 p-3">
                    <p className="text-xs text-slate-500">Age</p>
                    <p className="mt-1 font-semibold text-slate-800">
                        {patient.age}
                    </p>
                </div>

                <div className="rounded-xl bg-slate-50 p-3">
                    <p className="text-xs text-slate-500">Gender</p>
                    <p className="mt-1 font-semibold text-slate-800">
                        {patient.gender}
                    </p>
                </div>

                <div className="rounded-xl bg-slate-50 p-3">
                    <p className="text-xs text-slate-500">Blood</p>
                    <p className="mt-1 font-semibold text-slate-800">
                        {patient.blood_group || "N/A"}
                    </p>
                </div>
            </div>

            <div className="mt-6 flex gap-3">
                <button
                    onClick={() => navigate(`/patients/${patient.id}`)}
                    className="flex-1 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
                >
                    View Patient
                </button>

                <button
                    onClick={handleDelete}
                    className="rounded-xl border border-red-200 px-4 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-50"
                >
                    Delete
                </button>
            </div>
        </div>
    );
}

export default PatientCard;