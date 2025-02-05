import LoginForm from "@/components/auth/loginform";
import Link from "next/link";

const LoginPage = () => {
  return (
    <div className="p-6 space-y-4">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900 leading-tight">Login</h1>
        <p className="text-sm text-gray-600 mt-2">
          Don't have an account? 
          <Link href="/register" className="text-blue-500 hover:underline font-medium">Sign Up</Link>
        </p>
      </div>
      <LoginForm />
      
    </div>
  );
};

export default LoginPage