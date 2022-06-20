import React from "react";
import { Link } from "react-router-dom";

import checker from '../../assets/SymptomChecker/checker.png';

function GetStarted() {

    const steps = [
        "Select your symptoms",
        "We will give you a ticket number to check your status"
    ]

    return (
        <div className="bg-white py-12">
            <div className='w-full flex flex-col justify-between'>
                <div className="grid md:grid-cols-2 max-w-[1240px] m-auto">
                    <div className='flex flex-col justify-center md:items-start w-full px-12'>
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
                        <Link to="/symptom-checker">
                            <button className='button_normal my-4 py-3 px-24'>
                                Get Started
                            </button>
                        </Link>
                    </div>
                    <div>
                        <img src={checker} alt="/" className="w-full" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default GetStarted;
