import { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  loadingText?: string;
  fullWidth?: boolean;
}

export const Button = ({ 
  children, 
  loading, 
  loadingText = 'Loading...', 
  fullWidth,
  className = '',
  ...props 
}: ButtonProps) => {
  return (
    <button
      {...props}
      disabled={loading}
      className={`${className} ${fullWidth ? 'w-full' : ''} ${loading ? 'opacity-70' : ''}`}
    >
      {loading ? loadingText : children}
    </button>
  );
};