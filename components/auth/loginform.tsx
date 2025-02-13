"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SignInCredentials } from "@/lib/action";
import { LoginInput } from "@/components/ui/login-input";
import { Button } from "@/components/ui/button";

const LoginForm = () => {
  const router = useRouter();
  const [state, setState] = useState<{
    errors?: Record<string, string>;
    message?: string;
  }>({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    const formData = new FormData(event.currentTarget);

    const result = await SignInCredentials(state, formData);
    if (result?.errors) {
      setState({ errors: result.errors, message: undefined });
    } else if (result?.message) {
      setState({ errors: undefined, message: result.message });
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      {state.message && (
        <div
          className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-100"
          role="alert"
        >
          <span className="font-medium">{state.message}</span>
        </div>
      )}
      <div className="bg-white rounded-lg max-w-md mx-auto py-2">
        <LoginInput
          type="email"
          id="email"
          name="email"
          label="Enter your email"
          required
          error={state.errors?.email}
        />
        <LoginInput
          type="password"
          id="password"
          name="password"
          label="Password"
          required
          error={state.errors?.password}
        />
      </div>
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <input
            type="checkbox"
            id="rememberMe"
            className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300"
          />
          <label htmlFor="rememberMe" className="ml-2 text-sm text-gray-600">
            Remember me
          </label>
        </div>
        <Link href="#" className="text-sm text-blue-500 hover:underline">
          Forgot Password?
        </Link>
      </div>

            <Button
              type="submit"
              loading={loading}
              loadingText="Loading..."
              fullWidth
              className="w-full p-3 bg-black text-white rounded-lg hover:bg-gray-800 focus:outline-none transition-colors"
            >
              Login
            </Button>
    </form>
  );
};

export default LoginForm;
