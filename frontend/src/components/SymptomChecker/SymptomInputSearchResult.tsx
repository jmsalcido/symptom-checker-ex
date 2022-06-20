import { SymptomData } from "./SymptomForm";

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

function SymptomInputSearchResult(props: {
    symptomData: SymptomData[],
    onAddSymptomClick: Function,
}) {
    return (
        <div className="overflow-y-auto w-full max-h-[256px]">
            {props.symptomData.map((data, index) => (<SymptomRowField key={index} data={data} onAddSymptomClick={props.onAddSymptomClick} />))}
        </div>
    )
}

export default SymptomInputSearchResult;
