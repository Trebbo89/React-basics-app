import { useState, useEffect } from "react"; //hook
import CardList from "./components/card-list/card-list.component";
import SearchBox from "./components/search-box/search-box.component";
import "./App.css";

//functional components
const App = () => {

  const [searchField, setSearchField] = useState(""); // [value, setValue]
  const [monsters, setMonsters] = useState([]);
  const [filteredMonsters, setFilteredMonsters] = useState(monsters);
  
  //componente aggiuntivo in fase di test per verificare che il componente viene renderizzato
  //ogni volta che una qualsiasi proprietà dello state cambia
  const [stringField, setStringField] = useState("");


  /* Per i componenti funzionali ognivolta che viene ri - renderizzato qualcosa react riesgue
  l'intera funzione del componente dall'inzio alla fine
  Il re - render è richiamamto perche è stata cambiata una propietà dello state utilizzato
  con l hook. */
  console.log("render");

  /* 
  RENDERING INFINITO
  se inseriamo la fecth degli users all'interno del componente avremo un loop infinito di 
  rendering; questo perche ogni volta che viene settato l'array per i monsters, esso
  è legato ad un oggetto in memoria sempre differente. A quel punto il rendering sarà infinito.
  Per risolvere questo problema bsigona usare i sideEffects (particolari procedure che vanno
  ad impattare/modificare variabili/oggetti che si trovano al di fuori di questo scope.)
  Il sideEffect di cui stiamo parlando è l'HOOK 'useEffect' */

  /* fetch("https://jsonplaceholder.typicode.com/users")
    .then((response) => response.json())
    .then((users) => setMonsters(users)); */
  /*
  
  USEEFFECT
  
  questo hook prende in input una callback (dove sara contenuto tutto il codice da far 
  eseguire) e un secondo argomento, un array di dipendenze. Lo useEffect viene lanciato ogni
  volta che il valore dei campi dentro l'array di dipendenze cambia. In questo esempio 
  viene passato vuoto perchè vogliamo che lo useEffect venga chiamato solo una volta, ossia 
  dopo il mounting del componente. */
  
  useEffect(() => {
    console.log('EFFEcT FIRED')
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((users) => setMonsters(users));
  }, []);

  useEffect(() => {
    const newFilteredMonsters =  monsters.filter((monster) => {
      return monster.name.toLocaleLowerCase().includes(searchField);
    });
    console.log('effect if fireing');
    setFilteredMonsters(newFilteredMonsters);
  }, [monsters, searchField]);


  const onSearchChange = (event) => {
    const searchFieldString = event.target.value.toLocaleLowerCase();
    setSearchField(searchFieldString);
  };

  /* evento inserito per far vedere che ad ogni proprietà dello state all'interno del componente
  se corrisponde una modifica, viene ri renderizzato il tutto. Questo onChange è stato
  inserito dentro il componente input set string */
  const onStringChange = (event) => {
    setStringField(event.target.value);
  }

  return (
    <div className="App">
      <h1 className="app-title">Monsters Rolodex</h1>
      <SearchBox
        onChangeHandler={onSearchChange}
        placeholder={"search-box"}
        classname={"monsters-search-box"}
      />
      <SearchBox
        onChangeHandler={onStringChange}
        placeholder={"set string"}
      />
      <CardList monsters={filteredMonsters} />
    </div>
  );
};

export default App;
