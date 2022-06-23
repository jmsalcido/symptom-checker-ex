import { useEffect, useState } from "react"
import { getResult } from "../../../services/results"
import { StatusError } from "../../../types/errors"
import { Result, ResultResponse } from "../../../types/results"
import { SymptomData } from "../../../types/symptoms"
import ResultMatchView from "./ResultMatchView"

function NoResultsView(props: {
    show: boolean
}) {

    const element = props.show ? (
        <div className='not_found'>
            <div className="p-10 text-center">
                <h2 className="text-md font-bold">We were not able to find any result</h2>
                <p>You can always get to the symptom checker and try again.</p>
            </div>
        </div>
    ) : null

    return (<>{element}</>)
}

function ErrorView(props: {
    show: boolean
}) {

    const element = props.show ? (
        <div className='server_error'>
            <div className="p-10 text-center">
                <h2 className="text-md font-bold">There was an error while loading your results</h2>
                <p>Please contact me at: `jmsalcidoaguilar@gmail.com`</p>
            </div>
        </div>
    ) : null

    return (<>{element}</>)
}


function ResultDetailView(props: {
    result_id: string | undefined
}) {

    const [result, setResult] = useState<Result>()
    const [isError, setIsError] = useState(false)
    const [isNotFound, setIsNotFound] = useState(false)
    const [isResult, setIsResult] = useState(false)

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
                    if (error.statusCode === 404) {
                        setIsNotFound(true)
                    }
                } else {
                    setIsError(true)
                }
                console.log(error)
            })
    }, [])

    return (
        <div className="h-auto">
            {isResult ? <ResultMatchView result={result} /> : null}
            <NoResultsView show={isNotFound} />
            <ErrorView show={isError} />
        </div>
    )
}

export default ResultDetailView
