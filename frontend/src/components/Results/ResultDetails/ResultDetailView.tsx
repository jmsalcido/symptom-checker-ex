import { useEffect, useState } from "react"
import { getResult } from "../../../services/results"
import { Result, ResultResponse } from "../../../types/results"
import { SymptomData } from "../../../types/symptoms"
import ResultMatchView from "./ResultMatchView"

function ResultDetailView(props: {
    result_id: string | undefined
}) {

    const [result, setResult] = useState<Result>()

    useEffect(() => {
        getResult(props.result_id)
            .then((data: ResultResponse) => {
                console.log(data)
                const symptoms = new Map<string, SymptomData>()
                data.symptoms.forEach((obj: SymptomData) => (symptoms.set(obj.id, obj)))
                setResult({
                    result_id: data.result_id,
                    matching_disorders: data.matching_disorders,
                    symptoms: symptoms
                })
                return data
            })
            .catch((error) => {
                // TODO: show or hide sections depending on the errors.
                console.log(error)
            })
    }, [])

    return (
        <div>
            <ResultMatchView result={result}/>
            <div className="not_found">
                <div className="p-10 text-center">
                    <h2 className="text-md font-bold">We were not able to find any result</h2>
                    <p>You can always get to the symptom checker and try again.</p>
                </div>
            </div>
            <div className="error_loading">
                <div className="p-10 text-center">
                    <h2 className="text-md font-bold">There was an error while loading your results</h2>
                    <p>Please contact me at: `jmsalcidoaguilar@gmail.com`</p>
                </div>
            </div>
        </div>
    )
}

export default ResultDetailView
