import { useEffect, useState,useCallback } from 'react';
import { Character } from '../models/character.model';

export function useFetchCharacters() {
  const url = 'https://rickandmortyapi.com/api/character';

  const [characters, setCharacters] = useState<Array<Character>>([]);

  const [characterToDelete, setCharacterToDelete] = useState({
    id: 1,
    name: '',
  });
  

  const [showAlert, setShowAlert] = useState(false);

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

  const changeCharacterAttribute = (id: number, attr: {}) => {
    setCharacters((prev) =>
      prev.map((el) => (el.id === id ? Object.assign(el, attr) : el))
    );
  };

  const deleteCharacter = (id: number) => {
    setCharacters((prev) =>
      prev.filter((el) => (el.id !== id))
    );
  };

  const onDeleteCharacter = ({ id, name }) => {
    setCharacterToDelete({ id, name });
  };

  const cachedDeleteCharacter = useCallback(() => {
    deleteCharacter(characterToDelete.id);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 1500);
  }, [characterToDelete]);

  useEffect(() => {
    loadCharacters();
  }, []);

  return {
    characters,
    changeCharacterAttribute,
    deleteCharacter,
    onDeleteCharacter,
    characterToDelete,
    showAlert,
    cachedDeleteCharacter
  };
}

export function useUpdateCharacter() {}
