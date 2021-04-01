import { useRouter } from "next/router";
import ContentContainer from "../components/ContentContainer";
import { useAuth } from "../lib/auth";
import Image from "next/image";
import SignIn from "../components/SignIn";
import { createCheckoutSession, goToBillingPortal } from "../lib/db";
import { useState } from "react";
import LoadingSpinner from "../components/LoadingSpinner";

export default function CreateTend() {
    const [isCheckoutLoading, setIsCheckoutLoading] = useState(false);
    const [isBillingLoading, setIsBillingLoading] = useState(false);

    if (isCheckoutLoading || isBillingLoading) {
        return (
            <ContentContainer>
                <LoadingSpinner />
            </ContentContainer>
        );
    }
    const auth = useAuth();

    if (!auth.user) {
        return (
            <ContentContainer>
                <SignIn />
            </ContentContainer>
        );
    }
    const router = useRouter();
    return (
        <ContentContainer>
            {auth.user ? (
                <div className="grid grid-cols-8 mx-auto w-4/5">
                    <div className="col-span-8 mx-auto sm:col-start-1">
                        <Image
                            width="200"
                            height="200"
                            src={auth.user.photoUrl}
                            className="rounded-full"
                        />
                    </div>
                    <h1 className="mx-auto col-span-8 font-medium text-gray-700">
                        {auth.user.name}
                    </h1>
                    <h2 className="mx-auto col-span-8  text-gray-700">
                        {auth.user.email}
                    </h2>
                    <h2 className="mx-auto col-span-8  text-gray-700">
                        Provider: {auth.user.provider}
                    </h2>
                    <div className="flex flex-col col-span-6 col-start-2">
                        <button
                            className="my-5 w-4/5 mx-auto text-sm sm:text-base row-end-auto col-start-3 col-span-4 sm:col-start-4 sm:col-span-2 p-3 bg-soft-red hover:bg-soft-red-dark cursor-pointer font-semibold text-white rounded-full"
                            onClick={(e) => {
                                createCheckoutSession(auth.user.uid);
                                setIsCheckoutLoading(true);
                            }}
                        >
                            Upgrade to Premium!
                        </button>
                        <button
                            className="mb-5 w-4/5 mx-auto text-sm sm:text-base row-end-auto col-start-3 col-span-4 sm:col-start-4 sm:col-span-2 p-3 bg-soft-red hover:bg-soft-red-dark cursor-pointer font-semibold text-white rounded-full"
                            onClick={(e) => {
                                goToBillingPortal();
                                setIsBillingLoading(true);
                            }}
                        >
                            Manage Billing
                        </button>
                        <button
                            className="mb-5 w-2/5 mx-auto text-sm sm:text-base row-end-auto col-start-3 col-span-4 sm:col-start-4 sm:col-span-2 p-3 bg-soft-red hover:bg-soft-red-dark cursor-pointer font-semibold text-white rounded-full"
                            onClick={(e) => {
                                auth.signout();
                                router.push("/");
                            }}
                        >
                            Sign Out
                        </button>
                    </div>
                </div>
            ) : null}
        </ContentContainer>
    );
}
