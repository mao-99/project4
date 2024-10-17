import React, { useEffect } from 'react'
import Card from '../components/carCard'
import '../App.css'

const AllCars = ({cars}) => {
    useEffect(() => {
        console.log(cars)
    }, [])
    return (
        <div className="allCars">
            {cars.map((car, index) => (
            <Card key={index} car={car} />  // Correctly using `map()` and passing `car` to `Card`
            ))}
        </div>
    )
}

export default AllCars