import {
    createContext,
    Dispatch,
    SetStateAction,
    useContext,
    useState,
} from "react";
import { QuantityTendProps } from "./QuantityTend";

type TendsContextType = {
    tendsList: QuantityTendProps[];
    setTendsList: Dispatch<SetStateAction<QuantityTendProps[]>> | undefined;
};

const TendsContext = createContext<TendsContextType>({
    tendsList: [],
    setTendsList: undefined,
});

export function AppWrapper({ children }: { children: React.ReactNode }) {
    const [tendsList, setTendsList] = useState<QuantityTendProps[]>([]);

    return (
        <TendsContext.Provider value={{ tendsList, setTendsList }}>
            {children}
        </TendsContext.Provider>
    );
}

export function useTendsContext() {
    return useContext(TendsContext);
}
