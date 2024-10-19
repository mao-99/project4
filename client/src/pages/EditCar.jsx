import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from "../components/carCard.module.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';

const EditCar = () => {
  const color_codes = [
    //... (your list of color codes)
  ];

  const [baseCar, setBaseCar] = useState(null);
  const [customCar, setCustomCar] = useState({
    name: "",
    base_car_id: "",
    isconvertible: false,
    color: "#FF6F61",
    interior: "#FFFFFF",
    exterior: "#FF6F61",
    roof: "#000000",
    wheels: "",
    price: 1200
  });

  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBaseCar = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/cars/${params.id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch base car data');
        }
        let data = await response.json();
        data = data[0];
        console.log(data);
        setBaseCar(data);
        setCustomCar(prevCustomCar => ({
          ...prevCustomCar,
          base_car_id: data.id,
          name: `Custom ${data.make} ${data.model}`,
          price: data.price
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

    // If the field being changed is the convertible field, call handlePrice
    if (name === "convertible") {
      handlePrice(value === "true"); // Convert to boolean
    }
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setCustomCar(prevCar => ({
      ...prevCar,
      [name]: checked
    }));
  };

  const handleColorChange = (e) => {
    const { name, value } = e.target;
    setCustomCar(prevCar => ({
      ...prevCar,
      [name]: value,
    }));
  };

  // Function to handle price based on whether convertible is selected or not
  const handlePrice = (isConvertible) => {
    if (baseCar) {
      const newPrice = baseCar.price + (isConvertible ? 20000 : 10000);
      setCustomCar((prevCar) => ({
        ...prevCar,
        price: newPrice,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(customCar);
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
      alert('Custom car created successfully!');
      navigate('/');
    } catch (error) {
      console.error('Error creating custom car:', error);
      alert('Failed to create custom car. Please try again.');
    }
  };

  return (
    <div className={`${styles.formDiv}`}>
      <form className={`row g-3 ${styles.form}`} onSubmit={handleSubmit}>
        <h1>Create Car Customization</h1>
        <div className="col-md-4">
          <label htmlFor="exterior" className="form-label">Exterior</label>
          <input
            className="form-control"
            type="color"
            id="exterior"
            name="exterior"
            value={customCar.exterior}
            onChange={handleColorChange}
            list="color-options"
          />
        </div>

        <div className="col-md-4">
          <label htmlFor="interior" className="form-label">Interior</label>
          <input
            className="form-control"
            type="color"
            id="interior"
            name="interior"
            value={customCar.interior}
            onChange={handleColorChange}
            list="color-options"
          />
        </div>

        <div className="col-md-4">
          <label htmlFor="roof" className="form-label">Roof</label>
          <input
            className="form-control"
            type="color"
            id="roof"
            name="roof"
            value={customCar.roof}
            onChange={handleColorChange}
            list="color-options"
          />
        </div>

        <div className="col-md-6">
          <label htmlFor="wheels">Wheels</label>
          <select
            id="wheels"
            name="wheels"
            value={customCar.wheels}
            onChange={handleChange}
            className="form-select"
          >
            <option value="">Select wheels</option>
            <option value="17-inch Alloy">17-inch Alloy</option>
            <option value="18-inch Sport">18-inch Sport</option>
            <option value="19-inch Premium">19-inch Premium</option>
          </select>
        </div>

        <div className="col-md-6">
          <label htmlFor="convertible" className="form-label">Convertible</label>
          <select
            id="convertible"
            name="convertible"
            value={customCar.convertible}
            onChange={handleChange}
            className="form-select"
          >
            <option value="false">No</option>
            <option value="true">Yes</option>
          </select>
        </div>

        <div className={`col-12 ${styles.buttonRow}`}>
          <button type="submit" className="btn btn-primary">Create Custom</button>
        </div>

        <div className="col-12">
          <h3>Total Price: ${customCar.price}</h3>
        </div>
      </form>
    </div>
  );
};

export default EditCar;
