import React, { useState } from "react";
import Article from "../../components/Article/Article";
import Comments from "../../components/Comments/Comments";
// import CommentForm from "../../components/CommentForm/CommentForm";
import { useParams } from "react-router-dom";


const ArticlePage: React.FC = () => {
  const  { articleId }  = useParams();
  
  return (
    <div className="wrapper">
      <Article articleId={+articleId!} />
      <Comments articleId={+articleId!}/>
      {/* <CommentForm articleId={articleId} onPostComment={handlePostComment} /> */}
    </div>
  );
};

export default ArticlePage;
