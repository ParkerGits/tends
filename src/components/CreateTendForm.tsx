import { FormEvent, useState } from "react";
import { useTendsContext } from "./TendsContext";
import { useRouter } from "next/router";

export default function CreateTendForm() {
    const { tendsList, setTendsList } = useTendsContext();

    const [title, setTitle] = useState("");
    const [type, setType] = useState("");
    const [units, setUnits] = useState<string | null>(null);
    const [quantity, setQuantity] = useState(0);
    const [targetQuantity, setTargetQuantity] = useState(0);
    const router = useRouter();

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        setTendsList!([
            ...tendsList,
            {
                title: title,
                units: units,
                quantity: quantity,
                targetQuantity: targetQuantity,
            },
        ]);
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
                    {/* <option value="timer">Timer</option> */}
                </select>
                <input
                    type="text"
                    name="units"
                    placeholder="Tend Units (i.e. calories, pages, etc.) "
                    className="col-span-8 sm:col-span-4 mb-3"
                    onChange={(e) => {
                        setUnits(e.target.value);
                    }}
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
                    className="text-sm sm:text-base row-start-6 col-start-4 col-span-2 p-3 bg-soft-red hover:bg-soft-red-dark cursor-pointer font-semibold text-white rounded-full"
                />
            </form>
        </div>
    );
}
