import React, { createContext, useContext, useEffect, useReducer } from 'react'
import {reducer} from '../reducer/reducer'
import axios from 'axios';


const PokemonState = createContext();

const initialState = {
    pokemon: [],
    favorites: JSON.parse(localStorage.getItem('favorites')) || [],
    theme: 'light',
    searchActive: false, // el buscador comienza en false, asi podemos controlar en el home si mostrar las card cuando esto este en false // o si esta true(hay una busqueda) manejar el home para que no mostrar todas las card que comienza.
    filteredPokemons: [], // Añadido para almacenar los resultados filtrados
    searchError: false
}

const GlobalContext = ({children}) => {
    const [state, dispatch] = useReducer(reducer,initialState)
    const url = `https://pokeapi.co/api/v2/pokemon?limit=200`; // de la api de pokemon obtenemos los pokemon y lo limitamos en 200
    
    useEffect(()=>{
        axios(url)
        .then((res) => {
            // guardamos la primer api en una variable
            const listPokemon = res.data.results;

            // iteramos cada pokemon de la api que guardamos en listPokemon y por cada pokemon hacemos una solicitud a una url espicifica (que
            // esa url la sacamos de la pagina de apipokemon donde nos da info como por ejemplo img segun el nombre de pokemon)
            const detailedPokemonPromises = listPokemon.map(pokemon =>
                axios(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}/`).then(res => res.data)
            );
            //Promise.all es un metodo de js que toma un array de promesas (en este caso detailedPokmemonPromises) y espera que todas se resuelvan
            //Cuando todas se resolvieron se aplica el .then ejecuta y genera en detailedPokemon que es un array de cada promesa y a traves del
            //dispatch le pasamos la accion segun el reducer, en este caso nos va a traer este array con los detalles de los pokemon
            Promise.all(detailedPokemonPromises).then(detailedPokemon => {
                dispatch({ type: "GET_POKEMON", payload: detailedPokemon });
            }).catch(error => {
                console.error("Error fetching detailed pokemon data: ", error);
            });

           });

}, []);
  
    return (
   <PokemonState.Provider value = {{state,dispatch}}>
    {children}
   </PokemonState.Provider>
  )
}

export default GlobalContext

export const usePokemonState = ()=>{
    return useContext(PokemonState)
}