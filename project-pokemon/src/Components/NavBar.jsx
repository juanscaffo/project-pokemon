import { Link } from 'react-router-dom'
import { routes } from '../Components/utils/routes'


const NavBar = () => {

  return (
    <div className="container-nav">
      <img className='img-navbar' src="https://1000logos.net/wp-content/uploads/2017/05/Pokemon-Logo.png" alt="pokemon" />
      <h1> <img className='pokeball' src="https://www.pngkey.com/png/full/144-1446994_pokeball-clipart-transparent-background-pokeball-png.png" alt="pokebola" /> Pokedex</h1>
      <nav className='nav-links'>
      <Link to={routes.home}> Home</Link>
      <Link to={routes.favorites}> Favorites</Link>
      </nav>
      
    </div>
    
  
    
  )
}

export default NavBar