// src/components/FileCard.jsx
export default function FileCard({ name, type, size }) {
  const icon = type.includes("pdf") ? "📄" :
               type.includes("image") ? "🖼️" : "📁";

  return (
    <div className="bg-white rounded-2xl shadow-md p-5 flex flex-col justify-between hover:shadow-lg transition">
      <div className="text-4xl mb-3">{icon}</div>
      <h3 className="text-gray-800 font-semibold truncate">{name}</h3>
      <p className="text-gray-500 text-sm">{size}</p>

      <div className="flex justify-between mt-4 text-sm">
        <button className="text-blue-600 font-medium hover:underline">Preview</button>
        <button className="text-green-600 font-medium hover:underline">Download</button>
        <button className="text-purple-600 font-medium hover:underline">Share</button>
      </div>
    </div>
  );
}
