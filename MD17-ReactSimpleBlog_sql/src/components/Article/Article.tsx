import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import style from "./Article.module.scss";
import { getArticle, updateArticle, imageURL} from "../api/Client";

type ArticleProps = {
  articleId: number;
};

const Article: React.FC<ArticleProps> = ({ articleId }) => {
  const queryClient = useQueryClient();
  // const { articleId } = useParams<{ articleId: string }>();

  const [article, setArticle] = useState<{
    title: string;
    intro: string;
    body: string;
    image: string;
  }>({
    title: "",
    intro: "",
    body: "",
    image: "",
  });

  const { data, error } = useQuery(["article", articleId], () =>
    getArticle(articleId)
  );

  const [isEditMode, setIsEditMode] = useState(false);

  const { mutate, status: updateStatus } = useMutation({
    mutationFn: () => updateArticle(articleId!, article),
    onSuccess: () => {
      queryClient.invalidateQueries(["article", articleId]);
    },
  });

  

  const handleEditClick = () => {
    setArticle({
      title: data.title,
      intro: data.intro,
      body: data.body,
      image: data.image,
    });
    setIsEditMode(true);
  };

  const handleCancelClick = () => {
    setIsEditMode(false);
  };

  const handleSaveClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsEditMode(false);
    mutate();
  };

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setArticle({ ...article, [e.target.name]: e.target.value });
  };

  if (status === "loading") return <p>Loading article...</p>;
  if (error) return <div>Error</div>;
  if (!data) return null;

  return (
    <>
      {isEditMode ? (
        <>
          <form action="">
            <input
              type="text"
              name="title"
              value={article.title}
              onChange={handleChange}
            />
            <textarea
              name="intro"
              value={article.intro}
              onChange={handleChange}
            />
            <textarea
              name="body"
              value={article.body}
              onChange={handleChange}
            />
            <button
              onClick={handleSaveClick}
              disabled={updateStatus === "loading"}
            >
              Save
            </button>
            <button onClick={handleCancelClick}>Cancel</button>
          </form>
        </>
      ) : (
        <>
          <div>
            <h1>{data.title}</h1>
            <p>{data.intro}</p>
            <p>{data.body}</p>
            <button onClick={handleEditClick}>Edit</button>
          </div>
          <div>
            <img
              className={style.image}
              src={imageURL + data.image}
              alt={"image"}
            />
          </div>
        </>
      )}
    </>
  );
};

export default Article;
