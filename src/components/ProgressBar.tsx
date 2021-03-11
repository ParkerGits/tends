import { jsx } from "@emotion/react";

type ProgressBarProps = {
    currentQuantity: number;
    targetQuantity: number;
};

export default function ProgressBar({
    targetQuantity,
    currentQuantity,
}: ProgressBarProps) {
    const ProgressBarStyle = {
        width: `${(currentQuantity / targetQuantity) * 100}%`,
        transition: "width 1s",
    };
    return (
        <div className="h-1/6 lg:h-1/5 bg-gray-300 ml-3 block rounded-r-full">
            {console.log(currentQuantity, targetQuantity)}
            <div
                className="bg-soft-red h-full rounded-r-full"
                style={ProgressBarStyle}
            ></div>
        </div>
    );
}
