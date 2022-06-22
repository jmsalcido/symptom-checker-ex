import { getRequest } from "./api_client"

export const getResult = async (resultId: string | undefined) => {
    const path = `/symptom-checker/results/${resultId}`
    return getRequest(path)
}
