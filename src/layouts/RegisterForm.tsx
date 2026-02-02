/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import SocialIcons from "./SocialIcons";
import { registerSchema } from "@/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useFormReset } from "@/contexts/FormResetContext";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const RegisterForm: React.FC = () => {
  const { triggerReset } = useFormReset();
  const { register: registerUser, loading } = useAuth();
  const navigate = useNavigate();
  const [serverError, setServerError] = React.useState<string | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });
  React.useEffect(() => {
    reset();
  }, [triggerReset, reset]);

  const onSubmit = async (data: any) => {
    console.log("Form submitted:", data);
    setServerError(null);
    try {
      await registerUser(data.username, data.email, data.password);
      console.log(
        "RegisterUser finished, current user:",
        JSON.parse(localStorage.getItem("user") || "null"),
      );
      navigate("/dashboard", { replace: true });
    } catch (error) {
      console.error("Register failed:", error);
      setServerError(
        (error as any)?.response?.data?.message || "Registration failed",
      );
    }
  };

  return (
    <form
      className="flex flex-col items-center py-10 px-12 w-full"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1 className="text-2xl font-bold mb-2">Create Account</h1>
      <SocialIcons />
      <span className="text-sm mb-3">or use your email for registration</span>
      <input
        {...register("username")}
        type="text"
        placeholder="Name"
        className="bg-gray-200 rounded-lg w-full p-3 mb-3 outline-none"
      />
      {errors.username && (
        <p className="text-red-500 mb-2">{errors.username.message}</p>
      )}
      <input
        {...register("email")}
        type="email"
        placeholder="Email"
        className="bg-gray-200 rounded-lg w-full p-3 mb-3 outline-none"
      />
      {errors.email && (
        <p className="text-red-500 mb-2">{errors.email.message}</p>
      )}
      <input
        {...register("password")}
        type="password"
        placeholder="Password"
        className="bg-gray-200 rounded-lg w-full p-3 mb-3 outline-none"
      />
      {errors.password && (
        <p className="text-red-500 mb-2">{errors.password.message}</p>
      )}
      <button
        type="submit"
        disabled={loading}
        className="bg-purple-700 text-white px-10 py-3 rounded-lg font-semibold uppercase tracking-wide"
      >
        {loading ? "Loading..." : "Sign Up"}
      </button>
      {errors.root && (
        <p className="text-red-500 mt-2">{errors.root.message}</p>
      )}
      {serverError && <p className="text-red-500 mt-2">{serverError}</p>}
    </form>
  );
};

export default RegisterForm;
