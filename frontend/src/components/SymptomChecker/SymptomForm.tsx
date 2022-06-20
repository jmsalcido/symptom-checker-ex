import { useState } from "react";
import SymptomInputSearch from "./SymptomInputSearch";

export type SymptomData = {
    id: string,
    name: string,
}

type SymptomCheckerRequest = {
    symptoms: string[],
}

const dummySymptomData = [
    {
        id: "HPO:00001",
        name: "finger 1 pain this is a very large text"
    },
    {
        id: "HPO:00002",
        name: "finger 2 pain"
    },
    {
        id: "HPO:00003",
        name: "finger 3 pain"
    },
    {
        id: "HPO:00004",
        name: "finger 4 pain"
    },
    {
        id: "HPO:00005",
        name: "nothing to do with f-gers"
    },
    {
        id: "HPO:00006",
        name: "it just says finger"
    },
]

function SymptomForm() {
    const [symptomData, setSymptomData] = useState<SymptomData[]>([])

    const [selectedSymptoms, setSelectedSymptoms] = useState<SymptomData[]>([])
    const [formData, setFormData] = useState<SymptomCheckerRequest>({
        symptoms: []
    })

    const handleSearchSymptom = (searchTerm: string) => {
        console.log(`sending to the backend the search term: ${searchTerm}`)
        setTimeout(() => {
            setSymptomData(dummySymptomData.filter(x => x.name.includes(searchTerm)))
        }, 5000)
    }

    const handleAddSymptom = (symptomData: SymptomData) => {
        if (!formData.symptoms.includes(symptomData.id)) {
            setSelectedSymptoms([...selectedSymptoms, symptomData])

            const newFormData: SymptomCheckerRequest = { ...formData }
            newFormData.symptoms.push(symptomData.id)

            setFormData(newFormData)
        }
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
                    <button className="button_normal my-10 p-2 px-16" type="submit">
                        SUBMIT
                    </button>
                </form>
            </div>
        </div>
    );
}

export default SymptomForm;
