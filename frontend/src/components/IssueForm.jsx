// src/components/IssueForm.jsx
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const IssueForm = () => {
    const [form, setForm] = useState({
        title: "",
        description: "",
        status: "Open",
        priority: "Low",
    });

    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            axios.get(`http://localhost:5000/api/issues/${id}`).then((res) => {
                setForm(res.data);
            });
        }
    }, [id]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (id) {
            await axios.put(`http://localhost:5000/api/issues/${id}`, form);
        } else {
            await axios.post("http://localhost:5000/api/issues", form);
        }
        navigate("/");
    };

    return (
        <div className="max-w-xl mx-auto mt-8 p-6 bg-white rounded shadow">
            <h2 className="text-2xl font-bold mb-4">{id ? "Edit Issue" : "Create Issue"}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input type="text" name="title" value={form.title} onChange={handleChange} placeholder="Title" className="w-full border p-2 rounded" required />
                <input
                    type="date"
                    name="date"
                    value={form.date}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                    required
                />

                <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" className="w-full border p-2 rounded" required />
                <select name="status" value={form.status} onChange={handleChange} className="w-full border p-2 rounded">
                    <option>Open</option>
                    <option>In Progress</option>
                    <option>Closed</option>
                </select>
                <select name="priority" value={form.priority} onChange={handleChange} className="w-full border p-2 rounded">
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                </select>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">{id ? "Update" : "Create"}</button>
            </form>
        </div>
    );
};

export default IssueForm;
