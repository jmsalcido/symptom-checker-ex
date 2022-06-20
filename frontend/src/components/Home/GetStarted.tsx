import React from "react";
import { Link } from "react-router-dom";

import checker from '../../assets/SymptomChecker/checker.png';

function GetStarted() {

    const steps = [
        "Select your symptoms",
        "We will give you a ticket number to check your status"
    ]

    return (
        <div className='w-full flex flex-col justify-between bg-white py-10'>
            <div className="grid md:grid-cols-2 max-w-[1240px] m-auto px-16">
                <div className='flex flex-col justify-center md:items-start w-full px-2 py-8'>
                    <p className='text-2xl'>Fast and Easy.</p>
                    <h1 className='py-3 text-5xl font-bold'>Symptom Checker</h1>
                    <p className='text-2xl'>Simple usage:</p>
                    <ul className='list-decimal list-inside'>
                        {steps.map((step, index) => {
                            return (
                                <li style={{ display: "list-item" }} key={index}>{step}</li>
                            )
                        })}
                    </ul>
                    <button className='my-4 py-3 px-12'>
                        <Link to="/symptom-checker">Get Started</Link>
                    </button>
                </div>
                <div>
                    <img src={checker} alt="/" className="w-full" />
                </div>
            </div>
        </div>
    );
}

export default GetStarted;
