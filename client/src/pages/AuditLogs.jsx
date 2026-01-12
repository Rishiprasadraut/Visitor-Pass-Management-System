import { useEffect, useState } from "react";
import { getAuditLogs } from "../api/auditApi";
import { History, User, ArrowRight, ShieldCheck, Clock } from "lucide-react";

const AuditLogs = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const res = await getAuditLogs();
        setLogs(res.data.logs || []);
      } catch (err) {
        console.error("Audit fetch error", err);
      } finally {
        setLoading(false);
      }
    };
    fetchLogs();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "PENDING": return "text-amber-600 bg-amber-50 border-amber-100";
      case "APPROVED": return "text-blue-600 bg-blue-50 border-blue-100";
      case "CHECKED_IN": return "text-emerald-600 bg-emerald-50 border-emerald-100";
      case "REJECTED": return "text-red-600 bg-red-100 border-red-100";
      default: return "text-slate-600 bg-slate-50 border-slate-100";
    }
  };

  if (loading) return <AuditSkeleton />;

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6 min-h-screen bg-slate-50/30">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-8">
        <div className="w-fit p-3 bg-indigo-600 rounded-2xl text-white shadow-lg shadow-indigo-100">
          <History size={28} />
        </div>
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Security Audit Logs</h2>
          <p className="text-slate-500 text-sm font-medium">Tracking all visitor status changes and administrator actions.</p>
        </div>
      </div>

      {/* Timeline List */}
      <div className="relative space-y-8 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-indigo-500 before:via-slate-200 before:to-transparent">
        {logs.map((log) => (
          <div key={log._id} className="relative flex items-start md:items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
            
            {/* Dot on the timeline */}
            <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-slate-50 bg-slate-100 text-slate-400 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 transition-all duration-300 group-hover:bg-indigo-600 group-hover:text-white group-hover:scale-110 z-10">
              <ShieldCheck size={18} />
            </div>

            {/* Content Card */}
            <div className="w-[calc(100%-3.5rem)] md:w-[42%] bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-600 bg-indigo-50 px-2 py-1 rounded">
                  {log.action}
                </span>
                <div className="flex items-center text-slate-400 text-[10px] sm:text-xs font-medium">
                  <Clock size={12} className="mr-1" />
                  {new Date(log.createdAt).toLocaleDateString()}
                </div>
              </div>

              {/* Status Transition */}
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold border truncate max-w-[100px] ${getStatusColor(log.oldStatus)}`}>
                  {log.oldStatus || "START"}
                </span>
                <ArrowRight size={14} className="text-slate-300 shrink-0" />
                <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold border truncate max-w-[100px] ${getStatusColor(log.newStatus)}`}>
                  {log.newStatus}
                </span>
              </div>

              {/* Performed By User Tag */}
              <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                <div className="flex items-center gap-2 min-w-0">
                  <div className="w-7 h-7 bg-slate-100 rounded-full flex items-center justify-center text-slate-500 shrink-0">
                    <User size={14} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-slate-700 truncate">{log.performedBy?.name || "System"}</p>
                    <p className="text-[9px] text-slate-400 uppercase tracking-tight">{log.performedBy?.role || "Auto"}</p>
                  </div>
                </div>
                <p className="text-[10px] font-medium text-slate-400 shrink-0 ml-2">
                   {new Date(log.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const AuditSkeleton = () => (
  <div className="max-w-5xl mx-auto p-6 animate-pulse">
    <div className="flex items-center gap-4 mb-12">
      <div className="w-12 h-12 bg-slate-200 rounded-2xl"></div>
      <div className="space-y-2">
        <div className="h-6 w-32 sm:w-48 bg-slate-200 rounded"></div>
        <div className="h-4 w-48 sm:w-64 bg-slate-200 rounded"></div>
      </div>
    </div>
    {[1, 2, 3].map((i) => (
      <div key={i} className="flex gap-8 mb-8">
         <div className="w-10 h-10 bg-slate-200 rounded-full shrink-0"></div>
         <div className="h-32 bg-white border border-slate-100 w-full rounded-2xl"></div>
      </div>
    ))}
  </div>
);

export default AuditLogs;