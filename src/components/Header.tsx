import { faBars } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link';

export default function Header() {
    return (
        <div className="py-5 bg-soft-red flex flex-row justify-between content-center">
            <Link href="/">
                <h1 className="text-white hover:text-gray-200 ml-7 font-bold mb-1 cursor-pointer">tends.me</h1>
            </Link>
            <Link href="/create">
                <FontAwesomeIcon icon={faBars} className="text-white hover:text-gray-200 text-3xl lg:text-4xl mr-7 self-center cursor-pointer"/>
            </Link>
        </div>
    )
}
