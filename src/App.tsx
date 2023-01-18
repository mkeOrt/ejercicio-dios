import * as React from 'react';
import { useFetchCharacters } from './hooks/characters';
import CharacterCard from './components/CharacterCard';
import { ModalConfirm } from './ui/ModalConfirm';
import { createPortal } from 'react-dom';
import CharactersGrid from './components/CharactersGrid';

export default function App() {
  return <CharactersGrid />;
}
