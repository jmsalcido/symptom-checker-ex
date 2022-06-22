import { useState } from "react"
import { Result } from "../../../types/results"
import MatchingDisorderView from "./MatchingDisorderView"

function ResultMatchView(props: {
    result: Result | undefined
}) {

    const [selectedDisorder, setSelectedDisorder] = useState<number | undefined>()

    const onClickSelectMatchingDisorder = (disorderId: number) => {
        setSelectedDisorder(disorderId)
    }

    const matchingDisorderViews = props.result?.matching_disorders.map((md, index) => (
        <MatchingDisorderView key={index}
            disorderIndex={index}
            matchingDisorder={md}
            onClickSelectMatchingDisorder={onClickSelectMatchingDisorder} />
    ))

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
                <div className="bg-bond text-black w-full flex flex-col">
                    <h1>Very Frequent</h1>
                </div>
                <div className="bg-pachyderm text-white w-full flex flex-col">
                    <h1>Frequent</h1>
                </div>
                <div className="bg-bond text-black w-full flex flex-col">
                    <h1>Ocassional</h1>
                </div>
                <div className="bg-pachyderm text-white w-full flex flex-col">
                    <h1>Very Rare</h1>
                </div>
                <div className="bg-bond text-black w-full flex flex-col">
                    <h1>Excluded</h1>
                </div>
            </div>
        </div>
    )
}

export default ResultMatchView