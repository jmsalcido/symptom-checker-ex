import React from "react";
import GetResults from "../components/Home/GetResults";
import GetStarted from "../components/Home/GetStarted";

function Home() {
    return (
        <div>
            <div className="m-10"/>
            <GetStarted />
            <div className="m-10"/>
            <GetResults />
        </div>
    );
}

export default Home;
