import { BrowserRouter, Route, Routes } from "react-router-dom";

import Navbar from "./components/Navbar";
import Patients from "./pages/Patients";
import PatientDashboard from "./pages/PatientDashboard";

function App() {
    return (
        <BrowserRouter>
            <div className="min-h-screen bg-slate-50">
                <Navbar />

                <Routes>
                    <Route path="/" element={<Patients />} />

                    <Route
                        path="/patients"
                        element={<Patients />}
                    />

                    <Route
                        path="/patients/:patientId"
                        element={<PatientDashboard />}
                    />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;