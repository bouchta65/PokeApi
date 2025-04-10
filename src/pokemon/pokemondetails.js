import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

function PokemonDetail() {
  const { id } = useParams(); 
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then(res => {
        setPokemon(res.data); 
      }).catch(console.error());
      ;
  }, [id]);

  if (!pokemon) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-xl p-6 mt-6">
    <div className="flex flex-col items-center">
      <h1 className="text-4xl font-bold capitalize text-indigo-600">{pokemon.name}</h1>
      <img
        src={pokemon.sprites.front_default}
        alt={pokemon.name}
        className="w-40 h-40 my-4"
      />
    </div>
  
    <div className="grid grid-cols-2 gap-4 mt-4 text-sm text-gray-700">
      <p><span className="font-semibold">ID:</span> {pokemon.id}</p>
      <p><span className="font-semibold">Base Experience:</span> {pokemon.base_experience}</p>
      <p><span className="font-semibold">Height:</span> {pokemon.height}</p>
      <p><span className="font-semibold">Weight:</span> {pokemon.weight}</p>
    </div>
  
    <div className="mt-6">
      <h2 className="text-lg font-semibold text-indigo-500 mb-2">Types</h2>
      <div className="flex gap-2">
        {pokemon.types.map((type, i) => (
          <span key={i} className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm">
            {type.type.name}
          </span>
        ))}
      </div>
    </div>
  
    <div className="mt-6">
      <h2 className="text-lg font-semibold text-green-500 mb-2">Abilities</h2>
      <ul className="list-disc list-inside text-gray-800">
        {pokemon.abilities.map((ability, i) => (
          <li key={i} className="capitalize">{ability.ability.name}</li>
        ))}
      </ul>
    </div>
  
    <div className="mt-6">
      <h2 className="text-lg font-semibold text-yellow-500 mb-2">Stats</h2>
      <ul className="space-y-1">
        {pokemon.stats.map((stat, i) => (
          <li key={i} className="flex justify-between">
            <span className="capitalize">{stat.stat.name}</span>
            <span className="font-semibold">{stat.base_stat}</span>
          </li>
        ))}
      </ul>
    </div>
  
    <div className="mt-6">
      <h2 className="text-lg font-semibold text-blue-500 mb-2">Sprites</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {Object.entries(pokemon.sprites)
          .filter(([key, val]) => typeof val === 'string' && val)
          .map(([key, val]) => (
            <div key={key} className="text-center">
              <img src={val} alt={key} className="w-20 h-20 mx-auto" />
              <span className="text-xs text-gray-600">{key.replace(/_/g, ' ')}</span>
            </div>
          ))}
      </div>
    </div>
  
    <div className="mt-6">
      <h2 className="text-lg font-semibold text-pink-500 mb-2">Moves (first 10)</h2>
      <ul className="grid grid-cols-2 gap-x-4 text-gray-800 text-sm list-disc list-inside">
        {pokemon.moves.slice(0, 10).map((move, i) => (
          <li key={i} className="capitalize">{move.move.name}</li>
        ))}
      </ul>
    </div>
  </div>
  
  );
}

export default PokemonDetail;
