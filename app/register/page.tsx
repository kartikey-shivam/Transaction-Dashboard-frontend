"use client"
import AuthForm from "../components/AuthForm";

const Register = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
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
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-semibold mb-4">Register</h2>
        <AuthForm mode="register" />
      </div>
    </div>
  );
};

export default Register;
