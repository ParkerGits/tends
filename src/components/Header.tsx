import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useAuth } from "../lib/auth";

export default function Header() {
    const auth = useAuth();

    return (
        <div className="py-5 bg-soft-red flex flex-row justify-between content-center">
            <Link href="/" passHref>
                <h1 className="text-white hover:text-gray-200 ml-7 font-bold mb-1 cursor-pointer">
                    tends.me
                </h1>
            </Link>
            {auth.user ? (
                <div>
                    <p>Email: {auth.user.email}</p>
                    <button onClick={(e) => auth.signout()}>Sign Out</button>
                </div>
            ) : (
                <button onClick={(e) => auth.signinWithGitHub()}>
                    Sign In
                </button>
            )}
            <Link href="/create" passHref>
                <FontAwesomeIcon
                    icon={faBars}
                    className="text-white hover:text-gray-200 text-3xl lg:text-4xl mr-7 self-center cursor-pointer"
                />
            </Link>
        </div>
    );
}
