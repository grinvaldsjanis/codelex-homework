import style from "./PersonCard.module.scss";
import { Link } from "react-router-dom";

function PersonCard(person: {
  id: number;
  name: string;
  gender: string;
  species: string;
  image: string;
}) {
  return (
    <article key={person.id} style={{ margin: "16px 0 0" }}>
      <Link to={`/character/${person.id}`}>
        <div className={style.charBox}>
          <img className={style.charImg} src={person.image} alt={person.name} />
          <div className={style.charTextBox}>
            <h6>{person.name}</h6>
            <p className="small-date">
              {person.gender}: {person.species}
            </p>
          </div>
        </div>
      </Link>
    </article>
  );
}

export default PersonCard;