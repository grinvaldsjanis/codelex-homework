import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import getData from "../../fetchers/getData";
import CharacterWidget from "../../components/CharacterWidget";
import style from "./Episode.module.scss";

function Episode() {
  const { episodeId } = useParams();
  const { data, status } = useQuery({
    queryKey: ["episode", episodeId],
    queryFn: () =>
      getData(`https://rickandmortyapi.com/api/episode/${episodeId}`),
  });

  if (status === "loading") return <p>Loading...</p>;
  if (status === "error") return <p>Error...</p>;

  return (
    <div className="wrapper">
      <h2>{data.name}Cooool</h2>
      <div>{data.air_date}</div>
      <br />
      <h4>Characters</h4>
      <div className={style.container}>
      {data.characters.map((char: string) => {
        const characterUrlParts = char.split("/").filter(Boolean);
        const characterId = characterUrlParts[characterUrlParts.length - 1];
        return <CharacterWidget id={characterId} key={characterId} />;
      })}
      </div>
    </div>
  );
}

export default Episode;
