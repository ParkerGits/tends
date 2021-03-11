import { useState, useContext } from "react";
import ContentContainer from "../components/ContentContainer";
import QuantityTend from "../components/QuantityTend";
import CreateTendButton from "../components/CreateTendButton";
import { useTendsContext } from "../components/TendsContext";
import { QuantityTendProps } from "../components/QuantityTend";
import TimerTend, { TimerTendProps } from "../components/TimerTend";

// Add timer tend support here

export default function Home() {
    const { tendsList, setTendsList } = useTendsContext();
    return (
        <ContentContainer>
            {tendsList.map((tend, i) => {
                switch (tend.type) {
                    case "quantity":
                        const quantityTend: QuantityTendProps = tend as QuantityTendProps;
                        return <QuantityTend {...quantityTend} />;
                    case "timer":
                        const timerTend: TimerTendProps = tend as TimerTendProps;
                        return <TimerTend {...timerTend} />;
                }
            })}
            <CreateTendButton />
        </ContentContainer>
    );
}
