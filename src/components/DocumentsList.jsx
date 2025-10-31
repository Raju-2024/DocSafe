import { useEffect, useState } from "react";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { db } from "../firebase/config";
import { useSelector } from "react-redux";
import { FiDownload, FiExternalLink, FiShare2 } from "react-icons/fi";

export default function DocumentsList() {
  const { user } = useSelector((state) => state.auth);
  const [docs, setDocs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDocuments = async () => {
      if (!user) return;

      const q = query(
        collection(db, "documents"),
        where("userId", "==", user.uid),
        orderBy("createdAt", "desc")
      );

      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setDocs(data);
      setLoading(false);
    }

    fetchDocuments();
  }, [user]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-48 text-gray-600">
        Loading your documents...
      </div>
    );
  }

  if (docs.length === 0) {
    return (
      <div className="text-center text-gray-500 mt-10">
        No documents uploaded yet.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {docs.map((doc) => (
        <div
          key={doc.id}
          className="bg-white shadow-md rounded-xl p-4 border hover:shadow-lg transition"
        >
          <h3 className="font-semibold text-lg text-blue-600 mb-2">
            {doc.name}
          </h3>
          <p className="text-sm text-gray-500 mb-3">
            Uploaded on:{" "}
            {doc.createdAt?.toDate
              ? doc.createdAt.toDate().toLocaleDateString()
              : "Just now"}
          </p>

          <div className="flex justify-between items-center">
            <a
              href={doc.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1 text-blue-600 hover:underline"
            >
              <FiExternalLink /> <span>View</span>
            </a>

            <a
              href={doc.url}
              download
              className="flex items-center space-x-1 text-green-600 hover:underline"
            >
              <FiDownload /> <span>Download</span>
            </a>

            <button
              onClick={() => {
                navigator.clipboard.writeText(doc.url);
                alert("Share link copied!");
              }}
              className="flex items-center space-x-1 text-gray-600 hover:text-blue-500"
            >
              <FiShare2 /> <span>Share</span>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
