import Header from "./Header"
import EnterResultForm from "./Home/EnterResultForm"

function Home() {
    return(
        <div className="bg-pachyderm h-full">
            <div className="container mx-auto">
                <div className="w-full flex flex-col justify-between">
                    <div className="mx-auto max-w-[1024px] min-h-full w-full rounded bg-white drop-shadow-2xl my-20 p-10">
                        <Header />
                        <div className="p-10">
                            <div className="grid md:grid-cols-2 max-w-[1240px] mx-auto py-10">
                                <div>
                                    <p className='text-2xl'>Wanna see your results again?</p>
                                    <h1 className='py-3 text-5xl font-bold'>View Results</h1>
                                    <p className='text-2xl'>One result per symptom selection.</p>
                                </div>
                                <div className='flex flex-col justify-center md:items-start w-full px-12'>
                                    <EnterResultForm />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home
