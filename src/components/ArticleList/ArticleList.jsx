import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function ArticleList() {
  const dispatch = useDispatch();
  const history = useHistory();
  const allArticles = useSelector((store) => store.articles.allArticles);

  useEffect(() => {
    dispatch({ type: "FETCH_ALL_ARTICLES" });
  }, [dispatch]);

  const handleClick = (articleId, event) => {
    event.preventDefault();
    history.push(`/articlePage/${articleId}`);
  };

  const handleKeyPress = (event, articleId) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      history.push(`/articlePage/${articleId}`);
    }
  };

  return (
    <ul aria-label="List of Articles">
      {allArticles.map((article) => {
        {/* Don't show these two articles in the article list, they are meant for specific links */}
        if (
          article.title !== "FAQs" &&
          article.title !== "Forms You Should Start With"
        ) {
          return (
            <li
              key={article.id}
              role="button"
              onClick={(e) => handleClick(article.id, e)}
              onKeyDown={(e) => handleKeyPress(e, article.id)}
              style={{ cursor: "pointer", marginBottom: "1rem" }}
            >
              <a href="#">{article.title}</a>
            </li>
          );
        }
      })}
    </ul>
  );
}
