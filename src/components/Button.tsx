import { ButtonHTMLAttributes } from 'react'
import { cn } from './utils'

export function Button({ className, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn('rounded-full px-6 py-2 font-medium transition disabled:opacity-50 bg-spotify-green text-black hover:brightness-110', className)}
      {...props}
    />
  )
}
