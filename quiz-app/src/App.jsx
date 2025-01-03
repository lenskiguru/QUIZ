import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Quiz from "./pages/Quiz";
import Results from "./pages/Results";
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/results" element={<Results />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
