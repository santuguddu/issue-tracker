import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import IssueForm from "./components/IssueForm";
import IssueDetail from "./components/IssueDetail";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/issue/new" element={<IssueForm />} />
        <Route path="/issue/:id/edit" element={<IssueForm />} />
        <Route path="/issue/:id" element={<IssueDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
