import { useEffect, useState } from "react";
import { getProfile } from "../api/authApi";
import { useSelector } from "react-redux";
import { User, Mail, Shield, Calendar, CheckCircle } from "lucide-react";

const Profile = () => {
  const { user: cachedUser } = useSelector((state) => state.auth);
  const [profile, setProfile] = useState(cachedUser);
  const [loading, setLoading] = useState(!cachedUser);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await getProfile();
        setProfile(res.data);
      } catch (err) {
        console.error("Profile fetch error", err);
      } finally {
        setLoading(false);
      }
    };

    if (!cachedUser) {
      fetchProfile();
    }
  }, [cachedUser]);

  const getRoleColor = (role) => {
    switch (role) {
      case "ADMIN":
        return "bg-purple-100 text-purple-700 border-purple-200";
      case "SECURITY":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "EMPLOYEE":
        return "bg-green-100 text-green-700 border-green-200";
      default:
        return "bg-slate-100 text-slate-700 border-slate-200";
    }
  };

  if (loading) return <ProfileSkeleton />;

  return (
    <div className="min-h-screen bg-slate-50/50 p-6 md:p-10">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">My Profile</h2>
          <p className="text-slate-500 mt-2 font-medium">Your account information and details.</p>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          {/* Top Banner */}
          <div className="h-24 bg-gradient-to-r from-blue-600 to-indigo-600"></div>

          {/* Avatar */}
          <div className="relative px-6">
            <div className="absolute -top-12 w-24 h-24 bg-white rounded-2xl border-4 border-white shadow-lg flex items-center justify-center">
              <User size={40} className="text-slate-400" />
            </div>
          </div>

          {/* Profile Info */}
          <div className="pt-16 pb-8 px-6">
            <div className="flex items-center gap-3 mb-6">
              <h3 className="text-2xl font-bold text-slate-900">{profile?.name}</h3>
              <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase border ${getRoleColor(profile?.role)}`}>
                {profile?.role}
              </span>
            </div>

            <div className="grid gap-4">
              {/* Email */}
              <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl">
                <div className="p-3 bg-white rounded-xl shadow-sm">
                  <Mail size={20} className="text-blue-600" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Email</p>
                  <p className="text-slate-900 font-medium">{profile?.email}</p>
                </div>
              </div>

              {/* Role */}
              <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl">
                <div className="p-3 bg-white rounded-xl shadow-sm">
                  <Shield size={20} className="text-purple-600" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Role</p>
                  <p className="text-slate-900 font-medium">{profile?.role}</p>
                </div>
              </div>

              {/* Account Created */}
              {profile?.createdAt && (
                <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl">
                  <div className="p-3 bg-white rounded-xl shadow-sm">
                    <Calendar size={20} className="text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Member Since</p>
                    <p className="text-slate-900 font-medium">
                      {new Date(profile.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </div>
              )}

              {/* Status */}
              <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl">
                <div className="p-3 bg-white rounded-xl shadow-sm">
                  <CheckCircle size={20} className="text-green-600" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Status</p>
                  <p className="text-green-600 font-medium">Active</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProfileSkeleton = () => (
  <div className="min-h-screen bg-slate-50/50 p-6 md:p-10">
    <div className="max-w-2xl mx-auto animate-pulse">
      <div className="h-10 w-48 bg-slate-200 rounded-lg mb-8"></div>
      <div className="bg-white rounded-3xl border border-slate-100 overflow-hidden">
        <div className="h-24 bg-slate-200"></div>
        <div className="p-6 space-y-4">
          <div className="h-8 w-64 bg-slate-200 rounded"></div>
          <div className="h-20 bg-slate-100 rounded-xl"></div>
          <div className="h-20 bg-slate-100 rounded-xl"></div>
        </div>
      </div>
    </div>
  </div>
);

export default Profile;
