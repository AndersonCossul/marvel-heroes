import React from "react";
import { useState } from "react";
import CharacterModel from "../../models/Character";
import { SearchType } from "../../models/Search";
import styles from "./index.module.css";
import Button from "../Button";

type Props = {
  characters: CharacterModel[];
  onSearch: (characterId: number, searchType: SearchType) => void;
};

export default function Search({ characters, onSearch }: Props) {
  const [selectedCharacter, setSelectedCharacter] = useState(-1);
  const [selectedSearchType, setSelectedSearchType] = useState(SearchType.ALL);

  return (
    <div className={styles.container}>
      <div className={styles.labelContainer}>
        <label>
          Qual personagem da MARVEL você quer saber sobre a cronologia?
        </label>
        <select
          className={styles.select}
          value={selectedCharacter}
          onChange={(e: any) => setSelectedCharacter(e.target.value)}
        >
          <option value="-1" disabled>
            Selecione
          </option>
          {characters.map((character) => (
            <option key={character.id} value={character.id}>
              {character.name}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.labelContainer}>
        <label>
          Vocês gostaria de saber a ordem cronológica de filmes ou comics?
        </label>
        <select
          className={styles.select}
          value={selectedSearchType}
          onChange={(e: any) => setSelectedSearchType(e.target.value)}
        >
          <option value={SearchType.ALL}>Todos</option>
          <option value={SearchType.MOVIES}>Filmes</option>
          <option value={SearchType.COMICS}>Comics</option>
        </select>
      </div>

      <Button
        disabled={selectedCharacter === -1}
        onClick={() => onSearch(selectedCharacter, selectedSearchType)}
      >
        Buscar
      </Button>
    </div>
  );
}
