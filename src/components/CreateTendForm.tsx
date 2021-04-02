import { FormEvent, useState } from "react";
import { useRouter } from "next/router";
import { QuantityTendProps } from "./tend_types/QuantityTend";
import { TimerTendProps } from "./tend_types/TimerTend";
import { createTend } from "../lib/db";
import { useAuth } from "../lib/auth";
import { mutate } from "swr";
import SignIn from "./SignIn";

// IF EITHER START DATE OR START TIME, OTHER IS REQUIRED

export default function CreateTendForm() {
    // Bring in user information
    const auth = useAuth();
    if (!auth.user) {
        return <SignIn />;
    }

    const authorId = auth.user.uid;
    const userTendsAPI = `/api/tends`;

    // General Tend Props
    const [title, setTitle] = useState("");
    const [type, setType] = useState("");

    // Quantity Tend Props
    const [units, setUnits] = useState<string>("");
    const [quantity, setQuantity] = useState(0);
    const [targetQuantity, setTargetQuantity] = useState(0);
    const router = useRouter();

    // Timer Tend Props
    const [targetHours, setTargetHours] = useState<string>();
    const [targetMinutes, setTargetMinutes] = useState<string>();

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        let newTend: QuantityTendProps | TimerTendProps;
        switch (type) {
            case "quantity":
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
                const targetHoursInt = targetHours ? parseInt(targetHours) : 0;
                const targetMinutesInt = targetMinutes
                    ? parseInt(targetMinutes)
                    : 0;
                const timerTend: TimerTendProps = {
                    title: title,
                    targetTime:
                        targetHoursInt * 3600000 + targetMinutesInt * 60000,
                    type: type,
                    isRunning: false,
                    beginTime: null,
                    endTime: null,
                };
                newTend = timerTend;
                break;
        }

        // Store tend to database with information provided, as well as user's ID and the the current time.
        const newTendData = {
            authorId: authorId,
            createdAt: new Date().toISOString(),
            ...newTend!,
        };
        const { id } = createTend(newTendData);

        mutate(
            [userTendsAPI, auth.user.token],
            async (data: any) => {
                return { tends: [{ id, ...newTendData }, ...data.tends] };
            },
            false
        );

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
                        <input
                            name="targetHours"
                            type="number"
                            placeholder="Target Hours"
                            className="p-2.5 col-span-4 mb-3"
                            onChange={(e) => {
                                setTargetHours(e.target.value);
                            }}
                            required
                        />

                        <input
                            name="targetMinutes"
                            type="number"
                            placeholder="Target Minutes"
                            className="p-2.5 col-span-4 mb-3"
                            onChange={(e) => {
                                setTargetMinutes(e.target.value);
                            }}
                            required
                        />

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
