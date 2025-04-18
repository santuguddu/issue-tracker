import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  const [issues, setIssues] = useState([]);
  const [filterStatus, setFilterStatus] = useState("All");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/issues");
        setIssues(res.data);
      } catch (err) {
        console.error("Error fetching issues:", err);
      }
    };

    fetchIssues();
  }, []);

  const filteredIssues = issues.filter((issue) =>
    filterStatus === "All" ? true : issue.status === filterStatus
  );

  return (
    <div className="p-4 sm:p-6 md:p-8 max-w-7xl mx-auto">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6 sm:mb-8 text-center text-gray-800 tracking-tight">
        🛠️ Issue Dashboard
      </h1>

      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <label className="text-base sm:text-lg font-medium text-gray-700 flex flex-col sm:flex-row items-start sm:items-center">
          Filter by Status:
          <select
            className="mt-2 sm:mt-0 sm:ml-3 p-2 w-full sm:w-auto border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option>All</option>
            <option>Open</option>
            <option>In Progress</option>
            <option>Closed</option>
          </select>
        </label>

        <button
          onClick={() => navigate("/issue/new")}
          className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold px-6 py-2 rounded-lg shadow-md transition-all duration-200 ease-in-out"
        >
          + Create New Issue
        </button>
      </div>

      <div className="overflow-x-auto bg-white rounded-xl shadow-lg border border-gray-200">
        <table className="min-w-full table-auto text-sm sm:text-base">
          <thead>
            <tr className="bg-gray-100 text-gray-700 uppercase tracking-wider">
              <th className="px-4 sm:px-6 py-3 border">#</th>
              <th className="px-4 sm:px-6 py-3 border text-left">Title</th>
              <th className="px-4 sm:px-6 py-3 border text-left">Description</th>
              <th className="px-4 sm:px-6 py-3 border text-left">Status</th>
              <th className="px-4 sm:px-6 py-3 border text-left">Priority</th>
              <th className="px-4 sm:px-6 py-3 border text-left">Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredIssues.length > 0 ? (
              filteredIssues.map((issue, index) => (
                <tr
                  key={issue._id}
                  className="hover:bg-blue-50 transition-colors cursor-pointer"
                  onClick={() => navigate(`/issue/${issue._id}`)}
                >
                  <td className="px-4 sm:px-6 py-3 border text-center text-gray-600">
                    {index + 1}
                  </td>
                  <td className="px-4 sm:px-6 py-3 border font-medium text-gray-800">
                    {issue.title}
                  </td>
                  <td className="px-4 sm:px-6 py-3 border text-gray-600">
                    {issue.description.length > 60
                      ? issue.description.slice(0, 60) + "..."
                      : issue.description}
                  </td>
                  <td className="px-4 sm:px-6 py-3 border">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-white text-xs font-semibold ${
                        issue.status === "Open"
                          ? "bg-green-500"
                          : issue.status === "In Progress"
                          ? "bg-yellow-500"
                          : "bg-gray-500"
                      }`}
                    >
                      {issue.status}
                    </span>
                  </td>
                  <td className="px-4 sm:px-6 py-3 border">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-white text-xs font-semibold ${
                        issue.priority === "High"
                          ? "bg-red-500"
                          : issue.priority === "Medium"
                          ? "bg-orange-400"
                          : "bg-blue-400"
                      }`}
                    >
                      {issue.priority}
                    </span>
                  </td>
                  <td className="px-4 sm:px-6 py-3 border text-gray-500">
                    {new Date(issue.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-6 text-gray-400">
                  No issues found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
