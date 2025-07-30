import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import OpportunityList from "./pages/OpportunityList";
import OpportunityDetail from "./pages/OpportunityDetail";

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<OpportunityList />} />
          <Route path="/opportunities/:id" element={<OpportunityDetail />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
