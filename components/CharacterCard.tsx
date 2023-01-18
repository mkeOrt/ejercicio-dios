import * as React from 'react';
import { useFetchLocation } from '../hooks/location';
import { Character } from '../models/character.model';

export default function CharacterCard({
  character,
  onChangeCharacterAttribute,
  onDeleteCharacter,
}: {
  character: Character;
  onChangeCharacterAttribute: (id: number, localCharacter: {}) => void;
  onDeleteCharacter: (character: {}) => void;
}) {
  const [localCharacter, setLocalCharacter] = React.useState({
    name: character.name,
    species: character.species,
    id: character.id,
  });

  const saveLocalCharacter = () => {
    setIsEditing(false);
    onChangeCharacterAttribute(character.id, localCharacter);
  };

  const [isEditing, setIsEditing] = React.useState(false);

  const { location } = useFetchLocation(character?.locationUrl);

  const characterMainData = (
    <div className="card-body">
      <h5 className="card-title">{character.name}</h5>
      <h6 className="card-subtitle mb-2 text-muted">{character.species}</h6>
    </div>
  );

  const characterEditingMainData = (
    <div className="card-body">
      <label htmlFor="character-name" className="form-label">
        Name
      </label>
      <input
        id="character-name"
        className="form-control"
        placeholder="Deberia aparecer el nombre actual"
        value={localCharacter.name}
        onChange={(e) =>
          setLocalCharacter((prev) => ({ ...prev, name: e.target.value }))
        }
        onKeyDown={(e) => e.key === 'Enter' && saveLocalCharacter()}
      ></input>
      <label htmlFor="character-name" className="form-label">
        Species
      </label>
      <input
        id="character-species"
        className="form-control"
        placeholder="Deberia aparecer la especie actual"
        value={localCharacter.species}
        onChange={(e) =>
          setLocalCharacter((prev) => ({ ...prev, species: e.target.value }))
        }
        onKeyDown={(e) => e.key === 'Enter' && saveLocalCharacter()}
      ></input>
    </div>
  );

  const updateAndDeleteButtons = (
    <li className="list-group-item">
      <div className="row">
        <div className="col-md-6">
          <div className="d-grid gap-2">
            <button
              className="btn btn-success"
              onClick={() => setIsEditing(true)}
            >
              Edit
            </button>
          </div>
        </div>
        <div className="col-md-6">
          <div className="d-grid gap-2">
            <button
              className="btn btn-danger"
              type="button"
              data-bs-toggle="modal"
              data-bs-target="#staticBackdrop"
              onClick={() => {
                onDeleteCharacter(localCharacter);
              }}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </li>
  );

  const saveAndCanelButtons = (
    <li className="list-group-item">
      <div className="row">
        <div className="col-md-6">
          <div className="d-grid gap-2">
            <button
              className="btn btn-danger"
              onClick={() => {
                setIsEditing(false);
                setLocalCharacter({
                  name: character.name,
                  species: character.species,
                  id: character.id,
                });
              }}
            >
              Cancel
            </button>
          </div>
        </div>
        <div className="col-md-6">
          <div className="d-grid gap-2">
            <button
              onClick={() => saveLocalCharacter()}
              className="btn btn-success"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </li>
  );
  //onDeleteCharacter(character.id)
  return (
    <div className="card border-0 shadow-lg h-100">
      <img
        className="card-img-top"
        src={character.image}
        alt="character image"
      />

      {isEditing ? characterEditingMainData : characterMainData}
      <ul className="list-group list-group-flush">
        <li className="list-group-item">
          {location.name && (
            <span>
              <b>{location.name}:</b> {location.type}
            </span>
          )}
          <span></span>
        </li>
        {isEditing ? saveAndCanelButtons : updateAndDeleteButtons}
      </ul>
    </div>
  );
}
