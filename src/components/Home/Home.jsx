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
    <main id="content">
      <h1>{title}</h1>
      <p>{body}</p>

      <h2 id="Not Sure where to start?">{linkHeader}</h2>

      <ul className="frequentlyUsed" aria-label="Frequently Used Links">
        <li>
          <Link className="homeLink" to="/userQuestions">
            Ask the admins a question
          </Link>
        </li>
        <li>
          <Link className="homeLink" to="/eligible">
            See if you're eligible
          </Link>
        </li>
        <li>
          <Link className="homeLink" to="/faqs">
            Frequently asked questions
          </Link>
        </li>
        <li>
          <Link className="homeLink" to="/formsYouShouldStartWith">
            Start with these forms
          </Link>
        </li>
      </ul>
    </main>
  );
}
