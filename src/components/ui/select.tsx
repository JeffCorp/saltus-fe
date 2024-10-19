import { ChevronDown } from 'lucide-react'
import * as React from "react"

const SelectContext = React.createContext<{
  value: string
  onChange: (value: string) => void
} | null>(null)

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> { }

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, ...props }, ref) => {
    return (
      <select
        className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        ref={ref}
        {...props}
      />
    )
  }
)
Select.displayName = "Select"

export function CustomSelect({ children, onValueChange }: { children: React.ReactNode, onValueChange: (value: string) => void }) {
  const [value, setValue] = React.useState('')

  const handleChange = (newValue: string) => {
    setValue(newValue)
    onValueChange(newValue)
  }

  return (
    <SelectContext.Provider value={{ value, onChange: handleChange }}>
      <div className="relative">{children}</div>
    </SelectContext.Provider>
  )
}


export function SelectTrigger({ children, id }: { children: React.ReactNode, id?: string }) {
  const context = React.useContext(SelectContext)
  if (!context) throw new Error('SelectTrigger must be used within a Select')

  return (
    <button
      id={id}
      className="flex items-center justify-between w-full px-3 py-2 text-sm bg-background border border-input rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-input"
      onClick={() => {
        // Toggle dropdown visibility
      }}
    >
      {children}
      <ChevronDown className="w-4 h-4 opacity-50" />
    </button>
  )
}

export function SelectValue({ placeholder }: { placeholder: string }) {
  const context = React.useContext(SelectContext)
  if (!context) throw new Error('SelectValue must be used within a Select')

  return <span>{context.value || placeholder}</span>
}

export function SelectItem({ children, value }: { children: React.ReactNode, value: string }) {
  const context = React.useContext(SelectContext)
  if (!context) throw new Error('SelectItem must be used within a Select')

  return (
    <div
      className="px-2 py-1.5 text-sm cursor-pointer hover:bg-accent hover:text-accent-foreground"
      onClick={() => context.onChange(value)}
    >
      {children}
    </div>
  )
}

export function SelectContent({ children }: { children: React.ReactNode }) {
  return (
    <div className="absolute z-50 w-full mt-1 bg-popover text-popover-foreground border border-input rounded-md shadow-md">
      {children}
    </div>
  )
}
