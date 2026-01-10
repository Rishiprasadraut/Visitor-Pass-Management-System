import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchVisitors } from "../redux/slices/visitorSlice";
import {
  updateStatus,
  checkInVisitor,
  checkOutVisitor,
} from "../api/visitorApi";

const Visitors = () => {
  const dispatch = useDispatch();
  const { list, loading } = useSelector((state) => state.visitors);

  useEffect(() => {
    dispatch(fetchVisitors());
  }, [dispatch]);

  const handleAction = async (id, status) => {
    try {
      await updateStatus(id, status);
      dispatch(fetchVisitors());
    } catch (err) {
      alert("Action failed");
    }
  };

  const checkIn = async (id) => {
    try {
      await checkInVisitor(id);
      dispatch(fetchVisitors());
    } catch (err) {
      alert("Check-in failed");
    }
  };

  const checkOut = async (id) => {
    try {
      await checkOutVisitor(id);
      dispatch(fetchVisitors());
    } catch (err) {
      alert("check-Out failed");
    }
  };

  if (loading) return <p>Loading....</p>;
  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="mb-8 flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            Visitor Log
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            Manage guest approvals and check-ins
          </p>
        </div>
        <div className="text-sm font-medium text-gray-400">
          Total: {list.length}
        </div>
      </div>

      <div className="space-y-4">
        {list.length > 0 ? (
          list.map((v) => (
            <div
              key={v._id}
              className="flex flex-col md:flex-row md:items-center justify-between p-5 bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 group"
            >
              {/* Info Section */}
              <div className="flex flex-col space-y-1 mb-4 md:mb-0">
                <p className="text-lg font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
                  {v.name}
                </p>
                <div className="flex items-center">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold border tracking-wide uppercase ${
                      v.status === "PENDING"
                        ? "bg-amber-50 text-amber-700 border-amber-200"
                        : v.status === "APPROVED"
                        ? "bg-blue-50 text-blue-700 border-blue-200"
                        : v.status === "CHECKED_IN"
                        ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                        : "bg-gray-50 text-gray-600 border-gray-200"
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                        v.status === "PENDING"
                          ? "bg-amber-500"
                          : v.status === "APPROVED"
                          ? "bg-blue-500"
                          : v.status === "CHECKED_IN"
                          ? "bg-emerald-500"
                          : "bg-gray-400"
                      }`}
                    ></span>
                    {v.status.replace("_", " ")}
                  </span>
                </div>
              </div>

              {/* Actions Section */}
              <div className="flex items-center gap-2">
                {v.status === "PENDING" && (
                  <>
                    <button
                      onClick={() => handleAction(v._id, "APPROVED")}
                      className="flex-1 md:flex-none px-4 py-2 text-sm font-semibold text-white bg-emerald-600 rounded-xl hover:bg-emerald-700 shadow-sm shadow-emerald-100 active:scale-95 transition-all"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleAction(v._id, "REJECTED")}
                      className="flex-1 md:flex-none px-4 py-2 text-sm font-semibold text-red-600 bg-red-50 rounded-xl hover:bg-red-100 active:scale-95 transition-all"
                    >
                      Reject
                    </button>
                  </>
                )}

                {v.status === "APPROVED" && (
                  <button
                    onClick={() => checkIn(v._id)}
                    className="w-full md:w-auto px-6 py-2 text-sm font-semibold text-white bg-blue-600 rounded-xl hover:bg-blue-700 shadow-sm shadow-blue-100 active:scale-95 transition-all"
                  >
                    Check In
                  </button>
                )}

                {v.status === "CHECKED_IN" && (
                  <button
                    onClick={() => checkOut(v._id)}
                    className="w-full md:w-auto px-6 py-2 text-sm font-semibold text-white bg-gray-800 rounded-xl hover:bg-black active:scale-95 transition-all"
                  >
                    Check Out
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-2xl">
            <p className="text-gray-400 font-medium">
              No visitors found in the system.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Visitors;
