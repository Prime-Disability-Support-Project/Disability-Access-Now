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
import { Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import Divider from "@mui/material/Divider";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import MenuIcon from "@mui/icons-material/Menu";
import Popover from "@mui/material/Popover";

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
  const [anchorEl, setAnchorEl] = useState(null);
  const dropDownRef = useRef(null);
  const location = useLocation();

  const handleDropdownOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleDropdownClose = () => {
    setAnchorEl(null);
  };

  const handleKeyboard = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setDropDownMenu(!dropDownMenu);
    } else if (event.key === "Escape") {
      setDropDownMenu(false);
    }
  };

  const handleMouseEnter = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMouseLeave = () => {
    setAnchorEl(null);
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
      <AppBar
        className="header-style"
        position="static"
        sx={{
          borderRadius: 3,
          padding: "1rem",
          margin: "auto",
          maxWidth: "calc(100% - 2rem)",
          marginTop: "1rem",
        }}
      >
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
          {user.id && user.role === 1 && unreadAnswers > 0 && (
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
          {user.id && user.role === 2 && unreadQuestions > 0 && (
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
      {user.id && (
        <AppBar
          component={"nav"}
          position="static"
          sx={{
            borderRadius: 3,
            margin: "auto",
            maxWidth: "calc(100% - 8rem)",
            marginTop: "1rem",
            background: "#FFFFFF",
            color: "#37474F",
          }}
        >
          <Toolbar sx={{ display: "flex", justifyContent: "space-evenly" }}>
            <>
              <Button color="inherit" component={Link} to="/home">
                Home
              </Button>
              {user.role === 2 && (
                <>
                  <Button color="inherit" component={Link} to="/adminManage">
                    Manage Logins
                  </Button>
                  <Button
                    color="inherit"
                    component={Link}
                    to="/adminManageResources"
                  >
                    Manage Resources
                  </Button>
                  <Button color="inherit" component={Link} to="/adminQuestions">
                    User Questions
                  </Button>
                </>
              )}
              {user.role === 1 && (
                <Button color="inherit" component={Link} to="/userQuestions">
                  Ask a Question
                </Button>
              )}
              <Button
                color="inherit"
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={handleDropdownOpen}
              >
                Resources
              </Button>

              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleDropdownClose}
                MenuListProps={{
                  onKeyDown: (event) => {
                    if (event.key === "Tab") {
                      return;
                    }
                  },
                }}
              >
                <MenuItem
                  onClick={() => {
                    handleDropdownClose();
                  }}
                  component={Link}
                  to="/eligible"
                  tabIndex={0}
                >
                  Am I eligible
                </MenuItem>
                <Divider />
                <MenuItem
                  onClick={() => {
                    handleDropdownClose();
                  }}
                  component={Link}
                  to="/formsYouShouldStartWith"
                  tabIndex={0}
                >
                  Forms you should start with
                </MenuItem>
                <Divider />
                <MenuItem
                  onClick={() => {
                    handleDropdownClose();
                  }}
                  component={Link}
                  to="/faqs"
                  tabIndex={0}
                >
                  FAQs
                </MenuItem>
                <Divider />
                <MenuItem
                  onClick={() => {
                    handleDropdownClose();
                  }}
                  component={Link}
                  to="/formsAndArticles"
                  tabIndex={0}
                >
                  Forms and Articles
                </MenuItem>
              </Menu>

              <Button color="inherit" component={Link} to="/savedResources">
                Saved Resources
              </Button>
              <Button color="inherit" component={Link} to="/aboutUs">
                About Us
              </Button>
              <LogOutButton role="button" className="navLink" />
            </>
          </Toolbar>
        </AppBar>
      )}
    </Box>
  );
}

export default Nav;
