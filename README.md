# symptom-checker-ex-backend

## Backend TODO
- [x] Create django-rest-framework app
- [x] Make models available in the admin panel
- [x] Create endpoint to retrieve symptoms for questionnaire
- [ ] Create endpoint for sending user symptoms
- [ ] Create endpoint for checking results

## Backend EXTRA & EXTRA-EXTRA POINTS tasks
- [ ] Parse XML task (load task)
- [ ] Deployment on simple cloud provider like Heroku


### Parse XML task "ETL":
- [ ] Create django manage.py task
- [ ] Add disease if not exists
- [ ] Add symptom if not exists
- [ ] Add frequency if not exists
- [ ] Add symptom-frequency if not exists
    - Very frequent
    - Frequent
    - Occasional
    - Excluded (0%)

## Model:
**Based on this db diagram:**
https://dbdiagram.io/d/62aa81779921fe2a9616aa60

**Based on the ORPHDATA relationship**
http://www.orphadata.org/data/xml/en_product4.xml

### Explanation:

- Disease
  - name
- Symptom
  - name
    - name of the symptom
- Frequency
  - name
    - This represents the possible answers that we want from the user
      - Very frequent
      - Frequent
      - Occasional
      - Excluded (0%)
  - weight
    - the weight that will be used to weight the responses from the symptom-checker

#### Many-to-Many relationships:
- Disease to Symptom
- Disease to Symptom and Frequency (for comparison)

## How to retrieve relevant conditions
> Write a function which accepts a list of symptoms (HPO IDs) as input and returns an ordered list of the most relevant rare conditions

The idea is to receive from the frontend app the symptom and the frequency.

Using the `disease_symptom` relationship we will look up for the diseases:

### Dataset example in the database:

`disease` table

| id  | name | orpha_code |
|-----|------|------------|
| 1   | A    | 1          |
| 2   | B    | 2          |
| 3   | C    | 3          |

`symptom` table

| id  | name | hpo_id |
|-----|------|--------|
| 1   | X    | HP:001 |
| 2   | Y    | HP:002 |
| 3   | Z    | HP:003 |
| 4   | U    | HP:004 |
| 5   | V    | HP:005 |

`frequency` table

| id  | name          | weight | low_range | high_range |
|-----|---------------|--------|-----------|------------|
| 1   | Very Frequent | 3      | 80        | 99         | 
| 2   | Frequent      | 2      | 30        | 79         |
| 3   | Occasional    | 1      | 5         | 29         |
| 4   | Excluded      | 0      | 0         | 0          |

`disease_symptom_frequency` table or view

| id  | disease_id | symptom_id | frequency_id |
|-----|------------|------------|--------------|
| 1   | 1          | 1          | 1            |
| 2   | 1          | 2          | 3            |
| 3   | 1          | 3          | 3            |
| 4   | 2          | 1          | 1            |
| 5   | 2          | 2          | 4            |
| 6   | 2          | 3          | 3            |
| 7   | 3          | 4          | 1            |
| 8   | 3          | 5          | 2            |

#### Algorithm:
1. Load Disease Symptom Frequency based on the included symptom frequency (user_input)
2. Sum the frequency weights
3. Order by weights

#### Database only queries

If a user input looked like this:

| symptom_name | frequency_name |
|--------------|----------------|
| X            | Very Frequent  |
| Y            | Excluded       |
| Z            | Occasional     |
| W            | Excluded       |
| K            | Excluded       |

We would look into the `disease_symptom` table where symptoms include:
`[X,Y,Z]`, in this case, `Excluded` is not relevant but the others are relevant:

We would look into the `disease_symptom` table for:
Diseases that contains the non-excluded symptoms:

The query to obtain the possible diseases would be:

I include `user_input` as a `CTE` used by both queries since in theory we will receive that in the request from our endpoint.

```sql
WITH user_input AS (
     SELECT * FROM
        ( VALUES
              ('X', 'Very Frequent'),
              ('Y', 'Excluded'),
              ('Z','Occasional'),
              ('W', 'Excluded'),
              ('K','Excluded')
          ) AS temp(symptom_name, frequency_name)
)
SELECT DISTINCT D.name FROM diseases D
    INNER JOIN disease_symptom_frequency DS ON D.id = DS.disease_id
    INNER JOIN frequency F on DS.frequency_id = F.id
    INNER JOIN symptom S on DS.symptom_id = S.id
    INNER JOIN user_input on S.name = user_input.symptom_name AND F.name = user_input.frequency_name;
```

Now, in order to check for the possible diseases and order them, we need to go through each symptom and frequency from the user:

`possible_diseases` is a `CTE` in order to get first the possible diseases.

```sql
WITH user_input AS (
     SELECT * FROM
        ( VALUES
              ('X', 'Very Frequent'),
              ('Y', 'Excluded'),
              ('Z','Occasional'),
              ('W', 'Excluded'),
              ('K','Excluded')
          ) AS temp(symptom_name, frequency_name)
), possible_diseases AS (
    SELECT DISTINCT D.id, D.name FROM diseases D
        INNER JOIN disease_symptom_frequency DS ON D.id = DS.disease_id
        INNER JOIN frequency F on DS.frequency_id = F.id
        INNER JOIN symptom S on DS.symptom_id = S.id
        INNER JOIN user_input on S.name = user_input.symptom_name AND F.name = user_input.frequency_name
 )

SELECT PD.name, SUM(F.weight) AS weight FROM disease_symptom_frequency DS
    INNER JOIN possible_diseases PD ON PD.id = DS.disease_id
    INNER JOIN frequency F on DS.frequency_id = F.id
    INNER JOIN symptom S on DS.symptom_id = S.id
    INNER JOIN user_input on S.name = user_input.symptom_name AND F.name = user_input.frequency_name
 GROUP BY PD.name
ORDER BY weight DESC;
```

With a result of:

| name  | weight |
|:------|:-------|
| B     | 7      |
| A     | 6      |

`C` is not included since it's not part of the possible diseases first fetch and the symptom frequency is not even relevant for this.
