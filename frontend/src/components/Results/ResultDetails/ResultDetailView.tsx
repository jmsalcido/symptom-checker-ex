import { useEffect, useState } from "react"
import { getResult } from "../../../services/results"
import { StatusError } from "../../../types/errors"
import { Result, ResultResponse } from "../../../types/results"
import { SymptomData } from "../../../types/symptoms"
import ResultMatchView from "./ResultMatchView"

function ResultDetailView(props: {
    result_id: string | undefined
}) {

    const [result, setResult] = useState<Result>()
    const [isError, setIsError] = useState(false)
    const [isNotFound, setIsNotFound] = useState(false)
    const [isResult, setIsResult] = useState(false)

    const showNotFound = isNotFound == false ? 'hidden' : ''
    const showError = isError == false ? 'hidden' : ''

    useEffect(() => {
        getResult(props.result_id)
            .then((data: ResultResponse) => {
                console.log(data)
                const symptoms = new Map<string, SymptomData>()
                data.symptoms.forEach((obj: SymptomData) => (symptoms.set(obj.id, obj)))

                setIsResult(true)
                setIsError(false)
                setIsNotFound(false)

                setResult({
                    result_id: data.result_id,
                    matching_disorders: data.matching_disorders,
                    symptoms: symptoms
                })
                return data
            })
            .catch((error) => {
                setIsResult(false)
                if (error instanceof StatusError) {
                    if (error.statusCode == 404) {
                        setIsNotFound(true)
                    }
                } else {
                    setIsError(true)
                }
                console.log(error)
            })
    }, [])

    return (
        <div>
            {isResult ? <ResultMatchView result={result}/> : null}
            <div className={`not_found ${showNotFound}`}>
                <div className="p-10 text-center">
                    <h2 className="text-md font-bold">We were not able to find any result</h2>
                    <p>You can always get to the symptom checker and try again.</p>
                </div>
            </div>
            <div className={`server_error ${showError}`}>
                <div className="p-10 text-center">
                    <h2 className="text-md font-bold">There was an error while loading your results</h2>
                    <p>Please contact me at: `jmsalcidoaguilar@gmail.com`</p>
                </div>
            </div>
        </div>
    )
}

export default ResultDetailView
