import React, { useState } from "react";
import Article from "../../components/Article/Article";
import Comments from "../../components/Comments/Comments";
import CommentForm from "../../components/CommentForm/CommentForm";
import { useParams } from "react-router-dom";


const ArticlePage: React.FC = () => {
  const { articleId = "" } = useParams();
  const [refetch, setRefetch] = useState(() => () => {});

  const handlePostComment = (cb: () => void) => {
    setRefetch(cb);
  };

  return (
    <div className="wrapper">
      <Article articleId={articleId} />
      {/* <Article articleId={articleId} body{body} editArticle{editArticle} /> */}
      <Comments articleId={articleId} refetch={refetch} />
      <CommentForm articleId={articleId} onPostComment={handlePostComment} />
    </div>
  );
};

export default ArticlePage;
