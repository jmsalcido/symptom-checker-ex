import SelectedSymptomsButton from "./SelectedSymptomsButton";
import { SymptomData } from "./SymptomForm";

function SelectedSymptomsView(props: {
    selectedSymptoms: SymptomData[],
    onDeleteSymptomClick: Function
}) {

    const selectedSymptomsButtons = props.selectedSymptoms.map((symptomData: SymptomData, index: number) => {
        return (
            <SelectedSymptomsButton key={index} symptomData={symptomData} />
        )
    })

    return (
        <div>
            <h1 className="m-2 font-semibold">Options selected so far: </h1>
            <div className="flex flex-wrap">
                {selectedSymptomsButtons}
            </div>
        </div>
    )
}

export default SelectedSymptomsView;
