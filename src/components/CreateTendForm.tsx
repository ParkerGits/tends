import { FormEvent, useState } from "react";
import { useTendsContext } from "./TendsContext";
import { useRouter } from "next/router";
import { QuantityTendProps } from "./QuantityTend";
import { TimerTendProps } from "./TimerTend";

// IF EITHER START DATE OR START TIME, OTHER IS REQUIRED

function parseDateTimeStrings(dateString: string, timeString: string): Date {
    let inputDate = dateString;
    const year: number = parseInt(
        inputDate.substring(0, inputDate.indexOf("-"))
    );
    inputDate = inputDate.substring(inputDate.indexOf("-") + 1);
    const month: number =
        parseInt(inputDate.substring(0, inputDate.indexOf("-"))) - 1;
    const day: number = parseInt(
        inputDate.substring(inputDate.indexOf("-") + 1)
    );
    const hour: number = parseInt(
        timeString.substring(0, timeString.indexOf(":"))
    );
    const minute: number = parseInt(
        timeString.substring(timeString.indexOf(":") + 1)
    );
    console.log(year, month, day, hour, minute);
    return new Date(year, month, day, hour, minute);
}

export default function CreateTendForm() {
    const { tendsList, setTendsList } = useTendsContext();

    const [title, setTitle] = useState("");
    const [type, setType] = useState("");

    // Quantity Tend Props
    const [units, setUnits] = useState<string>("");
    const [quantity, setQuantity] = useState(0);
    const [targetQuantity, setTargetQuantity] = useState(0);
    const router = useRouter();

    // Timer Tend Props
    const [startDate, setStartDate] = useState<string>();
    const [startTime, setStartTime] = useState<string>();
    const [targetHours, setTargetHours] = useState<string>();
    const [targetMinutes, setTargetMinutes] = useState<string>();

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        let newTend: QuantityTendProps | TimerTendProps;
        switch (type) {
            case "quantity":
                console.log("Quantity Tend Created");
                // set quantity to 0 if quantity is null
                const initialQuantity: number = quantity ? quantity : 0;
                const quantityTend: QuantityTendProps = {
                    title: title,
                    units: units,
                    quantity: initialQuantity,
                    targetQuantity: targetQuantity,
                    type: type,
                };
                newTend = quantityTend;
                break;
            case "timer":
                console.log("Timer Tend Created");
                const beginTime: Date =
                    startTime && startDate
                        ? parseDateTimeStrings(startDate, startTime)
                        : new Date(Date.now());
                const targetHoursInt = targetHours ? parseInt(targetHours) : 0;
                const targetMinutesInt = targetMinutes
                    ? parseInt(targetMinutes)
                    : 0;
                const timerTend: TimerTendProps = {
                    title: title,
                    targetTime: targetHoursInt * 60 + targetMinutesInt,
                    startTime: beginTime,
                    type: type,
                };
                newTend = timerTend;
                break;
        }
        setTendsList([...tendsList, newTend!]);
        event.preventDefault;
        router.push("/");
    };

    return (
        <div>
            <div className="border-b border-gray-300 p-5">
                <h1 className="ml-3 font-semibold text-gray-700">
                    Create a New Tend
                </h1>
            </div>
            <hr className="text-gray-400" />
            <form
                className="grid grid-cols-8 p-4 gap-x-4 md:gap-x-8"
                autoComplete="off"
                onSubmit={(e) => handleSubmit(e)}
            >
                <input
                    type="text"
                    name="title"
                    placeholder="Tend Title"
                    className="mb-3 col-span-8 md:col-span-6"
                    onChange={(e) => {
                        setTitle(e.target.value);
                    }}
                    value={title}
                    required
                />
                <select
                    name="type"
                    className="mb-3 col-span-8 md:col-span-2"
                    id="type"
                    onChange={(e) => {
                        setType(e.target.value);
                    }}
                    required
                >
                    <option value="">-- Pick a Tend Type --</option>
                    <option value="quantity">Quantity</option>
                    <option value="timer">Timer</option>
                </select>
                {type === "quantity" && (
                    <div className="col-span-8 grid grid-cols-8 gap-x-4 sm:gap-x-8">
                        <input
                            type="text"
                            name="units"
                            placeholder="Tend Units (i.e. calories, pages, etc.) "
                            className="col-span-8 sm:col-span-4 mb-3"
                            onChange={(e) => {
                                setUnits(e.target.value);
                            }}
                            value={units ? units : ""}
                        />
                        <input
                            type="number"
                            placeholder="Initial Quantity"
                            name="initialQuantity"
                            className="col-span-4 sm:col-span-2 mb-3"
                            onChange={(e) => {
                                setQuantity(parseInt(e.target.value));
                            }}
                        />
                        <input
                            type="number"
                            placeholder="Target Quantity"
                            name="targetQuantity"
                            className="col-span-4 sm:col-span-2 mb-3 "
                            onChange={(e) => {
                                setTargetQuantity(parseInt(e.target.value));
                            }}
                            required
                        />
                        <input
                            type="submit"
                            className="text-sm sm:text-base row-end-auto col-start-3 col-span-4 sm:col-start-4 sm:col-span-2 p-3 bg-soft-red hover:bg-soft-red-dark cursor-pointer font-semibold text-white rounded-full"
                        />
                    </div>
                )}
                {type === "timer" && (
                    <div className="col-span-8 grid grid-cols-8 gap-x-4 sm:gap-x-8">
                        <label
                            htmlFor="targetHours"
                            className="col-span-4 sm:col-span-2 mb-3 flex flex-col"
                        >
                            Target Hours
                            <input
                                name="targetHours"
                                type="number"
                                className="p-2.5"
                                onChange={(e) => {
                                    setTargetHours(e.target.value);
                                }}
                                required
                            />
                        </label>
                        <label
                            htmlFor="targetMinutes"
                            className="col-span-4 sm:col-span-2 mb-3 flex flex-col"
                        >
                            Target Minutes
                            <input
                                name="targetMinutes"
                                type="number"
                                className="p-2.5"
                                onChange={(e) => {
                                    setTargetMinutes(e.target.value);
                                }}
                                required
                            />
                        </label>
                        <label
                            htmlFor="startDate"
                            className="col-span-4 sm:col-span-2 mb-3 flex flex-col"
                        >
                            Start Date
                            <input
                                name="startDate"
                                type="date"
                                onChange={(e) => {
                                    setStartDate(e.target.value);
                                }}
                            />
                        </label>
                        <label
                            htmlFor="startTime"
                            className="col-span-4 sm:col-span-2 mb-3 flex flex-col"
                        >
                            Start Time
                            <input
                                name="startTime"
                                type="time"
                                onChange={(e) => {
                                    setStartTime(e.target.value);
                                }}
                            />
                        </label>
                        <input
                            type="submit"
                            className="text-sm sm:text-base row-end-auto col-start-3 col-span-4 sm:col-start-4 sm:col-span-2 p-3 bg-soft-red hover:bg-soft-red-dark cursor-pointer font-semibold text-white rounded-full"
                        />
                    </div>
                )}
            </form>
        </div>
    );
}
