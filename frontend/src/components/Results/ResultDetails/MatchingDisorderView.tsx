import { MatchingDisorder } from "../../../types/results"

function MatchingDisorderView(props: {
    disorderIndex: number,
    matchingDisorder: MatchingDisorder,
    onClickSelectMatchingDisorder?: Function
}) {

    const onClick = () => {
        props.onClickSelectMatchingDisorder!!(props.disorderIndex)
    }

    const bgColors = [
        "bg-gradient-to-r from-red-500 to-red-400",
        "bg-gradient-to-r from-red-400 to-red-300",
        "bg-gradient-to-r from-red-300 to-red-200",
        "bg-gradient-to-r from-red-200 to-red-100",
        "bg-gradient-to-r from-red-100 to-red-50",
    ]


    return (
        <div className="">
            <div className={`border rounded border-black drop-shadow-lg ${bgColors[props.disorderIndex]} my-10 mx-3 relative`}>
                <button type="button" onClick={onClick}>
                    <div className="min-h-[150px] max-h-[150px] min-w-[150px] max-w-[150px] flex flex-col justify-center">
                        <h1 className="break-words font-bold text-xl align-middle">{props.matchingDisorder.disorder.name}</h1>
                        <h2><span>Orpha Code:</span>{props.matchingDisorder.disorder.orpha_code}</h2>
                        <h1 className="text-xs justify-start absolute bottom-2 left-2 font-mono font-extrabold">
                            {props.disorderIndex + 1}
                        </h1>
                    </div>
                </button>
            </div>
        </div>
    )
}

export default MatchingDisorderView;