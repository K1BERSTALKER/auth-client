/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import SocialIcons from "./SocialIcons";
import { loginSchema } from "@/lib/zod";
import zod from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFormReset } from "@/contexts/FormResetContext";
import { useAuth } from "@/contexts/AuthContext";

type loginFormFields = zod.infer<typeof loginSchema>;

const LoginForm: React.FC = () => {
  const { triggerReset } = useFormReset();
  const { login, loading } = useAuth();
  const [serverError, setServerError] = React.useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<loginFormFields>({ resolver: zodResolver(loginSchema) });

  React.useEffect(() => {
    reset();
  }, [reset, triggerReset]);

  const onSubmit = async (data: loginFormFields) => {
    console.log("Form submitted:", data);
    try {
      await login(data.email, data.password);
    } catch (err: any) {
      console.error("Login failed:", err);
      setServerError(err?.response?.data?.message || "Login failed");
    }
  };

  return (
    <form
      className="flex flex-col items-center gap-2.5 p-10 px-12 w-full"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1 className="text-2xl font-bold">Sign In</h1>
      <SocialIcons />
      <span className="text-sm">or use your email password</span>
      <input
        {...register("email")}
        type="email"
        placeholder="Email"
        className="bg-gray-200 rounded-lg w-full p-3 outline-none"
      />
      {errors.email && (
        <span className="text-red-500 text-xs">{errors.email.message}</span>
      )}
      <input
        {...register("password")}
        type="password"
        placeholder="Password"
        className="bg-gray-200 rounded-lg w-full p-3 outline-none"
      />
      {errors.password && (
        <span className="text-red-500 text-xs">{errors.password.message}</span>
      )}
      <a href="#" className="text-sm text-gray-500 hover:underline">
        Forgot Your Password?
      </a>
      <button
        disabled={isSubmitting}
        type="submit"
        className="bg-purple-700 text-white px-10 py-3 rounded-lg font-semibold uppercase tracking-wide"
      >
        {loading || isSubmitting ? "Loading..." : "Sign In"}
      </button>
      {errors.root && (
        <p className="text-red-500 mt-2">{errors.root.message}</p>
      )}
      {serverError && <p className="text-red-500 mt-2">{serverError}</p>}
    </form>
  );
};

export default LoginForm;
