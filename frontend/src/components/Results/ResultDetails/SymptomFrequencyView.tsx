
function SymptomFrequencyView(props: {
    title: string,
    symptoms: string[] | undefined,
    getSymptomName: Function,
}) {

    const symptomLookUpUrl = "https://hpo.jax.org/app/browse/term/"

    const symptomRows = props.symptoms?.map((id, index) => {
        const symptom = props.getSymptomName(id)
        return (
            <h1 className="font-semibold text-lg" key={index}>
                <hr/>
                <a href={`${symptomLookUpUrl}${symptom.id}`}>{symptom.id} - {symptom.name}</a>
            </h1>)
    })

    return (
        <div>
            <div className="text-4xl text-center font-semibold p-4">
                {props.title}
                <hr />
            </div>
            <div className="px-10 max-w-[450px] md:max-w-[720px] text-truncate mx-auto">
                {symptomRows}
            </div>
        </div>
    )
}

export default SymptomFrequencyView
