import ArticleList from "../ArticleList/ArticleList";
import FilesList from "../FilesList/FilesList";
import "./FormsAndArticles.css";

export default function FormsAndArticles() {
  return (
    <main className="forms-and-articles">
      <h1>Forms and Articles</h1>
      <section aria-labelledby="articles-section" className="content-section">
        <h2 id="articles-section">Articles</h2>
        <p>Below is a list of all available articles:</p>
        <ArticleList />
      </section>

      <section aria-labelledby="files-section" className="content-section">
        <h2 id="files-section">Files</h2>
        <p>Below is a list of all downloadable files:</p>
        <FilesList />
      </section>
    </main>
  );
}
