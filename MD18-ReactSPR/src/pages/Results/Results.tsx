import React, { useState, useEffect } from "react";
import { getResults } from "../../components/api/Client";
import { useTranslation } from 'react-i18next';
import style from "./Results.module.scss"

interface Result {
  id: number;
  created_at: string;
  winnerLives: number;
}

const ResultsList = () => {
    const {t} = useTranslation();

  const [results, setResults] = useState<Result[]>([]);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const data = await getResults();
        setResults(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchResults();
  }, []);

  const formatDate = (dateString: string): string => {
    const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="wrapper">
    <table className={style.table}>
      <thead className={style.head}>
        <tr>
          <th className={style.headCell}><h6>Winner</h6></th>
          <th className={style.headCell}><h6>Lives</h6></th>
          <th className={style.headCell}><h6>Created At</h6></th>
        </tr>
      </thead>
      <tbody>
        {results
          .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
          .map((result) => (
            <tr className={style.row} key={result.id}>
              <td className={style.rowCell}>{result.winnerLives > 0 ? "Player" : "Robot"}</td>
              <td className={style.rowCell}>{Math.abs(result.winnerLives)}</td>
              <td className={style.rowCell}>{formatDate(result.created_at)}</td>
            </tr>
          ))}
      </tbody>
    </table>
    </div>
  );
};

export default ResultsList;