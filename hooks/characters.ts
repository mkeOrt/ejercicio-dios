import { useEffect, useState } from 'react';
import { Character } from '../models/character.model';

export function useFetchCharacters() {
  const url = 'https://rickandmortyapi.com/api/character';

  const [characters, setCharacters] = useState<Array<Character>>([]);

  const loadCharacters = async () => {
    const { results } = await fetch(url).then((res) => res.json());

    setCharacters(
      results
        .map((item) => ({
          id: item.id,
          name: item.name,
          species: item.species,
          image: item.image,
          locationUrl: item.location.url,
        }))
        .sort((a, b) => (a.name > b.name ? 1 : -1))
    );
  };

  useEffect(() => {
    loadCharacters();
  }, []);

  return {
    characters,
  };
}

export function useUpdateCharacter() {}
