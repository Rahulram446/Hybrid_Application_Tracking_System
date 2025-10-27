export default function StatusCard({ app }) {
  const lastUpdate = new Date(app.updatedAt || app.createdAt).toLocaleString();

  const statusColors = {
    Applied: "bg-blue-100 text-blue-700",
    Reviewed: "bg-yellow-100 text-yellow-700",
    Interview: "bg-purple-100 text-purple-700",
    Offer: "bg-green-100 text-green-700",
  };

  return (
    <div className="p-4 border rounded-xl shadow hover:shadow-lg transition-all bg-white">
      <div className="flex justify-between items-center mb-2">
        <h2 className="font-semibold text-lg">{app.roleName || "Job Role"}</h2>
        <span
          className={`px-3 py-1 text-sm rounded-full ${
            statusColors[app.status] || "bg-gray-100 text-gray-700"
          }`}
        >
          {app.status}
        </span>
      </div>
      <p className="text-sm text-gray-600">
        <b>Applied By:</b> {app.applicantName || "N/A"}
      </p>
      <p className="text-sm text-gray-600">
        <b>Last Updated:</b> {lastUpdate}
      </p>
      <div className="mt-3 text-gray-700 text-sm">
        {app.comments?.length ? (
          <ul className="list-disc pl-5">
            {app.comments.map((c, i) => (
              <li key={i}>{c}</li>
            ))}
          </ul>
        ) : (
          <p>No comments yet.</p>
        )}
      </div>
    </div>
  );
}
