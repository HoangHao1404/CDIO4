// ==================================================
// DASHBOARD PAGE COMPONENT
// ==================================================
// Trang dashboard cho user đã đăng nhập

import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const DashboardPage = () => {
  const { isAuthenticated, user, loading, logout } = useAuth();
  const navigate = useNavigate();

  // Redirect nếu chưa login
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, loading, navigate]);

  // Handle logout
  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // Loading state
  if (loading) {
    return (
      <div className="page-container text-center">
        <div className="spinner"></div>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  // Not authenticated
  if (!isAuthenticated || !user) {
    return (
      <div className="page-container text-center">
        <div className="alert alert-warning">
          Please login to access the dashboard.
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Welcome, {user.name}! 👋</h1>
        <p className="page-subtitle">This is your personal dashboard</p>
      </div>

      <div className="grid grid-2">
        {/* Profile Card */}
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">👤 Profile Information</h2>
          </div>

          <div style={{ lineHeight: "1.8" }}>
            <p>
              <strong>Name:</strong> {user.name}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>Role:</strong> {user.role}
            </p>
            <p>
              <strong>Member since:</strong>{" "}
              {new Date(user.createdAt).toLocaleDateString()}
            </p>
            {user.lastLogin && (
              <p>
                <strong>Last login:</strong>{" "}
                {new Date(user.lastLogin).toLocaleString()}
              </p>
            )}
          </div>

          <div className="mt-1">
            <button
              className="btn btn-outline"
              onClick={() => alert("Edit Profile feature coming soon!")}
            >
              Edit Profile
            </button>
          </div>
        </div>

        {/* Quick Actions Card */}
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">⚡ Quick Actions</h2>
          </div>

          <div className="grid">
            <button
              className="btn btn-primary"
              onClick={() => alert("Feature coming soon!")}
            >
              📊 View Analytics
            </button>

            <button
              className="btn btn-secondary"
              onClick={() => alert("Feature coming soon!")}
            >
              ⚙️ Settings
            </button>

            <button
              className="btn btn-success"
              onClick={() => alert("Feature coming soon!")}
            >
              📝 Create Post
            </button>

            <button className="btn btn-danger" onClick={handleLogout}>
              🚪 Logout
            </button>
          </div>
        </div>
      </div>

      {/* Activity Card */}
      <div className="card mt-2">
        <div className="card-header">
          <h2 className="card-title">📈 Recent Activity</h2>
        </div>

        <div className="alert alert-info">
          <p>
            🎉 <strong>Welcome!</strong> This is your first time accessing the
            dashboard.
          </p>
          <p>Start by exploring the features available to you.</p>
        </div>

        {/* Sample Activity Items */}
        <div style={{ borderTop: "1px solid #eee", paddingTop: "1rem" }}>
          <h3 style={{ marginBottom: "1rem", color: "#666" }}>Activity Log</h3>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: "0.5rem 0",
              borderBottom: "1px solid #f0f0f0",
            }}
          >
            <div style={{ marginRight: "1rem", fontSize: "1.2rem" }}>🔐</div>
            <div>
              <p style={{ margin: 0, fontWeight: "500" }}>Account created</p>
              <small style={{ color: "#666" }}>
                {new Date(user.createdAt).toLocaleString()}
              </small>
            </div>
          </div>

          {user.lastLogin && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                padding: "0.5rem 0",
                borderBottom: "1px solid #f0f0f0",
              }}
            >
              <div style={{ marginRight: "1rem", fontSize: "1.2rem" }}>🔑</div>
              <div>
                <p style={{ margin: 0, fontWeight: "500" }}>Last login</p>
                <small style={{ color: "#666" }}>
                  {new Date(user.lastLogin).toLocaleString()}
                </small>
              </div>
            </div>
          )}

          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: "0.5rem 0",
            }}
          >
            <div style={{ marginRight: "1rem", fontSize: "1.2rem" }}>📱</div>
            <div>
              <p style={{ margin: 0, fontWeight: "500" }}>Dashboard accessed</p>
              <small style={{ color: "#666" }}>
                {new Date().toLocaleString()}
              </small>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Card (for admin users) */}
      {user.role === "admin" && (
        <div className="card mt-2">
          <div className="card-header">
            <h2 className="card-title">👑 Admin Tools</h2>
          </div>

          <div className="alert alert-success">
            <p>
              <strong>Admin Access Detected!</strong>
            </p>
            <p>You have administrative privileges.</p>
          </div>

          <div className="grid grid-3">
            <div className="text-center p-1">
              <h3>Users</h3>
              <p
                style={{
                  fontSize: "2rem",
                  fontWeight: "bold",
                  color: "#007bff",
                }}
              >
                1
              </p>
              <small>Total registered users</small>
            </div>

            <div className="text-center p-1">
              <h3>Active</h3>
              <p
                style={{
                  fontSize: "2rem",
                  fontWeight: "bold",
                  color: "#28a745",
                }}
              >
                1
              </p>
              <small>Active users today</small>
            </div>

            <div className="text-center p-1">
              <h3>API Calls</h3>
              <p
                style={{
                  fontSize: "2rem",
                  fontWeight: "bold",
                  color: "#ffc107",
                }}
              >
                3
              </p>
              <small>Requests today</small>
            </div>
          </div>

          <div className="mt-1">
            <button
              className="btn btn-outline"
              onClick={() => alert("User management coming soon!")}
            >
              Manage Users
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
