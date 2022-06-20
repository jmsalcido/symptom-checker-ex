import React, { useState } from "react";

type SymptomData = {
    id: string,
    name: string,
}

function SearchBar(props: any) {
    const [data, setData] = useState('')
    const onChangeData = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setData(event.target.value)
    }

    return (
        <div className="flex flex-row search_bar">
            <input className="block w-full border-bold" type="text" value={data} onChange={onChangeData} placeholder="Look for your symptoms in here..." />
            <div className="border border-bold">
                <button type="button" className="p-2.5 text-white bg-kind-giant rounded-r-lg hover:bg-bond focus:ring-4 focus:outline-none focus:ring-transparent" onClick={() => props.onSearchClick(data)}>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                    </svg>
                </button>
            </div>
        </div>
    );
}

function SymptomRowField(props: {
    index: number,
    data: SymptomData
}) {
    return (
        <div key={props.index}>
            {props.data.name}
        </div>
    );
}

function SymptomInputSearch(props: {
    symptomData: SymptomData[],
    onSearchClick: Function,
}) {
    return (
        <div className="py-10">
            <div>
                <span className="block text-gray-700 mb-3">Type your symptom and click over the add button.</span>
                <div className="flex">
                    <div className="border rounded-md border-1 border-bold min-h-[256px] max-h-[256px] w-full">
                        <SearchBar onSearchClick={props.onSearchClick} />
                        <div>
                            {props.symptomData.map((data, index) => (<SymptomRowField index={index} data={data}/>))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function SymptomForm() {
    const [symptomData, setSymptomData] = useState<SymptomData[]>([])
    const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([])

    const dummySymptomData = [
        {
            id: "HPO:00001",
            name: "finger 1 pain"
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
            name: "nothing to do with f-gers"
        }
    ]

    const handleSearchSymptom = (searchTerm: string) => {
        console.log(`sending to the backend the search term: ${searchTerm}`)
        setTimeout(() => {
            setSymptomData(dummySymptomData.filter(x => x.name.includes(searchTerm)))
        }, 5000)
    }

    return (
        <div className="p-10">
            <h1>Thank you for taking the time.</h1>
            <h1>Please look up your symptoms in the input, i.e: <span className="italic">finger</span></h1>
            <div>
                <form>
                    <SymptomInputSearch onSearchClick={handleSearchSymptom} symptomData={symptomData} />
                    <button className="button_normal p-2 px-16" type="submit">
                        SUBMIT
                    </button>
                </form>
            </div>
        </div>
    );
}

export default SymptomForm;
