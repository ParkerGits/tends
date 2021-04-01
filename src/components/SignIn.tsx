import { useRouter } from "next/router";
import { useAuth } from "../lib/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faGithub } from "@fortawesome/free-brands-svg-icons";
export default function SignIn() {
    const auth = useAuth();
    const router = useRouter();
    return (
        <div className="w-full flex flex-col items-center">
            <button
                className="my-5 w-3/5 text-base sm:text-2xl row-end-auto col-start-3 col-span-4 sm:col-start-4 sm:col-span-2 p-3 sm:p-5 bg-soft-red hover:bg-soft-red-dark cursor-pointer font-semibold text-white rounded-full"
                onClick={(e) => {
                    auth.signinWithGitHub();
                    router.push("/");
                }}
            >
                <FontAwesomeIcon icon={faGithub} className="mx-2" />
                Sign In with GitHub
            </button>
            <button
                className="mb-5 w-3/5 text-base sm:text-2xl row-end-auto col-start-3 col-span-4 sm:col-start-4 sm:col-span-2 p-3 sm:p-5 bg-soft-red hover:bg-soft-red-dark cursor-pointer font-semibold text-white rounded-full"
                onClick={(e) => {
                    auth.signinWithGoogle();
                    router.push("/");
                }}
            >
                <FontAwesomeIcon icon={faGoogle} className="mx-2" />
                Sign In with Google
            </button>
        </div>
    );
}
