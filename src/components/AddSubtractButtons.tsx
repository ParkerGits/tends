import { ChangeEvent, FormEvent } from "react";
import { faMinusCircle, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type AddSubtractButtonsProps = {
    handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
    handleAddClick: () => void;
    handleSubtractClick: () => void;
    handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
    targetQuantity: number;
    currentQuantity: number;
    changeAmount: number;
    isAddingCurrent: boolean;
    isSubtractingCurrent: boolean;
};

export default function AddSubtractButtons({
    handleChange,
    handleAddClick,
    handleSubtractClick,
    handleSubmit,
    targetQuantity,
    currentQuantity,
    changeAmount,
    isAddingCurrent,
    isSubtractingCurrent,
}: AddSubtractButtonsProps) {
    return (
        <div>
            {isAddingCurrent || isSubtractingCurrent ? (
                <form
                    className="flex flex-row items-center"
                    onSubmit={(event) => handleSubmit(event)}
                >
                    <input
                        type="number"
                        min="0"
                        max={`${
                            isAddingCurrent
                                ? targetQuantity - currentQuantity
                                : currentQuantity
                        }`}
                        value={changeAmount}
                        className=""
                        onChange={(e) => handleChange(e)}
                        autoFocus
                    />
                    <button
                        type="submit"
                        className="table-cell align-middle focus:outline-none leading-none"
                    >
                        {isAddingCurrent ? (
                            <FontAwesomeIcon
                                icon={faPlusCircle}
                                className="text-2xl text-soft-red cursor-pointer hover:text-soft-red-dark"
                            />
                        ) : (
                            <FontAwesomeIcon
                                icon={faMinusCircle}
                                className="text-2xl text-soft-red cursor-pointer hover:text-soft-red-dark"
                            />
                        )}
                    </button>
                </form>
            ) : (
                <div className="leading-none">
                    <FontAwesomeIcon
                        icon={faPlusCircle}
                        className="mx-2 text-2xl text-soft-red cursor-pointer hover:text-soft-red-dark"
                        onClick={handleAddClick}
                    />
                    <FontAwesomeIcon
                        icon={faMinusCircle}
                        className="text-2xl text-soft-red cursor-pointer hover:text-soft-red-dark"
                        onClick={handleSubtractClick}
                    />
                </div>
            )}
        </div>
    );
}
