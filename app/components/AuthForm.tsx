"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { login, register, verityToken } from "../api/auth";
import { toast } from "react-toastify";

const AuthForm = ({ mode }: { mode: "login" | "register" }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  let token:any;
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (typeof window !== "undefined") {
        const token = localStorage.getItem("token");
      }

        if (token) {
          const isVerified = await verityToken(token);

          if (isVerified.success) {
            toast.success("Token verified. Redirecting to home page.");
            router.push("/");
            return;
          }
        }


       

      let response;

      if (mode === "login") {
        response = await login(email, password);

        if (response?.success) {
          if (typeof window !== "undefined") {
            localStorage.setItem("token", response.token);
          }
          router.push("/");
        } else {
          toast.error(response?.message || "Login failed. Please try again.");
        }
      } else {
        response = await register(username, email, password);

        if (response?.success) {
          toast.success(response.message || "Registration successful!");
          router.push("/login");
        } else {
          toast.error(response?.message || "Registration failed. Please try again.");
        }
      }
    } catch (error) {
      toast.error("An unexpected error occurred. Please try again.");
      console.log(error)
    }
  };

  return (
    <div className="space-y-4">
      <div
        id="authentication-modal"
        className="bg-transparent fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-[calc(100%-1rem)] max-h-full"
      >
        <div className="relative p-4 w-full max-w-md max-h-full">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <div className="flex items-center justify-between p-3 md:px-5 border-b rounded-t dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                {mode === "login" ? "Sign in to our platform" : "Register to our platform"}
              </h3>
            </div>
            <div className="p-3 md:px-5">
              <form onSubmit={handleSubmit} className="space-y-4">
                {mode === "register" && (
                  <div>
                    <label
                      htmlFor="username"
                      className="block mb-1 text-md font-medium text-gray-900 dark:text-white"
                    >
                      Username
                    </label>
                    <input
                      type="text"
                      name="username"
                      id="username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      placeholder="user123"
                      required
                    />
                  </div>
                )}
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-1 text-md font-medium text-gray-900 dark:text-white"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="name@company.com"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-1 text-md font-medium text-gray-900 dark:text-white"
                  >
                    Your password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="••••••••"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  {mode === "login" ? "Login to your account" : "Register your account"}
                </button>
                <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                  {mode === "login" ? (
                    <div>
                      Not registered?{" "}
                      <span
                        onClick={() => router.push("/register")}
                        className="text-blue-700 hover:underline cursor-pointer dark:text-blue-500"
                      >
                        Create account
                      </span>
                    </div>
                  ) : (
                    <div>
                      Already have an account?{" "}
                      <span
                        onClick={() => router.push("/login")}
                        className="text-blue-700 hover:underline cursor-pointer dark:text-blue-500"
                      >
                        Login
                      </span>
                    </div>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
