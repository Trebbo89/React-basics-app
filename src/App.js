import { useState, useEffect } from "react"; 
import CardList from "./components/card-list/card-list.component";
import SearchBox from "./components/search-box/search-box.component";
import "./App.css";

const App = () => {

  const [searchField, setSearchField] = useState(""); 
  const [title, setTitle] = useState("");
  const [monsters, setMonsters] = useState([]);
  const [filteredMonsters, setFilteredMonsters] = useState(monsters);
  
  //con la modalità strict il componente viene renderizzato 2 volte per catturare e risolvere eventuali comportamenti anomali del codice
  //con react 18 i log "doppi" sono grigi
  console.log("rendered");

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

  const onTitleChange = (event) => {
    const searchFieldString = event.target.value.toLocaleLowerCase();
    setTitle(searchFieldString);
  };

  return (
    <div className="App">
      <h1 className="app-title">{title}</h1>
      <SearchBox
        onChangeHandler={onTitleChange}
        placeholder='set Title'
        classname={"title-search-box"}
      />
      <br/>
      <SearchBox
        onChangeHandler={onSearchChange}
        placeholder={"search-box"}
        classname={"monsters-search-box"}
      />
      <CardList monsters={filteredMonsters} />
    </div>
  );
};

export default App;
