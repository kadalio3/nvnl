import Link from "next/link";
const RegisterForm = () => {
  return (
    <form id="loginForm" className="space-y-4">
      <div className="bg-white rounded-lg max-w-md mx-auto py-2">
        <div className="relative bg-inherit">
          <input
            type="text"
            id="name"
            name="name"
            className="peer bg-transparent h-12 w-full rounded-lg text-gray-900 placeholder-transparent ring-2 ring-gray-300 px-4 focus:ring-sky-500 focus:outline-none focus:border-sky-600 transition-all"
            placeholder="Enter your name"
            required
          />
          <label
            htmlFor="name"
            className="absolute cursor-text left-4 -top-3 text-sm text-gray-600 bg-white px-1 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-3 peer-focus:-top-3 peer-focus:text-sky-600 peer-focus:text-sm transition-all"
          >
            Enter your name
          </label>
        </div>
      </div>
      <div className="bg-white rounded-lg max-w-md mx-auto py-2">
        <div className="relative bg-inherit">
          <input
            type="email"
            id="email"
            name="email"
            className="peer bg-transparent h-12 w-full rounded-lg text-gray-900 placeholder-transparent ring-2 ring-gray-300 px-4 focus:ring-sky-500 focus:outline-none focus:border-sky-600 transition-all"
            placeholder="Enter your email"
            required
          />
          <label
            htmlFor="email"
            className="absolute cursor-text left-4 -top-3 text-sm text-gray-600 bg-white px-1 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-3 peer-focus:-top-3 peer-focus:text-sky-600 peer-focus:text-sm transition-all"
          >
            Enter your email
          </label>
        </div>
      </div>

      <div className="bg-white rounded-lg max-w-md mx-auto py-2">
        <div className="relative bg-inherit">
          <input
            type="password"
            id="password"
            name="password"
            className="peer bg-transparent h-12 w-full rounded-lg text-gray-900 placeholder-transparent ring-2 ring-gray-300 px-4 focus:ring-sky-500 focus:outline-none focus:border-sky-600 transition-all"
            placeholder="Enter your password"
            required
          />
          <label
            htmlFor="password"
            className="absolute cursor-text left-4 -top-3 text-sm text-gray-600 bg-white px-1 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-3 peer-focus:-top-3 peer-focus:text-sky-600 peer-focus:text-sm transition-all"
          >
            Password
          </label>
        </div>
      </div>
      <div className="bg-white rounded-lg max-w-md mx-auto py-2">
        <div className="relative bg-inherit">
          <input
            type="password"
            id="confPassword"
            name="confPassword"
            className="peer bg-transparent h-12 w-full rounded-lg text-gray-900 placeholder-transparent ring-2 ring-gray-300 px-4 focus:ring-sky-500 focus:outline-none focus:border-sky-600 transition-all"
            placeholder="Enter your password"
            required
          />
          <label
            htmlFor="confPassword"
            className="absolute cursor-text left-4 -top-3 text-sm text-gray-600 bg-white px-1 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-3 peer-focus:-top-3 peer-focus:text-sky-600 peer-focus:text-sm transition-all"
          >
            Confirm Password
          </label>
        </div>
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

      <button
        type="submit"
        className="w-full p-3 bg-black text-white rounded-lg hover:bg-gray-800 focus:outline-none transition-colors"
      >
        Login
      </button>
    </form>
  );
};

export default RegisterForm;
