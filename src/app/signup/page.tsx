"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

function SignUpPage() {
  const router = useRouter();

  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(false);

  const [loading, setLoading] = useState(false);

  const onSignUp = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", userData);
      console.log("Signup success", response.data);
      router.push("/login");
    } catch (error: any) {
      console.log("SignUp Failed : ", error.message);
      toast.error("Failed to create account");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (
      userData.email.length > 0 &&
      userData.username.length > 0 &&
      userData.password.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [userData]);

  return (
    <div className="flex flex-col items-center justify-center p-2 h-screen">
      <h1 className="text-center text-slate-50 text-2xl m-2">
        {loading ? "Processing" : "Sign Up"}
      </h1>

      <div className="flex items-center w-full justify-center p-3">
        <label htmlFor="username" className="w-24">
          UserName :{" "}
        </label>
        <input
          id="username"
          name="username"
          type="text"
          value={userData.username}
          placeholder="UserName"
          onChange={(e) => {
            setUserData({ ...userData, username: e.target.value });
          }}
          className=" rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6"
        />
      </div>

      <div className="flex items-center w-full justify-center p-3">
        <label htmlFor="email" className="w-24">
          Email :{" "}
        </label>
        <input
          id="email"
          name="email"
          type="text"
          value={userData.email}
          placeholder="Email"
          onChange={(e) => {
            setUserData({ ...userData, email: e.target.value });
          }}
          className=" rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
      </div>

      <div className="flex items-center w-full justify-center p-3">
        <label htmlFor="password" className="w-24">
          Password :{" "}
        </label>
        <input
          id="password"
          name="password"
          type="text"
          value={userData.password}
          placeholder="Password"
          onChange={(e) => {
            setUserData({ ...userData, password: e.target.value });
          }}
          className=" rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
      </div>

      <button
        onClick={onSignUp}
        className="px-4 py-2 mt-2 text-slate-50 bg-sky-500 rounded"
      >
        {buttonDisabled ? "No SignUp" : "SignUp"}
      </button>
    </div>
  );
}

export default SignUpPage;
