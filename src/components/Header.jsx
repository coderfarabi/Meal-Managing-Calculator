export default function Header({ onPrint }) {
  return (
    <nav className="sticky-nav no-print px-4 py-3 flex justify-between items-center shadow-sm">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-indigo-200 shadow-lg">
          <span className="material-symbols-outlined">dining</span>
        </div>
        <span className="font-black text-slate-800 tracking-tight text-lg uppercase">HURH Dining</span>
      </div>
      <div className="flex gap-3">
        <button onClick={() => onPrint('ledger')} className="bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-xl font-bold text-sm hover:bg-slate-50 transition-all flex items-center gap-2">
          Deposit Ledger
        </button>
        <button onClick={() => onPrint('full')} className="bg-indigo-600 text-white px-5 py-2 rounded-xl font-bold text-sm shadow-indigo-200 shadow-lg hover:bg-indigo-700 transition-all flex items-center gap-2">
          Full Report
        </button>
      </div>
    </nav>
  );
}
