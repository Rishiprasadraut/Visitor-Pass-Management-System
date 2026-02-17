import React, { useEffect, useRef, useState } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import axiosInstance from '../utils/axiosInstance';
import { CheckCircle, XCircle, Camera } from 'lucide-react';

const QRScanner = () => {
  const scannerRef = useRef(null);
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (scanning && !scannerRef.current) {
      const scanner = new Html5QrcodeScanner(
        'qr-reader',
        { 
          fps: 10, 
          qrbox: { width: 250, height: 250 },
          aspectRatio: 1.0
        },
        false
      );

      scanner.render(onScanSuccess, onScanError);
      scannerRef.current = scanner;
    }

    return () => {
      if (scannerRef.current) {
        scannerRef.current.clear();
        scannerRef.current = null;
      }
    };
  }, [scanning]);

  const onScanSuccess = async (decodedText) => {
    try {
      // Validate QR code with backend
      const response = await axiosInstance.post('/visitors/validate-qr', {
        qrData: decodedText
      });

      setResult({
        success: true,
        visitor: response.data.visitor
      });
      setError('');
      
      // Stop scanner after successful scan
      if (scannerRef.current) {
        scannerRef.current.clear();
        scannerRef.current = null;
      }
      setScanning(false);
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid QR code');
      setResult(null);
    }
  };

  const onScanError = (err) => {
    // Ignore camera scan errors (too noisy)
    console.warn(err);
  };

  const handleCheckIn = async () => {
    if (!result?.visitor) return;
    
    try {
      await axiosInstance.patch(`/visitors/${result.visitor._id}/check-in`);
      alert('Visitor checked in successfully!');
      setResult(null);
    } catch (err) {
      alert(err.response?.data?.message || 'Check-in failed');
    }
  };

  const handleCheckOut = async () => {
    if (!result?.visitor) return;
    
    try {
      await axiosInstance.patch(`/visitors/${result.visitor._id}/check-out`);
      alert('Visitor checked out successfully!');
      setResult(null);
    } catch (err) {
      alert(err.response?.data?.message || 'Check-out failed');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 bg-violet-600 rounded-2xl text-white">
            <Camera size={28} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-800">QR Code Scanner</h1>
            <p className="text-slate-600">Scan visitor pass for check-in/out</p>
          </div>
        </div>

        {!scanning && !result && (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 text-center">
            <Camera className="mx-auto text-slate-400 mb-4" size={64} />
            <h3 className="text-xl font-bold text-slate-800 mb-2">Ready to Scan</h3>
            <p className="text-slate-600 mb-6">Click the button below to start scanning visitor QR codes</p>
            <button
              onClick={() => setScanning(true)}
              className="px-8 py-3 bg-violet-600 text-white rounded-lg font-medium hover:bg-violet-700 transition-colors"
            >
              Start Scanning
            </button>
          </div>
        )}

        {scanning && (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <div id="qr-reader" className="w-full"></div>
            <button
              onClick={() => {
                setScanning(false);
                if (scannerRef.current) {
                  scannerRef.current.clear();
                  scannerRef.current = null;
                }
              }}
              className="mt-4 w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Stop Scanning
            </button>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-3 mt-4">
            <XCircle className="text-red-600" size={24} />
            <div>
              <p className="font-medium text-red-800">Scan Failed</p>
              <p className="text-sm text-red-600">{error}</p>
            </div>
          </div>
        )}

        {result?.success && result.visitor && (
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 mt-4">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-200">
              <CheckCircle className="text-green-600" size={32} />
              <div>
                <h3 className="text-xl font-bold text-slate-800">Valid Visitor Pass</h3>
                <p className="text-sm text-slate-600">Visitor information verified</p>
              </div>
            </div>

            <div className="space-y-3 mb-6">
              <div>
                <p className="text-xs text-slate-500 uppercase font-medium">Name</p>
                <p className="text-lg font-bold text-slate-800">{result.visitor.name}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-slate-500 uppercase font-medium">Phone</p>
                  <p className="text-slate-800">{result.visitor.phone}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase font-medium">Status</p>
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700">
                    {result.visitor.status}
                  </span>
                </div>
              </div>
              <div>
                <p className="text-xs text-slate-500 uppercase font-medium">Purpose</p>
                <p className="text-slate-800">{result.visitor.purpose}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 uppercase font-medium">Host</p>
                <p className="text-slate-800">{result.visitor.host?.name || 'N/A'}</p>
              </div>
            </div>

            <div className="flex gap-3">
              {result.visitor.status === 'APPROVED' && (
                <button
                  onClick={handleCheckIn}
                  className="flex-1 px-4 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
                >
                  Check In
                </button>
              )}
              {result.visitor.status === 'CHECKED_IN' && (
                <button
                  onClick={handleCheckOut}
                  className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  Check Out
                </button>
              )}
              <button
                onClick={() => {
                  setResult(null);
                  setError('');
                }}
                className="px-4 py-3 bg-slate-200 text-slate-700 rounded-lg font-medium hover:bg-slate-300 transition-colors"
              >
                Scan Again
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QRScanner;
