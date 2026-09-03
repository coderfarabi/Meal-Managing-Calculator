export default function DataTable({ rows, updateData, totals }) {
  return (
    <div id="data-table-container" className="overflow-hidden rounded-2xl border border-slate-200 mb-8 shadow-xl max-h-[500px] overflow-y-auto">
      <table className="w-full relative">
        <thead className="bg-slate-900 text-white sticky top-0 z-10">
          <tr>
            <th className="p-4 text-xs font-black uppercase tracking-widest text-center w-16">SL</th>
            <th className="p-4 text-xs font-black uppercase tracking-widest text-center hide-on-ledger">Meals</th>
            <th className="p-4 text-xs font-black uppercase tracking-widest text-center">Deposit</th>
            <th className="p-4 text-xs font-black uppercase tracking-widest text-center hide-on-ledger">Cost</th>
            <th className="p-4 text-xs font-black uppercase tracking-widest text-center hide-on-ledger">Balance</th>
          </tr>
        </thead>
        <tbody id="member-body" className="divide-y divide-slate-100">
          {rows.map((m, i) => (
            <tr key={m.id} className="hover:bg-slate-50 transition-colors group">
              <td className="p-3 text-center text-slate-400 font-bold text-xs border-r border-slate-100">{i + 1}</td>
              <td className="p-0 hide-on-ledger">
                <input type="number" step="0.5" value={m.meals ?? ''} onChange={e => updateData(i, 'meals', e.target.value)} className="w-full p-3 text-center bg-transparent focus:bg-white focus:shadow-inner outline-none font-bold text-slate-700" />
              </td>
              <td className="p-0 border-l border-slate-100">
                <input type="number" value={m.deposit ?? ''} onChange={e => updateData(i, 'deposit', e.target.value)} className="w-full p-3 text-center bg-transparent focus:bg-white focus:shadow-inner outline-none font-bold text-indigo-600" />
              </td>
              <td className="p-3 text-center text-slate-500 font-medium text-sm hide-on-ledger bg-slate-50/50">{m.cost.toFixed(2)}</td>
              <td className={`p-3 text-center font-black text-sm hide-on-ledger ${m.balance < -0.1 ? 'text-red-600' : 'text-slate-800'}`}>{Math.round(m.balance)}</td>
            </tr>
          ))}
        </tbody>
        <tfoot className="bg-slate-50 font-black sticky bottom-0 z-10">
          <tr>
            <td className="p-4 text-center text-slate-400">Total</td>
            <td className="p-4 text-center hide-on-ledger">{totals.totalM.toFixed(1)}</td>
            <td className="p-4 text-center">{totals.totalD.toFixed(2)}</td>
            <td className="p-4 text-center hide-on-ledger">{totals.totalE.toFixed(2)}</td>
            <td className="p-4 text-center hide-on-ledger">{totals.totalS.toFixed(2)}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
