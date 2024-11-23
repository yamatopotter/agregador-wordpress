import { type ReactNode } from 'react'

export function Container({
  children,
  className,
}: { children: ReactNode; className?: string }) {
  return (
    <section className={`container mx-auto ${className ? className : ''}`}>
      {children}
    </section>
  )
}
