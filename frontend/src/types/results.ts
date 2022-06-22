import { SymptomData } from "./symptoms"

export type Disorder = {
    orpha_code: number,
    name: string
}

export type MatchingDisorder = {
    disorder: Disorder,
    excluded_symptoms: string[],
    frequent_symptoms: string[],
    matching_symptoms: Map<string, string>[],
    obligate_symptoms: string[],
    occasional_symptoms: string[],
    very_frequent_symptoms: string[],
    very_rare_symptoms: string[],
    weight: number,
}

export type Result = {
    result_id: string,
    matching_disorders: MatchingDisorder[],
    symptoms: Map<String, SymptomData>
}

export type ResultResponse = {
    result_id: string,
    matching_disorders: MatchingDisorder[],
    symptoms: SymptomData[]
}
