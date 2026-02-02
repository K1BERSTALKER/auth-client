import { useAuth } from "@/contexts/AuthContext";
import { useFormReset } from "@/contexts/FormResetContext";
import LoginForm from "@/layouts/LoginForm";
import RegisterForm from "@/layouts/RegisterForm";
import TogglePanel from "@/layouts/TogglePanel";
import React from "react";
import { useNavigate } from "react-router-dom";

const LoginPage: React.FC = () => {
  const [isRegister, setIsRegister] = React.useState(false);
  const { triggerReset } = useFormReset();
  const { isAuthenticated, authReady } = useAuth();
  const navigate = useNavigate();

  const handleSwitch = (value: boolean) => {
    setIsRegister(value);
    triggerReset();
  };
  React.useEffect(() => {
    if (authReady && isAuthenticated) {
      console.log("Redirecting to dashboard", {
        user: JSON.parse(localStorage.getItem("user") || "null"),
      });
      navigate("/dashboard", { replace: true });
    }
  }, [authReady, isAuthenticated, navigate]);

  if (!authReady) return <div>Loading...</div>; // wait until AuthContext finishes

  return (
    <div className="flex items-center justify-center min-h-screen bg-linear-to-r from-gray-200 to-indigo-200">
      <div className="relative w-full max-w-3xl min-h-120 bg-white rounded-3xl shadow-xl overflow-hidden flex">
        {/* Forms wrapper */}
        <div className="relative w-full max-w-3xl min-h-[30rem] bg-white rounded-3xl shadow-xl overflow-hidden flex">
          {/* Login Form */}
          <div
            className={`absolute top-0 left-0 w-1/2 h-full p-4 transition-all duration-500 ${
              isRegister
                ? "translate-x-0 opacity-100 z-10"
                : "-translate-x-full opacity-0 z-0"
            }`}
          >
            <LoginForm />
          </div>

          {/* Register Form */}
          <div
            className={`absolute top-0 right-0 w-1/2 h-full p-2 transition-all duration-500 ${
              isRegister
                ? "translate-x-full opacity-0 z-0"
                : "translate-x-0 opacity-100 z-10"
            }`}
          >
            <RegisterForm />
          </div>
        </div>

        {/* Toggle Panel */}
        <div
          className={`absolute top-0 transition-all duration-500 ease-in-out w-1/2 h-full overflow-hidden ${
            isRegister
              ? "left-1/2 rounded-l-[150px]"
              : "left-0 rounded-r-[150px]"
          }`}
        >
          <div
            className={`bg-linear-to-r from-indigo-500 to-purple-500 w-[200%] h-full transition-all duration-700 ease-in-out ${
              isRegister ? "translate-x-0" : "-translate-x-1/2"
            }`}
          >
            {/* Left Panel - Sign In */}
            <TogglePanel
              title="Welcome Back!"
              description="If you already have an account, please login with your personal info"
              buttonText="Sign In"
              onClick={() => handleSwitch(true)}
              className="absolute right-0 z-50 pointer-events-auto"
            />

            {/* Right Panel - Sign Up */}
            <TogglePanel
              title="Hello, Friend!"
              description="If you don't have an account, please register with your personal info"
              buttonText="Sign Up"
              onClick={() => handleSwitch(false)}
              className="absolute left-0 z-50 pointer-events-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
