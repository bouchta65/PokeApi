import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Pokemon from './pokemon/pokeCard';
import PokemonDetail from './pokemon/pokemondetails';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Pokemon />} />
        <Route path="/pokemon/:id" element={<PokemonDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
