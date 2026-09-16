import Navbar from "./components/Navbar";
import Patients from "./pages/Patients";

function App() {
    return (
        <div className="min-h-screen bg-slate-50">
            <Navbar />
            <Patients />
        </div>
    );
}

export default App;