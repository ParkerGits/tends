const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
    purge: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            colors: {
                "soft-red": {
                    DEFAULT: "#CD3838",
                    dark: "#872424",
                },
            },
            screens: {
                xs: "475px",
                ...defaultTheme.screens,
            },
            height: {
                "tends-list": "94vh",
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [require("tailwind-scrollbar")],
};
