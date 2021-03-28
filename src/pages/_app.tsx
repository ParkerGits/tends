import "../styles/globals.css";
import { AppProps } from "next/app";

import { AuthProvider } from "../lib/auth"

export default function MyApp({ Component, pageProps }: AppProps) {
    return (
        <AuthProvider>
                <Component {...pageProps} />
        </AuthProvider>
    );
}
