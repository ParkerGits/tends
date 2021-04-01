import Link from "next/link";
import {
    faTrashAlt,
    faChartLine,
    faArrowUp,
    faArrowDown,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { deleteTend } from "../lib/db";
import { mutate } from "swr";
import { useAuth } from "../lib/auth";

export default function TendSideButtons({ tendId }: { tendId: string }) {
    const auth = useAuth();
    return (
        <div className="grid mr-2 col-span-2 col-start-10 sm:col-start-11 sm:col-span-1 grid-cols-2 justify-items-center items-center leading-none">
            <div className="col-start-2 row-start-1">
                <div className="bg-soft-red hover:bg-soft-red-dark cursor-pointer p-1 w-full">
                    <FontAwesomeIcon
                        icon={faTrashAlt}
                        className="text-2xl lg:text-3xl text-white"
                        onClick={() => {
                            deleteTend(tendId);
                            mutate(
                                ["/api/tends", auth.user.token],
                                async (data: any) => {
                                    return {
                                        tends: data.tends.filter(
                                            (tend: any) => tend.id !== tendId
                                        ),
                                    };
                                },
                                false
                            );
                        }}
                    />
                </div>
            </div>
            <div className="col-start-2 row-start-2">
                <Link href={`/trends/${tendId}`} passHref>
                    <div className="bg-soft-red hover:bg-soft-red-dark cursor-pointer w-full p-1 row-start-2">
                        <FontAwesomeIcon
                            icon={faChartLine}
                            className="text-2xl lg:text-3xl  text-white"
                        />
                    </div>
                </Link>
            </div>
            <div className="row-start-3 col-start-1">
                <div className="bg-soft-red hover:bg-soft-red-dark cursor-pointer w-full py-1 px-1.5 row-start-2">
                    <FontAwesomeIcon
                        icon={faArrowUp}
                        className="text-2xl lg:text-3xl  text-white"
                    />
                </div>
            </div>
            <div className="row-start-3 col-start-2">
                <div className="bg-soft-red hover:bg-soft-red-dark cursor-pointer w-full py-1 px-1.5 row-start-2">
                    <FontAwesomeIcon
                        icon={faArrowDown}
                        className="text-2xl lg:text-3xl  text-white"
                    />
                </div>
            </div>
        </div>
    );
}
