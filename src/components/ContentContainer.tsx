import Header from "./Header";

export default function ContentContainer({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="max-w-screen-lg m-auto lg:my-5 lg:shadow-2xl h-screen lg:h-tends-list flex flex-col bg-white overflow-auto">
            <Header />
            {children}
        </div>
    );
}
