function PredictionHistory({
    predictions,
}) {
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


    if (predictions.length === 0) {
        return (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">

                <div className="text-4xl">
                    📊
                </div>

                <h3 className="mt-3 font-semibold text-slate-800">
                    No prediction history
                </h3>

                <p className="mt-2 text-sm text-slate-500">
                    Predictions generated for this patient
                    will appear here.
                </p>

            </div>
        );
    }


    return (
        <div className="space-y-4">

            {predictions.map((prediction) => {

                const probability =
                    (
                        prediction.probability * 100
                    ).toFixed(1);


                const isHigherRisk =
                    prediction.prediction === 1;


                return (
                    <div
                        key={prediction.id}
                        className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
                    >

                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                            <div>

                                <p className="text-sm text-slate-500">
                                    Prediction generated
                                </p>

                                <p className="mt-1 font-medium text-slate-800">
                                    {formatDate(
                                        prediction.created_at
                                    )}
                                </p>

                            </div>


                            <div className="rounded-xl bg-slate-50 px-5 py-3 text-center">

                                <p className="text-xs text-slate-500">
                                    Predicted Probability
                                </p>

                                <p className="mt-1 text-2xl font-bold text-blue-600">
                                    {probability}%
                                </p>

                            </div>

                        </div>


                        <div className="mt-5 border-t border-slate-100 pt-5">

                            <p className="text-sm text-slate-500">
                                Model Prediction
                            </p>

                            <p
                                className={`mt-1 text-lg font-semibold ${
                                    isHigherRisk
                                        ? "text-orange-600"
                                        : "text-emerald-600"
                                }`}
                            >
                                {isHigherRisk
                                    ? "Higher Predicted Risk"
                                    : "Lower Predicted Risk"}
                            </p>

                        </div>

                    </div>
                );
            })}

        </div>
    );
}


export default PredictionHistory;