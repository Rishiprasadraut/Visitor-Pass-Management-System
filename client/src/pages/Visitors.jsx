import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchVisitors } from "../redux/slices/visitorSlice";
import { updateStatus, checkInVisitor, checkOutVisitor } from "../api/visitorApi";
import { useNavigate } from "react-router-dom";

const Visitors = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { list, loading, totalPages } = useSelector((state) => state.visitors);
  const { role } = useSelector((state) => state.auth);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 5;

  useEffect(() => {
    dispatch(searchVisitors({ search, status, page: currentPage, limit }));
  }, [dispatch, search, status, currentPage]);

  const refreshData = () => dispatch(searchVisitors({ search, status, page: currentPage, limit }));

  const handleAction = async (id, s) => { await updateStatus(id, s); refreshData(); };
  const checkIn = async (id) => { await checkInVisitor(id); refreshData(); };
  const checkOut = async (id) => { await checkOutVisitor(id); refreshData(); };

  // Status Badge Logic
  const getStatusStyle = (s) => {
    const styles = {
      PENDING: "bg-amber-100 text-amber-700 border-amber-200",
      APPROVED: "bg-emerald-100 text-emerald-700 border-emerald-200",
      CHECKED_IN: "bg-blue-100 text-blue-700 border-blue-200",
      REJECTED: "bg-rose-100 text-rose-700 border-rose-200",
    };
    return styles[s] || "bg-gray-100 text-gray-700";
  };

  // if (loading) return <LoadingSkeleton />;

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        <header className="mb-8">
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Visitor Management</h2>
          <p className="text-slate-500 mt-1">Manage and track all guest entries and approvals.</p>
        </header>

        {/* CONTROLS */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <span className="absolute inset-y-0 left-3 flex items-center text-slate-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </span>
            <input
              type="text"
              placeholder="Search visitors..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all shadow-sm"
            />
          </div>

          <select
            value={status}
            onChange={(e) => { setStatus(e.target.value); setCurrentPage(1); }}
            className="px-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none shadow-sm font-medium text-slate-600"
          >
            <option value="">All Statuses</option>
            <option value="PENDING">Pending</option>
            <option value="APPROVED">Approved</option>
            <option value="CHECKED_IN">Checked In</option>
            <option value="REJECTED">Rejected</option>
          </select>
        </div>

        {/* LIST */}
        <div className="space-y-4">
          {list.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-slate-300">
              <p className="text-slate-400 font-medium">No visitors found matching your criteria.</p>
            </div>
          ) : (
            list.map((v) => (
              <div key={v._id} className="group flex flex-col sm:flex-row sm:items-center justify-between bg-white border border-slate-200 p-5 rounded-2xl hover:shadow-md transition-shadow">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold text-lg">
                    {v.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800 text-lg">{v.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${getStatusStyle(v.status)}`}>
                        {v.status.replace("_", " ")}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 mt-4 sm:mt-0">
                  {/* View History Button */}
                  <button
                    onClick={() => navigate(`/visitor-history?id=${v._id}`)}
                    className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 text-sm font-semibold rounded-lg transition-colors"
                    title="View History"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </button>

                  {v.status === "PENDING" && (
                    <>
                      <button onClick={() => handleAction(v._id, "APPROVED")} className="flex-1 sm:flex-none px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold rounded-lg transition-colors">
                        Approve
                      </button>
                      <button onClick={() => handleAction(v._id, "REJECTED")} className="flex-1 sm:flex-none px-5 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-rose-600 text-sm font-semibold rounded-lg transition-colors">
                        Reject
                      </button>
                    </>
                  )}

                  {v.status === "APPROVED" && role === "SECURITY" && (
                    <button onClick={() => checkIn(v._id)} className="w-full sm:w-auto px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg shadow-sm">
                      Check In
                    </button>
                  )}

                  {v.status === "CHECKED_IN" && role === "SECURITY" && (
                    <button onClick={() => checkOut(v._id)} className="w-full sm:w-auto px-6 py-2 bg-slate-800 hover:bg-slate-900 text-white text-sm font-semibold rounded-lg shadow-sm">
                      Check Out
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {/* PAGINATION */}
        <div className="flex justify-between items-center mt-10 pb-10">
          <p className="text-sm text-slate-500">
            Page <span className="font-bold text-slate-800">{currentPage}</span> of {totalPages}
          </p>
          <div className="flex gap-2">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
              className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            >
              Previous
            </button>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
              className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Sub-component for a cleaner loading state
// const LoadingSkeleton = () => (
//   <div className="max-w-5xl mx-auto p-8 animate-pulse">
//     <div className="h-8 w-48 bg-slate-200 rounded mb-8"></div>
//     <div className="flex gap-4 mb-6">
//       <div className="h-10 flex-1 bg-slate-200 rounded-xl"></div>
//       <div className="h-10 w-32 bg-slate-200 rounded-xl"></div>
//     </div>
//     {[1, 2, 3].map((i) => (
//       <div key={i} className="h-24 bg-slate-200 rounded-2xl mb-4"></div>
//     ))}
//   </div>
// );

export default Visitors;