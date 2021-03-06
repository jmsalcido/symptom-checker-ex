import React from "react";
import { Link } from "react-router-dom";
import results from '../../assets/SymptomChecker/results.png';

function GetResults() {

    return (
        <div className="bg-pachyderm text-white py-12 flex-1">
            <div className='w-full flex flex-col justify-between'>
                <div className="grid md:grid-cols-2 max-w-[1240px] mx-auto">
                    <div>
                        <img src={results} alt="/" className="w-full" />
                    </div>
                    <div className='flex flex-col justify-center md:items-start w-full px-12'>
                        <p className='text-2xl'>Wanna see your results again?</p>
                        <h1 className='py-3 text-5xl font-bold'>View Results</h1>
                        <p className='text-2xl'>One result per symptom selection.</p>
                        <Link to="/results">
                            <button className='light my-4 py-3 px-24'>
                                Get Results
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default GetResults;