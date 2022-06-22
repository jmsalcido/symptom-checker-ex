import { MatchingDisorder, SymptomData } from "../../types/symptoms"

function ResultsView(props: {
    result_id: string,
    matching_disorders: MatchingDisorder[],
    symptoms: SymptomData[]
}) {
    return (
        <div>
            Hello There
        </div>
    )
}

export default ResultsView
