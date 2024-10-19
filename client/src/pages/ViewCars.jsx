import React from 'react'
import { useEffect, useState } from 'react'
import CustomCard from '../components/customCard'
import '../App.css'

const ViewCars = ({customs}) => {

    return (
        <div className="allCars">
            {customs.map((car, index) => (
            <CustomCard key={index} car={car} />  // Correctly using `map()` and passing `car` to `Card`
            ))}
        </div>
    )
}

export default ViewCars