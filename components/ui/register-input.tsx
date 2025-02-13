import { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  label: string;
}

export const Input = ({ error, label, id, ...props }: InputProps) => {
  return (
    <div className="bg-white rounded-lg max-w-md mx-auto py-2">
      <div className="relative bg-inherit">
        <input
          id={id}
          placeholder={label}
          {...props}
          className={`peer bg-transparent h-12 w-full rounded-lg text-gray-900 placeholder-transparent ring-2 ${
            error ? 'ring-red-500' : 'ring-gray-300'
          } px-4 focus:ring-sky-500 focus:outline-none focus:border-sky-600 transition-all`}
        />
        <label
          htmlFor={id}
          className="absolute cursor-text left-4 -top-3 text-sm text-gray-600 bg-white px-1 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-3 peer-focus:-top-3 peer-focus:text-sky-600 peer-focus:text-sm transition-all"
        >
          {label}
        </label>
        {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
      </div>
    </div>
  );
};