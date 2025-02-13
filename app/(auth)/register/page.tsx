import RegisterForm from "@/components/auth/registerform";
import Link from "next/link";

const LoginPage = () => {
  return (
    <div className="p-6 space-y-2">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900 leading-tight">Register</h1>
      </div>
      <RegisterForm />
      <div className="text-sm font-light text-gray-500 mt-4">
        Already have an account?{' '}
        <Link href="/login" className="font-medium text-blue-600 hover:text-blue-800 transition-all">
          Sign in
        </Link>
      </div>
    </div>
  );
};

export default LoginPage