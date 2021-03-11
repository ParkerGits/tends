import { createContext, useContext, useState } from "react";
import { QuantityTendProps } from "./QuantityTend";
import { TimerTendProps } from "./TimerTend";

type TendsContextType = {
    tendsList: Array<QuantityTendProps | TimerTendProps>;
    setTendsList: any;
};

const TendsContext = createContext<TendsContextType>({
    tendsList: [],
    setTendsList: undefined,
});

export function AppWrapper({ children }: { children: React.ReactNode }) {
    const [tendsList, setTendsList] = useState<
        Array<QuantityTendProps | TimerTendProps>
    >([]);

    return (
        <TendsContext.Provider value={{ tendsList, setTendsList }}>
            {children}
        </TendsContext.Provider>
    );
}

export function useTendsContext() {
    return useContext(TendsContext);
}
