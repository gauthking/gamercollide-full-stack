import React from 'react'
import Load from "../loading.gif"
import "./Loader.css"

function Loader() {
    return (
        <div className='loader'>
            <img src={Load} alt="loading" />
        </div>
    )
}

export default Loader