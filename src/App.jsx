import { useEffect, useRef, useState } from 'react';
import * as XLSX from 'xlsx';
import Header from './components/Header.jsx';
import HallHeader from './components/HallHeader.jsx';
import SummaryCards from './components/SummaryCards.jsx';
import Tools from './components/Tools.jsx';
import DataTable from './components/DataTable.jsx';
import Signature from './components/Signature.jsx';
import Modals from './components/Modals.jsx';
import FABs from './components/FABs.jsx';

const STORAGE_KEY = 'mealCalcData';

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function defaultMembers() {
  return Array.from({ length: 315 }, (_, i) => ({ id: i, meals: null, deposit: null }));
}

function loadSaved() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
}

export default function App() {
  const saved = useRef(loadSaved()).current;

  const [members, setMembers] = useState(() => saved?.members ?? defaultMembers());
  const [totalBazaar, setTotalBazaar] = useState(saved?.totalBazaar ?? '');
  const [guestIncome, setGuestIncome] = useState(saved?.guestIncome ?? '');
  const [remainingBazaar, setRemainingBazaar] = useState(saved?.remainingBazaar ?? '');
  const [sigPrepared, setSigPrepared] = useState(saved?.sigPrepared ?? '');
  const [sigVerified, setSigVerified] = useState(saved?.sigVerified ?? '');
  const [month, setMonth] = useState(saved?.month ?? new Date().getMonth());
  const [year, setYear] = useState(saved?.year ?? new Date().getFullYear());

  const [showAlert, setShowAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState('');
  const [showConfirm, setShowConfirm] = useState(false);
  const [printMode, setPrintMode] = useState(false);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      members,
      totalBazaar,
      guestIncome,
      remainingBazaar,
      sigPrepared,
      sigVerified,
      month,
      year,
    }));
  }, [members, totalBazaar, guestIncome, remainingBazaar, sigPrepared, sigVerified, month, year]);

  useEffect(() => {
    if (!printMode) return;
    window.print();
    document.body.classList.remove('print-ledger');
    setPrintMode(false);
  }, [printMode]);

  const tb = parseFloat(totalBazaar) || 0;
  const tgm = parseFloat(guestIncome) || 0;
  const sb = parseFloat(remainingBazaar) || 0;

  let totalM = 0, totalD = 0;
  members.forEach(m => {
    totalM += (m.meals || 0);
    totalD += (m.deposit || 0);
  });

  const netCost = tb - tgm - sb;
  const mealRate = totalM > 0 ? netCost / totalM : 0;

  let totalE = 0, totalS = 0;
  const rows = members.map((m) => {
    const cost = (m.meals || 0) * mealRate;
    const balance = (m.deposit || 0) - cost;
    if (m.meals !== null || m.deposit !== null) {
      totalE += cost;
      totalS += balance;
    }
    return { ...m, cost, balance };
  });

  function updateData(idx, field, val) {
    const num = parseFloat(val);
    setMembers(prev => {
      const next = prev.map((m, i) => i === idx ? { ...m, [field]: isNaN(num) ? null : num } : m);
      return next;
    });
  }

  function addRow() {
    setMembers(prev => [...prev, { id: prev.length, meals: null, deposit: null }]);
  }

  function executeReset() {
    setTotalBazaar('');
    setGuestIncome('');
    setRemainingBazaar('');
    setSigPrepared('');
    setSigVerified('');
    setMembers(defaultMembers());
    localStorage.removeItem(STORAGE_KEY);
    setShowConfirm(false);
  }

  function processTextImport(raw) {
    if (!raw.trim()) return;
    const lines = raw.split("\n");
    setMembers(prev => {
      const next = prev.map(m => ({ ...m }));
      lines.forEach(line => {
        const [sl, m, d] = line.split(/[\t, ]+/).map(v => parseFloat(v));
        if (!isNaN(sl)) {
          const idx = Math.floor(sl) - 1;
          if (idx >= 0) {
            while (next.length <= idx) next.push({ id: next.length, meals: null, deposit: null });
            next[idx].meals = isNaN(m) ? null : m;
            next[idx].deposit = isNaN(d) ? null : d;
          }
        }
      });
      return next;
    });
  }

  function handleFile(file) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = e => {
      const data = new Uint8Array(e.target.result);
      const wb = XLSX.read(data, { type: 'array' });
      const ws = wb.Sheets[wb.SheetNames[0]];
      const rows = XLSX.utils.sheet_to_json(ws, { header: 1 });
      setMembers(prev => {
        const next = prev.map(m => ({ ...m }));
        rows.forEach(row => {
          const sl = parseFloat(row[0]);
          if (!isNaN(sl)) {
            const idx = Math.floor(sl) - 1;
            if (idx >= 0) {
              while (next.length <= idx) next.push({ id: next.length, meals: null, deposit: null });
              next[idx].meals = parseFloat(row[1]) || null;
              next[idx].deposit = parseFloat(row[2]) || null;
            }
          }
        });
        return next;
      });
    };
    reader.readAsArrayBuffer(file);
  }

  function handleExportData() {
    const data = {
      members,
      totalBazaar,
      guestIncome,
      remainingBazaar,
      sigPrepared,
      sigVerified,
      month,
      year,
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const now = new Date();
    const ts = [
      now.getFullYear(),
      String(now.getMonth() + 1).padStart(2, '0'),
      String(now.getDate()).padStart(2, '0'),
      String(now.getHours()).padStart(2, '0'),
      String(now.getMinutes()).padStart(2, '0'),
      String(now.getSeconds()).padStart(2, '0'),
    ].join('-');
    const a = document.createElement('a');
    a.href = url;
    a.download = `meal-data-${MONTHS[month].toLowerCase()}-${year}-${ts}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function handleImportFile(file) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = e => {
      try {
        const data = JSON.parse(e.target.result);
        setMembers(Array.isArray(data.members) ? data.members : defaultMembers());
        setTotalBazaar(data.totalBazaar ?? '');
        setGuestIncome(data.guestIncome ?? '');
        setRemainingBazaar(data.remainingBazaar ?? '');
        setSigPrepared(data.sigPrepared ?? '');
        setSigVerified(data.sigVerified ?? '');
        if (typeof data.month === 'number') setMonth(data.month);
        if (typeof data.year === 'number') setYear(data.year);
        setAlertMsg("Backup restored successfully.");
        setShowAlert(true);
      } catch {
        setAlertMsg("Could not read the backup file. Please choose a valid JSON backup.");
        setShowAlert(true);
      }
    };
    reader.readAsText(file);
  }

  function handlePrint(type) {
    if (type === 'full') {
      const sigs = [sigPrepared, sigVerified];
      let f1 = false, f2 = false;
      let errors = [];
      if (totalBazaar === "" || guestIncome === "" || remainingBazaar === "") { errors.push("Summary values"); f1 = true; }
      if (sigs.some(s => !s.trim())) { errors.push("Signatures"); f2 = true; }

      if (errors.length > 0) {
        window.scrollTo({ top: (f2 && !f1) ? document.body.scrollHeight : 0, behavior: 'smooth' });
        setAlertMsg("Wait! Missing: " + errors.join(" & ") + ". Required for full report.");
        setShowAlert(true);
        return;
      }
      document.body.classList.remove('print-ledger');
    } else {
      document.body.classList.add('print-ledger');
    }

    setPrintMode(true);
  }

  return (
    <div>
      <Header onPrint={handlePrint} />

      <FABs />

      <main className="max-w-7xl mx-auto p-4 md:p-8">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-200 main-container">
          <HallHeader month={month} year={year} setMonth={setMonth} setYear={setYear} months={MONTHS} />

          <div className="p-8">
            <SummaryCards
              totalDeposit={totalD}
              totalM={totalM}
              totalBazaar={totalBazaar}
              setTotalBazaar={setTotalBazaar}
              guestIncome={guestIncome}
              setGuestIncome={setGuestIncome}
              remainingBazaar={remainingBazaar}
              setRemainingBazaar={setRemainingBazaar}
              mealRate={mealRate}
              cashInHand={sb + totalS}
              totalRefund={totalS}
            />

            <Tools
              processTextImport={processTextImport}
              handleFile={handleFile}
              showResetConfirm={() => setShowConfirm(true)}
              onExport={handleExportData}
              onImportFile={handleImportFile}
            />

            <DataTable rows={rows} updateData={updateData} totals={{ totalM, totalD, totalE, totalS }} trimTrailingEmpty={printMode} />

            <div className="no-print mb-12 flex justify-center">
              <button onClick={addRow} className="bg-white border-2 border-slate-200 text-slate-700 px-10 py-3 rounded-2xl font-black text-xs uppercase tracking-widest hover:border-indigo-600 hover:text-indigo-600 transition-all shadow-sm">
                + Add Record Row
              </button>
            </div>

            <Signature sigPrepared={sigPrepared} setSigPrepared={setSigPrepared} sigVerified={sigVerified} setSigVerified={setSigVerified} />
          </div>
        </div>
        
      </main>

      <Modals
        showAlert={showAlert}
        alertMsg={alertMsg}
        closeAlert={() => setShowAlert(false)}
        showConfirm={showConfirm}
        closeConfirm={() => setShowConfirm(false)}
        executeReset={executeReset}
      />
    </div>
  );
}
