import React, { useState } from "react";
import { createVisitor } from "../api/visitorApi";
import { Upload } from "lucide-react";

const CreateVisitor = () => {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    purpose: "",
  });
  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(file);
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  const handlerSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('name', form.name);
      formData.append('phone', form.phone);
      formData.append('email', form.email);
      formData.append('purpose', form.purpose);
      if (photo) {
        formData.append('photo', photo);
      }

      await createVisitor(formData);
      alert("Visitor Created Successfully!");
      // Reset form
      setForm({ name: "", phone: "", email: "", purpose: "" });
      setPhoto(null);
      setPhotoPreview(null);
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
          {/* Photo Upload */}
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5 ml-1">
              Photo (Optional)
            </label>
            <div className="flex items-center gap-4">
              {photoPreview && (
                <img src={photoPreview} alt="Preview" className="h-20 w-20 rounded-lg object-cover border-2 border-gray-200" />
              )}
              <label className="flex-1 cursor-pointer">
                <div className="flex items-center justify-center gap-2 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl hover:bg-gray-100 transition-all">
                  <Upload size={20} className="text-gray-600" />
                  <span className="text-sm text-gray-700">{photo ? photo.name : 'Choose photo'}</span>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  className="hidden"
                />
              </label>
            </div>
          </div>

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