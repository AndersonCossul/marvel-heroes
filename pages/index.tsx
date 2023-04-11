import React, { useState } from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import Search from "../src/components/search";
import { SearchType } from "../src/models/Search";
import Details from "../src/components/details";
import Image from "next/image";
import MarvelLogo from "../public/images/marvel-logo.png";

export default function Home() {
  const [selectedCharacter, setSelectedCharacter] = useState(-1);
  const [selectedSearchType, setSelectedSearchType] = useState(SearchType.ALL);

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

        {selectedCharacter === -1 && <Search onSearch={onSearch} />}
        {selectedCharacter > -1 && (
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
