export default function Modals({ showAlert, alertMsg, closeAlert, showConfirm, closeConfirm, executeReset }) {
  return (
    <>
      <div id="custom-alert" className={`fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[200] items-center justify-center p-4 ${showAlert ? 'flex' : 'hidden'}`}>
        <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6 border-t-8 border-indigo-600">
          <h3 className="text-xl font-bold text-slate-800 mb-2">Notice</h3>
          <p className="text-slate-600 mb-6">{alertMsg}</p>
          <button onClick={closeAlert} className="w-full bg-indigo-600 text-white font-bold py-3 rounded-xl hover:bg-indigo-700 transition-colors">Dismiss</button>
        </div>
      </div>

      <div id="confirm-modal" className={`fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[200] items-center justify-center p-4 ${showConfirm ? 'flex' : 'hidden'}`}>
        <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6 border-t-8 border-red-600">
          <h3 className="text-xl font-bold text-slate-800 mb-2">Reset Data?</h3>
          <p className="text-slate-600 mb-6">Are you sure you want to clear all inputs? This cannot be undone.</p>
          <div className="flex gap-3">
            <button onClick={closeConfirm} className="flex-1 bg-slate-100 text-slate-600 font-bold py-3 rounded-xl">Cancel</button>
            <button onClick={executeReset} className="flex-1 bg-red-600 text-white font-bold py-3 rounded-xl">Reset</button>
          </div>
        </div>
      </div>
    </>
  );
}
