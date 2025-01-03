import { Link } from "react-router-dom";
import { auth, signOut } from "../firebase";
import { useState, useEffect } from "react";
import logo from "../assets/logo.png";
import "../App.css";

function Login() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    signOut(auth);
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <div className="app-container">
      <div className="login-card">
        <img src={logo} alt="Quiz Logo" className="logo" />
        {user ? (
          <>
            <h2>Welcome, {user.displayName}!</h2>
            <Link to="/quiz">
              <button>Start Quiz</button>
            </Link>
            <button onClick={handleLogout} style={{ marginTop: "10px" }}>Logout</button>
          </>
        ) : (
          <h2>Please login from the home page</h2>
        )}
      </div>
    </div>
  );
}

export default Login;
