import LoginForm from "@/components/auth/loginform";
import Link from "next/link";

const LoginPage = () => {
  return (
    <div className="p-6 space-y-2">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900 leading-tight">Login</h1>
      </div>
      <LoginForm />
      <div className="text-sm font-light text-gray-500 mt-4">
        Don&apos;t have an account yet?{' '}
        <Link href="/register" className="font-medium text-blue-600 hover:text-blue-800 transition-all">
          Sign up
        </Link>
      </div>
    </div>
  );
};

export default LoginPage