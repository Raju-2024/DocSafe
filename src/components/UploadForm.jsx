// src/components/UploadForm.jsx
export default function UploadForm() {
  return (
    <div className="bg-white shadow-md rounded-2xl p-8 w-full max-w-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Upload Document
      </h2>

      <input
        type="file"
        className="border border-gray-300 p-3 rounded-lg w-full mb-4 cursor-pointer"
      />
      <input
        type="text"
        placeholder="Document Name"
        className="border border-gray-300 p-3 rounded-lg w-full mb-4"
      />

      <button className="bg-blue-600 text-white w-full py-2 rounded-lg font-medium hover:bg-blue-700 transition">
        Upload
      </button>
    </div>
  );
}
