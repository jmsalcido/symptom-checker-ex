import { SymptomData } from "../../types/symptoms";

function SelectedSymptomsButton(props: {
    symptomData: SymptomData
}) {
    return (
        <div className="rounded bg-pachyderm m-1 text-white px-2 font-mono text-sm">
            <span>{props.symptomData.name}</span>
        </div>
    )
}

export default SelectedSymptomsButton;
