import React, { useEffect, useState } from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import Search from "../src/components/search";
import CharacterModel from "../src/models/Character";
import { SearchType } from "../src/models/Search";
import Details from "../src/components/details";
import Image from "next/image";
import MarvelLogo from "../public/images/marvel-logo.png";

export default function Home() {
  const [characters, setCharacters] = useState<CharacterModel[]>([]);
  const [selectedCharacter, setSelectedCharacter] = useState(-1);
  const [selectedSearchType, setSelectedSearchType] = useState(SearchType.ALL);
  const [isLoading, setLoading] = useState(false);

  const fetchCharacters = async () => {
    let localCharacters = [];
    const res = await fetch(
      `https://gateway.marvel.com:443/v1/public/characters?apikey=563e89dd60d1975d1139130e7b486b2a&limit=100`
    );

    const json = await res.json();
    localCharacters = [...localCharacters, ...json.data.results];

    const total = json.data.total;

    while (localCharacters.length < total) {
      const res = await fetch(
        `https://gateway.marvel.com:443/v1/public/characters?apikey=563e89dd60d1975d1139130e7b486b2a&offset=${localCharacters.length}&limit=100`
      );
      const json = await res.json();
      localCharacters = [...localCharacters, ...json.data.results];
    }

    setCharacters(localCharacters);
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    fetchCharacters();
  }, []);

  const onSearch = (characterId: number, searchType: SearchType) => {
    setSelectedCharacter(characterId);
    setSelectedSearchType(searchType);
  };

  return (
    <>
      <Head>
        <title>Marvel Heroes</title>
        <meta
          name="description"
          content="Saiba mais sobre o mundo da marvel!"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.logoContainer}>
          <Image src={MarvelLogo} alt="Marvel" width={120} />
          <p>
            <strong>
              Olá, sejam todos muito
              <br /> bem vindos ao nosso
              <br /> grande universo.
            </strong>
          </p>
        </div>

        {isLoading && <p>Carregando...</p>}
        {!isLoading && selectedCharacter === -1 && (
          <Search characters={characters} onSearch={onSearch} />
        )}
        {!isLoading && selectedCharacter > -1 && (
          <Details
            characterId={selectedCharacter}
            searchType={selectedSearchType}
            onReturn={() => setSelectedCharacter(-1)}
          />
        )}
      </main>
    </>
  );
}
