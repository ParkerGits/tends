import { createContext, useContext, useState } from "react";
import useSWR from "swr";
import { useAuth } from "../lib/auth";
import fetcher from "../utils/fetcher";
import { QuantityTendProps } from "./tend_types/QuantityTend";
import { TimerTendProps } from "./tend_types/TimerTend";

type TendsContextType = {
    tends: Array<QuantityTendProps | TimerTendProps>;
    setTends: any;
};

const TendsContext = createContext<TendsContextType>({
    tends: [],
    setTends: undefined,
});

export function AppWrapper({ children }: { children: React.ReactNode }) {
    const user = useAuth();
    const { data } = useSWR([`/api/tends`, user.token], fetcher);
    const [tends, setTends] = useState<
        Array<QuantityTendProps | TimerTendProps>
    >(data ? data.tends : null);

    return (
        <TendsContext.Provider value={{ tends, setTends }}>
            {children}
        </TendsContext.Provider>
    );
}

export function useTendsContext() {
    return useContext(TendsContext);
}
