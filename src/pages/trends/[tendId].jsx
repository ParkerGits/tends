import ContentContainer from "../../components/ContentContainer";
import { getTendTrends, getAllTends } from "../../lib/db-admin";
import {
    LineChart,
    CartesianGrid,
    XAxis,
    YAxis,
    ReferenceLine,
    Line,
    ResponsiveContainer,
    Tooltip,
    Label,
    BarChart,
    Bar,
} from "recharts";
import { format } from "date-fns";
export async function getStaticProps(context) {
    const tendId = context.params.tendId;
    const trends = await getTendTrends(tendId);

    return {
        props: { initialTrends: trends },
        revalidate: 1
    };
}

export async function getStaticPaths() {
    const tends = await getAllTends();
    const paths = tends.map((tend) => ({
        params: {
            tendId: tend.id.toString(),
        },
    }));
    return {
        paths,
        fallback: false,
    };
}

const Trend = ({ initialTrends }) => {
    if (initialTrends.length < 2) {
        return (
            <ContentContainer>
                <h1 className="text-gray-700 mx-auto my-2 font-semibold">
                    Insufficient Data!
                </h1>
                <h2 className="text-gray-700 mx-auto my-2">Log at least 2 data points to see trends.</h2>
            </ContentContainer>
        );
    }
    
    if(initialTrends[0].tendType === "quantity") {
        const sortedTrends = initialTrends.sort((a, b) => {
            if (a.createdAt < b.createdAt) {
                return -1;
            }
            if (a.createdAt > b.createdAt) {
                return 1;
            }
            return 0;
        });
        const tendUnits = initialTrends ? initialTrends[0].tendUnits : null;
        const targetValue = initialTrends
            ? initialTrends[0].targetValue
            : null;
        return (
            <ContentContainer>
                <div className="border-b border-gray-300 p-5">
                    <h1 className="ml-3 font-semibold text-gray-700">
                        {initialTrends[0].tendTitle} Line Graph
                    </h1>
                </div>

                <hr className="text-gray-400" />
                <h2 className="mx-auto text-gray-700 mt-3">
                    {initialTrends[0].tendUnits} over Time
                </h2>
                <ResponsiveContainer
                    width="80%"
                    height="30%"
                    className="mx-auto my-4"
                >
                    <LineChart data={sortedTrends}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis
                            height={40}
                            dataKey="createdAt"
                            scale="time"
                            type="number"
                            domain={["auto", "auto"]}
                            tickFormatter={(unixTime) =>
                                format(new Date(unixTime), "P")
                            }
                        >
                            <Label position="insideBottom" offset={0}>
                                Date
                            </Label>
                        </XAxis>
                        <YAxis
                            dataKey="currentValue"
                            domain={[0, targetValue * 2]}
                            type="number"
                        >
                            <Label
                                position="insideLeft"
                                angle="-90"
                                offset={10}
                            >
                                {tendUnits}
                            </Label>
                        </YAxis>
                        <ReferenceLine
                            y={targetValue}
                            stroke="black"
                            strokeDasharray="3 3"
                        >
                            <Label
                                position="top"
                                offset={10}
                            >{`Target ${tendUnits}`}</Label>
                        </ReferenceLine>
                        <Line
                            dataKey="currentValue"
                            unit={tendUnits}
                            stroke="#CD3838"
                        />
                        <Tooltip
                            formatter={(value) => [`${value} `, `Recorded`]}
                            labelFormatter={(unixTime) =>
                                format(new Date(unixTime), "PPpp")
                            }
                        />
                    </LineChart>
                </ResponsiveContainer>
            </ContentContainer>
        );
    }
    else if(initialTrends[0].tendType === "timer"){
        const sortedTrends = initialTrends.sort((a, b) => {
            if (a.finishedAt < b.finishedAt) {
                return -1;
            }
            if (a.finishedAt > b.finishedAt) {
                return 1;
            }
            return 0;
        });
        const targetTime = initialTrends[0].targetTime;
        return (
            <ContentContainer>
                <div className="border-b border-gray-300 p-5">
                    <h1 className="ml-3 font-semibold text-gray-700">
                        {initialTrends[0].tendTitle} Line Graph
                    </h1>
                </div>

                <hr className="text-gray-400" />
                <h2 className="mx-auto text-gray-700 mt-3">
                    Elapsed Time by Date Started
                </h2>
                <ResponsiveContainer
                    width="80%"
                    height="30%"
                    className="mx-auto my-4"
                >
                    <LineChart data={sortedTrends}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis
                            height={40}
                            dataKey="startedAt"
                            scale="time"
                            type="number"
                            domain={["auto", "auto"]}
                            tickFormatter={(unixTime) =>
                                format(new Date(unixTime), "P")
                            }
                        >
                            <Label position="insideBottom" offset={0}>
                                Date
                            </Label>
                        </XAxis>
                        <YAxis
                            dataKey="elapsedTime"
                            domain={[0, targetTime * 2]}
                            type="number"
                        >
                            <Label
                                position="insideLeft"
                                angle="-90"
                                offset={10}
                            >
                                Elapsed Time
                            </Label>
                        </YAxis>
                        <ReferenceLine
                            y={targetTime}
                            stroke="black"
                            strokeDasharray="3 3"
                        >
                            <Label position="top" offset={10}>
                                Target Time
                            </Label>
                        </ReferenceLine>
                        <Line
                            dataKey="elapsedTime"
                            stroke="#CD3838"
                        />
                        <Tooltip
                            formatter={(value) => {
                                const elapsed = new Date(value);
                                const elapsedHours = elapsed.getUTCHours()
                                ? `${elapsed.getUTCHours()} hour${
                                    elapsed.getUTCHours() > 1
                                          ? "s"
                                          : ""
                                  } `
                                : ""
                                const elapsedMinutes = elapsed.getUTCMinutes()
                                ? `${elapsed.getUTCMinutes()} minute${
                                    elapsed.getUTCMinutes() > 1
                                          ? "s"
                                          : ""
                                  }`
                                : ""
                                const elapsedSeconds = elapsed.getUTCSeconds()
                                ? `${elapsed.getUTCSeconds()} second${
                                    elapsed.getUTCSeconds() > 1
                                          ? "s"
                                          : ""
                                  }`
                                : ""
                                return [`${elapsedHours} ${elapsedMinutes} ${elapsedSeconds}`, `Elapsed`];
                            }}
                            labelFormatter={(unixTime) =>
                                format(new Date(unixTime), "PPpp")
                            }
                        />
                    </LineChart>
                </ResponsiveContainer>
            </ContentContainer>
        );
    }
};

export default Trend;
