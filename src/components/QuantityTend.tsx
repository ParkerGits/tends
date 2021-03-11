import { useState, ChangeEvent, FormEvent } from "react";
import ProgressBar from "./ProgressBar";
import AddSubtractButtons from "./AddSubtractButtons";
import TendSideButtons from "./TendSideButtons";
import { useTendsContext } from "./TendsContext";

export type QuantityTendProps = {
    title: string;
    quantity: number;
    targetQuantity: number;
    units: string;
    index?: number;
    type?: string;
};

// currentQuantity

export default function QuantityTend({
    title,
    quantity,
    targetQuantity,
    units,
    index,
}: QuantityTendProps) {
    const { tendsList, setTendsList } = useTendsContext();
    const [changeAmount, setChangeAmount] = useState(0);
    const [isAddingCurrent, setIsAddingCurrent] = useState(false);
    const [isSubtractingCurrent, setIsSubtractingCurrent] = useState(false);
    const addSubtractOnChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setChangeAmount(parseInt(e.target.value));
    };
    const addSubtractOnSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
        let items = [...tendsList];
        const item: QuantityTendProps = {
            ...items[index!],
        } as QuantityTendProps;
        isAddingCurrent
            ? (item.quantity = item.quantity + changeAmount)
            : (item.quantity = item.quantity - changeAmount);
        items[index!] = item;
        setTendsList!(items);
        isAddingCurrent
            ? setIsAddingCurrent(false)
            : setIsSubtractingCurrent(false);
        setChangeAmount(0);
        e.preventDefault;
    };
    const addOnClickHandler = () => {
        setIsAddingCurrent(true);
    };
    const subtractOnClickHandler = () => {
        setIsSubtractingCurrent(true);
    };
    return (
        <div className="h-40 border-b-2 border-gray-300 grid grid-cols-11">
            <div className="col-span-8 flex flex-col justify-evenly">
                <div className="flex items-center justify-between">
                    <h2 className="text-gray-700 ml-4 my-2 font-semibold">
                        {title}
                    </h2>
                    <AddSubtractButtons
                        handleChange={addSubtractOnChangeHandler}
                        handleAddClick={addOnClickHandler}
                        handleSubtractClick={subtractOnClickHandler}
                        handleSubmit={addSubtractOnSubmitHandler}
                        currentQuantity={quantity}
                        targetQuantity={targetQuantity}
                        changeAmount={changeAmount}
                        isAddingCurrent={isAddingCurrent}
                        isSubtractingCurrent={isSubtractingCurrent}
                    />
                </div>
                <ProgressBar
                    currentQuantity={quantity}
                    targetQuantity={targetQuantity}
                />
                <div className="flex flex-row justify-evenly ml-3 mb-2">
                    <div className="flex flex-col">
                        <h3 className="text-gray-400 text-center tracking-wider">
                            CURRENT
                        </h3>
                        <h4 className="text-center">
                            {quantity} {units}
                        </h4>
                    </div>
                    <div className="flex flex-col">
                        <h3 className="text-gray-400 text-center tracking-wider">
                            TARGET
                        </h3>
                        <h4 className="text-center ">
                            {targetQuantity}
                            {units ? " " + units : null}
                        </h4>
                    </div>
                </div>
            </div>
            <TendSideButtons />
        </div>
    );
}
