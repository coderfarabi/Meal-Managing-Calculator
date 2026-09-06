export default function Signature({ sigPrepared, setSigPrepared, sigVerified, setSigVerified }) {
  return (
    <div className="grid grid-cols-2 gap-12 mt-20 pt-10 border-t border-slate-100 sig-row">
      <div className="text-center group">
        <input
          type="text"
          value={sigPrepared}
          onChange={e => setSigPrepared(e.target.value)}
          placeholder="Type name..."
          className="w-full text-center italic font-serif text-indigo-700 bg-transparent border-b-2 border-slate-200 mb-2 focus:border-indigo-500 transition-colors"
        />
        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 group-hover:text-slate-900">Dining Manager</p>
      </div>
      <div className="text-center group">
        <input
          type="text"
          value={sigVerified}
          onChange={e => setSigVerified(e.target.value)}
          placeholder="Type name..."
          className="w-full text-center italic font-serif text-indigo-700 bg-transparent border-b-2 border-slate-200 mb-2 focus:border-indigo-500 transition-colors"
        />
        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 group-hover:text-slate-900">Dining Representative</p>
      </div>
      <div className="col-span-full flex items-end justify-between mt-8">
        <p className="text-[9px] text-slate-400">Built for Excellence — Hazrat Uthman (R) Hall, IIUC, Kumira</p>
        <p className="text-[9px] text-slate-400">A A R Farabi</p>
      </div>
    </div>
  );
}
