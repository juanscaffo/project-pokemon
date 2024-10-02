import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Abilities = () => {
  const [pokemon, setPokemon] = useState([]);
  const params = useParams(); // hook de React Router que se utiliza para acceder a los parámetros de la URL

  useEffect(() => {
    if (params.id) {
      const url = `https://pokeapi.co/api/v2/pokemon/${params.id}/`;
      axios.get(url).then((res) => {
        setPokemon(res.data);
      });
    }
  }, [params.id]);

  return (
    <div className="abilities-container">
      <div className="card">
        <img
          className="img-pokemon"
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
          alt="img-pokemon"
        />
        <h5 className="name-card">{pokemon.name}</h5>
        <p className="id">#{pokemon.id}</p>
        <div className="types">
          <p>Experience: {pokemon.base_experience}</p>
          <p>Height: {pokemon.height}</p>
          <p>Weight: {pokemon.weight}</p>
        </div>
      </div>
    </div>
  );
};

export default Abilities;