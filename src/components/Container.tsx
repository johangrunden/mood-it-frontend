import { ReactNode } from 'react'
export function Container({ children }: { children: ReactNode }) {
  return <div className="mx-auto max-w-5xl px-4">{children}</div>
}
