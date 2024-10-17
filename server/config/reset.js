import { pool } from "./database.js";
import { cars } from "../data/cars.js";
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
dotenv.config({ path: join(__dirname, '..', '.env') })

const createTables = async () => {
    const createTableQuery = `
    DROP TABLE IF EXISTS customCars;
    DROP TABLE IF EXISTS cars;


    CREATE TABLE IF NOT EXISTS cars (
        id SERIAL PRIMARY KEY,
        make VARCHAR(255) NOT NULL,
        model VARCHAR(255) NOT NULL,
        year VARCHAR(4) NOT NULL,
        image VARCHAR(255),
        price INT NOT NULL
    );


    CREATE TABLE IF NOT EXISTS customCars (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        car_id INT REFERENCES cars(id),  -- Establishing the foreign key relationship
        isconvertible BOOL DEFAULT FALSE,
        color VARCHAR(7) DEFAULT '#000000',   -- For hex color codes
        interior VARCHAR(7) DEFAULT '#000000',
        exterior VARCHAR(7) DEFAULT '#000000',
        roof VARCHAR(7) DEFAULT '#000000',
        wheels VARCHAR(7) DEFAULT '#000000',
        price INT NOT NULL
    );
    `
    try {
        const response = await pool.query(createTableQuery)
        console.log("These are the results from table creation query: ", response)
    }
    catch(error){
        console.error("Problem creating tables: ", error)
    }
}

const insertData = async () => {
    for (const car of cars){
        const insertCarQuery = {
            text: `INSERT INTO cars (make, model, year, image, price) VALUES ($1, $2, $3, $4, $5);`,
            values: [car.make, car.model, car.year,car.image, car.price]
        }
        try {
            const response = await pool.query(insertCarQuery);
            console.log("Car entry query done.", response);
        } catch(error) {
            console.error("Error adding car to table: ", error)
        }
    }
}

const resetDatabase = async ()=>{
    await createTables();
    await insertData();
    console.log("Reset database. Queries run");
}

resetDatabase();