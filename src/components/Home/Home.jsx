import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import "./home.css";

export default function Home() {
  const [home, setHome] = useState({});
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [linkHeader, setLinkHeader] = useState("");

  useEffect(() => {
    axios
      .get("/api/home")
      .then((response) => {
        const homeResponse = response.data[0];
        setHome(homeResponse);
        setTitle(homeResponse.title);
        setBody(homeResponse.body);
        setLinkHeader(homeResponse.linkHeader);
      })
      .catch((error) => {
        console.log("Error fetching Home content:", error);
      });
  }, []);

  return (
    <div>
      <header>
        <h1>{title}</h1>
        <p>{body}</p>
      </header>

      <main>
        <section aria-labelledby="frequently-used-links">
          <h2 id="frequently-used-links">{linkHeader}</h2>

          <nav aria-label="Frequently used links">
            <ul className="frequentlyUsed">
              <li>
                <Link
                  className="homeLink"
                  to="/userQuestions"
                  aria-label="Ask the admins a question"
                >
                  Ask the admins a question
                </Link>
              </li>
              <li>
                <Link
                  className="homeLink"
                  to="/eligible"
                  aria-label="See if you're eligible"
                >
                  See if you're eligible
                </Link>
              </li>
              <li>
                <Link
                  className="homeLink"
                  to="/faqs"
                  aria-label="Frequently asked questions"
                >
                  Frequently asked questions
                </Link>
              </li>
              <li>
                <Link
                  className="homeLink"
                  to="/formsYouShouldStartWith"
                  aria-label="Start with these forms"
                >
                  Start with these forms
                </Link>
              </li>
            </ul>
          </nav>
        </section>
      </main>
    </div>
  );
}
