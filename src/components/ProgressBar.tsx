import { jsx } from "@emotion/react";

type ProgressBarProps = {
    currentQuantity: number;
    targetQuantity: number;
};

export default function ProgressBar({
    targetQuantity,
    currentQuantity,
}: ProgressBarProps) {
    const BaseProgressBarStyle = {
        width: `${
            currentQuantity / targetQuantity < 1
                ? (currentQuantity / targetQuantity) * 100
                : 100
        }%`,
        transition: "width 1s",
    };
    const SecondProgressBarStyle = {
        width: `${
            currentQuantity / targetQuantity < 1
                ? 0
                : currentQuantity / targetQuantity < 2
                ? (currentQuantity / targetQuantity - 1) * 100
                : 100
        }%`,
        transition: "width 1s",
    };
    return (
        <div className="h-1/6 lg:h-1/5 bg-gray-300 ml-3 block rounded-r-full">
            {/* {console.log(currentQuantity, targetQuantity)} */}
            <div
                className="bg-soft-red h-full rounded-r-full"
                style={BaseProgressBarStyle}
            >
                <div
                    className="bg-soft-red-dark h-full rounded-r-full"
                    style={SecondProgressBarStyle}
                ></div>
            </div>
        </div>
    );
}
