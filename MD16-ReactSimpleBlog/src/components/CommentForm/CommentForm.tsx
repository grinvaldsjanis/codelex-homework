import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { postComment } from "../../components/Cient";

type Props = {
  articleId: string;
  onPostComment: (cb: () => void) => void;
};

const CommentForm: React.FC<Props> = ({ articleId, onPostComment }) => {
  const [newComment, setForm] = useState("");

  const { mutate, status } = useMutation({
    mutationFn: () => postComment(articleId, newComment),
    onSuccess: () => {
      setForm("");
      onPostComment(() => {});
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate();
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea value={newComment} onChange={(e) => setForm(e.target.value)} />
      <button type="submit">Submit</button>
      {status === "loading" && <p>Posting comment...</p>}
    </form>
  );
};

export default CommentForm;
