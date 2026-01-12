import { useState } from "react";
import { getReportByStatus, getReportByDate } from "../api/visitorApi";
import { FileText, Filter, Calendar, Search, User, Phone, Mail, Clock } from "lucide-react";

const Reports = () => {
  const [reportType, setReportType] = useState("status");
  const [status, setStatus] = useState("PENDING");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [visitors, setVisitors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    setSearched(true);
    try {
      let res;
      if (reportType === "status") {
        res = await getReportByStatus(status);
      } else {
        res = await getReportByDate(fromDate, toDate);
      }
      setVisitors(res.data.visitors || []);
    } catch (err) {
      console.error("Report fetch error", err);
      setVisitors([]);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "PENDING": return "bg-amber-100 text-amber-700 border-amber-200";
      case "APPROVED": return "bg-blue-100 text-blue-700 border-blue-200";
      case "CHECKED_IN": return "bg-emerald-100 text-emerald-700 border-emerald-200";
      case "CHECKED_OUT": return "bg-slate-100 text-slate-700 border-slate-200";
      case "REJECTED": return "bg-red-100 text-red-700 border-red-200";
      default: return "bg-slate-100 text-slate-700 border-slate-200";
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 p-4 sm:p-6 md:p-10">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-6 sm:mb-8">
          <div className="w-fit p-3 bg-violet-600 rounded-2xl text-white shadow-lg shadow-violet-100">
            <FileText size={28} />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Visitor Reports</h2>
            <p className="text-slate-500 text-sm font-medium">Generate reports by status or date range.</p>
          </div>
        </div>

        {/* Filter Card */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 sm:p-6 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
            
            {/* Report Type Toggle */}
            <div className="lg:col-span-4">
              <label className="block text-sm font-medium text-slate-700 mb-2">Report Type</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setReportType("status")}
                  className={`px-3 py-2.5 rounded-lg font-medium transition-all flex items-center justify-center gap-2 text-sm sm:text-base ${
                    reportType === "status"
                      ? "bg-violet-600 text-white shadow-md shadow-violet-200"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  <Filter size={16} />
                  Status
                </button>
                <button
                  onClick={() => setReportType("date")}
                  className={`px-3 py-2.5 rounded-lg font-medium transition-all flex items-center justify-center gap-2 text-sm sm:text-base ${
                    reportType === "date"
                      ? "bg-violet-600 text-white shadow-md shadow-violet-200"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  <Calendar size={16} />
                  Date
                </button>
              </div>
            </div>

            {/* Conditional Filters */}
            <div className="lg:col-span-5">
              {reportType === "status" ? (
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Select Status</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-violet-500 outline-none bg-white"
                  >
                    <option value="PENDING">Pending</option>
                    <option value="APPROVED">Approved</option>
                    <option value="REJECTED">Rejected</option>
                    <option value="CHECKED_IN">Checked In</option>
                    <option value="CHECKED_OUT">Checked Out</option>
                  </select>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">From</label>
                    <input
                      type="date"
                      value={fromDate}
                      onChange={(e) => setFromDate(e.target.value)}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-violet-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">To</label>
                    <input
                      type="date"
                      value={toDate}
                      onChange={(e) => setToDate(e.target.value)}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-violet-500 outline-none"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Search Button */}
            <div className="lg:col-span-3">
              <button
                onClick={handleSearch}
                disabled={loading || (reportType === "date" && (!fromDate || !toDate))}
                className="w-full px-6 py-2.5 bg-violet-600 hover:bg-violet-700 disabled:bg-violet-400 text-white font-semibold rounded-lg shadow-md transition-all flex items-center justify-center gap-2"
              >
                {loading ? (
                  <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                ) : (
                  <>
                    <Search size={18} />
                    <span>Generate Report</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Results */}
        {loading ? (
          <ResultsSkeleton />
        ) : searched && visitors.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-16 text-center">
            <div className="bg-slate-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText size={40} className="text-slate-300" />
            </div>
            <p className="text-slate-500 font-medium">No records matching your search.</p>
          </div>
        ) : visitors.length > 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 bg-slate-50/50 border-b border-slate-100 flex items-center justify-between">
              <p className="font-bold text-slate-800 text-sm sm:text-base">
                {visitors.length} Record{visitors.length !== 1 ? "s" : ""}
              </p>
            </div>
            <div className="divide-y divide-slate-100">
              {visitors.map((visitor) => (
                <div key={visitor._id} className="p-4 sm:p-6 hover:bg-slate-50/80 transition-colors">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className="hidden sm:flex w-12 h-12 bg-violet-50 rounded-xl items-center justify-center shrink-0">
                        <User size={24} className="text-violet-400" />
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-bold text-slate-900 truncate">{visitor.name}</h4>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 mt-1 text-sm text-slate-500">
                          <span className="flex items-center gap-1.5 truncate">
                            <Mail size={14} className="shrink-0" />
                            {visitor.email}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Phone size={14} className="shrink-0" />
                            {visitor.phone}
                          </span>
                        </div>
                        <p className="text-sm text-slate-600 mt-2 line-clamp-2">
                          <span className="font-medium text-slate-400">Purpose:</span> {visitor.purpose}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-start gap-2 pt-3 md:pt-0 border-t md:border-t-0 border-slate-100">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase border ${getStatusColor(visitor.status)}`}>
                        {visitor.status.replace('_', ' ')}
                      </span>
                      <span className="text-[11px] text-slate-400 flex items-center gap-1">
                        <Clock size={12} />
                        {new Date(visitor.createdAt).toLocaleDateString(undefined, { dateStyle: 'medium' })}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

const ResultsSkeleton = () => (
  <div className="bg-white rounded-2xl border border-slate-100 animate-pulse">
    <div className="p-6 border-b border-slate-100">
      <div className="h-5 w-32 bg-slate-200 rounded"></div>
    </div>
    {[1, 2, 3].map((i) => (
      <div key={i} className="p-6 border-b border-slate-50">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="hidden sm:block w-12 h-12 bg-slate-200 rounded-xl"></div>
          <div className="flex-1 space-y-3">
            <div className="h-5 w-1/3 bg-slate-200 rounded"></div>
            <div className="h-4 w-1/2 bg-slate-100 rounded"></div>
          </div>
          <div className="h-8 w-24 bg-slate-100 rounded-full self-start"></div>
        </div>
      </div>
    ))}
  </div>
);

export default Reports;