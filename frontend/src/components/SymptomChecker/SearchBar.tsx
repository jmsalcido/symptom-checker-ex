import React, { useState } from "react"
import SearchIcon from "../shared/SearchIcon"

function SearchBar(props: any) {
    const [data, setData] = useState('')
    const onChangeData = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setData(event.target.value)
    }
    const onClick = () => {
        props.onSearchClick(data)
    }

    return (
        <div className="flex flex-row search_bar">
            <input className="block w-full border-bold"
                type="text" value={data}
                onChange={onChangeData}
                placeholder="Look for your symptoms in here..." />
            <div className="border border-bold">
                <button type="button"
                    className="p-2.5 text-white bg-kind-giant rounded-r-lg hover:bg-bond focus:ring-4 focus:outline-none focus:ring-transparent"
                    onClick={onClick}>
                    <SearchIcon />
                </button>
            </div>
        </div>
    );
}

export default SearchBar;
