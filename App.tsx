import * as React from 'react';
import { useFetchCharacters } from './hooks/characters';
import CharacterCard from './components/CharacterCard';

export default function App() {
  const { characters } = useFetchCharacters();

  return (
    <React.Fragment>
      <div className="container-fluid mt-3">
        <div className="row">
          {characters.map((character) => (
            <div key={character.id} className="col-md-3 mb-3">
              <CharacterCard character={character} />
            </div>
          ))}
        </div>
      </div>
    </React.Fragment>
  );
}
