# symptom-checker-ex-backend

## Backend TODO

- [x] Create django-rest-framework app
- [x] Make models available in the admin panel
- [x] Parse XML and store data in static cache for now
- [x] Create endpoint for searching symptoms
- [x] Create endpoint for sending symptoms
- [x] Create endpoint for looking at results
- [x] Dockerize environment - `docker-compose up`

### Things that I would love to try

> I will use this project for testing other things, tbh I enjoyed this exersice a lot.

- [ ] Investigate unit tests in django/python
    - I tested mostly of this running and debugging with `ipdb`, I need to work on my unit test game.
- [ ] Use an actual database
    - I started using the ORM from django but I dont remember at which point I moved to the cache and just moved on from
      that.
    - I think we can load the data from Orphadata easily in relationships something
      like: https://dbdiagram.io/d/62aa81779921fe2a9616aa60
- [ ] Deployment on a cloud provider (GCP)
    - I was thinking on adding GCP as I want to try uploading a docker image to the registry and all the tooling from
      GCP.
- [ ] Store your results into a user (levare on django users model too)
    - What if I want to make a diagnostic check for my son, my mother or other relevant family member.
- [ ] Auth for API users (https://django-rest-framework-simplejwt.readthedocs.io/)

### Improvements for future:

- [ ] Get away from the cache use as a database ASAP
- [ ] Order the symptoms relevance or group them somehow so we can return a better filtered list and user is able to
  select from those
    - I am thinking on a frequency ratio on disorders could be a good helpful datum to categorize the symptoms
- [ ] A better filtering for symptoms
    - not just by name and just lowercase, being able to lookup by id, name, description (if any) would be great.

## How to run:

### Docker & docker-compose

There are 2 Dockerfile in `./` and `./frontend`, it's easier to just use `docker-compose`

```shell
docker-compose up
```

### Local environment

- Create a new virtual env
- Install `requirements.txt`
- run `python manage.py runserver`
- for `frontend` see `./frontend/README.md`


## Project Structure

```
├── README.md
├── manage.py
├── symptom_checker
│   ├── __init__.py
│   ├── admin.py
│   ├── apps.py
│   ├── migrations
│   │   └── __init__.py
│   ├── models.py
│   ├── serializers.py
│   ├── services.py
│   ├── tests.py
│   ├── urls.py
│   └── views.py
└── symptom_checker_ex
    ├── __init__.py
    ├── asgi.py
    ├── settings.py
    ├── urls.py
    └── wsgi.py
```

I created a python django project named `symptom_checker_ex`, the folder: `frontend` is exclusive for a create-react-app
that
is an SPA that communicated with the python app with http.

### symptom_checker

This django app contains the logic for all the urls based on `symptom-checker/*`.

- No database right now since data is a 66mb file in pure XML.
- Doing the search in memory is a naive approach for searching right now.
- Doing a match of disorders by symptoms is done via checking the entire disorder catalog and checking if the symptom
  ids sent are included in the symptom-frequency relationship.

#### Endpoints

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