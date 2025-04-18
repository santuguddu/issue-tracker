const Issue = require("../models/Issue");

// GET all issues
const getIssues = async (req, res) => {
  try {
    const issues = await Issue.find().sort({ createdAt: -1 });
    res.json(issues);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch issues" });
  }
};

// GET specific issue
const getIssueById = async (req, res) => {
  try {
    const issue = await Issue.findById(req.params.id);
    if (!issue) return res.status(404).json({ error: "Issue not found" });
    res.json(issue);
  } catch (err) {
    res.status(500).json({ error: "Error fetching the issue" });
  }
};

// POST create new issue
const createIssue = async (req, res) => {
  const { title, description, status, priority } = req.body;

  try {
    const newIssue = new Issue({ title, description, status, priority });
    await newIssue.save();
    res.status(201).json(newIssue);
  } catch (err) {
    res.status(400).json({ error: "Failed to create issue" });
  }
};

// PUT update issue
const updateIssue = async (req, res) => {
  try {
    const updatedIssue = await Issue.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedIssue) return res.status(404).json({ error: "Issue not found" });
    res.json(updatedIssue);
  } catch (err) {
    res.status(500).json({ error: "Failed to update issue" });
  }
};

// DELETE remove issue
const deleteIssue = async (req, res) => {
  try {
    const deletedIssue = await Issue.findByIdAndDelete(req.params.id);
    if (!deletedIssue) return res.status(404).json({ error: "Issue not found" });
    res.json({ message: "Issue deleted", issue: deletedIssue });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete issue" });
  }
};

module.exports = {
  getIssues,
  getIssueById,
  createIssue,
  updateIssue,
  deleteIssue,
};
