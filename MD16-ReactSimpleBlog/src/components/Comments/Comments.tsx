import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getComments } from "../../components/Cient";
import style from "./Comments.module.scss";

interface CommentsProps {
  articleId: string;
  refetch: () => void;
}

const Comments: React.FC<CommentsProps> = ({ articleId, refetch }) => {
  const { status, data, error, isFetching } = useQuery({
    queryKey: [`comments-${articleId}`],
    queryFn: () => getComments(articleId),
  });

  useEffect(() => {
    const fetchComments = async () => {
      const comments = await getComments(articleId);
      setComments(comments);
    };

    fetchComments();
  }, [articleId, refetch]);

  const [comments, setComments] = useState([]);

  if (error) {
    return <p>An error occured while fetching comments</p>;
  }

  if (status === "loading" || isFetching) {
    return <p>Loading comments...</p>;
  }

  return (
    <div>
      <h2>Comments</h2>
      {comments.map((comment: { id: number; body: string }) => (
        <div className={style.commentBox} key={comment.id}>
          <p>{comment.body}</p>
        </div>
      ))}
    </div>
  );
};

export default Comments;
