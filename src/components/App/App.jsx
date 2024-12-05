import React, { useEffect } from 'react';
import { HashRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';
import AskAQuestionPage from '../AskAQuestionPage/AskAQuestionPage';
import Contact from '../ContactUs/ContactUs';
import SavedResources from '../SavedResources/SavedResources';
import FormsAndArticles from '../FormsAndArticles/FormsAndArticles';
import Article from '../Article/Article';
import AdminManageLogins from '../Admin/AdminManageLogins/AdminManageLogins.jsx';
import FAQ from '../FAQs/FAQs.jsx';
import AdminManageResources from '../Admin/AdminManageResources/AdminManageResources.jsx';
import AdminArticleEdit from '../Admin/AdminArticleEdit/AdminArticleEdit.jsx';
import AdminAddArticle from '../Admin/AdminAddArticle/AdminAddArticle.jsx';
import './App.css';
import SearchResults from '../SearchResults/SearchResults.jsx';
import AmIEligible from '../AmIEligible/AmIEligible.jsx';
import Home from '../Home/Home.jsx';
import FormsYouShouldStartWith from '../FormsYouShouldStartWith/FormsYouShouldStartWith.jsx';
import AboutUs from '../AboutUs/AboutUs.jsx';
import PendingApproval from '../PendingApproval/PendingApproval.jsx';
import AdminAboutUsEdit from '../Admin/AdminAboutUsEdit/AdminAboutUsEdit.jsx';
import AdminBiosEdit from '../Admin/AdminBiosEdit/AdminBiosEdit.jsx';
import AdminPendingEdit from '../Admin/AdminPendingEdit/AdminPendingEdit.jsx';
import AdminHomePageEdit from '../Admin/AdminHomePageEdit/AdminHomePageEdit.jsx';
import AdminQuestions from '../AdminQuestions/AdminQuestions.jsx';
import AdminUnansweredQuestions from '../Admin/AdminAskedQuestion/AdminAskedQuestion.jsx';
import AdminAnsweredQuestions from '../Admin/AdminAnsweredQuestion/AdminAnsweredQuestion.jsx';
import AdminAnswerInput from '../Admin/AdminAnswerInput/AdminAnswerInput.jsx';
import { createTheme, ThemeProvider } from "@mui/material";


function App() {
  const dispatch = useDispatch();

  const user = useSelector(store => store.user);

  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
  }, [dispatch]);

  const theme = createTheme({
    palette: {
      primary: {
        main: "#12579B",
      },
    },
    typography: {
      fontFamily: "Work Sans, Arial, Helvetica, sans-serif"
    },
  });

  return (
    <Router>
      <ThemeProvider theme={theme}>
      <div>
        <Nav />
        <Switch>
          <Redirect exact from="/" to="/home" />
          <Route exact path="/pending"> <PendingApproval /> </Route>

          <ProtectedRoute exact path="/home"> <Home /> </ProtectedRoute>
          <ProtectedRoute exact path="/aboutUs"> <AboutUs /> </ProtectedRoute>
          <ProtectedRoute exact path="/userQuestions"> <AskAQuestionPage /> </ProtectedRoute>
          <ProtectedRoute exact path="/contact"> <Contact /> </ProtectedRoute>
          <ProtectedRoute exact path="/formsAndArticles"> <FormsAndArticles /> </ProtectedRoute>
          <ProtectedRoute exact path="/formsYouShouldStartWith"> <FormsYouShouldStartWith /> </ProtectedRoute>
          <ProtectedRoute exact path="/adminManage"> <AdminManageLogins /> </ProtectedRoute>
          <ProtectedRoute exact path="/adminManageResources"> <AdminManageResources /> </ProtectedRoute>
          <ProtectedRoute exact path="/adminAddArticle"> <AdminAddArticle /> </ProtectedRoute>
          <ProtectedRoute exact path="/eligible"> <AmIEligible /> </ProtectedRoute>
          <ProtectedRoute path="/articlePage"> <Article /> </ProtectedRoute>
          <ProtectedRoute path="/editArticle"> <AdminArticleEdit /> </ProtectedRoute>
          <ProtectedRoute exact path="/editAbout"> <AdminAboutUsEdit /> </ProtectedRoute>
          <ProtectedRoute exact path="/editHome"> <AdminHomePageEdit /> </ProtectedRoute>
          <ProtectedRoute exact path="/editBios"> <AdminBiosEdit /> </ProtectedRoute>
          <ProtectedRoute exact path="/editPending"> <AdminPendingEdit /> </ProtectedRoute>
          <ProtectedRoute exact path="/savedResources"> <SavedResources /> </ProtectedRoute>
          <ProtectedRoute exact path="/faqs"> <FAQ /> </ProtectedRoute>
          <ProtectedRoute exact path="/search-results" component={SearchResults} />  
          <ProtectedRoute exact path="/adminQuestions" component={AdminQuestions} />
          <ProtectedRoute exact path="/adminUnansweredQuestions" component={AdminUnansweredQuestions} />
          <ProtectedRoute exact path="/adminAnsweredQuestions" component={AdminAnsweredQuestions} />
          <ProtectedRoute exact path="/AdminAnswerInput" component={AdminAnswerInput} />
          <Route exact path="/login"> {user.id ? <Redirect to="/home" /> : <LoginPage />} </Route>
          <Route exact path="/registration"> {user.id ? <Redirect to="/home" /> : <RegisterPage />} </Route>
          <Route exact path="/home"> {user.id ? <Redirect to="/home" /> : <LoginPage /> } </Route>
          
          {/* If none of the other routes matched, we will show a 404. */}
          <Route> <h1>404</h1> </Route>
        </Switch>
        
        {user.id && <Footer />}
      </div>
      </ThemeProvider>
    </Router>
  );
}

export default App;
