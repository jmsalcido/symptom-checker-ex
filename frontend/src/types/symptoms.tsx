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

export type Disorder = {
    orpha_code: number,
    name: string
}

export type MatchingDisorder = {
    disorder: Disorder[],
    excluded_symptoms: string[],
    frequent_symptoms: string[],
    matching_symptoms: Map<string, string>[],
    obligate_symptoms: string[],
    occasional_symptoms: string[],
    very_frequent_symptoms: string[],
    very_rare_symptoms: string[],
    weight: number,
}

export type ResultResponse = {
    result_id: string,
    matching_disorders: MatchingDisorder[],
    symptoms: SymptomData[]
}

export type SymptomCheckerResponse = {
    result_id: string
}