import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import getData from "../../fetchers/getData";
import style from "./Episodes.module.scss"

export default function Episodes() {
  const { data, status } = useQuery({
    queryKey: ["episodes"],
    queryFn: () => getData("https://rickandmortyapi.com/api/episode"),
  });

  if (status === "loading") {
    return <p>Loading...</p>;
  }
  if (status === "error") {
    return <p>Error...</p>;
  }

  return (
    <div className="wrapper">
      <h2>Episodes</h2>
      <div className={style.container}>
      {data.results.map(
        (episode: {
          id: number;
          episode: string;
          name: string;
          air_date: string;
        }) => (
        
          <article className={style.rowEpisode} key={episode.id}>
            <Link to={`/episode/${episode.id}`}>
              <h6>
                {episode.episode} - {episode.name} 
              </h6>
              <p className="small-date">{episode.air_date}</p>
            </Link>
          </article>
        )
      )}
      </div>
    </div>
  );
}
