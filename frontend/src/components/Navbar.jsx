import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav style={{
      background: "#111827",
      color: "#fff",
      padding: "1rem",
      display: "flex",
      justifyContent: "center",
      gap: "1.5rem"
    }}>
      <Link to="/" style={{ color: "#fff", textDecoration: "none" }}>Login</Link>
      <Link to="/admin" style={{ color: "#fff", textDecoration: "none" }}>Admin</Link>
      <Link to="/bot" style={{ color: "#fff", textDecoration: "none" }}>Bot</Link>
      <Link to="/applicant" style={{ color: "#fff", textDecoration: "none" }}>Applicant</Link>
    </nav>
  );
}
