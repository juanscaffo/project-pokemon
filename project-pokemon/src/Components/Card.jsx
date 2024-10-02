import React from 'react'
import { Link } from 'react-router-dom'

const Card = ({pokemon,children}) => {// tiene como props item y un children para poder agregarle cosas al card en donde lo renderizemos

 
    const { name,types,id } = pokemon // desesctrucutramos item con los datos que vamos a usar de la api con los detalles 
    

  return (
    <div className='card'>
     <Link to={`/abilities/${id}`}> {/* hacemos que si tocan lo que esta dentro de la card vaya a la page las hablidades */}
      
      <img className='img-pokemon' src= {`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`} alt="" />
     <h5 className='name-card'>{name}</h5>
     <p className='id'>#{id}</p>
     <div className='types'>
      <p>Type:</p>
          {types && types.map((typeInfo, index) => ( // Verificación añadida para `types`
            <span key={index} className='type'>
              {typeInfo.type.name}
            </span>
          ))}
        </div>
     </Link>
    {children}
    </div>
  )
}

export default Card