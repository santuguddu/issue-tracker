// src/components/IssueDetail.jsx
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const IssueDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [issue, setIssue] = useState(null);

  useEffect(() => {
    const fetchIssue = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/issues/${id}`);
        setIssue(res.data);
      } catch (err) {
        console.error("Error fetching issue:", err);
      }
    };

    fetchIssue();
  }, [id]);

  const handleEdit = () => {
    navigate(`/issue/${id}/edit`);
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this issue?");
    if (confirmed) {
      try {
        await axios.delete(`http://localhost:5000/api/issues/${id}`);
        navigate("/");
      } catch (err) {
        console.error("Error deleting issue:", err);
      }
    }
  };

  if (!issue) return <div className="p-4 text-center">Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg mt-8">
      <h1 className="text-2xl font-bold text-blue-600 mb-4">{issue.title}</h1>
      <p className="mb-4 text-gray-700"><strong>Description:</strong> {issue.description}</p>
      <p><strong>Status:</strong> <span className="text-gray-800">{issue.status}</span></p>
      <p><strong>Priority:</strong> <span className="text-gray-800">{issue.priority}</span></p>
      <p><strong>Created At:</strong> <span className="text-gray-800">{new Date(issue.createdAt).toLocaleDateString()}</span></p>

      <div className="mt-6 flex gap-4">
        <button
          onClick={handleEdit}
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded"
        >
          Edit
        </button>
        <button
          onClick={() => handleDelete(issue._id)}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default IssueDetail;
