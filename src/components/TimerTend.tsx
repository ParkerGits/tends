import ProgressBar from "./ProgressBar";
import { useEffect, useState } from "react";

export type TimerTendProps = {
    title: string;
    targetTime: number;
    startTime: Date;
    index?: number;
    type?: string;
};
// fixme
const millisecondsToHMS = (milliseconds: number): string => {
    const hours = 0;
    const minutes = 0;
    const seconds = 0;
    return `${hours}:${minutes < 10 ? "0" + minutes : minutes}:${
        seconds < 10 ? "0" + seconds : seconds
    }`;
};

export default function TimerTend({
    title,
    startTime,
    targetTime,
}: TimerTendProps) {
    const [currentTime, setCurrentTime] = useState(Date.now());
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
                    targetQuantity={-startTime.getTime()}
                />
                <div className="flex flex-row justify-evenly ml-3 mb-2">
                    <div className="flex flex-col">
                        <h3 className="text-gray-400 text-center tracking-wider">
                            START
                        </h3>
                        <h4 className="text-center">
                            {startTime.toDateString()}
                        </h4>
                    </div>
                    <div className="flex flex-col">
                        <h3 className="text-gray-400 text-center tracking-wider">
                            TARGET
                        </h3>
                        <h4 className="text-center">
                            {targetTime.toDateString()}
                        </h4>
                    </div>
                    <div className="flex flex-col flex-grow-0">
                        <h3 className="text-gray-400 text-center tracking-wider">
                            REMAINING
                        </h3>
                        <h4 className="text-center">
                            {millisecondsToHMS(
                                targetTime.getTime() - currentTime
                            )}
                            (
                            {(
                                ((currentTime - startTime.getTime()) /
                                    (targetTime.getTime() -
                                        startTime.getTime())) *
                                100
                            ).toFixed(0)}
                            %)
                        </h4>
                    </div>
                </div>
            </div>
        </div>
    );
}
