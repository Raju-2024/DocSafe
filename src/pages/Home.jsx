import DocumentsList from "../components/DocumentsList";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">
        Your Uploaded Documents
      </h1>
      <DocumentsList />
    </div>
  );
}
