import { useParams } from "react-router-dom"
import Header from "./Header"
import ResultDetailView from "./ResultDetails/ResultDetailView"

function ResultsView() {
    const { result_id } = useParams()

    return (
        <div className="bg-pachyderm h-full">
            <div className="container mx-auto">
                <div className="w-full flex flex-col justify-between">
                    <div className="mx-auto max-w-[1024px] min-h-full w-full rounded bg-white drop-shadow-2xl my-20">
                        <Header />
                        <ResultDetailView result_id={result_id} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ResultsView
