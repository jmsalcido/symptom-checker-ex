const API_URL = process.env.REACT_APP_API_URL
    ? process.env.REACT_APP_API_URL : 'http://localhost:8000'

const options = (method: string) => {
    return {
        crossDomain: true,
        method,
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json;charset=UTF-8"
        }
    }
}

const postRequestOptions = (body: Object) => {
    return {
        ... options('POST'),
        body: JSON.stringify(body)
    }
}


export const doPostRequest = async (path: string, requestBody: object) => {
    const response = await fetch(`${API_URL}${path}`, postRequestOptions(requestBody));
    const responseBody = await response.json()
    if (response.ok) {
        return responseBody;
    } else {
        throw Error(responseBody.error)
    }
}

export const getRequest = async (path: string) => {
    const response = await fetch(`${API_URL}${path}`, options('GET'))
    const responseBody = await response.json()
    if (response.ok) {
        return responseBody;
    } else {
        throw Error(responseBody.error)
    }
}