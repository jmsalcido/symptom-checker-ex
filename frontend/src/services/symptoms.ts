import { SymptomCheckerRequest, SymptomSearchRequest, SymptomSearchResponse } from "../types/symptoms"

const apiUrl = process.env.REACT_APP_API_URL
    ? process.env.REACT_APP_API_URL : 'http://localhost:8000'

const postRequestOptions = (body: Object) => {
    return {
        crossDomain: true,
        method: 'POST',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json;charset=UTF-8"
        },
        body: JSON.stringify(body)
    }
}

export const sendSymptoms = async (request: SymptomCheckerRequest) => {
    const path = `/symptom-checker/`
    const response = await fetch(`${apiUrl}${path}`, postRequestOptions(request));
    const body = await response.json()
    if (response.ok) {
        return body;
    } else {
        throw Error(body.error)
    }
}

export const searchSymptoms = async (query: string): Promise<SymptomSearchResponse> => {
    const path = `/symptom-checker/symptom/search/`

    const requestData: SymptomSearchRequest = {
        search: query
    }

    return await fetch(`${apiUrl}${path}`, postRequestOptions(requestData))
        .then((response) => response.json())
        .then((data: SymptomSearchResponse) => {
            return data
        })
}
