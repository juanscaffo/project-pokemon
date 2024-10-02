import React, { useEffect } from 'react'
import { usePokemonState } from '../Context/GlobalContext'
import Card from '../Components/Card'
import Button from '../Components/Button'

const Favorites = () => {
  const {state,dispatch} = usePokemonState()// traemos el contexto global ya que vamos a utlizar el array de favoritos
  
  useEffect(()=>{
    const favoriteString = localStorage.getItem('favorites');
    if(favoriteString){
      const favorites = JSON.parse(favoriteString)
      dispatch({type: "SET_FAVORITES", payload: favorites})
    }
  },[dispatch]);

  useEffect(()=>{
    localStorage.setItem('favorites',JSON.stringify(state.favorites))
  },[state.favorites])
  return (
    <> 
     
      <div className="card-grid">
      {state.favorites.map(fav => ( // recorremos el array favorites del contexto global el cual va a tener los pokemon que se agregan del home
        <Card pokemon={fav} key={fav.id}> {/* por cada fav(pokemonfavorito) se va a renderizar una card */} 
          <Button onClick={()=>{ // le agregamos un boton para eliminar la card
            dispatch({type:"DELETE_FAVORITES", payload: fav})
          }} >DELETE</Button>
        </Card>
      ))}

      </div>
      </>
  )
}

export default Favorites