export default function HallHeader({ month, year, setMonth, setYear, months }) {
  const nowYear = new Date().getFullYear();
  const years = [];
  for (let y = nowYear - 2; y <= nowYear + 2; y++) years.push(y);

  return (
    <header className="bg-slate-900 text-white p-8 text-center relative">
      <h1 className="text-3xl font-black uppercase tracking-tighter mb-2">Hazrat Uthman (R) Hall Dining</h1>
      <div className="flex justify-center items-center gap-3">
        <div className="h-px w-8 bg-indigo-500"></div>
        <div className="flex items-center bg-slate-800 px-4 py-1.5 text-white rounded-full border border-slate-700">
          <select value={month} onChange={e => setMonth(parseInt(e.target.value))} className="bg-slate-800 text-sm font-bold uppercase tracking-widest focus:outline-none cursor-pointer">
            {months.map((m, i) => (
              <option key={m} value={i}>{m}</option>
            ))}
          </select>
          <span className="mx-2 text-slate-500">•</span>
          <select value={year} onChange={e => setYear(parseInt(e.target.value))} className="bg-slate-800 text-sm font-bold uppercase tracking-widest focus:outline-none cursor-pointer">
            {years.map(y => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
        </div>
        <div className="h-px w-8 bg-indigo-500"></div>
      </div>
    </header>
  );
}
