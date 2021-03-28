import Link from "next/link";
import {
    faCog,
    faChartLine,
    faArrowUp,
    faArrowDown,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function TendSideButtons({ tendId }: { tendId: string }) {
    return (
        <div className="grid mr-2 col-span-2 col-start-10 sm:col-start-11 sm:col-span-1 grid-cols-2 justify-items-center items-center leading-none">
            <div className="col-start-2 row-start-1">
                <div className="bg-soft-red hover:bg-soft-red-dark cursor-pointer p-1 w-full">
                    <FontAwesomeIcon
                        icon={faCog}
                        className="text-2xl lg:text-3xl text-white"
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
