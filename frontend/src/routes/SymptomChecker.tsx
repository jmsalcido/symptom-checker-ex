import React from "react";
import GetResults from "../components/SymptomChecker/GetResults";
import GetStarted from "../components/SymptomChecker/GetStarted";

function SymptomChecker() {
    return (
        <div>
            <div className="m-10"/>
            <GetStarted />
            <div className="m-10"/>
            <GetResults />
        </div>
    );
}

export default SymptomChecker;
