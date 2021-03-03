import "../styles/globals.css";
import { AppProps } from "next/app";
import { AppWrapper } from "../components/TendsContext";
import { useState } from "react";
import { QuantityTendProps } from "../components/QuantityTend";

export default function MyApp({ Component, pageProps }: AppProps) {
    return (
        <AppWrapper>
            <Component {...pageProps} />
        </AppWrapper>
    );
}
