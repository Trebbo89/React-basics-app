import "./card-list.style.css";
import Card from "../card/card.component";

const CardList = ({ monsters }) => (
  <div key="app2" className="card-list">
    {monsters.map((monster) => {
      return <Card monster={monster} />;
    })}
  </div>
);

export default CardList;
