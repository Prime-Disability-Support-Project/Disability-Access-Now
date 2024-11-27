import ArticleList from "../ArticleList/ArticleList";
import "./FormsAndArticles.css";

export default function FormsAndArticles() {
  return (
    <body className="forms-and-articles">
      <header>
        <h1>Forms and Articles</h1>
      </header>
      <div>
        <section>
          <h2>Articles</h2>
          <ArticleList />
        </section>
        <section>
          <h2>Files</h2>
        </section>
      </div>
    </body>
  );
}
