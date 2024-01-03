import styles from '@/app/styles/horizontal-bounce.module.css'
import { tw } from '@/app/components/tw'

export const HandPointer = ({ className }: { className: string }) => {
  return <span className={tw('text-4xl', styles.bounce, className)}>👇</span>
}
