import styles from "./carCard.module.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function CustomCard({ car }) {
  const [customCar, setCustomCar] = useState({
    car_id: "",
    make: "",
    model: "",
    year: "",
    image: "",
    name: "",
    isconvertible: false,
    color: "",
    interior: "",
    exterior: "",
    roof: "",
    wheels: "",
    price: 0
  });

  // Fetch base car data and merge with custom data
  useEffect(() => {
    const fetchCar = async () => {
      try {
        // Fetch base car details using car_id
        const response = await fetch(`http://localhost:3001/api/cars/${car.car_id}`);
        const baseCar = await response.json();

        // Merge base car details with custom car details passed via props
        const mergedCar = {
          ...car,             // Custom car data (from prop)
          ...baseCar[0],      // Base car data (from fetch)
          price: car.price    // Keep the custom price from the prop
        };

        // Update the state with the merged data
        setCustomCar(mergedCar);
      } catch (error) {
        console.error("Error fetching base car data:", error);
      }
    };

    // Fetch the car details when the component mounts
    fetchCar();
  }, [car.car_id]);

  // Handle update and delete (optional logic to be added as per your requirements)
  const handleUpdate = () => {
    // Logic to handle updating the custom car
  };

  const handleDelete = async () => {
    try {
      // Send a DELETE request to the server with the custom car's ID
      const response = await fetch(`http://localhost:3001/api/customcars/${car.car_id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      if (response.ok) {
        console.log("Custom car deleted successfully!");
        // Optionally: remove the car from the UI or redirect the user
      } else {
        console.error("Failed to delete custom car.");
      }
    } catch (error) {
      console.error("Error deleting custom car:", error);
    }
  };
  

  // Render the custom car card with merged base and custom data
  return (
    <article className={styles.card}>
        <div className={styles.textDiv}>
        <p>Make: {customCar.make}</p>
        <p>Model: {customCar.model}</p>
        <p>Year: {customCar.year}</p>
        <p>Price: ${customCar.price}</p>
        <p>Convertible: {customCar.isconvertible ? "Yes" : "No"}</p>
        <p>Color: {customCar.color}</p>
        <p>Interior: {customCar.interior}</p>
        <p>Exterior: {customCar.exterior}</p>
        <p>Roof: {customCar.roof}</p>
        <p>Wheels: {customCar.wheels}</p>
        {customCar.image && (
            <img
            src={customCar.image}
            alt={`${customCar.make} ${customCar.model}`}
            className={styles.carImage}
            />
        )}
        </div>

      <button onClick={handleUpdate}>Update Custom</button>
      <button onClick={handleDelete}>Delete Custom</button>
    </article>
  );
}
