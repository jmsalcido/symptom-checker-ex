import { SymptomCheckerRequest, SymptomSearchRequest, SymptomSearchResponse } from "../types/symptoms"
import { doPostRequest } from "./api_client"

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
