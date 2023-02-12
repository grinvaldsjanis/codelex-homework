import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { addArticle } from "../api/Client";

type NewArticleFormProps = {};

const NewArticleForm: React.FC<NewArticleFormProps> = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [article, setArticle] = useState({
    id: null,
    title: "",
    intro: "",
    body: "",
    image: "",
  });

  const createArticleMutation = useMutation({
    mutationFn: addArticle,
    onSuccess: (data) => {
      queryClient.setQueryData(["articles", data.id], data);
      queryClient.invalidateQueries(["articles"]);
      navigate(`/article/${data.id}`);
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createArticleMutation.mutate({
      title: article.title,
      intro: article.intro,
      body: article.body,
      image: article.image,
    });
  };

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setArticle({ ...article, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        value={article.title}
        onChange={handleChange}
      />
      <textarea name="intro" value={article.intro} onChange={handleChange} />
      <textarea name="body" value={article.body} onChange={handleChange} />
      <button type="submit" disabled={createArticleMutation.isLoading}>
        {createArticleMutation.isLoading ? "Loading..." : "Create"}
      </button>
    </form>
  );
};

export default NewArticleForm
