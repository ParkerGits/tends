import React from "react";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

export default function CreateTendButton() {
    return (
        <Link href="/create" passHref>
            <div className="mx-auto my-5 rounded-full border-4 px-2 py-1.5 border-gray-400 hover:border-gray-600 text-3xl text-gray-400 hover:text-gray-600 leading-none cursor-pointer">
                <FontAwesomeIcon icon={faPlus} />
            </div>
        </Link>
    );
}
