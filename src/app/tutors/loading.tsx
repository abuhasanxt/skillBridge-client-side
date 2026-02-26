
export default  function TutorLoading() {
    
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md space-y-4 animate-pulse">
        <div className="h-6 bg-slate-200 rounded w-1/2 mx-auto"></div>
        <div className="h-4 bg-slate-200 rounded"></div>
        <div className="h-4 bg-slate-200 rounded w-5/6 mx-auto"></div>
        <div className="h-4 bg-slate-200 rounded w-2/3 mx-auto"></div>
      </div>
    </div>
  );
}