import React from "react";

const getSymptomsData = () => {
    return {
        symptoms: [
            {
                id: 1,
                name: "X"
            },
            {
                id: 2,
                name: "Y"
            },
            {
                id: 3,
                name: "Z"
            },
            {
                id: 4,
                name: "A"
            },
            {
                id: 5,
                name: "B"
            },
            {
                id: 6,
                name: "C"
            },
            {
                id: 7,
                name: "D"
            },
        ]
    }
}

function SymptomsChecker() {

    // We need to fetch the symptoms from
    // GET /symptom-checker/symptoms
    const symptomsData = getSymptomsData()

    return (
        <div>
            <div className="m-10" />
            <div className="container mx-10">
                <h1>First of all we need to fetch data...</h1>
                <h1>Have you ever been diagnosed with one of the following?:</h1>
                {symptomsData.symptoms.map(symptomData => {
                    return (
                        <div>{symptomData.name}</div>
                    )
                })}
            </div>
            {/* container in white? */}
            <div className="m-10" />
        </div>
    );
}

export default SymptomsChecker;
