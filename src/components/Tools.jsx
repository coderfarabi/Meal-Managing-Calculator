import { useRef, useState } from 'react';

export default function Tools({ processTextImport, handleFile, showResetConfirm }) {
  const [text, setText] = useState('');
  const [dragover, setDragover] = useState(false);
  const fileInputRef = useRef(null);

  function onDrop(e) {
    e.preventDefault();
    setDragover(false);
    if (e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]);
  }

  return (
    <section className="no-print mb-10 bg-slate-50 rounded-3xl p-6 border border-slate-200 border-dashed">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1">
          <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-3">Option A: Smart Import</h3>
          <label
            className={`drop-zone h-40 border-2 border-dashed border-slate-300 rounded-2xl p-6 flex items-center justify-center cursor-pointer transition-all hover:border-indigo-400 group ${dragover ? 'dragover' : ''}`}
            onDragOver={e => { e.preventDefault(); setDragover(true); }}
            onDragLeave={() => setDragover(false)}
            onDrop={onDrop}
          >
            <span className="text-sm font-bold text-slate-500 group-hover:text-indigo-600">Drop Excel or click to browse</span>
            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              accept=".xlsx, .xls, .csv"
              onChange={e => { handleFile(e.target.files[0]); e.target.value = null; }}
            />
          </label>
        </div>
        <div className="flex-1">
          <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-3">Option B: Quick Paste (SL M D)</h3>
          <textarea
            value={text}
            onChange={e => setText(e.target.value)}
            className="w-full h-24 p-4 text-xs font-mono border border-slate-300 rounded-2xl focus:ring-2 focus:ring-indigo-500"
            placeholder={'1 45 2000\n2 30 1500...'}
          />
          <div className="mt-3 flex gap-2">
            <button onClick={() => { processTextImport(text); setText(''); }} className="px-4 py-2 bg-slate-800 text-white text-xs font-bold rounded-lg uppercase tracking-wider">Process</button>
            <button onClick={showResetConfirm} className="px-4 py-2 text-red-600 text-xs font-bold rounded-lg uppercase tracking-wider hover:bg-red-50">Clear All</button>
          </div>
        </div>
      </div>
    </section>
  );
}
