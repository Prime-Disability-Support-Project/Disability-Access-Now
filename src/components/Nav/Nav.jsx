import { Link, useHistory } from "react-router-dom";
import LogOutButton from "../LogOutButton/LogOutButton";
import "./Nav.css";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import React, { useState, useEffect } from "react";
import SearchPDF from "../Blob/SearchPDF";

function Nav() {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const [unreadAnswers, setUnreadAnswers] = useState();
  const [searchTerm, setSearchTerm] = useState("");
  const history = useHistory();

  useEffect(() => {
    if (user.id) {
      fetchUnreadAnswerCount();
    }
  }, [user.id]);

  const fetchUnreadAnswerCount = async () => {
    try {
      const response = await axios.get(
        "/api/questions/user-answered-questions-count"
      );
      setUnreadAnswers(response.data[0].unread_answered_questions);
    } catch (error) {
      console.error("Error fetching unread answer count:", error);
    }
  };

  // Handles search form submission
  const handleSearch = (event) => {
    event.preventDefault();
    history.push(`search-results?query=${searchTerm}`);
  };

  return (
    <div className="nav">
      {/*links to homepage and navigation title*/}
      <Link to="/home">
        <h2 className="nav-title">Disability Access Now</h2>
      </Link>

      {/* If no user is logged in, show these links */}
      {!user.id && (
        // If there's no user, show login/registration links
        <Link className="navLink" to="/login">
          Login / Register
        </Link>
      )}

      {/* If a user is logged in, show these links */}
      {user.id && (
        <>
          <div className="nav-links">
            <div className="nav-right">
              {/* Search Form */}
              <form onSubmit={handleSearch}>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search for PDFs"
                />
                <button type="submit">Search</button>
              </form>
            </div>
            <Link className="navLink" to="/user">
              Home
            </Link>

            {/* admin links - only show up if a user is logged in and their role is "2" */}
            {user.role === 2 && (
              <>
                <Link className="navLink" to="/adminManage">
                  Manage Logins
                </Link>
                <Link className="navLink" to="/adminManageResources">
                  Manage Resources
                </Link>
              </>
            )}

            <Link className="navLink" to="/userQuestions">
              You Have {unreadAnswers > 0 ? unreadAnswers : 0} Unread Answer
              {unreadAnswers > 0 && unreadAnswers < 2 ? "" : "s"}
            </Link>

            <Link className="navLink" to="/userQuestions">
              Ask a Question
            </Link>

            <div className="dropdown">
              <span className="dropbtn" role="button" tabIndex={0}>
                Resources
              </span>
              <div className="dropdown-content">
                <Link to="/eligible">Am I eligible</Link>
                <Link to="/forms-to-should-start-with">
                  Forms to should start with
                </Link>
                <Link to="/faqs">FAQs</Link>
                <Link to="/formsAndArticles">Forms and Articles</Link>
              </div>
            </div>

            <Link className="navLink" to="/savedResources">
              Saved Resources
            </Link>

            <LogOutButton className="navLink" />
          </div>
        </>
      )}
    </div>
  );
}

export default Nav;
