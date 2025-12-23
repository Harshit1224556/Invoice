import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const Login = () => <h1>LOGIN PAGE</h1>;
const Register = () => <h1>REGISTER PAGE</h1>;

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
