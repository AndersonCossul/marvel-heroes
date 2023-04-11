import React, { useEffect, useState } from "react";
import { SearchType } from "../../models/Search";
import SerieModel from "../../models/Serie";
import ComicModel from "../../models/Comic";
import styles from "./index.module.css";
import Button from "../Button";

type Props = {
  characterId: number;
  searchType: SearchType;
  onReturn: () => void;
};

export default function Details({ characterId, searchType, onReturn }: Props) {
  const [movies, setMovies] = useState<SerieModel[]>([]);
  const [loadingMovies, setLoadingMovies] = useState(true);
  const [comics, setComics] = useState<ComicModel[]>([]);
  const [loadingComics, setLoadingComics] = useState(true);

  const getMovies = async () => {
    setLoadingMovies(true);
    const res = await fetch(
      `https://gateway.marvel.com:443/v1/public/series?apikey=563e89dd60d1975d1139130e7b486b2a&characters=${characterId}&limit=100`
    );
    const json = await res.json();
    if (json.data.results) {
      setMovies(json.data.results);
    }
    setLoadingMovies(false);
  };

  const getComics = async () => {
    setLoadingComics(true);
    const res = await fetch(
      `https://gateway.marvel.com:443/v1/public/comics?apikey=563e89dd60d1975d1139130e7b486b2a&characters=${characterId}&limit=100`
    );
    const json = await res.json();
    if (json.data.results) {
      setComics(json.data.results);
    }
    setLoadingComics(false);
  };

  useEffect(() => {
    console.log(characterId, searchType);
    if (searchType == SearchType.ALL || searchType == SearchType.MOVIES) {
      getMovies();
    }
    if (searchType == SearchType.ALL || searchType == SearchType.COMICS) {
      getComics();
    }
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.containerList}>
        {(searchType == SearchType.ALL || searchType == SearchType.MOVIES) && (
          <div>
            <h2>Filmes</h2>
            {loadingMovies && <p>Carregando...</p>}
            {!loadingMovies &&
              movies.map((movie) => <p key={movie.id}>{movie.title}</p>)}
            {!loadingMovies && !movies.length && (
              <p>Nenhuma informação disponível.</p>
            )}
          </div>
        )}

        {(searchType == SearchType.ALL || searchType == SearchType.COMICS) && (
          <div>
            <h2>Comics</h2>
            {loadingComics && <p>Carregando...</p>}
            {!loadingComics &&
              comics.map((comic) => <p key={comic.id}>{comic.title}</p>)}
            {!loadingComics && !comics.length && (
              <p>Nenhuma informação disponível.</p>
            )}
          </div>
        )}
      </div>

      <Button onClick={onReturn}>Voltar</Button>
    </div>
  );
}
