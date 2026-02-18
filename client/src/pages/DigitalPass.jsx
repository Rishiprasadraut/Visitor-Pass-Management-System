import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { downloadBadge } from "../api/visitorApi";
import { 
  CreditCard, 
  CheckCircle, 
  Calendar, 
  User, 
  Mail, 
  Phone, 
  FileText,
  Clock,
  Building,
  Download
} from "lucide-react";

const DigitalPass = () => {
  const [passes, setPasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchMyPass();
  }, []);

  const fetchMyPass = async () => {
    try {
      const response = await axiosInstance.get("/visitors/mypass");
      setPasses(response.data.passes);
    } catch (err) {
      console.error("Error fetching pass:", err);
      setError(err.response?.data?.message || "Failed to load digital pass");
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "APPROVED":
        return "bg-green-50 text-green-700 border-green-200";
      case "CHECKED_IN":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "CHECKED_OUT":
        return "bg-gray-50 text-gray-700 border-gray-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleDownloadBadge = async (passId, visitorName) => {
    try {
      const response = await downloadBadge(passId);
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `visitor-badge-${visitorName.replace(/\s+/g, '-')}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      alert('Download failed');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-slate-600">Loading your digital pass...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-red-50 border border-red-200 text-red-700 p-6 rounded-lg max-w-md">
          <p className="font-medium">Error</p>
          <p className="text-sm mt-1">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-indigo-600 rounded-xl text-white">
          <CreditCard size={28} />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-slate-800">My Digital Pass</h1>
          <p className="text-slate-600">Your approved visitor passes</p>
        </div>
      </div>

      {passes.length === 0 ? (
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-8 text-center">
          <CreditCard className="mx-auto text-slate-400 mb-4" size={48} />
          <p className="text-slate-600 text-lg font-medium">No Active Passes</p>
          <p className="text-slate-500 text-sm mt-2">
            You don't have any approved visitor passes yet. Contact your host to create a visitor request.
          </p>
        </div>
      ) : (
        <div className="grid gap-6">
          {passes.map((pass) => (
            <div
              key={pass._id}
              className="bg-white border border-slate-200 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              {/* Pass Header */}
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <CheckCircle size={32} />
                    <div>
                      <h2 className="text-2xl font-bold">{pass.name}</h2>
                      <p className="text-indigo-100 text-sm">Visitor Pass</p>
                    </div>
                  </div>
                  <div className={`px-4 py-2 rounded-full border ${getStatusColor(pass.status)} bg-white font-semibold text-sm`}>
                    {pass.status.replace("_", " ")}
                  </div>
                </div>
              </div>

              {/* QR Code Section */}
              {pass.qrCode && (
                <div className="p-6 border-b border-slate-200 flex flex-col items-center bg-slate-50">
                  <div className="bg-white p-4 rounded-xl shadow-md">
                    <img 
                      src={pass.qrCode} 
                      alt="Visitor QR Code" 
                      className="w-48 h-48 object-contain"
                    />
                  </div>
                  <p className="mt-3 text-sm text-slate-600 font-medium">
                    Scan this QR code at security desk
                  </p>
                </div>
              )}

              {/* Pass Details */}
              <div className="p-6 grid md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <Mail className="text-slate-400 mt-1" size={20} />
                  <div>
                    <p className="text-xs text-slate-500 uppercase font-medium">Email</p>
                    <p className="text-slate-800 font-medium">{pass.email || "N/A"}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="text-slate-400 mt-1" size={20} />
                  <div>
                    <p className="text-xs text-slate-500 uppercase font-medium">Phone</p>
                    <p className="text-slate-800 font-medium">{pass.phone}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <FileText className="text-slate-400 mt-1" size={20} />
                  <div>
                    <p className="text-xs text-slate-500 uppercase font-medium">Purpose</p>
                    <p className="text-slate-800 font-medium">{pass.purpose}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Building className="text-slate-400 mt-1" size={20} />
                  <div>
                    <p className="text-xs text-slate-500 uppercase font-medium">Host</p>
                    <p className="text-slate-800 font-medium">{pass.host?.name || "N/A"}</p>
                    <p className="text-slate-500 text-sm">{pass.host?.email || ""}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Calendar className="text-slate-400 mt-1" size={20} />
                  <div>
                    <p className="text-xs text-slate-500 uppercase font-medium">Created On</p>
                    <p className="text-slate-800 font-medium">{formatDate(pass.createdAt)}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="text-slate-400 mt-1" size={20} />
                  <div>
                    <p className="text-xs text-slate-500 uppercase font-medium">Last Updated</p>
                    <p className="text-slate-800 font-medium">{formatDate(pass.updatedAt)}</p>
                  </div>
                </div>
              </div>

              {/* Download Badge Button */}
              {(pass.status === "APPROVED" || pass.status === "CHECKED_IN") && (
                <div className="mt-4">
                  <button
                    onClick={() => handleDownloadBadge(pass._id, pass.name)}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors"
                  >
                    <Download size={20} />
                    Download PDF Badge
                  </button>
                </div>
              )}

              {/* Pass Footer */}
              {pass.status === "APPROVED" && (
                <div className="bg-green-50 border-t border-green-200 p-4 text-center mt-4">
                  <p className="text-green-700 font-medium">
                    ✓ Your pass is approved. Present this at the security desk for check-in.
                  </p>
                </div>
              )}
              {pass.status === "CHECKED_IN" && (
                <div className="bg-blue-50 border-t border-blue-200 p-4 text-center mt-4">
                  <p className="text-blue-700 font-medium">
                    ✓ You are currently checked in. Don't forget to check out when leaving.
                  </p>
                </div>
              )}
              {pass.status === "CHECKED_OUT" && (
                <div className="bg-gray-50 border-t border-gray-200 p-4 text-center mt-4">
                  <p className="text-gray-700 font-medium">
                    Visit completed. Thank you for visiting!
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DigitalPass;
