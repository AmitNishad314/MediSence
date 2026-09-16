function Navbar() {
    return (
        <nav className="border-b border-slate-200 bg-white">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-lg font-bold text-white">
                        M
                    </div>

                    <div>
                        <h1 className="text-lg font-bold text-slate-900">
                            Medisense
                        </h1>

                        <p className="text-xs text-slate-500">
                            Medical Record Management
                        </p>
                    </div>
                </div>

                <div className="hidden text-sm text-slate-500 sm:block">
                    AI-assisted medical analysis
                </div>
            </div>
        </nav>
    );
}

export default Navbar;