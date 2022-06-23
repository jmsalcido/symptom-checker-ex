import { useState } from "react"
import { useNavigate } from "react-router-dom"

function EnterResultForm() {
    const navigate = useNavigate();
    const [data, setData] = useState('')
    const onChangeData = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setData(event.target.value)
    }
    const onClick = () => {
        setTimeout(() => {
            navigate('/results/' + data)
        }, 500)
    }

    return (
        <div>
            <h1 className='py-3 text-5xl font-bold'>Enter Result Id</h1>
            <input className="block w-full border-bold rounded drop-shadow-md my-5"
                type="text"
                onChange={onChangeData}
                placeholder="Enter your result id here" />
            <button className='light my-4 py-3 px-24' onClick={onClick}>
                View my results...
            </button>
        </div>
    );
}

export default EnterResultForm;
