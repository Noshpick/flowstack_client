'use client';

import { ButtonHTMLAttributes, ReactNode } from 'react';
import Link from 'next/link';

interface TabProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost' | "outline" ;
  size?: 'sm' | 'md' ;
  href?: string;
  external?: boolean;
}

const Tab = ({ 
  children, 
  variant = 'primary', 
  size = 'md',
  href,
  external = false,
  className = '',
  ...props 
}: TabProps) => {
  const baseClasses = 'inline-flex items-center justify-center rounded-3xl transition-colors duration-300 ';
  
  const variants = {
    primary: 'bg-green-600 text-white hover:bg-green-700',
    secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200',
    ghost: 'bg-transparent text-gray-700 hover:bg-gray-100',
    outline: 'bg-transparent text-zinc-500 border-1 border-zinc-300 dark:border-zinc-700 dark:text-zinc-500 hover:bg-green-600 hover:text-white '

  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-2 text-base',
  };

  const combinedClasses = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`;

  if (href) {
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={combinedClasses}
        >
          {children}
        </a>
      );
    }
    
    return (
      <Link href={href} className={combinedClasses}>
        {children}
      </Link>
    );
  }

  return (
    <button className={combinedClasses} {...props}>
      {children}
    </button>
  );
};

export default Tab;