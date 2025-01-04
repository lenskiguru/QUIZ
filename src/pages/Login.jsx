import { useNavigate } from "react-router-dom";
import { auth, signOut } from "../firebase";
import { useState, useEffect } from "react";
import "../App.css";

function Login() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleStartQuiz = () => {
    navigate("/quiz");
  };

  const handleLogout = () => {
    signOut(auth);
    setUser(null);
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="app-container">
      <div className="login-card">
        {user ? (
          <>
            <h2>Welcome, {user.displayName || user.email}!</h2>
            <button onClick={handleStartQuiz}>Start Quiz</button>
            <button onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <h2>Please login from the home page</h2>
        )}
      </div>
    </div>
  );
}

export default Login;
