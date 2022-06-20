import React from "react";
import GetResults from "../components/Home/GetResults";
import GetStarted from "../components/Home/GetStarted";

function Home() {
    return (
        <div className="bg-pachyderm h-full">
            <GetStarted />
            <GetResults />
        </div>
    );
}

export default Home;
