import { SymptomCheckerRequest, SymptomSearchRequest, SymptomSearchResponse } from "../types/symptoms"

const apiUrl = process.env.REACT_APP_API_URL
    ? process.env.REACT_APP_API_URL : 'http://localhost:8000'

export const sendSymptoms = (request: SymptomCheckerRequest) => {

}

export const searchSymptoms = async (query: string) : Promise<SymptomSearchResponse> => {
    const path = `/symptom-checker/symptom/search/`

    const requestData : SymptomSearchRequest = {
        search: query
    }

    const options = {
        crossDomain:true,
        method: 'POST',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json;charset=UTF-8"
        },
        body: JSON.stringify(requestData)
    }

    return await fetch(`${apiUrl}${path}`, options)
        .then((response) => response.json())
        .then((data: any) => {
            return {
                symptoms: data.symptoms
            }
        })
}
