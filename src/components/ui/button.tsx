import { cva } from 'class-variance-authority'
import React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline'
}

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-[100px] text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-[#8A2EFF] text-white hover:bg-[#7325D4] shadow-lg",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border-2 border-[#8A2EFF] bg-transparent hover:bg-[#8A2EFF]/10 text-[#8A2EFF] dark:text-white dark:border-white dark:hover:bg-white/10",
        secondary: "bg-[#00A9A5] text-white hover:bg-[#008c89]",
        ghost: "hover:bg-[#8A2EFF]/10 hover:text-[#8A2EFF]",
        link: "text-[#8A2EFF] underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-5 py-2",
        sm: "h-9 px-4 text-xs",
        lg: "h-12 px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export const Button: React.FC<ButtonProps> = ({ children, variant = 'default', className = '', ...props }) => {
  const baseStyles = 'px-4 py-2 rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors'
  const variantStyles = {
    default: 'bg-primary text-primary-foreground hover:bg-primary/90',
    outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground'
  }

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}