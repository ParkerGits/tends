import ContentContainer from "../components/ContentContainer";
import QuantityTend from "../components/tend_types/QuantityTend";
import CreateTendButton from "../components/CreateTendButton";
import LoadingSpinner from "../components/LoadingSpinner";
import { QuantityTendProps } from "../components/tend_types/QuantityTend";
import TimerTend, { TimerTendProps } from "../components/tend_types/TimerTend";
import useSWR from "swr";
import fetcher from "../utils/fetcher";
import { useAuth } from "../lib/auth";
import SignIn from "../components/SignIn";
// Add timer tend support here

export default function Home() {
    const auth = useAuth();

    if (!auth.user) {
        return (
            <ContentContainer>
                <SignIn />
            </ContentContainer>
        );
    }
    const { data } = useSWR([`/api/tends`, auth.user.token], fetcher);
    if (!data) {
        return (
            <ContentContainer>
                <LoadingSpinner />
            </ContentContainer>
        );
    }
    if (!data.tends) {
        return (
            <ContentContainer>
                <CreateTendButton />
            </ContentContainer>
        );
    }
    return (
        <ContentContainer>
            {data.tends.map(
                (tend: QuantityTendProps | TimerTendProps, i: number) => {
                    switch (tend.type) {
                        case "quantity":
                            const quantityTend: QuantityTendProps = tend as QuantityTendProps;
                            return (
                                <QuantityTend
                                    key={quantityTend.id}
                                    {...quantityTend}
                                />
                            );
                        case "timer":
                            const timerTend: TimerTendProps = tend as TimerTendProps;

                            return (
                                <TimerTend key={timerTend.id} {...timerTend} />
                            );
                    }
                }
            )}
            <CreateTendButton />
        </ContentContainer>
    );
}
