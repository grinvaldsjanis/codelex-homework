import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { addArticle } from "../api/Client";
import NewImageForm from "../NewImageForm/NewImageForm";
import style from "./NewArticleForm.module.scss"

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
    <form className={style.articleForm} onSubmit={handleSubmit}>
      <div className={style.formRow}>
      <div className={style.formColumn}>
      <label htmlFor="title">Title</label>
      <input
        className="input__field input--title"
        type="text"
        name="title"
        value={article.title}
        onChange={handleChange}
      />
      <label htmlFor="intro">Intro</label>
      <textarea
        className="input__field input--intro"
        name="intro"
        value={article.intro}
        onChange={handleChange}
      />
      <label htmlFor="body">Body</label>
      <textarea
        className="input__field input--body"
        name="body"
        value={article.body}
        onChange={handleChange}
      />
      </div>
      <div className="column">
      <NewImageForm />
      </div>
      </div>
      <button className="button" type="submit" disabled={createArticleMutation.isLoading}>
        {createArticleMutation.isLoading ? "Loading..." : "Create"}
      
      </button>
    </form>
  );
};

export default NewArticleForm;
