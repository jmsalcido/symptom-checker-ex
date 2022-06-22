import { useState } from "react";
import { SymptomData, SymptomCheckerRequest, SymptomCheckerResponse, SymptomSearchResponse } from "../../types/symptoms";
import SymptomInputSearch from "./SymptomInputSearch";
import * as symptoms_service from '../../services/symptoms';
import { useNavigate } from "react-router-dom";

function SymptomForm() {
    const navigate = useNavigate()

    const [symptomData, setSymptomData] = useState<SymptomData[]>([])
    const [selectedSymptoms, setSelectedSymptoms] = useState<SymptomData[]>([])
    const [formData, setFormData] = useState<SymptomCheckerRequest>({
        hpo_ids: []
    })

    const [isSearching, setIsSearching] = useState(false)
    const [isError, setIsError] = useState(false)

    const handleSearchSymptom = async (searchTerm: string) => {
        setIsSearching(true)
        setSymptomData([])
        setTimeout(() => {
            symptoms_service.searchSymptoms(searchTerm)
                .then((data: SymptomSearchResponse) => {
                    setSymptomData(data.symptoms)
                    setIsError(false)
                }).catch((error) => {
                    setIsError(true)
                })
            setIsSearching(false)
        }, 500)
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
        symptoms_service.sendSymptoms(formData)
            .then((data: SymptomCheckerResponse) => {
                navigate(`/results/${data.result_id}`)
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
                <SymptomInputSearch symptomData={symptomData}
                    selectedSymptoms={selectedSymptoms}
                    isSearching={isSearching}
                    isError={isError}
                    onSearchClick={handleSearchSymptom}
                    onAddSymptomClick={handleAddSymptom}
                    onDeleteSymptomClick={() => { }} />
                <button className="base my-10 p-2 px-16" type="button"
                    onClick={handleSubmitSymptoms}
                    disabled={formData.hpo_ids.length === 0} >
                    SUBMIT
                </button>
            </div>
        </div>
    );
}

export default SymptomForm;
