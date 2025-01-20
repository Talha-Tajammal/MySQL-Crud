import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserLogin from "./components/login";
import UserRegister from "./components/register";
import UserDashboard from "./components/dashboard";


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<UserLogin />} />
          <Route path="/register" element={<UserRegister />} />
          <Route path="/userDashboard" element={<UserDashboard />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

