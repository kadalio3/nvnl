import RegisterForm from "@/components/auth/registerform";
import Link from "next/link";

const LoginPage = () => {
  return (
    <div className="p-6 space-y-4">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900 leading-tight">Register</h1>
        <p className="text-sm text-gray-600 mt-2">
          Have an account? 
          <Link href="/login" className="text-blue-500 hover:underline font-medium">Login</Link>
        </p>
      </div>
      <RegisterForm />
    </div>
  );
};

export default LoginPage