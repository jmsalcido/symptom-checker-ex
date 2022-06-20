import React from "react";
import { Link } from "react-router-dom";

function NavBar() {
    return (
        <div className="navigation bg-white">
            <h1 className='text-3xl text-left font-semibold p-4'>
                <Link to="/">SSymptomC.</Link>
            </h1>
        </div>
    );
}

export default NavBar;
