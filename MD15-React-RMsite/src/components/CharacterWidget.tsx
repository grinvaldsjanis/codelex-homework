import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import getData from "../fetchers/getData";

function CharacterWidget({ id }) {
  const { data, status } = useQuery({
    queryKey: ["character", id],
    queryFn: () => getData(`https://rickandmortyapi.com/api/character/${id}`),
  });

  if (status === "loading") return <p>Loading...</p>;
  if (status === "error") return <p>Error...</p>;

  return (
    <article key={id}>
      <Link to={`/character/${id}`}>
        <h6>{data.name}</h6>
      </Link>
    </article>
  );
}

export default CharacterWidget;
