import Link from 'next/link'
import Image from 'next/image'
import logo from '@/public/logo.svg'

const footerStyle = {
    backgroundColor: 'rgb(24, 24, 24)',
    borderTop: '1px solid #ccc', // 只在上边添加灰色边框
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', // 添加阴影
  };

export default function Footer() {
  return (
        <footer style={footerStyle}>
            <div className="max-w-8xl mx-auto px-4 sm:px-6" style={{ backgroundColor: 'rgb(24, 24, 24)' }}>

                {/* Top area: Blocks */}
                <div className="grid sm:grid-cols-12 gap-8 py-8 md:py-12">

                    {/* 1st block */}
                    <div className="sm:col-span-12 lg:col-span-3">
                        <Link className="py-3" href="/">
                            <Image className="inline-block align-middle" alt="logo" height={50} src={logo} priority />
                        </Link>
                    </div>

                    {/* 2nd block */}
                    <div className="sm:col-span-6 md:col-span-3 lg:col-span-2">
                        <h6 className="text-green-600 text-xl font-bold mb-2">Dapps</h6>
                        <ul className="text-base">
                            <li className="mb-2">
                                <a href="https://www.bigitapp.com" className="text-gray-200 hover:text-green-500 transition duration-150 ease-in-out">Bigit</a>
                            </li>
                        </ul>
                    </div>

                    {/* 3rd block */}
                    <div className="sm:col-span-6 md:col-span-3 lg:col-span-2">
                        <h6 className="text-green-600 text-xl font-bold mb-2">Resources</h6>
                        <ul className="text-base">
                            <li className="mb-2">
                                <a href="https://www.docs.bigitapp.com" className="text-gray-200 hover:text-green-500 transition duration-150 ease-in-out">Docs</a>
                            </li>
                            <li className="mb-2">
                                <a href="mailto:support@bigitapp.com" className="text-gray-200 hover:text-green-500 transition duration-150 ease-in-out">Support</a>
                            </li>
                            <li className="mb-2">
                                <a href="https://www.aowang66.cn" className="text-gray-200 hover:text-green-500 transition duration-150 ease-in-out">News</a>
                            </li>
                            <li className="mb-2">
                                <a href="https://github.com/AAooWW/Bigit" className="text-gray-200 hover:text-green-500 transition duration-150 ease-in-out">Github</a>
                            </li>
                        </ul>
                    </div>

                    {/* 4th block */}
                    <div className="sm:col-span-6 md:col-span-3 lg:col-span-2">
                        <h6 className="text-green-600 text-xl font-bold mb-2">Community</h6>
                        <ul className="text-base">
                            <li className="mb-2">
                                <a href="https://discord.gg/MyBQDw2b" className="text-gray-200 hover:text-green-500 transition duration-150 ease-in-out">Discord</a>
                            </li>
                            <li className="mb-2">
                                <a href="https://x.com/BigitDapp" className="text-gray-200 hover:text-green-500 transition duration-150 ease-in-out">X</a>
                            </li>
                            <li className="mb-2">
                                <a href="https://bigitapp.medium.com/" className="text-gray-200 hover:text-green-500 transition duration-150 ease-in-out">Medium</a>
                            </li>
                        </ul>
                    </div>

                    {/* 5th block */}
                    <div className="sm:col-span-6 md:col-span-3 lg:col-span-2">
                        <h6 className="text-green-600 text-xl font-bold mb-2">General</h6>
                        <ul className="text-base">
                            <li className="mb-2">
                                <a href="mailto:contact@bigitapp.com" className="text-gray-200 hover:text-green-500 transition duration-150 ease-in-out">Contact Us</a>
                            </li>
                        </ul>
                    </div>

                </div>

                {/* Bottom area */}
                <div className="md:flex md:items-center md:justify-between py-4 md:py-8">
                    {/* Social as */}
                    <ul className="flex mb-4 md:order-1 md:ml-4 md:mb-0">
                        <li className="ml-4">
                            <a href="https://github.com/BigitApp" className="flex justify-center items-center text-gray-200 hover:text-gray-900 bg-white hover:bg-white-100 rounded-full shadow transition duration-150 ease-in-out" aria-label="Github">
                                <svg className="w-8 h-8 fill-current text-black" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M16 8.2c-4.4 0-8 3.6-8 8 0 3.5 2.3 6.5 5.5 7.6.4.1.5-.2.5-.4V22c-2.2.5-2.7-1-2.7-1-.4-.9-.9-1.2-.9-1.2-.7-.5.1-.5.1-.5.8.1 1.2.8 1.2.8.7 1.3 1.9.9 2.3.7.1-.5.3-.9.5-1.1-1.8-.2-3.6-.9-3.6-4 0-.9.3-1.6.8-2.1-.1-.2-.4-1 .1-2.1 0 0 .7-.2 2.2.8.6-.2 1.3-.3 2-.3s1.4.1 2 .3c1.5-1 2.2-.8 2.2-.8.4 1.1.2 1.9.1 2.1.5.6.8 1.3.8 2.1 0 3.1-1.9 3.7-3.7 3.9.3.4.6.9.6 1.6v2.2c0 .2.1.5.6.4 3.2-1.1 5.5-4.1 5.5-7.6-.1-4.4-3.7-8-8.1-8z" />
                                </svg>
                            </a>
                        </li>
                    </ul>
                    {/* Copyrights note */}
                    <div className="text-base text-gray-200 mr-4">&copy; Bigit 2023 </div>

                </div>

            </div>
        </footer>
  )
}
