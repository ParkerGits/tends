import { useState, ChangeEvent, FormEvent } from "react";
import ProgressBar from "../ProgressBar";
import AddSubtractButtons from "../AddSubtractButtons";
import TendSideButtons from "../TendSideButtons";
import { updateTendQuantity } from "../../lib/db";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRedoAlt } from "@fortawesome/free-solid-svg-icons";
import { createTrend } from "../../lib/db";
import { useAuth } from "../../lib/auth";
export type QuantityTendProps = {
    title: string;
    quantity: number;
    targetQuantity: number;
    units: string;
    id?: string;
    index?: number;
    type?: string;
};

// currentQuantity

export default function QuantityTend({
    title,
    quantity,
    targetQuantity,
    units,
    id,
}: QuantityTendProps) {
    const auth = useAuth();
    const [currentQuantity, setCurrentQuantity] = useState(quantity);
    const [changeAmount, setChangeAmount] = useState(0);
    const [isAddingCurrent, setIsAddingCurrent] = useState(false);
    const [isSubtractingCurrent, setIsSubtractingCurrent] = useState(false);
    const addSubtractOnChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setChangeAmount(parseInt(e.target.value));
    };
    const addSubtractOnSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
        isAddingCurrent
            ? setIsAddingCurrent(false)
            : setIsSubtractingCurrent(false);

        const newQuantity = isAddingCurrent
            ? currentQuantity + changeAmount
            : currentQuantity - changeAmount;
        setCurrentQuantity(newQuantity);
        updateTendQuantity(id, newQuantity);
        setChangeAmount(0);
        e.preventDefault();
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
                    <div className="flex flex-row">
                        <AddSubtractButtons
                            handleChange={addSubtractOnChangeHandler}
                            handleAddClick={addOnClickHandler}
                            handleSubtractClick={subtractOnClickHandler}
                            handleSubmit={addSubtractOnSubmitHandler}
                            currentQuantity={currentQuantity}
                            targetQuantity={targetQuantity}
                            changeAmount={changeAmount}
                            isAddingCurrent={isAddingCurrent}
                            isSubtractingCurrent={isSubtractingCurrent}
                        />
                        {/* Change to be automatic later! : */}
                        {isAddingCurrent || isSubtractingCurrent ? null : (
                            <FontAwesomeIcon
                                className="mx-2 text-2xl text-soft-red cursor-pointer hover:text-soft-red-dark"
                                icon={faRedoAlt}
                                onClick={() => {
                                    const newQuantityTrend = {
                                        tendId: id,
                                        currentValue: currentQuantity,
                                        targetValue: targetQuantity,
                                        tendTitle: title,
                                        tendUnits: units,
                                        tendType: "quantity",
                                        createdAt: new Date().getTime(),
                                        author: auth.user.name,
                                        authorId: auth.user.uid,
                                    };
                                    createTrend(newQuantityTrend);
                                    setCurrentQuantity(0);
                                    updateTendQuantity(id, 0);
                                }}
                            />
                        )}
                    </div>
                </div>
                <ProgressBar
                    currentQuantity={currentQuantity}
                    targetQuantity={targetQuantity}
                />
                <div className="flex flex-row justify-evenly ml-3 mb-2">
                    <div className="flex flex-col">
                        <h3 className="text-gray-400 text-center tracking-wider">
                            CURRENT
                        </h3>
                        <h4 className="text-center">
                            {currentQuantity} {units}
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
            <TendSideButtons tendId={id!} />
        </div>
    );
}
