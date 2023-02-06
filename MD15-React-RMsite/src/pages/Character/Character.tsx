import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import getData from "../../fetchers/getData";
import Location from "../../components/LocationWidget";
import EpisodeWidget from "../../components/EpisodeWidget";
import style from "./Character.module.scss";

function Character() {
  const { characterId } = useParams();
  const { status, data } = useQuery({
    queryKey: ["character", characterId],
    queryFn: () =>
      getData(`https://rickandmortyapi.com/api/character/${characterId}`),
  });

  if (status === "loading") return <p>Loading...</p>;
  if (status === "error") return <p>Error...</p>;

  const locationUrlPars = data.location.url.split("/").filter(Boolean);
  const locationId: number = locationUrlPars[locationUrlPars.length - 1];

  return (
    <div className="wrapper">
      <div className={style.rowContent}>
      <img className={style.charImg} src={data.image} alt="" />
      <div className={style.textContent}>
        <h2>{data.name}</h2>
        <div className={style.table}>
          <div className={style.row}>
            <div className={style.feature}>Gender</div>
            <div className={style.value}>{data.gender}</div>
          </div>
          <div className={style.row}>
            <div className={style.feature}>Status</div>
            <div className={style.value}>{data.status}</div>
          </div>
          <div className={style.row}>
            <div className={style.feature}>Species</div>
            <div className={style.value}>{data.species}</div>
          </div>
          <div className={style.row}>
            <div className={style.feature}>Origin</div>
            <div className={style.value}>{data.origin.name}</div>
          </div>
          <div className={style.row}>
            <div className={style.feature}>Location</div>
            <div className={style.value}>
              <Location id={locationId} />
            </div>
          </div>
        </div>
        </div>
        
      </div>
      <br />
      <h4>Episodes</h4>
      <div className={style.container}>
        {data.episode.map((episode: string) => {
          const episodeUrlParts = episode.split("/").filter(Boolean);
          const episodeId = episodeUrlParts[episodeUrlParts.length - 1];

          return <EpisodeWidget id={episodeId} key={`episode-${episodeId}`} />;
        })}
      </div>
    </div>
  );
}

export default Character;
