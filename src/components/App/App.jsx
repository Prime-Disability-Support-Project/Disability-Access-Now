import React, { useEffect } from 'react';
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

import AboutPage from '../AboutPage/AboutPage';
import UserPage from '../UserPage/UserPage';
import InfoPage from '../InfoPage/InfoPage';
import LandingPage from '../LandingPage/LandingPage';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';
import AskQuestion from '../AskAQuestionPage/AskAQuestionPage.jsx'; // imports AskQuestion component
import AskAQuestionPage from '../AskAQuestionPage/AskAQuestionPage';
import Contact from '../ContactUs/ContactUs';
import SavedResources from '../SavedResources/SavedResources';
import FormsAndArticles from '../FormsAndArticles/FormsAndArticles';
import Article from '../Article/Article';
import UploadDownload from '../Blob/blobAll.jsx';
import AdminManageLogins from '../Admin/AdminManageLogins/AdminManageLogins.jsx';
import FAQ from '../FAQs/FAQs.jsx';
import AdminManageResources from '../Admin/AdminManageResources/AdminManageResources.jsx';
import AdminArticleEdit from '../Admin/AdminArticleEdit/AdminArticleEdit.jsx';
import AdminAddArticle from '../Admin/AdminAddArticle/AdminAddArticle.jsx';

import './App.css';

function App() {
  const dispatch = useDispatch();

  const user = useSelector(store => store.user);

  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
  }, [dispatch]);

  return (
    <Router>
      <div>
        <Nav />
        <Switch>
          {/* Visiting localhost:5173 will redirect to localhost:5173/home */}
          <Redirect exact from="/" to="/home" />

          {/* Visiting localhost:5173/about will show the about page. */}
          <Route
            // shows AboutPage at all times (logged in or not)
            exact
            path="/about"
          >
            <AboutPage />
          </Route>

          {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:5173/user will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
            Even though it seems like they are different pages, the user is always on localhost:5173/user */}
          <ProtectedRoute
            // logged in shows UserPage else shows LoginPage
            exact
            path="/user"
          >
            <UploadDownload />
            
            
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows InfoPage else shows LoginPage
            exact
            path="/info"
          >
            <InfoPage />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows Ask A Question Page
            exact
            path="/userQuestions"
          >
            <AskAQuestionPage />
          </ProtectedRoute>

          <ProtectedRoute
            exact
            path="/contact"
          >
            <Contact />
          </ProtectedRoute>

          <ProtectedRoute
            exact
            path="/formsAndArticles"
          >
            <FormsAndArticles />
          </ProtectedRoute>

          <ProtectedRoute
            exact
            path="/adminManage"
          >
            <AdminManageLogins />
          </ProtectedRoute>

          <ProtectedRoute
            exact
            path="/adminManageResources"
          >
            <AdminManageResources />
          </ProtectedRoute>

          <ProtectedRoute
            exact
            path="/adminAddArticle"
          >
            <AdminAddArticle />
          </ProtectedRoute>

          <ProtectedRoute
            
            path="/articlePage"
          >
            <Article />
          </ProtectedRoute>

          <ProtectedRoute
            
            path="/editArticle"
          >
            <AdminArticleEdit />
          </ProtectedRoute>

          <ProtectedRoute
            exact
            path="/savedResources"
          >
            <SavedResources />
          </ProtectedRoute>
          <ProtectedRoute exact path="/faqs">
            <FAQ />
          
          </ProtectedRoute>
         


          <Route
            exact
            path="/login"
          >
            {user.id ?
              // If the user is already logged in, 
              // redirect to the /user page
              <Redirect to="/user" />
              :
              // Otherwise, show the login page
              <LoginPage />
            }
          </Route>

          <Route
            exact
            path="/registration"
          >
            {user.id ?
              // If the user is already logged in, 
              // redirect them to the /user page
              <Redirect to="/user" />
              :
              // Otherwise, show the registration page
              <RegisterPage />
            }
          </Route>

          <Route
            exact
            path="/home"
          >
            {user.id ?
              // If the user is already logged in, 
              // redirect them to the /user page
              <Redirect to="/user" />
              :
              // Otherwise, show the Landing page
              <LandingPage />
            }
          </Route>

          {/*Route for AskQuestion component*/}
          <Route 
          exact path="/userQuestions"
          >
            <AskQuestion />
          </Route>

          {/* If none of the other routes matched, we will show a 404. */}
          <Route>
            <h1>404</h1>
          </Route>
        </Switch>
        
        {user.id && <Footer />
          }
      </div>
    </Router>
  );
}

export default App;
