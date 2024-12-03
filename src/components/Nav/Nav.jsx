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
  const [unreadQuestions, setUnreadQuestions] = useState();
  const [searchTerm, setSearchTerm] = useState("");
  const history = useHistory();

  useEffect(() => {
    if (user.id) {
      fetchUnreadAnswerCount();
      fetchUnreadQuestionCount();
    }
  }, [user.id]);

  const fetchUnreadAnswerCount = async () => {
    try {
      const response = await axios.get("/api/questions/user-answered-questions-count");
      setUnreadAnswers(response.data[0].unread_answered_questions);
    } catch (error) {
      console.error("Error fetching unread answer count:", error);
    }
  };

  const fetchUnreadQuestionCount = async () => {
    try {
      const response = await axios.get("/api/questions/admin-unanswered-questions-count");
      setUnreadQuestions(response.data[0].unread_unanswered_questions);
    } catch (error) {
      console.error("Error fetching unread question count:", error);
    }
  };

  // Handles search form submission
  const handleSearch = (event) => {
    event.preventDefault();
    // check to see if they are currently on the search results page, if not, push them there
    if (!history.location.pathname.includes("search-results")) {
      history.push(`search-results?query=${searchTerm}`);
      setSearchTerm('')
    }
    // if they are on the search results page, just replace the url
    else {
      history.replace(`search-results?query=${searchTerm}`);
      setSearchTerm('')
    }
  };

  return (
    <div aria-label="navigation links" className="nav">
      {/*links to homepage and navigation title*/}
      {/* Link should be called home and title should maybe get reworked? */}
      <Link aria-label="Link to Disability Access Now Home" to="/home"> <h2 className="nav-title">Disability Access Now</h2> </Link>

      {/* If no user is logged in, show these links */}
      {!user.id && (
        // If there's no user, show login/registration links
        <Link className="navLink" to="/login" aria-label="Link to Login or Register"> Login / Register </Link>
      )}

      {/* If a user is logged in, show these links */}
      {user.id && (
        <>
          <div className="nav-links">

            <div aria-label="Welcome" className="nav-left">
              <p>Welcome, {user.name}</p>
            </div>

            <div className="nav-right">
              <form aria-label="Search Files and Articles Input" onSubmit={handleSearch}>
                <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search files & articles"/>
                <button role="button" aria-label="Search Button" type="submit">Search</button>
              </form>
            </div>

            <Link className="navLink" to="/home" aria-label="Link to Home"> Home</Link>

            {/* admin links - only show up if a user is logged in and their role is "2" */}
            {user.role === 2 && (
              <>
                <Link className="navLink" to="/adminManage"> Manage Logins</Link>
                <Link className="navLink" to="/adminManageResources"> Manage Resources</Link>
                <Link className="navLink" to="/adminQuestions"> You Have {unreadQuestions > 0 ? unreadQuestions : 0} Unread Question {unreadQuestions > 0 && unreadQuestions < 2 ? "s" : ""} </Link>
              </>
            )}

            {user.role === 1 && (
              <Link aria-label="Link to Unread Questions" className="navLink" to="/userQuestions"> You Have {unreadAnswers > 0 ? unreadAnswers : 0} Unread Answer {unreadAnswers > 0 && unreadAnswers < 2 ? "s" : ""} </Link>
              )}

            {user.role === 1 && (
              <Link aria-label="Link to Ask A Question" className="navLink" to="/userQuestions"> Ask a Question </Link>
            )}

            <div className="dropdown">
              <span className="dropbtn" id="menubutton" aria-haspopup="true" aria-controls="menu"  tabIndex={0}> Resources</span>
              <div className="dropdown-content" role="presentation">
                <Link to="/eligible" role="menuitem">Am I eligible</Link>
                <Link to="/formsYouShouldStartWith" role="menuitem">Forms you should start with</Link>
                <Link to="/faqs" role="menuitem">FAQs</Link>
                <Link to="/formsAndArticles" role="menuitem">Forms and Articles</Link>
              </div>
            </div>

            <Link aria-label="Link to Saved Resources" className="navLink" to="/savedResources">Saved Resources</Link>

            <Link aria-label="Link to About Us" className="navLink" to="/aboutUs">About Us</Link>

            <LogOutButton aria-label="Log Out Button" role="button" className="navLink" />
          </div>
        </>
      )}
    </div>
  );
}

export default Nav;
