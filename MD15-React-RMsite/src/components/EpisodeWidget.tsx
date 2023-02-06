import { useQuery } from "@tanstack/react-query";
import getData from "../fetchers/getData";
import { Link } from "react-router-dom";

function Episode({id}) {
    const { data, status } = useQuery({
      queryKey: ["episode", id],
      queryFn: () => getData(`https://rickandmortyapi.com/api/episode/${id}`),
    });
  
    if (status !== "success") {
      return null;
    }
  
    return (
      <article key={id}>
        <Link to={`/episode/${id}`}>
          <h6>
            {data.episode}. {data.name}
          </h6>
          <p className="small-date">{data.air_date}</p>
        </Link>
      </article>
    );
  }

  export default Episode