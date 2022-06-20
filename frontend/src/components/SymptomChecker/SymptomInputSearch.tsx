import SearchBar from "./SearchBar";
import SelectedSymptomsView from "./SelectedSymptomsView";
import { SymptomData } from "./SymptomForm";
import SymptomInputSearchResult from "./SymptomInputSearchResult";

function SymptomInputSearch(props: {
    symptomData: SymptomData[],
    selectedSymptoms: SymptomData[],
    onSearchClick: Function,
    onAddSymptomClick: Function,
    onDeleteSymptomClick: Function
}) {

    const hasSelectedSymptoms = props.selectedSymptoms.length > 0
    const selectedSymptomsContent = hasSelectedSymptoms
        ? (<SelectedSymptomsView selectedSymptoms={props.selectedSymptoms} onDeleteSymptomClick={props.onDeleteSymptomClick} />)
        : null

    return (
        <div>
            <span className="block text-gray-700 mb-3">
                Type your symptom and click over the add button, those will appear at the end so you can review before sending.
            </span>
            <div className="flex">
                <div className="border rounded-md border-1 border-bold min-h-[300px] max-h-[300px] w-full">
                    <SearchBar onSearchClick={props.onSearchClick} />
                    <SymptomInputSearchResult symptomData={props.symptomData} onAddSymptomClick={props.onAddSymptomClick} />
                </div>
            </div>
            {selectedSymptomsContent}
        </div>
    );
}

export default SymptomInputSearch;
