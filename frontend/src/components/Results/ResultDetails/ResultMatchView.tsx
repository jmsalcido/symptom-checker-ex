import { useState } from "react"
import { MatchingDisorder, Result } from "../../../types/results"
import MatchingDisorderView from "./MatchingDisorderView"
import SymptomFrequencyView from "./SymptomFrequencyView"

function ResultMatchView(props: {
    result: Result | undefined
}) {

    const [selectedDisorder, setSelectedDisorder] = useState<MatchingDisorder | undefined>()

    const onClickSelectMatchingDisorder = (disorderIndex: number) => {
        setSelectedDisorder(props.result?.matching_disorders[disorderIndex])
    }

    const matchingDisorderViews = props.result?.matching_disorders.map((md, index) => (
        <MatchingDisorderView key={index}
            disorderIndex={index}
            matchingDisorder={md}
            selected={md === selectedDisorder}
            onClickSelectMatchingDisorder={onClickSelectMatchingDisorder} />
    ))

    const getSymptomName = (symptomId: string) => {
        return props.result?.symptoms.get(symptomId)
    }

    const hideSymptoms = selectedDisorder !== undefined ? '' : 'hidden'

    return (
        <div className="result_matches">
            <div className="p-10 text-center">
                <h2 className="text-md font-bold">The following list of disorders was found for matching the symptoms that you were able to send:</h2>
            </div>
            <div className="bg-white w-full flex flex-row flex-wrap justify-center">
                {matchingDisorderViews}
            </div>
            <div className={`${hideSymptoms} my-10`}>
                <div className="flex flex-col">
                    <h2 className="text-2xl text-center font-semibold p-4">The frequencies of the symptoms on this disorder is as follows:</h2>
                    <p className="mx-auto mb-10">You can click on each of those and you will be able to learn more about each of them.</p>
                </div>
                <div className="w-full flex flex-col mb-10">
                    <SymptomFrequencyView title="Very Frequent"
                        symptoms={selectedDisorder?.very_frequent_symptoms}
                        getSymptomName={getSymptomName} />
                </div>
                <div className="w-full flex flex-col mb-10">
                    <SymptomFrequencyView title="Frequent"
                        symptoms={selectedDisorder?.frequent_symptoms}
                        getSymptomName={getSymptomName} />
                </div>
                <div className="bg-bond text-black w-full flex flex-col mb-10">
                    <SymptomFrequencyView title="Occasional"
                        symptoms={selectedDisorder?.occasional_symptoms}
                        getSymptomName={getSymptomName} />
                </div>
                <div className="bg-pachyderm text-white w-full flex flex-col mb-10">
                    <SymptomFrequencyView title="Very Rare"
                        symptoms={selectedDisorder?.very_rare_symptoms}
                        getSymptomName={getSymptomName} />
                </div>
                <div className="bg-bond text-black w-full flex flex-col mb-10">
                    <SymptomFrequencyView title="Excluded"
                        symptoms={selectedDisorder?.excluded_symptoms}
                        getSymptomName={getSymptomName} />
                </div>
            </div>
        </div>
    )
}

export default ResultMatchView