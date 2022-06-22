import { useState } from "react";
import { SymptomData, SymptomCheckerRequest, SymptomCheckerResponse } from "../../types/symptoms";
import SymptomInputSearch from "./SymptomInputSearch";
import * as symptoms_service from '../../services/symptoms';

function SymptomForm() {
    const [symptomData, setSymptomData] = useState<SymptomData[]>([])

    const [selectedSymptoms, setSelectedSymptoms] = useState<SymptomData[]>([])
    const [formData, setFormData] = useState<SymptomCheckerRequest>({
        hpo_ids: []
    })

    const handleSearchSymptom = async (searchTerm: string) => {
        // TODO here we can set the status to loading the UI to show a "loading" screen
        // ie: setLoadingStatus(false)
        const symptoms = await symptoms_service.searchSymptoms(searchTerm)
        // TODO here we return back the status to not loading
        // ALSO let the user know if there was an error.
        // ie: setLoadingStatus(false)
        setSymptomData(symptoms.symptoms)
    }

    const handleAddSymptom = (symptomData: SymptomData) => {
        if (!formData.hpo_ids.includes(symptomData.id)) {
            setSelectedSymptoms([...selectedSymptoms, symptomData])

            const newFormData: SymptomCheckerRequest = { ...formData }
            newFormData.hpo_ids.push(symptomData.id)

            setFormData(newFormData)
        }
    }

    const handleSubmitSymptoms = () => {
        const response = symptoms_service.sendSymptoms(formData)
            .then((data: SymptomCheckerResponse) => {
                // TODO move to the results page.
                console.log(data)
                return data
            })
            .catch((error) => {
                console.log(error)
            })
    }

    return (
        <div className="p-10">
            <h1>Thank you for taking the time.</h1>
            <h1>Please look up your symptoms in the input field, i.e: <span className="italic">finger</span></h1>
            <div className="mt-10">
                <form>
                    <SymptomInputSearch symptomData={symptomData}
                        selectedSymptoms={selectedSymptoms}
                        onSearchClick={handleSearchSymptom}
                        onAddSymptomClick={handleAddSymptom}
                        onDeleteSymptomClick={() => { }} />
                    <button className="base my-10 p-2 px-16" type="button"
                        onClick={handleSubmitSymptoms}
                        disabled={formData.hpo_ids.length === 0} >
                        SUBMIT
                    </button>
                </form>
            </div>
        </div>
    );
}

export default SymptomForm;
