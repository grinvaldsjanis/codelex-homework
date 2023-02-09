import { Link } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import getData from "../../fetchers/getData";
import style from "./Characters.module.scss";
import PersonCard from "../../components/PersonCard/PersonCard";
import { useEffect, useState } from "react";

function Characters() {
  const location = useLocation();
  const [pageSearch, setPageSearch] = useState("");

  useEffect(() => {
    setPageSearch(location.search);
  }, [location.search]);

  const { status, data } = useQuery({
    queryKey: ["characters"],
    queryFn: () =>
      getData(`https://rickandmortyapi.com/api/character/${pageSearch}`),
  });

  // https://rickandmortyapi.com/api/character/?page=2"

  function parseTail(url: string): string {
    const arr = url.split("/").filter(Boolean);
    const tail: string = arr[arr.length - 1];
    return tail;
  }

  if (status === "loading") return <p>Loading...</p>;
  if (status === "error") return <p>Error...</p>;

  return (
    <div className="wrapper">
      <h2>Characters</h2>
      <div className={style.container}>
        {data.results.map(
          (person: {
            id: number;
            name: string;
            gender: string;
            species: string;
            image: string;
          }) => {
            return PersonCard(person);
          }
        )}
      </div>
      <div className="page-navigation">
        {data.info.next ? (
          <Link to={`/characters/${parseTail(data.info.next)}`}>NEXT</Link>
        ) : (
          <div> No Next </div>
        )}
      </div>
    </div>
  );
}

export default Characters;
