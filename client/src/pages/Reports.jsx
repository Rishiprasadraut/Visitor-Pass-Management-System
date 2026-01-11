import { useState } from "react";
import { getReportByStatus, getReportByDate } from "../api/visitorApi";
import { FileText, Filter, Calendar, Search, User, Phone, Mail, Clock } from "lucide-react";

const Reports = () => {
  const [reportType, setReportType] = useState("status"); // "status" or "date"
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
    <div className="min-h-screen bg-slate-50/50 p-6 md:p-10">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 bg-violet-600 rounded-2xl text-white shadow-lg shadow-violet-100">
            <FileText size={28} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Visitor Reports</h2>
            <p className="text-slate-500 text-sm font-medium">Generate reports by status or date range.</p>
          </div>
        </div>

        {/* Filter Card */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 mb-8">
          <div className="flex flex-wrap gap-4 items-end">
            {/* Report Type Toggle */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Report Type</label>
              <div className="flex gap-2">
                <button
                  onClick={() => setReportType("status")}
                  className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
                    reportType === "status"
                      ? "bg-violet-600 text-white"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  <Filter size={16} />
                  By Status
                </button>
                <button
                  onClick={() => setReportType("date")}
                  className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
                    reportType === "date"
                      ? "bg-violet-600 text-white"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  <Calendar size={16} />
                  By Date
                </button>
              </div>
            </div>

            {/* Status Filter */}
            {reportType === "status" && (
              <div className="flex-1 min-w-[200px]">
                <label className="block text-sm font-medium text-slate-700 mb-2">Status</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent outline-none"
                >
                  <option value="PENDING">Pending</option>
                  <option value="APPROVED">Approved</option>
                  <option value="REJECTED">Rejected</option>
                  <option value="CHECKED_IN">Checked In</option>
                  <option value="CHECKED_OUT">Checked Out</option>
                </select>
              </div>
            )}

            {/* Date Range Filter */}
            {reportType === "date" && (
              <>
                <div className="flex-1 min-w-[150px]">
                  <label className="block text-sm font-medium text-slate-700 mb-2">From Date</label>
                  <input
                    type="date"
                    value={fromDate}
                    onChange={(e) => setFromDate(e.target.value)}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent outline-none"
                  />
                </div>
                <div className="flex-1 min-w-[150px]">
                  <label className="block text-sm font-medium text-slate-700 mb-2">To Date</label>
                  <input
                    type="date"
                    value={toDate}
                    onChange={(e) => setToDate(e.target.value)}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent outline-none"
                  />
                </div>
              </>
            )}

            {/* Search Button */}
            <button
              onClick={handleSearch}
              disabled={loading || (reportType === "date" && (!fromDate || !toDate))}
              className="px-6 py-2 bg-violet-600 hover:bg-violet-700 disabled:bg-violet-400 text-white font-semibold rounded-lg shadow-md transition-all flex items-center gap-2"
            >
              {loading ? (
                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              ) : (
                <>
                  <Search size={18} />
                  Generate Report
                </>
              )}
            </button>
          </div>
        </div>

        {/* Results */}
        {loading ? (
          <ResultsSkeleton />
        ) : searched && visitors.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
            <FileText size={48} className="mx-auto text-slate-300 mb-4" />
            <p className="text-slate-500 font-medium">No visitors found for the selected criteria.</p>
          </div>
        ) : visitors.length > 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <p className="font-bold text-slate-900">
                {visitors.length} Visitor{visitors.length !== 1 ? "s" : ""} Found
              </p>
            </div>
            <div className="divide-y divide-slate-100">
              {visitors.map((visitor) => (
                <div key={visitor._id} className="p-6 hover:bg-slate-50 transition-colors">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center">
                        <User size={24} className="text-slate-400" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900">{visitor.name}</h4>
                        <div className="flex items-center gap-4 mt-1 text-sm text-slate-500">
                          <span className="flex items-center gap-1">
                            <Mail size={14} />
                            {visitor.email}
                          </span>
                          <span className="flex items-center gap-1">
                            <Phone size={14} />
                            {visitor.phone}
                          </span>
                        </div>
                        <p className="text-sm text-slate-600 mt-2">
                          <span className="font-medium">Purpose:</span> {visitor.purpose}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase border ${getStatusColor(visitor.status)}`}>
                        {visitor.status}
                      </span>
                      <span className="text-xs text-slate-400 flex items-center gap-1">
                        <Clock size={12} />
                        {new Date(visitor.createdAt).toLocaleDateString()}
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
      <div className="h-6 w-32 bg-slate-200 rounded"></div>
    </div>
    {[1, 2, 3].map((i) => (
      <div key={i} className="p-6 border-b border-slate-50">
        <div className="flex gap-4">
          <div className="w-12 h-12 bg-slate-200 rounded-xl"></div>
          <div className="flex-1 space-y-2">
            <div className="h-5 w-40 bg-slate-200 rounded"></div>
            <div className="h-4 w-64 bg-slate-100 rounded"></div>
          </div>
        </div>
      </div>
    ))}
  </div>
);

export default Reports;
