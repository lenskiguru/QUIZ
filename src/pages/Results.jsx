import { Link, useLocation } from "react-router-dom";

function Results() {
  const location = useLocation();
  const { score, total } = location.state || { score: 0, total: 0 };

  const percentage = ((score / total) * 100).toFixed(2);
  const wrongAnswers = total - score;

  return (
    <div className="app-container">
      <div className="results-card">
        <h2>Quiz Completed!</h2>
        <p><strong>Correct Answers:</strong> {score} / {total}</p>
        <p><strong>Wrong Answers:</strong> {wrongAnswers} / {total}</p>
        <p><strong>Accuracy:</strong> {percentage}%</p>

        <Link to="/login">
          <button>Back to Home page</button>
        </Link>
        <Link to="/quiz">
          <button style={{ marginTop: "10px" }}>Try Again</button>
        </Link>
      </div>
    </div>
  );
}

export default Results;
