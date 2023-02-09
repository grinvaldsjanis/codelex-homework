import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getArticle } from "../../components/Cient";

type ArticleProps = {
    articleId: string;
  };

const Article: React.FC<ArticleProps> = () => {
  const { articleId } = useParams();
  const [article, setArticle] = useState<any>({});
  const [isEditMode, setIsEditMode] = useState(false);
  // const history = useHistory();

  const { status: articleStatus, error: articleError } = useQuery(
    ["article", articleId],
    () => getArticle(articleId!),
    {
      onSuccess: (data) => setArticle(data),
    }
  );

  return (
    <div>
      {articleStatus === "loading" && <p>Loading article...</p>}
      {articleError && articleError instanceof Error && (
        <div>{articleError.message}</div>
      )}
      {articleStatus === "success" && article && (
        <>
          <h1>{article.title}</h1>
          <p>{article.body}</p>
        </>
      )}
    </div>
  );
};

export default Article;