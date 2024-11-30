import { Link } from "react-router-dom";
import "./home.css";

export default function Home() {
  return (
    <div>
      <div>
        <h1>Welcome to Disability Access Now</h1>
        <p>
          Disability Access Now is your guide to navigating the disability
          benefits process in Minnesota. Our mission is to simplify your journey
          by providing a centralized hub for resources, tips, step-by-step
          guides, and essential information on applying for benefits, gathering
          required documents, and handling denials. Need personalized advice?
          Ask our admins—real people ready to provide clear, tailored answers.
          Please note, we are not affiliated with any government agency; but
          we’re here to support you every step of the way.
        </p>
      </div>
      <div className="frequentlyUsed">
        <h2>
          Not sure where to start? Check out these frequently used resources
          below:
        </h2>
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
          <Link className="homeLink" to="/forms-to-should-start-with">
            Start with these forms
          </Link>
        </div>
      </div>
    </div>
  );
}
