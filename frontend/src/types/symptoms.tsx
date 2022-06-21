export type SymptomData = {
    id: string;
    name: string;
};

export type SymptomCheckerRequest = {
    symptoms: string[];
};

export type SymptomSearchResponse = {
    symptoms: SymptomData[]
}

export type SymptomSearchRequest = {
    search: string
}
