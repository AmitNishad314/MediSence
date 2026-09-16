function PatientCard({ patient, onDelete }) {
    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                
                {/* Patient identity */}
                <div className="flex items-center gap-4">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xl font-bold text-blue-700">
                        {patient.name.charAt(0).toUpperCase()}
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold text-slate-900">
                            {patient.name}
                        </h3>

                        <p className="mt-1 text-sm text-slate-500">
                            {patient.patient_code}
                        </p>
                    </div>
                </div>

                {/* Patient details */}
                <div className="flex flex-wrap gap-8">
                    <div>
                        <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                            Age
                        </p>

                        <p className="mt-1 font-semibold text-slate-800">
                            {patient.age}
                        </p>
                    </div>

                    <div>
                        <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                            Gender
                        </p>

                        <p className="mt-1 font-semibold text-slate-800">
                            {patient.gender}
                        </p>
                    </div>

                    <div>
                        <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                            Blood Group
                        </p>

                        <p className="mt-1 font-semibold text-slate-800">
                            {patient.blood_group || "Not provided"}
                        </p>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                    <button
                        className="rounded-lg border border-blue-600 px-4 py-2 text-sm font-medium text-blue-600 transition hover:bg-blue-50"
                    >
                        View Patient
                    </button>

                    <button
                        onClick={() => onDelete(patient.id)}
                        className="rounded-lg border border-red-200 px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}

export default PatientCard;