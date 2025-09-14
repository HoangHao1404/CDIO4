// ==================================================
// LOGIN PAGE COMPONENT
// ==================================================
// Trang đăng nhập user

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const LoginPage = () => {
  const { login, isAuthenticated, loading, error, clearError } = useAuth();
  const navigate = useNavigate();

  // Form state
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  // Redirect nếu đã login
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  // Clear error khi component unmount
  useEffect(() => {
    return () => clearError();
  }, [clearError]);

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.email || !formData.password) {
      return;
    }

    const result = await login(formData.email, formData.password);

    if (result.success) {
      navigate("/dashboard");
    }
  };

  return (
    <div className="page-container">
      <div className="form-container">
        <div className="form-header">
          <h2>Login to Your Account</h2>
          <p>Welcome back! Please enter your credentials.</p>
        </div>

        {/* Error Alert */}
        {error && <div className="alert alert-error">{error}</div>}

        <form onSubmit={handleSubmit}>
          {/* Email Field */}
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Password Field */}
          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <div style={{ position: "relative" }}>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute",
                  right: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "#666",
                }}
              >
                {showPassword ? "👁️" : "👁️‍🗨️"}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading}
            style={{ width: "100%" }}
          >
            {loading ? (
              <>
                <div
                  className="spinner"
                  style={{
                    width: "16px",
                    height: "16px",
                    marginRight: "8px",
                    display: "inline-block",
                  }}
                ></div>
                Logging in...
              </>
            ) : (
              "Login"
            )}
          </button>
        </form>

        {/* Footer Links */}
        <div className="form-footer">
          <p>
            Don't have an account? <Link to="/register">Register here</Link>
          </p>
          <p>
            <Link to="/forgot-password">Forgot your password?</Link>
          </p>
          <p>
            <Link to="/">← Back to Home</Link>
          </p>
        </div>
      </div>

      {/* Demo Credentials (chỉ cho development) */}
      {process.env.NODE_ENV === "development" && (
        <div
          className="card mt-2"
          style={{ maxWidth: "400px", margin: "2rem auto" }}
        >
          <div className="card-header">
            <h3 className="card-title">🧪 Demo Credentials</h3>
          </div>
          <p>
            <strong>Email:</strong> demo@example.com
          </p>
          <p>
            <strong>Password:</strong> 123456
          </p>
          <p>
            <small>These are demo credentials for testing purposes.</small>
          </p>
        </div>
      )}
    </div>
  );
};

export default LoginPage;
