"use client"
import { useState } from "react";
import { useRouter } from "next/router";
import AuthForm from "../components/AuthForm";

const Login = () => {
  return (
    <div className=" bg-transparent totals min-h-screen flex items-center justify-center">
       <div className="absolute top-0 left-0 right-0">
        {/* Background Circles */}
        <div className="absolute top-0 overflow-visible opacity-50 dark:opacity-30 left-16">
          <div
            className={`mix-blend-multiply absolute w-[800px] h-[900px] rounded-[40rem] circleObj`}
          ></div>
        </div>
        <div className="absolute overflow-visible opacity-50 dark:opacity-30 top-28 left-52">
          <div
            className={`mix-blend-multiply absolute w-[800px] h-[600px] rounded-[40rem] circleObj2`}
          ></div>
        </div>
      </div>
      <div className=" p-6 w-96">
        <AuthForm mode="login" />
      </div>
    </div>
  );
};

export default Login;
