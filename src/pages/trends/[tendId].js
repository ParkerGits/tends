import ContentContainer from "../../components/ContentContainer";
import { getTendTrends, getAllTends } from "../../lib/db-admin";

export async function getStaticProps(context) {
    const tendId = context.params.tendId;
    const trends = await getTendTrends(tendId);
    return {
        props: { initialTrends: trends },
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
    return (
        <ContentContainer>
            <h1>Hello world</h1>
            {initialTrends.map((trend) => (
                <h1>{trend.tendTitle}</h1>
            ))}
        </ContentContainer>
    );
};

export default Trend;
