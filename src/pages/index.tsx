import { useState, useContext } from "react";
import ContentContainer from "../components/ContentContainer";
import QuantityTend from "../components/QuantityTend";
import CreateTendButton from "../components/CreateTendButton";
import { useTendsContext } from "../components/TendsContext";
import { QuantityTendProps } from "../components/QuantityTend";
import { TimerTendProps } from "../components/TimerTend";

// Add timer tend support here

export default function Home() {
    const { tendsList, setTendsList } = useTendsContext();
    return (
        <ContentContainer>
            {tendsList.map((tend, i) => {
                console.log(typeof tend);
                return (
                    <QuantityTend
                        title={tend.title}
                        units={tend.units}
                        quantity={tend.quantity}
                        targetQuantity={tend.targetQuantity}
                        index={i}
                        key={i}
                    />
                );
            })}
            <CreateTendButton />
        </ContentContainer>
    );
}
