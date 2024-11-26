import Article from "../Article/Article";

import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";

export default function ArticleList() {
  const dispatch = useDispatch();
  const history = useHistory();
  const allArticles = useSelector((store) => store.articles.allArticles);

  useEffect(() => {
    dispatch({ type: "FETCH_ALL_ARTICLES" });
  }, [dispatch]);

  const handleClick = (articleId) => {
    history.push(`/articlePage/${articleId}`);
  };

  return (
    <div>
      {allArticles.map((article) => {
        return <p onClick={() => handleClick(article.id)}>{article.title}</p>;
      })}
    </div>
  );
}
