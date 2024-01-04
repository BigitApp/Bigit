import Link from 'next/link'

export const NavLink = ({
  href,
  target,
  children,
}: {
  href: string
  target?: string
  children?: React.ReactNode
}) => {
    return (
      <Link
        href={href}
        target={target || '_self'}
        className="font-bai-jamjuree font-bold inline-block rounded-lg py-1 px-2 text-xl text-white hover:bg-green-900 hover:text-white" // 修改了 CSS 类
      >
        {children}
      </Link>
    )
  }