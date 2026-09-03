export default function FABs() {
  return (
    <>
      <div onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="nav-fab go-top no-print" title="Top">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" /></svg>
      </div>
      <div onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })} className="nav-fab go-bottom no-print" title="Bottom">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
      </div>
    </>
  );
}
