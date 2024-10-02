import Card from "./Card";
import { usePokemonState } from "../Context/GlobalContext";
import { useState } from "react";
import Button from "./Button";

const Search = () => {
  const { state, dispatch } = usePokemonState();
  const [searchPokemon, setSearchPokemon] = useState("");

  //Creamos una funcion que va a manejar la busqueda y se ejecuta cuando el usuario escribe en el campo de busqueda eso se guarde
  //en el estado creado(searchPokemon)
  const handleSearch = (e) => {
    setSearchPokemon(e.target.value.toLowerCase());
    // Cuando el campo de búsqueda está vacío, mostrar todas las cartas y borrar el mensaje de error
    if (e.target.value === "") {
      dispatch({ type: "SET_FILTERED_POKEMON", payload: state.pokemon });
      dispatch({ type: "SET_SEARCH_ACTIVE", payload: false });
      dispatch({ type: "SET_SEARCH_ERROR", payload: false });
    }
  };

  // Función que ejecuta la búsqueda
  const performSearch = () => {
    // el metodo filter crea un nuevo array en este caso recorremos el array de pokemon donde si el name de pokemon incluye el name
    // de lo que se escribio en el buscador(searchPokemon) actualice el estado de filteredPokemon con ese valor
    const filtered = state.pokemon.filter((pokemon) =>
      pokemon && pokemon.name && pokemon.name.toLowerCase().includes(searchPokemon)
    );
    /* si no hay coincidencias, la longuitud de esa busqueda va a ser 0 porque no habra coincidencias, entonces searchError
    en el estado global sera true */
    if (filtered.length === 0) {
      dispatch({ type: "SET_FILTERED_POKEMON", payload: [] }); // Limpiar filteredPokemons
      dispatch({ type: "SET_SEARCH_ERROR", payload: true });
    } else {
      /* este dispatch guarda el name que coincide en el array del contextoglobal filteredPokemons, asi sabemos que card vamos a mostrar*/
      dispatch({ type: "SET_FILTERED_POKEMON", payload: filtered });
      /*este dispatch es el que va a manejar el searchActive del contexto global (a traves del reducer) para que si pasa que se encuentra
      un card que coincide el nombre, o sea que hay una busqueda cel searchActive cambie a true, recordar que si es true el home no va a 
      mostrar todas las card y si es false si el home va a mostrar todas las card*/
      dispatch({ type: "SET_SEARCH_ACTIVE", payload: true });

      dispatch({ type: "SET_SEARCH_ERROR", payload: false });
    }
  };

  // Función para manejar la tecla Enter
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      performSearch();
    }
  };

  return (
    <>
    <div className="container-search">
      <input 
        className="search"
        type="text"
        onChange={handleSearch}
        onKeyPress={handleKeyPress}
        placeholder="Search"
        value={searchPokemon}
      />
      {/* si hacen click en el boton se ejecuta la funcion performSearch */}
      <Button onClick={performSearch}>Search</Button>
      </div>
        {/* Muestra el mensaje de error si searchError es true o sea si no hay coincidencias */}
        {state.searchError && (
          <p className="msj-error">No matches found for the entered name.</p>
        )}
        <div className="card-grid">
        
        {state.filteredPokemons.map((pokemon, index) => (
          <Card pokemon={pokemon} key={index}>
         <Button onClick={()=>{
              alert('The pokemon was added to favourite')
              dispatch({type: "ADD_FAVORITES", payload: pokemon})
            }}>Add to fav</Button>
        </Card>
        ))}
      </div>
    </>
  );
};

export default Search;