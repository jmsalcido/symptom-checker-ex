export type SymptomData = {
    id: string;
    name: string;
};

export type SymptomCheckerRequest = {
    hpo_ids: string[];
};

export type SymptomSearchResponse = {
    symptoms: SymptomData[]
}

export type SymptomSearchRequest = {
    search: string
}

export type SymptomCheckerResponse = {
    result_id: string
}