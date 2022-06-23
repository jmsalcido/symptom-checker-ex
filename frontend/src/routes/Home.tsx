import GetResults from "../components/Home/GetResults";
import GetStarted from "../components/Home/GetStarted";

function Home() {
    return (
        <div className="flex flex-col flex-grow">
            <GetStarted />
            <GetResults />
        </div>
    );
}

export default Home;
