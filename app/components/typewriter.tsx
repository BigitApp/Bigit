'use client'
import TypewriterEffect from 'typewriter-effect'
import { useMediaQuery } from 'usehooks-ts'
import clsx from 'clsx'

const Typewriter = () => {
  const largeScreenFlag = useMediaQuery('(min-width: 48em)')

  return (
    <div className="h-[160px] px-4 text-center md:h-[50px]">
      <TypewriterEffect
        onInit={typewriter => {
          typewriter
            .typeString(
              `<span style="color: #fd222a: pixeloid-mono; font-size: ${
                largeScreenFlag ? '24px' : '16px'
              }">Create AI assistants that know you</span>`
            )
            .start()
        }}
        options={{
          autoStart: true,
          cursorClassName: clsx('text-xl md:text-[32px]', 'Typewriter__cursor'),
          delay: 120,
        }}
      />
    </div>
  )
}

export default Typewriter
