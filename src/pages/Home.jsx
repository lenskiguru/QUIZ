import { useState, useEffect } from "react";
import { auth, provider, signInWithPopup, signOut, registerWithEmail, loginWithEmail } from "../firebase";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import "../App.css";

function Home() {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      navigate("/login"); 
    }
  }, [navigate]);

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
      localStorage.setItem("user", JSON.stringify(result.user));
      navigate("/login"); 
    } catch (error) {
      console.error(error);
      setError(error.message);
    }
  };

  const handleEmailLogin = async () => {
    try {
      const result = await loginWithEmail(email, password);
      setUser(result.user);
      localStorage.setItem("user", JSON.stringify(result.user));
      navigate("/login"); 
    } catch (error) {
      console.error("Login error:", error.message);
      setError("Invalid email or password.");
    }
  };

  const handleRegister = async () => {
    try {
      await registerWithEmail(email, password);
      setSuccessMessage("Registration successful! Please log in.");
      setTimeout(() => {
        setSuccessMessage("");
        setIsModalOpen(false);
      }, 3000);
    } catch (error) {
      console.error("Registration error:", error.message);
      if (error.code === "auth/email-already-in-use") {
        setError("This email is already in use.");
      } else if (error.code === "auth/weak-password") {
        setError("Password should be at least 6 characters.");
      } else {
        setError(error.message);
      }
    }
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
        <img src={logo} alt="Quiz Logo" className="logo" />

        {user ? (
          <>
            <h2>Welcome, {user.displayName || user.email}!</h2>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <h2>Login</h2>
            {error && <p className="error-message">{error}</p>}
            {successMessage && <p className="success-message">{successMessage}</p>}

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleEmailLogin}>Login</button>
            <button onClick={handleGoogleLogin}>Login with Google</button>
            <p>
              Don&apos;t have an account?{" "}
              <a href="#" onClick={() => setIsModalOpen(true)} className="register-link">
                Register here
              </a>
            </p>
          </>
        )}
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Register</h2>
            {error && <p className="error-message">{error}</p>}
            {successMessage && <p className="success-message">{successMessage}</p>}
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleRegister}>Register</button>
            <button onClick={() => setIsModalOpen(false)} className="close-modal">Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
