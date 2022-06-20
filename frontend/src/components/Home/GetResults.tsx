import React from "react";
import { Link } from "react-router-dom";
import results from '../../assets/SymptomChecker/results.png';

function GetResults() {

    return (
        <div className='w-full flex flex-col justify-between bg-pachyderm text-white py-10'>
            <div className="grid md:grid-cols-2 max-w-[1240px] m-auto">
                <div>
                    <img src={results} alt="/" className="w-full" />
                </div>
                <div className='flex flex-col justify-center md:items-start w-full px-2 py-8'>
                    <p className='text-2xl'>Wanna see your results?</p>
                    <h1 className='py-3 text-5xl font-bold'>Verify Results</h1>
                    <p className='text-2xl'>One result per check.</p>
                    <button className='button_light my-4 py-3 px-12'>
                        <Link to="/results">Get Results</Link>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default GetResults;