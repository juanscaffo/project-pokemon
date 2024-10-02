export const reducer = (state,action) => {
    switch (action.type) {
        case "GET_POKEMON":
            return {...state, pokemon: action.payload}
        case "GET_ABILITIES_POKEMON":
            return {...state, pokemon: action.payload}
        case "ADD_FAVORITES":
            // Verificar si el favorito ya está en la lista
            // some => Este método prueba si al menos un elemento en el array cumple con la condición implementada por la función proporcionada.
            /* fav es cada elemento del array state.favorites mientras .some() itera sobre ellos.
            La condición que se evalúa es fav.id === action.payload.id, lo que significa que se está comprobando
            si el id del elemento actual (fav) es igual al id del payload que se ha pasado en la acción. */
              const isAlreadyFavorite = state.favorites.some(fav => fav.id === action.payload.id); 
              if (isAlreadyFavorite) {
                  return state; // Si ya está en favoritos, no hacer nada
              }
              return { ...state, favorites: [...state.favorites, action.payload] };
        case "DELETE_FAVORITES":
            return {...state, favorites:state.favorites.filter(fav => fav.id !== action.payload.id)};
        case "SET_SEARCH_ACTIVE":
              return {...state,searchActive: action.payload};
        case "SET_FILTERED_POKEMON":
            return { ...state, filteredPokemons: action.payload };
            case "SET_SEARCH_ERROR":
             return { ...state, searchError: action.payload }; 
        
        default:
            return state
    }
 
    

    }