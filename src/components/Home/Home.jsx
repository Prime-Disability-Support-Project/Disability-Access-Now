import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import "./home.css";

export default function Home() {
  const [home, setHome] = useState();
  const [title, setTitle] = useState();
  const [body, setBody] = useState();
  const [linkHeader, setLinkHeader] = useState();

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
      <div>
        <h1>{title}</h1>
        <p>{body}</p>
      </div>
      <div className="frequentlyUsed">
        <h2>{linkHeader}</h2>
        <div>
          <Link className="homeLink" to="/userQuestions">
            Ask the admins a question
          </Link>
          <Link className="homeLink" to="/eligible">
            See if you're eligible
          </Link>
          <Link className="homeLink" to="/faqs">
            Frequently asked questions
          </Link>
          <Link className="homeLink" to="/formsYouShouldStartWith">
            Start with these forms
          </Link>
        </div>
      </div>
    </div>
  );
}
