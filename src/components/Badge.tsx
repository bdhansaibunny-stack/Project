import { CSSProperties } from 'react';

interface BadgeProps {
  variant?: 'primary' | 'success' | 'warning' | 'error';
  children: React.ReactNode;
  style?: CSSProperties;
}

const variantClasses = {
  primary: 'bg-blue-100 text-blue-800',
  success: 'bg-green-100 text-green-800',
  warning: 'bg-yellow-100 text-yellow-800',
  error: 'bg-red-100 text-red-800',
};

export default function Badge({
  variant = 'primary',
  children,
  style,
}: BadgeProps) {
  return (
    <span
      className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${variantClasses[variant]}`}
      style={style}
    >
      {children}
    </span>
  );
}
