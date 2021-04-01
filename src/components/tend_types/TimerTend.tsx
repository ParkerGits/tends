import ProgressBar from "../ProgressBar";
import { useEffect, useState } from "react";
import TendSideButtons from "../TendSideButtons";
import { add, formatRelative } from "date-fns";
import StartStopButtons from "../StartStopButtons";
import {
    createTrend,
    updateTimerTendRunning,
    updateTimerTendStartEndTime,
} from "../../lib/db";
import { useAuth } from "../../lib/auth";
// add istiming to database and props

export type TimerTendProps = {
    title: string;
    targetTime: number;
    isRunning: boolean;
    beginTime: number | null;
    endTime: number | null;
    id?: string;
    index?: number;
    type?: string;
};

export default function TimerTend({
    title,
    targetTime,
    id,
    isRunning,
    beginTime,
    endTime,
}: TimerTendProps) {
    const auth = useAuth();
    const [currentTime, setCurrentTime] = useState(Date.now());
    const [targetEndTime, setTargetEndTime] = useState<number | undefined>(
        endTime!
    );
    const [startTime, setStartTime] = useState<number | undefined>(beginTime!);
    const [isTiming, setIsTiming] = useState<boolean>(isRunning);
    const timerLength = new Date(targetTime);
    const startStopOnClickHandler = () => {
        if (isTiming) {
            const newTimerTrend = {
                tendId: id,
                elapsedTime: currentTime - startTime!,
                targetTime: targetEndTime! - startTime!,
                tendTitle: title,
                tendType: "timer",
                startedAt: startTime!,
                finishedAt: new Date().getTime(),
                author: auth.user.name,
                authorId: auth.user.uid,
            };
            createTrend(newTimerTrend);
        }
        isTiming
            ? updateTimerTendStartEndTime(id, null, null)
            : updateTimerTendStartEndTime(
                  id,
                  new Date().getTime(),
                  add(new Date(), { seconds: targetTime / 1000 }).getTime()
              );
        startTime
            ? setStartTime(undefined)
            : setStartTime(new Date().getTime());
        targetEndTime
            ? setTargetEndTime(undefined)
            : setTargetEndTime(
                  add(new Date(), { seconds: targetTime / 1000 }).getTime()
              );
        setIsTiming(!isTiming);
        updateTimerTendRunning(id, !isTiming);
    };
    useEffect(() => {
        setInterval(() => {
            setCurrentTime(Date.now());
        }, 1000);
    });
    return (
        <div className="h-40 border-b-2 border-gray-300 grid grid-cols-11">
            <div className="col-span-8 flex flex-col justify-evenly">
                <div className="flex items-center justify-between">
                    <h2 className="text-gray-700 ml-4 my-2 font-semibold">
                        {title}
                    </h2>
                    <StartStopButtons
                        isTiming={isTiming}
                        onClick={startStopOnClickHandler}
                    />
                </div>

                <ProgressBar
                    currentQuantity={isTiming ? currentTime - startTime! : 0}
                    targetQuantity={isTiming ? targetEndTime! - startTime! : 1}
                />
                {isTiming ? (
                    <div className="flex flex-row justify-evenly ml-3 mb-2">
                        <div className="flex flex-col">
                            <h3 className="text-gray-400 text-center tracking-wider">
                                START
                            </h3>
                            <h4 className="text-center capitalize">
                                {formatRelative(startTime!, currentTime)}
                            </h4>
                        </div>
                        <div className="flex flex-col">
                            <h3 className="text-gray-400 text-center tracking-wider">
                                TARGET
                            </h3>
                            <h4 className="text-center capitalize">
                                {formatRelative(targetEndTime!, startTime!)}
                            </h4>
                        </div>
                        <div className="flex flex-col flex-grow-0">
                            <h3 className="text-gray-400 text-center tracking-wider">
                                ELAPSED
                            </h3>
                            <h4 className="text-center">
                                {Math.round(
                                    ((currentTime - startTime!) /
                                        (targetEndTime! - startTime!)) *
                                        100
                                )}
                                %
                            </h4>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-row justify-evenly ml-3 mb-2">
                        <div className="flex flex-col flex-grow-0">
                            <h3 className="text-gray-400 text-center tracking-wider">
                                TIMER
                            </h3>
                            <h4 className="text-center">
                                {timerLength.getUTCHours()
                                    ? `${timerLength.getUTCHours()} hour${
                                          timerLength.getUTCHours() > 1
                                              ? "s"
                                              : ""
                                      } `
                                    : null}{" "}
                                {timerLength.getUTCMinutes()
                                    ? `${timerLength.getUTCMinutes()} minute${
                                          timerLength.getUTCMinutes() > 1
                                              ? "s"
                                              : ""
                                      }`
                                    : null}
                            </h4>
                        </div>
                    </div>
                )}
            </div>
            <TendSideButtons tendId={id!} />
        </div>
    );
}
