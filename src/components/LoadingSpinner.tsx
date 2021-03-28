/** @jsxImportSource @emotion/react */
import { jsx, css, keyframes } from "@emotion/react";

const spin = keyframes`
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;

export default function LoadingSpinner() {
    return (
        <div className="self-center mt-8">
            <div
                css={css`
                    border: 0.5rem solid #d1d5db;
                    border-top: 0.5rem solid #cd3838;
                    border-radius: 50%;
                    width: 4rem;
                    height: 4rem;
                    animation: spin 2s linear infinite;
                `}
            ></div>
        </div>
    );
}
