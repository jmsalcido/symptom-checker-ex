import { useState } from "react";
import { SymptomData, SymptomCheckerRequest } from "../../types/symptoms";
import SymptomInputSearch from "./SymptomInputSearch";
import * as symptoms_service from '../../services/symptoms';

function SymptomForm() {
    const [symptomData, setSymptomData] = useState<SymptomData[]>([])

    const [selectedSymptoms, setSelectedSymptoms] = useState<SymptomData[]>([])
    const [formData, setFormData] = useState<SymptomCheckerRequest>({
        symptoms: []
    })

    const handleSearchSymptom = async (searchTerm: string) => {
        // TODO here I need to use axios or something to call the backend.
        console.log(`sending to the backend the search term: ${searchTerm}`)

        const symptoms = await symptoms_service.searchSymptoms(searchTerm)
        setSymptomData(symptoms.symptoms)
    }

    const handleAddSymptom = (symptomData: SymptomData) => {
        if (!formData.symptoms.includes(symptomData.id)) {
            setSelectedSymptoms([...selectedSymptoms, symptomData])

            const newFormData: SymptomCheckerRequest = { ...formData }
            newFormData.symptoms.push(symptomData.id)

            setFormData(newFormData)
        }
    }

    const handleSubmitSymptoms = () => {
        
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
                    <button className="base my-10 p-2 px-16" type="submit" disabled={formData.symptoms.length === 0}>
                        SUBMIT
                    </button>
                </form>
            </div>
        </div>
    );
}

export default SymptomForm;
