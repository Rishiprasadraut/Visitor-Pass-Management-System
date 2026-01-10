import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDashboardStats } from "../redux/slices/dashboardSlice";
// Suggestion: Install lucide-react for professional icons
// npm install lucide-react
import { Users, Clock, CheckCircle2, BarChart3 } from "lucide-react";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { stats, loading } = useSelector((state) => state.dashboard);

  useEffect(() => {
    dispatch(fetchDashboardStats());
  }, [dispatch]);

  const formatLabel = (key) => key.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());

  // Advanced styling configuration
  const getStyleConfig = (key) => {
    const k = key.toUpperCase();
    if (k.includes("PENDING")) {
      return {
        bg: "bg-amber-50",
        iconBg: "bg-amber-100",
        text: "text-amber-600",
        border: "border-amber-200",
        accent: "bg-amber-500",
        icon: Clock
      };
    }
    if (k.includes("APPROVED")) {
      return {
        bg: "bg-blue-50",
        iconBg: "bg-blue-100",
        text: "text-blue-600",
        border: "border-blue-200",
        accent: "bg-blue-500",
        icon: CheckCircle2
      };
    }
    if (k.includes("CHECKED_IN") || k.includes("TOTAL")) {
      return {
        bg: "bg-emerald-50",
        iconBg: "bg-emerald-100",
        text: "text-emerald-600",
        border: "border-emerald-200",
        accent: "bg-emerald-500",
        icon: Users
      };
    }
    return {
      bg: "bg-slate-50",
      iconBg: "bg-slate-100",
      text: "text-slate-600",
      border: "border-slate-200",
      accent: "bg-slate-500",
      icon: BarChart3
    };
  };

  if (loading) return <DashboardSkeleton />;

  return (
    <div className="min-h-screen bg-slate-50/50 p-6 md:p-10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">System Overview</h2>
          <p className="text-slate-500 mt-2 font-medium">Real-time visitor analytics and status tracking.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats && Object.entries(stats).map(([key, val]) => {
            const config = getStyleConfig(key);
            const Icon = config.icon;

            return (
              <div 
                key={key} 
                className={`group relative overflow-hidden p-6 bg-white rounded-3xl border ${config.border} shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300`}
              >
                {/* Top Row: Icon and Label */}
                <div className="flex items-center gap-4 mb-4">
                  <div className={`p-3 rounded-2xl ${config.iconBg} ${config.text} transition-colors group-hover:bg-white group-hover:shadow-inner`}>
                    <Icon size={24} strokeWidth={2.5} />
                  </div>
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
                    {formatLabel(key)}
                  </p>
                </div>

                {/* Bottom Row: Value */}
                <div className="flex items-end justify-between">
                  <p className="text-4xl font-black text-slate-900 tracking-tight">
                    {val.toLocaleString()}
                  </p>
                  <div className={`h-1.5 w-12 rounded-full ${config.accent} opacity-20 group-hover:opacity-100 transition-opacity`}></div>
                </div>

                {/* Decorative Background Element */}
                <div className={`absolute -right-4 -top-4 w-24 h-24 rounded-full ${config.bg} opacity-50 -z-10 group-hover:scale-150 transition-transform duration-500`}></div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const DashboardSkeleton = () => (
  <div className="min-h-screen bg-slate-50/50 p-6 md:p-10">
    <div className="max-w-7xl mx-auto animate-pulse">
      <div className="h-10 w-64 bg-slate-200 rounded-lg mb-10"></div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-40 bg-white border border-slate-100 rounded-3xl shadow-sm"></div>
        ))}
      </div>
    </div>
  </div>
);

export default Dashboard;