import { useState } from "react";
import Dashboard from "./components/Dashboard";

export default function App() {
  return (
    <div style={{ minHeight: "100vh", background: "#f5f5f7", padding: "2rem" }}>
      <Dashboard />
    </div>
  );
}
