import ProgressBar from "../ProgressBar";
import { useEffect, useState } from "react";
import TendSideButtons from "../TendSideButtons";
import { formatRelative } from "date-fns";

export type TimerTendProps = {
    title: string;
    targetTime: number;
    startTime: any;
    id?: string;
    index?: number;
    type?: string;
};

export default function TimerTend({
    title,
    startTime,
    targetTime,
    id,
}: TimerTendProps) {
    const [currentTime, setCurrentTime] = useState(Date.now());
    const targetEndTime: Date = new Date(startTime.getTime() + targetTime);
    useEffect(() => {
        setInterval(() => {
            setCurrentTime(Date.now());
        }, 1000);
    });
    return (
        <div className="h-40 border-b-2 border-gray-300 grid grid-cols-11">
            <div className="col-span-8 flex flex-col justify-evenly">
                <h2 className="text-gray-700 ml-4 my-2 font-semibold">
                    {title}
                </h2>
                <ProgressBar
                    currentQuantity={currentTime - startTime.getTime()}
                    targetQuantity={
                        targetEndTime.getTime() - startTime.getTime()
                    }
                />
                <div className="flex flex-row justify-evenly ml-3 mb-2">
                    <div className="flex flex-col">
                        <h3 className="text-gray-400 text-center tracking-wider">
                            START
                        </h3>
                        <h4 className="text-center capitalize">
                            {formatRelative(startTime, currentTime)}
                        </h4>
                    </div>
                    <div className="flex flex-col">
                        <h3 className="text-gray-400 text-center tracking-wider">
                            TARGET
                        </h3>
                        <h4 className="text-center capitalize">
                            {formatRelative(targetEndTime, startTime)}
                        </h4>
                    </div>
                    <div className="flex flex-col flex-grow-0">
                        <h3 className="text-gray-400 text-center tracking-wider">
                            ELAPSED
                        </h3>
                        <h4 className="text-center">
                            {Math.round(
                                ((currentTime - startTime.getTime()) /
                                    (targetEndTime.getTime() -
                                        startTime.getTime())) *
                                    100
                            )}
                            %
                        </h4>
                    </div>
                </div>
            </div>
            <TendSideButtons tendId={id!} />
        </div>
    );
}
