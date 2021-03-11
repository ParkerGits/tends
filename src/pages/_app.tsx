import "../styles/globals.css";
import { AppProps } from "next/app";
import { AppWrapper } from "../components/TendsContext";

export default function MyApp({ Component, pageProps }: AppProps) {
    return (
        <AppWrapper>
            <Component {...pageProps} />
        </AppWrapper>
    );
}
