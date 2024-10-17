import { pool } from "../config/database.js";

const createCustom = async (req, res) => {
    try {
      // Destructure the request body to get all necessary fields
      const { name, isconvertible, color, interior, exterior, roof, wheels, price } = req.body;
  
      // Define the SQL query to insert a custom car
      const createCustomQuery = `
        INSERT INTO customcars (name, isconvertible, color, interior, exterior, roof, wheels, price)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING *`; // Use RETURNING * to get the inserted row back
  
      // Execute the query with the provided values
      const result = await pool.query(createCustomQuery, [
        name,
        isconvertible,
        color,
        interior,
        exterior,
        roof,
        wheels,
        price
      ]);
  
      // Send the inserted custom car as the response
      res.status(201).json({
        success: true,
        message: "Custom car created successfully",
        customCar: result.rows[0] // Return the inserted custom car
      });
    } catch (error) {
      // Handle any errors
      console.error("Error creating custom car:", error);
      res.status(500).json({
        success: false,
        message: "There was an error creating the custom car",
        error: error.message // Include the error message for debugging
      });
    }
  };

const getCustom = async (req, res)=> {
    try {
        const id = req.params.id;
        const results = await pool.query("SELECT * FROM customcars WHERE id = $1;", [id]);
        res.status(200).json(results.rows)
    }
    catch (error) {
        res.status(400).json({error: error.message})
    }
}

const deleteCustom = async (req, res) => {
    try {
        const id = req.params.id;
        const results = await pool.query("DELETE FROM customcars WHERE id = $1", [id])
        res.status(200).json(results.rows);
    }
    catch (error) {
        res.status(400).json({error: error.message})
    }
}



export {createCustom, getCustom, deleteCustom}