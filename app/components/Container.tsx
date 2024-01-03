import { tw } from './tw'

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
}
export function Container({ className, ...props }: ContainerProps) {
  return (
    <div
      className={tw('mx-auto max-w-10xl px-4 sm:px-6 lg:px-8', className)}
      {...props}
    />
  )
}
