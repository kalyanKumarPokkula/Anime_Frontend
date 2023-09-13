import React, { useState, useEffect } from 'react'
import Card from '../ui/Card';
import './Top.css'

function Top() {
    const [animes, setanimes] = useState([]);
    const [isloading, setisloading] = useState(true)

    useEffect(() => {
        fetch("https://animeapi059.herokuapp.com/getTop10Animes").then(response => {
            return response.json()
        }).then(data => {
            setanimes(data)
            setisloading(false)
        })
    })
    
    return (
        <div className="top-div">
            
            <div className="content">
                {isloading && <div class="loader"></div>}
                {animes.map(anime => {
                    return <Card anime={anime} />
                })}
            </div>
            
        </div>
    )
}

export default Top
