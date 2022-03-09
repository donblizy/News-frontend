import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import * as api from "../api";
import { CommentsWrapper } from "./CommentsWrapper";
import { CommentList } from "./CommentsList";
import { ArticleVoting } from "./ArticleVoting";

export const SingleArticle = () => {
  const [article, setArticle] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [err, setErr] = useState(null);
  const { article_id } = useParams();
  useEffect(() => {
    api.getArticleById(article_id).then((article) => {
      setArticle(article);
      setIsLoading(false);
    });
  }, [article_id]);
  const date = new Date(article.created_at);

  const refreshPage = () => {
    window.location.reload();
  };

  if (err)
    return (
      <div>
        <p>{err}</p>
        <button onClick={refreshPage}> Back to Article</button>
      </div>
    );

  return isLoading ? (
    <h2>Just getting that for you ...</h2>
  ) : (
    <article className="singleArticle">
      <h1>{article.title}</h1>
      <dt>
        by <b>{article.author}</b>
      </dt>
      <dt>
        {" "}
        on <u>{date.toLocaleString()}</u>
      </dt>
      <dt>
        Topic:{" "}
        <i>{article.topic.charAt(0).toUpperCase() + article.topic.slice(1)}</i>
      </dt>
      <dt> -- Votes: {article.votes}</dt>
      <ArticleVoting article_id={article_id} setArticle={setArticle} setErr={setErr} />
      <p className="singleArticle__body"> {article.body}</p>
      <p>Comment: {article.comment_count}</p>
      <CommentsWrapper>
        <CommentList />
      </CommentsWrapper>
    </article>
  );
};
