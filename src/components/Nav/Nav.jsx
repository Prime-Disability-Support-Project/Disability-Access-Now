import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import React, { useState, useEffect } from 'react';

function Nav() {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const unreadAnswersCount = useSelector((store) => store.unreadAnswersCount);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (user.id) {
      fetchUnreadAnswerCount();
    }

  }, [user.id]);

    const fetchUnreadAnswerCount = async () => {
      try {
        const response = await axios.get('/api/questions/user-answered-questions-count')
        dispatch({
          type: 'SET_UNREAD_ANSWERS_COUNT',
          payload: response.data[0].unread_answered_questions
        });
      } catch (error) {
        console.error('Error fetching unread answer count:', error)
        dispatch({
          type: 'SET_UNREAD_ANSWERS_COUNT',
          payload: 0
        });
      }
    };

    // Handles search form submission
  const handleSearch = (event) => {
    event.preventDefault();

  // Put BLOB search-code here!
  console.log('Searching for:', searchTerm)
  };


  return (
    <div className="nav">

      {/*links to homepage and navigation title*/}
      <Link to="/home">
        <h2 className="nav-title">Disability Support Application</h2>
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
        {/* Search Form*/}
        <form onSubmit={handleSearch} className="search-form">
          <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          className="search-input"
          />
          <button type="submit" className="search-button">
            Search
          </button>
        </form>
        </div>

            <Link className="navLink" to="/user">
              Home
            </Link>
            
            <Link className="navLink" to="/user-unread">
            Unread Answers {unreadAnswersCount > 0 && `(${unreadAnswersCount})`}
            </Link>

            <Link className="navLink" to="/new-question-without-article">
              Ask a Question
            </Link>

            <div className="dropdown">
              <button className="dropbtn">Resources</button>
              <div className="dropdown-content">
                <Link to="/am-i-eligible">Am I eligible</Link>
                <Link to="/forms-to-should-start-with">Forms to should start with</Link>
                <Link to="/faqs">FAQs</Link>
                <Link to="/forms-and-documents">Forms and Documents</Link>
              </div>
            </div>
            
            <Link className="navLink" to="/saved-resources">
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
