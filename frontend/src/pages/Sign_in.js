import React, { useState } from "react";
import { NavLink } from "react-router-dom";

export const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const API_URL = "http://localhost:5000/api/auth/login";

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Vui lòng nhập đầy đủ thông tin");
      return;
    }

    setError("");
    setIsLoading(true);

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Đăng nhập thất bại");
      }

      // Lưu token nếu backend trả về
      if (data.token) {
        localStorage.setItem("token", data.token);
      }

      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
      setEmail("");
      setPassword("");
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {showToast && (
        <div className="fixed top-4 right-4 flex items-center gap-2 bg-green-500 text-white px-4 py-3 rounded-lg shadow-lg z-50">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
          <div>
            <h3 className="font-medium">Đăng nhập thành công!</h3>
            <p className="text-sm text-green-100">
              Chào mừng bạn quay lại AirZen
            </p>
          </div>
        </div>
      )}

      <div
        className="min-h-screen flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://i.postimg.cc/SsccGFRk/background.png')",
        }}
      >
        <div className="bg-[#D9D9D9]/10 backdrop-blur-md rounded-2xl shadow-lg p-8 w-full max-w-md">
          <div className="text-center mb-6">
            <h1 className="text-4xl font-bold">
              <span className="text-lime-400">Air</span>
              <span className="text-white">Zen</span>
            </h1>
            <p className="text-white text-xl font-semibold mt-2">Sign in</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <p className="text-red-400 text-sm text-center">{error}</p>
            )}

            <div>
              <label className="block text-white text-md font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                placeholder="username@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 text-lg rounded-lg bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-lime-400"
                required
              />
            </div>

            <div>
              <label className="block text-white text-md font-medium mb-2">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 text-lg rounded-lg bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-lime-400"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 bg-lime-400 rounded-lg font-semibold text-gray-900 hover:bg-lime-500 transition relative ${
                isLoading ? "cursor-not-allowed opacity-70" : ""
              }`}
            >
              {isLoading ? (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900"></div>
                </div>
              ) : (
                "Sign in"
              )}
            </button>
          </form>

          <p className="text-center text-gray-300 text-sm mt-6">
            Don’t have an account yet?{" "}
            <NavLink
              to="/register"
              className="text-lime-400 font-semibold hover:underline"
            >
              Register
            </NavLink>
          </p>
        </div>
      </div>
    </>
  );
};

export default SignIn;
