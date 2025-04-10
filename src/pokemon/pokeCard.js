import { Link } from 'react-router-dom'; 
import { useEffect, useState } from 'react';
import axios from 'axios';
function Pokemon() {
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    axios.get("https://pokeapi.co/api/v2/pokemon?limit=500")
      .then(res => {
        const results = res.data.results;
        Promise.all(results.map(p => axios.get(p.url)))
          .then(responses => {
            const allData = responses.map(r => r.data);
            setPokemons(allData);
          });
      });
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold text-center mb-6">Pokémon List</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4">
        {pokemons.map(pokemon => (
          <Link key={pokemon.id} to={`/pokemon/${pokemon.id}`}>
            <div className="bg-white shadow-md rounded-2xl p-4 flex flex-col items-center transition-transform hover:scale-105 hover:shadow-xl">
              <img src={pokemon.sprites.front_default} className="w-24 h-24" alt={pokemon.name} />
              <h3 className="mt-4 text-lg font-semibold capitalize text-gray-800">{pokemon.name}</h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Pokemon;
