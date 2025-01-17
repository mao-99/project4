import React from 'react'
import { useRoutes } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Navigation from './components/Navigation'
import ViewCars from './pages/ViewCars'
import EditCar from './pages/EditCar'
import AllCars from './pages/AllCars'
import CarDetails from './pages/CarDetails'
import './App.css'

const App = () => {
  const [cars, setCars] = useState([])
  const [customs, setCustoms] = useState([])

  useEffect(()=>{
    async function start() {
      let response = await fetch('http://localhost:3001/api/cars');
      const results = await response.json()
      console.log(results)
      setCars(results)
      let response2 = await fetch('http://localhost:3001/api/customcars');
      const results2 = await response2.json();
      setCustoms(results2)
    }
    start();
  }, [])

  let element = useRoutes([
    {
      path: '/',
      element: <AllCars title='BOLT BUCKET | All Cars' cars={cars} />
    },
    {
      path:'/customcars',
      element: <ViewCars title='BOLT BUCKET | Custom Cars' customs={customs}/>
    },
    {
      path: '/customcars/:id',
      element: <CarDetails title='BOLT BUCKET | View' />
    },
    {
      path: '/edit/:id',
      element: <EditCar title='BOLT BUCKET | Edit' />
    }
  ])

  return (
    <div className='app'>

      <Navigation />

      { element }

    </div>
  )
}

export default App