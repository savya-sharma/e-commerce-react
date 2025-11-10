import { useState } from "react";
import instance from "../config/axiosConfig";
import { Link, useLocation, useNavigate } from "react-router-dom";

function Login() {
  const [data, setData] = useState({
    username: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isError, setIsError] = useState(null);
  const navigate = useNavigate();


  console.log(useLocation());

  function handleChange(e) {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      const response = await instance.post("/auth/login", data,
        {
          withCredentials: true,
        });
      console.log(response)
      if (response.status === 200) {
        window.location.href = "/home";
      }
    } catch (error) {
      console.log(error);
      setIsError(error);
      setIsSubmitting(false);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-black font-[machina-light]">
        {isError && <p>{isError}</p>}
        <div className="flex w-full max-w-5xl rounded-xl overflow-hidden shadow-lg" style={{ minHeight: '560px' }}>
          {/* Left panel */}
          <div className="w-1/2 bg-gradient-to-br from-[#163526] via-[#C63E2F] to-[#163526] px-10 py-16 flex flex-col justify-between hidden md:flex">
            <div>
              <h2 className="text-white text-3xl font-semibold mb-5 leading-tight">
                Get Started<br />with Us
              </h2>
              <p className="text-[#b7c8c2] text-base mb-12 max-w-[240px]">
                Complete these easy steps to register your account.
              </p>
            </div>
          </div>
          {/* Right login form */}
          <div className="w-full md:w-1/2 bg-[#181818] px-10 py-16 flex flex-col justify-center">
            <h2 className="text-xl md:text-2xl font-semibold text-white text-center mb-1">Sign Up Account</h2>
            <p className="text-[#b1b6bc] text-center text-sm mb-8 mt-1">Enter your personal data to create your account.</p>

            <form action="" onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label htmlFor="username" className="text-[#d4d9e1] text-sm mb-2 block">username</label>
                <input
                  type="text"
                  placeholder="eg. john@randomgmail.com"
                  name="username"
                  id="username"
                  value={data.username}
                  onChange={handleChange}
                  className="w-full bg-[#232325] border border-[#222] text-[#f5f7fa] rounded px-4 py-3 text-sm focus:outline-none focus:border-[#62f4b9] transition"
                  required
                />
              </div>

              <div>
                <label htmlFor="password" className="text-[#d4d9e1] text-sm mb-2 block">Password</label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  name="password"
                  id="password"
                  // minLength={6}
                  value={data.password}
                  onChange={handleChange}
                  className="w-full bg-[#232325] border border-[#222] text-[#f5f7fa] rounded px-4 py-3 text-sm focus:outline-none focus:border-[#62f4b9] transition"
                  required
                />
                <span className="block text-xs ml-1 mt-1 text-[#8d8d8d]">Must be at least 6 characters.</span>
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-[#183B29] text-white px-4 py-3 rounded-lg border border-[#183B29] hover:bg-[#13271D] transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-2"
              >
                {isSubmitting ? 'Logging in...' : 'Login'}
              </button>
              <p className="text-[#b7bad0] text-[15px] text-center mt-4">
                Don't have an account? <a href="/register" className="text-[#183B29] hover:underline">Register Here</a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
