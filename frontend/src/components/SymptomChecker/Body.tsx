import React from "react";
import { Link } from "react-router-dom";

function Body() {

    const steps = [
        "Select your symptoms",
        "For each symptom:",
        "Select the frequency of the symptom",
        "At the end:",
        "We will give you a ticket number to check your"
    ]

    return (
        <div className='container'>
            <p>Click here if you are looking for a result.</p>
            <p>Welcome to the symptom-checker, the usage of this app is simple:</p>
            <ul className='list-decimal list-outside'>
                {steps.map((step, index) => {
                    return (
                        <li style={{ display: "list-item" }} key={index}>{step}</li>
                    )
                })}
            </ul>
            <p>Ready?, click on the following button to start the process.</p>
            <Link to="/results">Results</Link> |{" "}
            <Link to="/symptoms">Start</Link>
        </div>
    );
}

export default Body;
