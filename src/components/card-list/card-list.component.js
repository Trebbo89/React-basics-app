import { Component } from "react";
import './card-list.style.css';
import Card from "../card/card.component";

class CardList extends Component {
  render() {
    /* console.log(this.props.monsters);
    console.log("render from cardlist"); */
    const { monsters } = this.props;

    return (
      <div className="card-list">
        {monsters.map((monster) => {
          return (
            <Card  monster = {monster}/>
          );
        })}
      </div>
    );
  }
}

export default CardList;

/*  nota: all'interno del return si puo tornare solamente un componente alla volta a livello di root
 (ad esempio non si possono tornare più div, ma solo un div con altri componenti innestati) */

/* render: il console log 'render from cardList' viene eseguito due volte: prima all'inizializzazione
del component app e poi dopo il metodo componentDidMount (in quanto viene richiamato il setState).
Inoltre viene richiamato due volte anche perchè le props cambiano: durante l'inizializzazione viene
passato un array di monsters vuoto, mentre dopo il didMount un array valorizzato di elementi

RE-RENDER 
1. quando viene chiamato il setState, percio quando cambia lo stato
2. quando le props di cun componente cambiano 


Dinamica di rendering in react:
react renderizza i componenti della pagina secondo uno schema top-down dai componenti piu alti (padri)
ai componenti piu bassi (figli). Il rendering viene effettuato ogniqualvolta viene chiamato il setState
o quando le props di un componente cambiano.

*/
