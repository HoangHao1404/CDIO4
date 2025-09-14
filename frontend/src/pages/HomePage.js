// ==================================================
// HOME PAGE COMPONENT
// ==================================================
// Trang chủ của ứng dụng - Landing page

import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const HomePage = () => {
  const { isAuthenticated, user } = useAuth();

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Welcome to REMN Stack App</h1>
        <p className="page-subtitle">
          ReactJS + Express + MongoDB + Node.js Fullstack Application
        </p>
      </div>

      <div className="grid grid-2 mt-2">
        {/* Welcome Card */}
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">
              {isAuthenticated
                ? `Hello, ${user?.name}!`
                : "Welcome to our platform"}
            </h2>
          </div>

          <p>
            {isAuthenticated
              ? "You are successfully logged in. Explore the dashboard to see all features."
              : "This is a fullstack web application built with the REMN stack. Please login or register to continue."}
          </p>

          <div className="mt-1">
            {isAuthenticated ? (
              <Link to="/dashboard" className="btn btn-primary">
                Go to Dashboard
              </Link>
            ) : (
              <div>
                <Link to="/login" className="btn btn-primary">
                  Login
                </Link>
                <Link to="/register" className="btn btn-outline">
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Features Card */}
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">✨ Features</h2>
          </div>

          <ul style={{ paddingLeft: "20px" }}>
            <li>🔐 User Authentication (JWT)</li>
            <li>👤 User Profile Management</li>
            <li>📱 Responsive Design</li>
            <li>🚀 RESTful API</li>
            <li>🛡️ Security Best Practices</li>
            <li>📊 Modern UI/UX</li>
          </ul>
        </div>
      </div>

      {/* Tech Stack Section */}
      <div className="card mt-2">
        <div className="card-header">
          <h2 className="card-title">🛠️ Tech Stack</h2>
        </div>

        <div className="grid grid-4">
          <div className="text-center p-1">
            <h3>Frontend</h3>
            <p>
              <strong>React.js</strong>
            </p>
            <p>Modern UI library with hooks and context</p>
          </div>

          <div className="text-center p-1">
            <h3>Backend</h3>
            <p>
              <strong>Express.js</strong>
            </p>
            <p>Fast Node.js web framework</p>
          </div>

          <div className="text-center p-1">
            <h3>Database</h3>
            <p>
              <strong>MongoDB</strong>
            </p>
            <p>NoSQL document database</p>
          </div>

          <div className="text-center p-1">
            <h3>Runtime</h3>
            <p>
              <strong>Node.js</strong>
            </p>
            <p>JavaScript runtime environment</p>
          </div>
        </div>
      </div>

      {/* Getting Started Section */}
      {!isAuthenticated && (
        <div className="card mt-2">
          <div className="card-header">
            <h2 className="card-title">🚀 Getting Started</h2>
          </div>

          <ol style={{ paddingLeft: "20px" }}>
            <li>
              <strong>Register</strong> a new account or <strong>Login</strong>{" "}
              if you already have one
            </li>
            <li>
              Explore the <strong>Dashboard</strong> to see your profile
            </li>
            <li>Update your profile information</li>
            <li>Check out the API documentation for developers</li>
          </ol>

          <div className="mt-1 text-center">
            <Link to="/register" className="btn btn-success">
              Get Started Now
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
