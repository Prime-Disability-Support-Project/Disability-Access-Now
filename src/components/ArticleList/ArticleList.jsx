import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

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
      <ul>
        {allArticles.map((article) => {
          return (
            <li key={article.id} onClick={() => handleClick(article.id)}>
              <a>{article.title}</a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
