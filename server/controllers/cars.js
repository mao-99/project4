import { pool } from "../config/database.js";

const getCars = async (req, res) => {
    try {
        const response = await pool.query('SELECT * FROM cars');
        res.status(200).json(response.rows)
    }
    catch (error) {
        console.log("There was an error getting all cars from cars table")
        console.error(error)
    }
}

const getCar = async (req, res) => {
    try {
        const id = req.params.id;
        const results = await pool.query("SELECT * FROM cars WHERE id = $1;", [id]);
        res.status(200).json(results.rows)
    }
    catch (error) {
        res.status(400).json({error: error.message})
    }
}



export {getCars, getCar}