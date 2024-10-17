import styles from "./carCard.module.css";
import { Link } from "react-router-dom";
export default function Card({car}){

    return (
        <article className={styles.card}>
            <div className={styles.imageDiv}>
                <img src={car.image} alt="" className={styles.image}/>
            </div>
            <div className={styles.textDiv}>
                <p>Make: {car.make}</p>
                <p>Model: {car.model}</p>
                <p>Year: {car.year}</p>
                <p>Price: {car.price}</p>
            </div>
            <Link to={`/edit/${car.id}`}><button>Customize</button></Link>
        </article>
    )
}