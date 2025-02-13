"use client"

import { useState } from "react";
import { SignUpCredentials } from "@/lib/action";
import { Input } from "@/components/ui/register-input";
import { Button } from "@/components/ui/button";

const RegisterForm = () => {
  const [state, setState] = useState<{
    errors?: Record<string, string>;
    message?: string;
  }>({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    const formData = new FormData(event.currentTarget);

    const result = await SignUpCredentials(state, formData);
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

      <Input
        type="text"
        id="name"
        name="name"
        label="Enter your name"
        required
        error={state.errors?.name}
      />

      <Input
        type="email"
        id="email"
        name="email"
        label="Enter your email"
        required
        error={state.errors?.email}
      />

      <Input
        type="password"
        id="password"
        name="password"
        label="Password"
        required
        error={state.errors?.password}
      />

      <Input
        type="password"
        id="ConfirmPassword"
        name="ConfirmPassword"
        label="Confirm Password"
        required
        error={state.errors?.ConfirmPassword}
      />
      <Button
        type="submit"
        loading={loading}
        loadingText="Loading..."
        fullWidth
        className="w-full p-3 bg-black text-white rounded-lg hover:bg-gray-800 focus:outline-none transition-colors"
      >
        Register
      </Button>
    </form>
  );
};

export default RegisterForm;