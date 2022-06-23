import SymptomForm from "../components/SymptomChecker/SymptomForm";
import Header from "../components/SymptomChecker/Header";

function SymptomsChecker() {

    return (
        <div className="bg-base flex flex-col flex-grow">
            <div className="container mx-auto">
                <div className="w-full flex flex-col justify-between">
                    <div className="mx-auto max-w-[1024px] min-h-full w-full rounded bg-white drop-shadow-2xl my-20 p-10">
                        <Header />
                        <SymptomForm />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SymptomsChecker;
