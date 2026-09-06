export default function SummaryCards({
  totalDeposit,
  totalM,
  totalBazaar,
  setTotalBazaar,
  guestIncome,
  setGuestIncome,
  remainingBazaar,
  setRemainingBazaar,
  mealRate,
  cashInHand,
  totalRefund,
}) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 mb-8 summary-grid">
      <div className="bg-slate-900 p-5 rounded-2xl shadow-sm">
        <p className="text-[11px] font-black text-slate-400 uppercase tracking-wider mb-1">Total Deposit</p>
        <div id="display-td" className="text-2xl font-black text-white">{totalDeposit.toLocaleString(undefined, { minimumFractionDigits: 2 })}</div>
      </div>
      <div className="bg-indigo-600 p-5 rounded-2xl shadow-lg">
        <p className="text-[11px] font-black text-indigo-200 uppercase tracking-wider mb-1">Total Meal</p>
        <div id="display-tm" className="text-2xl font-black text-white">{totalM.toFixed(1)}</div>
      </div>
      <div className="bg-white p-5 rounded-2xl border-2 border-slate-300 border-l-4 border-l-orange-500 shadow-sm hover:border-indigo-400 transition-colors">
        <p className="text-[11px] font-black text-slate-400 uppercase tracking-wider mb-1">Total Bazaar</p>
        <input type="number" id="input-tb" value={totalBazaar} onChange={e => setTotalBazaar(e.target.value)} className="w-full bg-transparent text-2xl font-black text-orange-700 placeholder:text-orange-200" placeholder="0" />
      </div>
      <div className="bg-white p-5 rounded-2xl border-2 border-slate-300 border-l-4 border-l-emerald-500 shadow-sm hover:border-indigo-400 transition-colors">
        <p className="text-[11px] font-black text-slate-400 uppercase tracking-wider mb-1">Guest Meals Income</p>
        <input type="number" id="input-tgm" value={guestIncome} onChange={e => setGuestIncome(e.target.value)} className="w-full bg-transparent text-2xl font-black text-emerald-700 placeholder:text-emerald-200" placeholder="0" />
      </div>
      <div className="bg-white p-5 rounded-2xl border-2 border-slate-300 border-l-4 border-l-[#966F33] shadow-sm hover:border-indigo-400 transition-colors">
        <p className="text-[11px] font-black text-slate-400 uppercase tracking-wider mb-1">Remaining Bazaar</p>
        <input type="number" id="input-sb" value={remainingBazaar} onChange={e => setRemainingBazaar(e.target.value)} className="w-full bg-transparent text-2xl font-black text-[#966F33] placeholder:text-[#966F33]" placeholder="0" />
      </div>
      <div className="bg-slate-900 p-5 rounded-2xl shadow-sm">
        <p className="text-[11px] font-black text-slate-400 uppercase tracking-wider mb-1">Meal Rate</p>
        <div id="display-mr" className="text-2xl font-black text-white">{mealRate.toFixed(4)}</div>
      </div>
      <div className="bg-slate-900 p-5 rounded-2xl shadow-sm no-print">
        <p className="text-[11px] font-black text-slate-400 uppercase tracking-wider mb-1">Cash in Hand</p>
        <div id="display-cash-hand" className="text-2xl font-black text-white">{cashInHand.toFixed(2)}</div>
      </div>
      <div className="bg-emerald-600 p-5 rounded-2xl shadow-lg no-print">
        <p className="text-[11px] font-black text-emerald-200 uppercase tracking-wider mb-1">Total Refund</p>
        <div id="display-return" className="text-2xl font-black text-white">{totalRefund.toFixed(2)}</div>
      </div>
    </div>
  );
}
