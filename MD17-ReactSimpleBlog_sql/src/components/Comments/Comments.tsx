import React, { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteComment, getComments, postComment } from "../api/Client";
import style from "./Comments.module.scss";

interface CommentsProps {
  articleId: number;
}

const Comments: React.FC<CommentsProps> = ({ articleId }) => {
  const queryClient1 = useQueryClient();

  const [deletingCommentId, setDeletingCommentId] = useState<null | number>(
    null);
  const [newComment, setNewComment] = useState("");

  const { status, data: comments, error } = useQuery({
    queryFn: () => getComments(articleId),
    queryKey: ["comments", articleId],
   
  });

  const deleteCommentMutation = useMutation({
    mutationFn: deleteComment,
    onSuccess: () => {
      queryClient1.invalidateQueries({ queryKey:["comments", articleId]});
      setDeletingCommentId(null);
    },
  });

  const postCommentMutation = useMutation({
    mutationFn: postComment,
    onSuccess: () => {
      queryClient1.invalidateQueries({ queryKey:["comments", articleId]}),
      setNewComment("")
    },
  });

  const handleDeleteComment = (id: number) => {
    setDeletingCommentId(id);
    deleteCommentMutation.mutate(id);
  };

  const handlePostComment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    postCommentMutation.mutate({articleId, body:newComment});
  };

  if (error) {
    return <p>An error occured while fetching comments</p>;
  }
  if (status === "loading" || !comments) {
    return <p>Loading comments...</p>;
  }

  return (
    <div>
      <h2>Comments</h2>
      <form onSubmit={handlePostComment}>
        <input type="text" value={newComment} onChange={e => setNewComment(e.target.value)} />
        <button type="submit">Post Comment</button>
      </form>
      {comments.map((comment: { id: number; body: string }) => (
        <div className={style.commentBox} key={comment.id}>
          <p>{comment.body}</p>
          {comment.id !== deletingCommentId && (
            <button onClick={() => handleDeleteComment(comment.id)} disabled={deleteCommentMutation.isLoading}>
              Delete
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default Comments;
