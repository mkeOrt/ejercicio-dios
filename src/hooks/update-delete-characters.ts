import { useEffect, useState, useCallback } from 'react';

export function useUpdateDeleteCharacters( setCharacters ) {
	const [characterToDelete, setCharacterToDelete] = useState({
		id: 1,
		name: '',
	});

	const [showAlert, setShowAlert] = useState(false);

	const changeCharacterAttribute = (id: number, attr: {}) => {
		setCharacters((prev) =>
			prev.map((el) => (el.id === id ? Object.assign(el, attr) : el))
		);
	};

	const deleteCharacter = (id: number) => {
		setCharacters((prev) => prev.filter((el) => el.id !== id));
	};

	const onDeleteCharacter = ({ id, name }) => {
		setCharacterToDelete({ id, name });
	};

	const cachedDeleteCharacter = useCallback(() => {
		deleteCharacter(characterToDelete.id);
		setShowAlert(true);
		setTimeout(() => setShowAlert(false), 1500);
	}, [characterToDelete]);

	return {
		cachedDeleteCharacter,
		changeCharacterAttribute,
		showAlert,
		onDeleteCharacter,
		characterToDelete
	};
}
