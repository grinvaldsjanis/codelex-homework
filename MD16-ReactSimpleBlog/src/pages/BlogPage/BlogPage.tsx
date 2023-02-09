import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getArticles, imageURL } from "../../components/Cient";
import style from "./BlogPage.module.scss";

const BlogPage: React.FC = () => {
  const { status, data: articlesData } = useQuery(
    ["comments"],
    () => getArticles()
  );

  if (status === "loading") {
    return <p>Loading...</p>;
  }
  if (status === "error") {
    return <p>Error...</p>;
  }

  return (
    <div className="wrapper">
      <h2>Articles</h2>
      <div className={style.container}>
        {articlesData.map(
          (article: {
            id: number;
            title: string;
            author: string;
            intro: string;
            image: string;
          }) => (
            <article className={style.rowEpisode} key={article.id}>
              <Link to={`/article/${article.id}`}>
                <img className={style.thumbNail} src={imageURL + article.image} alt="" />
                <h6>{article.title}</h6>
                <p className="small-date">{article.author}</p>
              </Link>
            </article>
          )
        )}
      </div>
    </div>
  );
};

export default BlogPage;
