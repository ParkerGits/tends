import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faPlayCircle,
    faPauseCircle,
    faStopCircle,
} from "@fortawesome/free-solid-svg-icons";

type StartStopButtonsProps = {
    isTiming: boolean;
    onClick: () => void;
};

export default function StartStopButtons({
    isTiming,
    onClick,
}: StartStopButtonsProps) {
    return (
        <div>
            <div className="leading-none">
                {isTiming ? (
                    <FontAwesomeIcon
                        icon={faStopCircle}
                        className="text-2xl text-soft-red cursor-pointer hover:text-soft-red-dark"
                        onClick={() => {
                            onClick();
                        }}
                    />
                ) : (
                    <FontAwesomeIcon
                        icon={faPlayCircle}
                        className="text-2xl text-soft-red cursor-pointer hover:text-soft-red-dark"
                        onClick={() => {
                            onClick();
                        }}
                    />
                )}
            </div>
        </div>
    );
}
