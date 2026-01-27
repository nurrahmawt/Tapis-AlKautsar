import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  
const ADMIN_USERNAME = process.env.REACT_APP_ADMIN_USERNAME;
const ADMIN_PASSWORD = process.env.REACT_APP_ADMIN_PASSWORD;

const handleLogin = () => {
  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    navigate("/admin");
  } else {
    alert("Username atau password salah");
  }
};


  return (
    <div className="login-container">
      <h2>Login Admin</h2>

      <input
        placeholder="Username"
        value={username}
        onChange={e => setUsername(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />

      <button onClick={handleLogin}>
        Login
      </button>
    </div>
  );
}

export default Login;