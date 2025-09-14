// ==================================================
// 404 NOT FOUND PAGE COMPONENT
// ==================================================
// Trang hiển thị khi URL không tồn tại

import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="page-container">
      <div className="text-center">
        {/* Large 404 Display */}
        <div
          style={{
            fontSize: "8rem",
            fontWeight: "bold",
            color: "#007bff",
            lineHeight: "1",
            marginBottom: "1rem",
          }}
        >
          404
        </div>

        {/* Error Message */}
        <h1 className="page-title">Page Not Found</h1>

        <p className="page-subtitle">
          Sorry, the page you are looking for doesn't exist or has been moved.
        </p>

        {/* Illustration (using emojis) */}
        <div style={{ fontSize: "4rem", margin: "2rem 0" }}>🔍❌</div>

        {/* Action Buttons */}
        <div className="mt-2">
          <Link to="/" className="btn btn-primary">
            🏠 Go Home
          </Link>
          <Link to="/dashboard" className="btn btn-outline">
            📊 Dashboard
          </Link>
        </div>

        {/* Help Section */}
        <div
          className="card mt-2"
          style={{ maxWidth: "600px", margin: "2rem auto" }}
        >
          <div className="card-header">
            <h2 className="card-title">🤔 What can you do?</h2>
          </div>

          <div className="grid grid-2">
            <div>
              <h3>Navigation</h3>
              <ul style={{ textAlign: "left", paddingLeft: "20px" }}>
                <li>
                  <Link to="/">Home Page</Link>
                </li>
                <li>
                  <Link to="/login">Login</Link>
                </li>
                <li>
                  <Link to="/register">Register</Link>
                </li>
                <li>
                  <Link to="/dashboard">Dashboard</Link>
                </li>
              </ul>
            </div>

            <div>
              <h3>Common Issues</h3>
              <ul style={{ textAlign: "left", paddingLeft: "20px" }}>
                <li>Check the URL spelling</li>
                <li>The page might have moved</li>
                <li>You might not have permission</li>
                <li>Try refreshing the page</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Search or Contact Section */}
        <div
          className="card mt-2"
          style={{ maxWidth: "400px", margin: "2rem auto" }}
        >
          <div className="card-header">
            <h2 className="card-title">🆘 Need Help?</h2>
          </div>

          <p>If you believe this is an error, please contact support.</p>

          <div className="mt-1">
            <button
              className="btn btn-secondary"
              onClick={() => alert("Contact support feature coming soon!")}
            >
              📧 Contact Support
            </button>
          </div>
        </div>

        {/* Back Button */}
        <div className="mt-2">
          <button
            className="btn btn-outline"
            onClick={() => window.history.back()}
          >
            ← Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
