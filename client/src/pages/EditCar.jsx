import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../App.css';

const EditCar = () => {
  const [baseCar, setBaseCar] = useState(null);
  const [customCar, setCustomCar] = useState({
    name: "",
    base_car_id: "",
    isconvertible: false,
    color: "",
    interior: "",
    exterior: "",
    roof: "",
    wheels: "",
    price: 0
  });
  const [price, setPrice] = useState(0)
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch base car data from the cars table
    const fetchBaseCar = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/cars/${params.id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch base car data');
        }
        let data = await response.json();
        data = data[0]
        console.log(data)
        setBaseCar(data);
        setCustomCar(prevCustomCar => ({
          ...prevCustomCar,
          base_car_id: data.id,
          name: `Custom ${data.make} ${data.model}`,
          price: data.base_price
        }));
      } catch (error) {
        console.error('Error fetching base car data:', error);
      }
    };

    fetchBaseCar();
  }, [params.id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomCar(prevCar => ({
      ...prevCar,
      [name]: value
    }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setCustomCar(prevCar => ({
      ...prevCar,
      [name]: checked
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3001/api/customcars/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(customCar),
      });
      if (!response.ok) {
        throw new Error('Failed to create custom car');
      }
      // Handle successful creation (e.g., show a success message and redirect)
      alert('Custom car created successfully!');
      navigate('/'); // Redirect to homepage
    } catch (error) {
      console.error('Error creating custom car:', error);
      alert('Failed to create custom car. Please try again.');
    }
  };

  if (!baseCar) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Customize Your {baseCar.make} {baseCar.model}</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Custom Name:</label>
        <input type="text" id="name" name="name" value={customCar.name} onChange={handleChange} required />

        <label htmlFor="isconvertible">Convertible:</label>
        <input
          type="checkbox"
          id="isconvertible"
          name="isconvertible"
          checked={customCar.isconvertible}
          onChange={handleCheckboxChange}
        />
        <br />

        <label htmlFor="color">Exterior Color:</label>
        <select
          id="color"
          name="color"
          value={customCar.color}
          onChange={handleChange}
        >
          <option value="">Select a color</option>
          <option value="Red">Red</option>
          <option value="Blue">Blue</option>
          <option value="Black">Black</option>
          <option value="White">White</option>
        </select>

        <label htmlFor="interior">Interior:</label>
        <select
          id="interior"
          name="interior"
          value={customCar.interior}
          onChange={handleChange}
        >
          <option value="">Select interior</option>
          <option value="Leather">Leather</option>
          <option value="Fabric">Fabric</option>
          <option value="Synthetic">Synthetic</option>
        </select>

        <label htmlFor="roof">Roof Color:</label>
        <select
          id="roof"
          name="roof"
          value={customCar.roof}
          onChange={handleChange}
        >
          <option value="">Select roof color</option>
          <option value="Black">Black</option>
          <option value="Body Color">Body Color</option>
        </select>

        <label htmlFor="wheels">Wheels:</label>
        <select
          id="wheels"
          name="wheels"
          value={customCar.wheels}
          onChange={handleChange}
        >
          <option value="">Select wheels</option>
          <option value="17-inch Alloy">17-inch Alloy</option>
          <option value="18-inch Sport">18-inch Sport</option>
          <option value="19-inch Premium">19-inch Premium</option>
        </select>

        <label htmlFor="price">Total Price:</label>
        <input
          type="number"
          id="price"
          name="price"
          value={customCar.price}
          onChange={handleChange}
        />

        <button type="submit">Create Custom Car</button>
      </form>
    </div>
  );
};

export default EditCar;