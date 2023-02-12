// NewArticle.tsx
import { useQueryClient } from "@tanstack/react-query";
import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import NewArticleForm from "../../components/NewArticleForm/NewArticleForm";

const NewArticlePage: React.FC = () => {
  const { id } = useLocation().state || {};

  // Redirect to the new article page
  if (id) {
    return <Navigate to={`/article/${id}`} />;
  }

  return (
    <div>
      <h1>Create a new article</h1>
      <NewArticleForm />
    </div>
  );
};

export default NewArticlePage;
