# symptom-checker-ex-backend

## Backend TODO
- [x] Create django-rest-framework app
- [x] Make models available in the admin panel
- [x] Parse XML and store data in static cache for now
- [x] Create endpoint for searching symptoms
- [x] Create endpoint for sending symptoms
- [x] Create endpoint for looking at results
- [ ] Investigate unit tests in django/python
- [ ] Use an actual database
- [ ] Dockerize environment (python, database)
- [ ] Deployment on a cloud provider (GCP for example)

## Improvements for future:
- [ ] Order the symptoms relevance or group them somehow so we can return a better filtered list and user is able to select from those
  - I am thinking on a frequency ratio on disorders could be a good helpful datum to categorize the symptoms
- [ ] A better filtering for symptoms
  - not just by name and just lowercase, being able to lookup by id, name, description (if any) would be great.

## Endpoints
This endpoint will be hit at the load of the UI to show what symptoms we are experiencing.

`POST /symptom-checker/symptom/search/`
```typescript
type SymptomSearchRequest = {
    "search": string
}

type SymptomSearchResponse = {
    "symptoms": SymptomData[]
}
```

We should gather all the symptom ids and submit all this info through this endpoint

`POST /symptom-checker/`

Request:
```typescript
type SymptomsCheckerRequest = {
    "symptoms": string[] 
}
```

Response:

`generate a result id for each symptom-check`

```typescript
type SymptomsCheckerResponse = {
    "result_id": number
}
```

This can return us a "Your data is being processed" and give an id to verify in the future.

`GET /symptom-checker/results/{id}`

```typescript
// response
type Response = {
  "id": int,
  // list of symptoms selected in the symtopm-checker
  "symptoms": string[],
  // nullable, only if status is true should be present
  // response will be sorted from the backend.
  "possible_disorders": [
    {
        "orpha_code": string
        "name": string,
        "symptoms": SymptomData[]
    }
  ]
}
```