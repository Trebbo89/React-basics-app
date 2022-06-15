import { Component } from "react";
import CardList from "./components/card-list/card-list.component";
import SearchBox from "./components/search-box/search-box.component";
import logo from "./logo.svg";
import "./App.css";

//another change to analyze


//esempio di componente funzionale
// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;

//esempio componente classe
class App extends Component {
  constructor() {
    super();

    this.state = {
      monsters: [],
      searchField: "",
    };

    // console.log("constructor");
  }

  //ciclo iniziale che viene eseguita una volta quando il componente viene montato
  componentDidMount() {
    // console.log("componentDidMount");
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        const jsonRes = response.json();
        // console.log("sto stampando la risposta in json...");
        // console.log(jsonRes);
        return jsonRes;
      }) //.json() per convertire la response in json
      .then((users) =>
        this.setState(
          () => {
            return { monsters: users };
          },
          () => {
            // console.log(this.state);
          }
        )
      );
  }

  // viene creato un metodo a parte per la gestione dell'evento, questo perchè se lasciassimo la
  // callback all'interno dell onChange, verrebbe inizializzata ogni volta. Al contrario in un metodo
  // a parte verrebbe salvata in memoria e richiamata quando necessario.
  onSearchChange = (event) => {
    const searchField = event.target.value.toLocaleLowerCase();
    this.setState(() => {
      // se il nome della variabile dello state è lo stesso di quella che vogliamo
      // usare possiamo usare solo una volta il nome della variabile. react capisce
      // che deve inserire nella variabile dello state il valore della stessa variabile
      // definita nella funzione
      return { searchField };
    });
  };

  render() {
    // console.log("render");

    // al posto di usare sempr eil this si usa il "destructuring" di js dove vengono istanziate delle
    // variabili (nel contesto dove ci si trova). A dx si inserisce l'oggetto da cui prendere la variabile,
    // a sx dentro le {} si inserisce il nome della variabile e in automatico viene creata una variabile
    // con lo stesso valore della variabile presente nell'oggetto a destra.
    const { monsters, searchField } = this.state;
    const { onSearchChange } = this;

    //variabile inserita
    const monstersFiltered = monsters.filter((monster) => {
      return monster.name.toLocaleLowerCase().includes(searchField);
    });

    return (
      <div className="App">
      <h1 className="app-title">Monsters Rolodex</h1>
        <SearchBox onChangeHandler = {onSearchChange} placeholder = {'search-box'} classname = {'monsters-search-box'}/>
        <CardList monsters = {monstersFiltered}/>
      </div>
    );
  }
}

export default App;
