import { SymptomData } from "../../types/symptoms";

function SymptomRowField(props: {
    data: SymptomData,
    onAddSymptomClick: Function,
}) {

    const onClick = () => {
        props.onAddSymptomClick(props.data)
    }

    return (
        <div>
            <div className="flex flex-row place-items-center h-full min-h-[64px]">
                <div className="w-[90%] pl-10">
                    {props.data.name}
                </div>
                <button type="button" className="light p-1 px-2 m-2 place-items-center" onClick={onClick}>
                    + ADD
                </button>
            </div>
            <hr className="m-0" />
        </div>
    );
}

function SymptomSearchView() {
    return (
        <div className="flex flex-col text-center">
            Searching...
        </div>
    )
}

function SymptomErrorView() {
    return (
        <div className="flex flex-col text-center">
            There was an error while doing the search.
        </div>
    )
}


function SymptomInputSearchResult(props: {
    isSearching: boolean,
    isError: boolean,
    symptomData: SymptomData[],
    onAddSymptomClick: Function,
}) {

    const content = () => {
        if (props.isSearching) {
            return (<SymptomSearchView />)
        } else if (props.isError) {
            return (<SymptomErrorView />)
        } else {
            return (
                <div className="overflow-y-auto w-full">
                    {props.symptomData.map((data, index) => (<SymptomRowField key={index} data={data} onAddSymptomClick={props.onAddSymptomClick} />))}
                </div>
            )
        }
    }

    return (
        <div className="overflow-y-auto max-h-[256px]">
            {content()}
        </div>
    )
}

export default SymptomInputSearchResult;
