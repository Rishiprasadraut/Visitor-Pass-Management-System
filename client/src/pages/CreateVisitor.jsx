import React, { useState } from "react";
import { createVisitor } from "../api/visitorApi";

const CreateVisitor = () => {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    purpose: "",
  });

  const handlerSubmit = async (e) => {
    e.preventDefault();
    try {
      await createVisitor(form);
      alert("Visitor Created Successfully!");
      // Optional: Reset form here
      setForm({ name: "", phone: "", email: "", purpose: "" });
    } catch (error) {
      alert("Error creating visitor");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">New Visitor</h2>
          <p className="text-gray-500 text-sm mt-1">Register a guest in the system</p>
        </div>

        <form onSubmit={handlerSubmit} className="space-y-5">
          {["name", "phone", "email", "purpose"].map((field) => (
            <div key={field}>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5 ml-1">
                {field}
              </label>
              <input
                type={field === "email" ? "email" : "text"}
                placeholder={`Enter ${field}...`}
                value={form[field]}
                onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
                required
              />
            </div>
          ))}

          <button
            type="submit"
            className="w-full py-3.5 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 shadow-lg shadow-indigo-100 active:scale-[0.98] transition-all mt-4"
          >
            Create Visitor
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateVisitor;