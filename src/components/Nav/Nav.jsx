import { Link, useHistory, useLocation } from "react-router-dom";
import LogOutButton from "../LogOutButton/LogOutButton";
import "./Nav.css";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import React, { useState, useEffect, useRef } from "react";

// MUI Imports
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import MenuIcon from "@mui/icons-material/Menu";


// search mui imports
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

function Nav() {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const [unreadAnswers, setUnreadAnswers] = useState();
  const [unreadQuestions, setUnreadQuestions] = useState();
  const [searchTerm, setSearchTerm] = useState("");
  const history = useHistory();
  const [dropDownMenu, setDropDownMenu] = useState(false);
  const dropDownRef = useRef(null);
  const location = useLocation();

  const handleDropdownOpen = () => {
    setDropDownMenu(true);
  };

  const handleDropdownClose = () => {
    setDropDownMenu(false);
  };

  const handleKeyboard = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setDropDownMenu(!dropDownMenu);
    } else if (event.key === "Escape") {
      setDropDownMenu(false);
    }
  };

  const handleMouseEnter = () => {
    setDropDownMenu(true);
  };

  const handleMouseLeave = () => {
    setDropDownMenu(false);
  };

  const handleFocus = () => {
    setDropDownMenu(true);
  };

  const handleBlur = (event) => {
    if (!dropDownRef.current.contains(event.relatedTarget)) {
      dropDownMenu(false);
    }
  };

  useEffect(() => {
    if (user.id) {
      fetchUnreadAnswerCount();
      fetchUnreadQuestionCount();
    }
  }, [user.id]);

  useEffect(() => {
    return history.listen(() => {
      setDropDownMenu(false);
    });
  }, [history]);

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

  const fetchUnreadQuestionCount = async () => {
    try {
      const response = await axios.get(
        "/api/questions/admin-unanswered-questions-count"
      );
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
      setSearchTerm("");
    }
    // if they are on the search results page, just replace the url
    else {
      history.replace(`search-results?query=${searchTerm}`);
      setSearchTerm("");
    }
  };


  return (
    <Box sx={{ flexGrow: 1 }}>
      <a
        href="#content"
        className="skip-to-main-content-link"
        onClick={(e) => {
          e.preventDefault();
          document.getElementById("content").focus();
        }}
      >
        Skip to main content
      </a>
      <header>
        <AppBar position="static">
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography
              variant="h4"
              noWrap
              component={Link}
              to="/home"
              sx={{
                display: { xs: "none", sm: "block" },
                color: "inherit",
                textDecoration: "none",
              }}
            >
              Disability Access Now
            </Typography>
            <Box sx={{ flexGrow: 1 }} />

            <Box sx={{ display: "flex", alignItems: "center" }}>
              {user.id && (
                <Typography
                  variant="h6"
                  noWrap
                  component="div"
                  sx={{ display: { xs: "none", sm: "block" }, marginLeft: 2 }}
                >
                  Welcome, {user.name}
                </Typography>
              )}
            </Box>
            <Box sx={{ flexGrow: 1 }} />

            {user.id && (
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search…"
                  inputProps={{ "aria-label": "search" }}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch(e)}
                />
              </Search>
            )}
            {user.id && user.role === 1 && (
              <Box sx={{ display: { xs: "none", md: "flex" } }}>
                <IconButton
                  size="large"
                  aria-label={`You have ${unreadAnswers} Unread Answers`}
                  color="inherit"
                  component={Link}
                  to="/userQuestions"
                >
                  <Badge badgeContent={unreadAnswers} color="error">
                    <MailIcon />
                  </Badge>
                </IconButton>
              </Box>
            )}
            {user.id && user.role === 2 && (
              <Box sx={{ display: { xs: "none", md: "flex" } }}>
                <IconButton
                  size="large"
                  aria-label={`You have ${unreadQuestions} Unread Questions`}
                  color="inherit"
                  component={Link}
                  to="/adminQuestions"
                >
                  <Badge badgeContent={unreadQuestions} color="error">
                    <MailIcon />
                  </Badge>
                </IconButton>
              </Box>
            )}
            <Box sx={{ display: { xs: "flex", md: "none" } }}></Box>
          </Toolbar>
        </AppBar>
      </header>
      <nav>
        {user.id && (
          <ul
            className="nav-ul"
            aria-label="navigation"
            style={{ display: "flex", justifyContent: "space-evenly" }}
          >
            <li>
              <Link className="navLink" to="/home">
                Home
              </Link>
            </li>
            {user.role === 2 && (
              <>
                <li>
                  <Link className="navLink" to="/adminManage">
                    {" "}
                    Manage Logins
                  </Link>
                </li>
                <li>
                  <Link className="navLink" to="/adminManageResources">
                    {" "}
                    Manage Resources
                  </Link>
                </li>
                <li>
                  <Link className="navLink" to="/adminQuestions">
                    User Questions
                  </Link>
                </li>
              </>
            )}
            {user.role === 1 && (
              <li>
                <Link className="navLink" to="/userQuestions">
                  Ask a Question
                </Link>
              </li>
            )}
            <li>
              <div
                className="dropdown"
                onMouseEnter={handleDropdownOpen}
                onMouseLeave={handleDropdownClose}
              >
                <button
                  className="dropbtn navLink"
                  id="menubutton"
                  aria-haspopup="true"
                  aria-controls="menu"
                  aria-expanded={dropDownMenu}
                  onClick={handleDropdownOpen}
                  onKeyDown={handleKeyboard}
                  tabIndex={0}
                >
                  Resources
                </button>
                <ul
                  className="dropdown-content"
                  id="menu"
                  style={{ display: dropDownMenu ? "block" : "none" }}
                >
                  <li>
                    <Link className="navLink" to="/eligible">
                      Am I eligible
                    </Link>
                  </li>
                  <li>
                    <Link className="navLink" to="/formsYouShouldStartWith">
                      Forms you should start with
                    </Link>
                  </li>
                  <li>
                    <Link className="navLink" to="/faqs">
                      FAQs
                    </Link>
                  </li>
                  <li>
                    <Link className="navLink" to="/formsAndArticles">
                      Forms and Articles
                    </Link>
                  </li>
                </ul>
              </div>
            </li>
            <li>
              <Link className="navLink" to="/savedResources">
                Saved Resources
              </Link>
            </li>
            <li>
              <Link className="navLink" to="/aboutUs">
                About Us
              </Link>
            </li>
            <li>
              <LogOutButton role="button" className="navLink" />
            </li>
          </ul>
        )}
      </nav>
    </Box>
  );
}

export default Nav;
