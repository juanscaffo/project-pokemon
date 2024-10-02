import React from 'react'
import Card from '../Components/Card'
import { usePokemonState } from '../Context/GlobalContext'
import Button from '../Components/Button'
import Search from '../Components/Search'

const Home = () => {
  const {state, dispatch} = usePokemonState()// traemos el contexto global, asi podemos usar la api que jugardamos en la initialState en pokemon
  return (
    <main>
      
      <Search />
      {!state.searchActive && ( //el estado searchActive es true, si es lo opuesto o sea false, que rendirice esto, sino no.
        
        <div className="card-grid">
          
        {state.pokemon.map((pokemon,index)=>{ // recorremos el array pokemon, o sea la api y retornamos por cada objeto de la api una card
          return <Card pokemon={pokemon} key={index}>
            <Button onClick={()=>{
              alert('The pokemon was added to favourite')
              dispatch({type: "ADD_FAVORITES", payload: pokemon})
            }}>Add to fav</Button>
          </Card>
        })}
      </div>
      )}
      

    </main>
  )
}

export default Home