import { Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getArticles,
  deleteArticle,
  imageURL,
} from "../../components/api/Client";
import style from "./BlogPage.module.scss";
import { useState } from "react";

const BlogPage: React.FC = () => {
  const queryClient = useQueryClient();
  const [deletingArticleId, setDeletingArticleId] = useState<null | number>(
    null
  );

  const { status, data: articlesData } = useQuery(["articles"], () =>
    getArticles()
  );

  const deleteArticleMutation = useMutation({
    mutationFn: deleteArticle,
    onSuccess: () => {
      queryClient.invalidateQueries(["articles"]);
      setDeletingArticleId(null);
    },
  });

  const handleDeleteArticle = (id: number) => {
    setDeletingArticleId(id);
    deleteArticleMutation.mutate(id);
  };

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
                <img
                  className={style.thumbNail}
                  src={imageURL + article.image}
                  alt={"image"}
                />
                <h6>{article.title}</h6>
                <p className="small-date">{article.author}</p>
              </Link>
              <button
                onClick={() => handleDeleteArticle(article.id)}
                disabled={deleteArticleMutation.isLoading}
              >
                Delete
              </button>
            </article>
          )
        )}
      </div>
    </div>
  );
};

export default BlogPage;
