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

const doPostRequest = async (path: string, requestBody: object) => {
    const response = await fetch(`${apiUrl}${path}`, postRequestOptions(requestBody));
    const responseBody = await response.json()
    if (response.ok) {
        return responseBody;
    } else {
        throw Error(responseBody.error)
    }
}

export const sendSymptoms = async (requestBody: SymptomCheckerRequest) => {
    const path = `/symptom-checker/`
    return doPostRequest(path, requestBody)
}

export const searchSymptoms = async (query: string): Promise<SymptomSearchResponse> => {
    const path = `/symptom-checker/symptom/search/`

    const requestBody: SymptomSearchRequest = {
        search: query
    }

    return doPostRequest(path, requestBody)
}
