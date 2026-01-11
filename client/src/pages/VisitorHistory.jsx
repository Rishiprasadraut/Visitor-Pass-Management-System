import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { getVisitorHistory } from "../api/visitorApi";
import { History, Search, User, ArrowRight, Clock, AlertCircle } from "lucide-react";

const VisitorHistory = () => {
  const [searchParams] = useSearchParams();
  const [visitorId, setVisitorId] = useState("");
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [error, setError] = useState("");

  // Auto-load if ID is in URL
  useEffect(() => {
    const idFromUrl = searchParams.get("id");
    if (idFromUrl) {
      setVisitorId(idFromUrl);
      fetchHistory(idFromUrl);
    }
  }, [searchParams]);

  const fetchHistory = async (id) => {
    if (!id.trim()) return;

    setLoading(true);
    setSearched(true);
    setError("");

    try {
      const res = await getVisitorHistory(id.trim());
      setHistory(res.data.history || []);
    } catch (err) {
      console.error("History fetch error", err);
      setHistory([]);
      setError(err.response?.data?.message || "Failed to fetch visitor history");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => fetchHistory(visitorId);

  const getStatusColor = (status) => {
    switch (status) {
      case "PENDING": return "text-amber-600 bg-amber-50 border-amber-200";
      case "APPROVED": return "text-blue-600 bg-blue-50 border-blue-200";
      case "CHECKED_IN": return "text-emerald-600 bg-emerald-50 border-emerald-200";
      case "CHECKED_OUT": return "text-slate-600 bg-slate-50 border-slate-200";
      case "REJECTED": return "text-red-600 bg-red-50 border-red-200";
      default: return "text-slate-600 bg-slate-50 border-slate-200";
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 p-6 md:p-10">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 bg-teal-600 rounded-2xl text-white shadow-lg shadow-teal-100">
            <History size={28} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Visitor History</h2>
            <p className="text-slate-500 text-sm font-medium">Track status changes for a specific visitor.</p>
          </div>
        </div>

        {/* Search Card */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 mb-8">
          <label className="block text-sm font-medium text-slate-700 mb-2">Visitor ID</label>
          <div className="flex gap-3">
            <input
              type="text"
              value={visitorId}
              onChange={(e) => setVisitorId(e.target.value)}
              placeholder="Enter visitor ID..."
              className="flex-1 px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
            />
            <button
              onClick={handleSearch}
              disabled={loading || !visitorId.trim()}
              className="px-6 py-2.5 bg-teal-600 hover:bg-teal-700 disabled:bg-teal-400 text-white font-semibold rounded-lg shadow-md transition-all flex items-center gap-2"
            >
              {loading ? (
                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              ) : (
                <>
                  <Search size={18} />
                  Search
                </>
              )}
            </button>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-6 mb-8 flex items-center gap-3">
            <AlertCircle className="text-red-500" size={24} />
            <p className="text-red-600 font-medium">{error}</p>
          </div>
        )}

        {/* Results */}
        {loading ? (
          <HistorySkeleton />
        ) : searched && !error && history.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
            <History size={48} className="mx-auto text-slate-300 mb-4" />
            <p className="text-slate-500 font-medium">No history found for this visitor.</p>
          </div>
        ) : history.length > 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100">
              <p className="font-bold text-slate-900">Status History Timeline</p>
            </div>

            {/* Timeline */}
            <div className="p-6">
              <div className="relative space-y-6 before:absolute before:inset-0 before:ml-5 before:-translate-x-px before:h-full before:w-0.5 before:bg-gradient-to-b before:from-teal-500 before:via-slate-200 before:to-transparent">
                {history.map((item, index) => (
                  <div key={index} className="relative flex gap-4">
                    {/* Timeline Dot */}
                    <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 border-white shadow shrink-0 z-10 ${
                      index === 0 ? "bg-teal-600 text-white" : "bg-white text-slate-400"
                    }`}>
                      <ArrowRight size={16} />
                    </div>

                    {/* Content */}
                    <div className="flex-1 bg-slate-50 rounded-xl p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase border ${getStatusColor(item.status)}`}>
                          {item.status}
                        </span>
                        {item.changedAt && (
                          <span className="text-xs text-slate-400 flex items-center gap-1">
                            <Clock size={12} />
                            {new Date(item.changedAt).toLocaleString()}
                          </span>
                        )}
                      </div>

                      {item.changedBy && (
                        <div className="flex items-center gap-2 mt-3 pt-3 border-t border-slate-200">
                          <div className="w-7 h-7 bg-white rounded-full flex items-center justify-center shadow-sm">
                            <User size={14} className="text-slate-500" />
                          </div>
                          <div>
                            <p className="text-xs font-bold text-slate-700">{item.changedBy.name}</p>
                            <p className="text-[10px] text-slate-400 uppercase">{item.changedBy.role}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

const HistorySkeleton = () => (
  <div className="bg-white rounded-2xl border border-slate-100 animate-pulse">
    <div className="p-6 border-b border-slate-100">
      <div className="h-6 w-48 bg-slate-200 rounded"></div>
    </div>
    <div className="p-6 space-y-6">
      {[1, 2, 3].map((i) => (
        <div key={i} className="flex gap-4">
          <div className="w-10 h-10 bg-slate-200 rounded-full"></div>
          <div className="flex-1 h-20 bg-slate-100 rounded-xl"></div>
        </div>
      ))}
    </div>
  </div>
);

export default VisitorHistory;
