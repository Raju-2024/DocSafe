import { useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { storage, db } from "../firebase/config";
import { useSelector } from "react-redux";

export default function Upload() {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("");
  const { user } = useSelector((state) => state.auth);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file || !fileName) {
      setMessage("Please select a file and enter a name.");
      return;
    }

    const storageRef = ref(storage, `documents/${user.uid}/${fileName}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
      },
      (error) => {
        setMessage("Upload failed. Please try again.");
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        await addDoc(collection(db, "documents"), {
          name: fileName,
          url: downloadURL,
          userId: user.uid,
          createdAt: serverTimestamp(),
        });
        setMessage("File uploaded successfully!");
        setProgress(0);
        setFile(null);
        setFileName("");
      }
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-lg">
        <h2 className="text-2xl font-semibold mb-6 text-center text-blue-600">
          Upload Your Document
        </h2>

        {message && (
          <p className="text-center text-sm mb-3 text-green-600">{message}</p>
        )}

        <form onSubmit={handleUpload} className="space-y-4">
          <input
            type="text"
            placeholder="Document Name"
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
            className="w-full border px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            className="w-full border px-4 py-2 rounded-md"
          />
          {progress > 0 && (
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-blue-600 h-3 rounded-full"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          )}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Upload
          </button>
        </form>
      </div>
    </div>
  );
}
