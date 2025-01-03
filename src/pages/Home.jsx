import { Link, useNavigate } from "react-router-dom";
import { auth, provider, signInWithPopup, signOut } from "../firebase";
import { useState, useEffect } from "react";
import logo from "../assets/logo.png";
import "../App.css";

function Home() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
      localStorage.setItem("user", JSON.stringify(result.user));
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

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
          <>
            <h2>Login to Start Quiz</h2>
            <button onClick={handleLogin}>Login with Google</button>
          </>
        )}
      </div>
    </div>
  );
}

export default Home;
