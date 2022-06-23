import { useState } from "react"
import { MatchingDisorder, Result } from "../../../types/results"
import MatchingDisorderView from "./MatchingDisorderView"
import SymptomFrequencyView from "./SymptomFrequencyView"


function SymptomFrequency(props: {
    title: string,
    disorder_symptoms: string[] | undefined,
    getSymptomName: Function
}) {
    const shouldRender = props.disorder_symptoms ? props.disorder_symptoms.length > 0 : false
    const element = shouldRender ?
        (
            <div className="w-full flex flex-col mb-10">
                <SymptomFrequencyView title={props.title}
                    symptoms={props.disorder_symptoms}
                    getSymptomName={props.getSymptomName} />
            </div>
        )
        : null

    return (<>{element}</>)
}


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
        <div className="result_matches mb-20">
            <div className="p-10 text-center">
                <h2 className="text-md font-bold">The following list of disorders was found for matching the symptoms that you were able to send:</h2>
                <h2 className="text-md">Click on any of them to find out more about each disorder.</h2>
            </div>
            <div className="bg-white w-full flex flex-row flex-wrap justify-center">
                {matchingDisorderViews}
            </div>
            <div className={`${hideSymptoms} my-10`}>
                <div className="flex flex-col">
                    <h1 className="text-2xl text-center">To learn more about the disorder click<span> </span>
                        <a target={'_blank'}
                            rel="noreferrer"
                            href={`https://www.orpha.net/consor/cgi-bin/OC_Exp.php?lng=en&Expert=${selectedDisorder?.disorder.orpha_code}`}>
                            here
                        </a>
                    </h1>
                    <h2 className="text-2xl text-center font-semibold p-4">The frequencies of the symptoms on this disorder is as follows:</h2>
                    <p className="mx-auto mb-10">You can click on each of those and you will be able to learn more about each of them.</p>
                </div>
                <SymptomFrequency title="Very Frequent"
                    disorder_symptoms={selectedDisorder?.very_frequent_symptoms}
                    getSymptomName={getSymptomName} />
                <SymptomFrequency title="Frequent"
                    disorder_symptoms={selectedDisorder?.frequent_symptoms}
                    getSymptomName={getSymptomName} />
                <SymptomFrequency title="Occasional"
                    disorder_symptoms={selectedDisorder?.occasional_symptoms}
                    getSymptomName={getSymptomName} />
                <SymptomFrequency title="Very Rare"
                    disorder_symptoms={selectedDisorder?.very_rare_symptoms}
                    getSymptomName={getSymptomName} />
                <SymptomFrequency title="Excluded"
                    disorder_symptoms={selectedDisorder?.excluded_symptoms}
                    getSymptomName={getSymptomName} />
            </div>
        </div>
    )
}

export default ResultMatchView