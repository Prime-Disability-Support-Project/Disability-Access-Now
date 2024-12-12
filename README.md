![Repo Size](https://img.shields.io/github/languages/code-size/TheAnimalConnection/star-pet.svg?style=for-the-badge) ![TOP_LANGUAGE](https://img.shields.io/github/languages/top/TheAnimalConnection/star-pet.svg?style=for-the-badge)

# Disability Access Now

## Table of Contents

- [Description](#description)
- [Built With](#built-with)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
    

## Description

Disability Access Now is a comprehensive web application designed to streamline and simplify the information aggregation/application process for individuals with disabilities, their caregivers, and case workers. By offering role-based guidance, centralized tips, and intuitive search functionality, the platform provides personalized support via interactive features and an admin-responsive Q&A system. Users benefit from a tailored dashboard allowing the saving of past researched documentation, resources, tracking of questions, and accessing personalized content while also maintaining WCAG 2.1 accessibility compliance. The application aims to transform complex and time-consuming application processes into a more navigable, supportive, and user-friendly experience by leveraging technology to break down the existing barriers and provide real-time, contextual guidance across different user roles. 

## Built With

<a href="https://www.w3schools.com/w3css/defaulT.asp"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original.svg" height="40px" width="40px" /></a>
<a href="https://www.w3schools.com/html/"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original.svg" height="40px" width="40px" /></a>
<a href="https://www.w3schools.com/js/default.asp"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" height="40px" width="40px" /></a>
<a href="https://www.postgresql.org/"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/postgresql/postgresql-original.svg" height="40px" width="40px" /></a>
<a href="https://reactjs.org/"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original-wordmark.svg" height="40px" width="40px" /></a>
<a href="https://redux.js.org/"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/redux/redux-original.svg" height="40px" width="40px" /></a>
<a href="https://www.figma.com/?fuid="><img src="https://github.com/devicons/devicon/blob/master/icons/figma/figma-original.svg" height="40px" width="40px" /></a>
<a href="https://material-ui.com/"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/materialui/materialui-original.svg" height="40px" width="40px" /></a>
<a href="https://nodejs.org/en/"><img src="https://github.com/devicons/devicon/blob/master/icons/nodejs/nodejs-plain.svg" height="40px" width="40px" /></a>
## Getting Started

This project should be able to run in your favorite IDE. We used VS code while building it. 
<a href="https://code.visualstudio.com/"><img src="https://github.com/devicons/devicon/blob/master/icons/vscode/vscode-original-wordmark.svg" height="40px" width="40px" /></a>

### Prerequisites
Before you get started, make sure you have the following software installed on your computer:

- [Node.js](https://nodejs.org/en/)

### Installation

1. Fork the repository
2. Copy the SSH key in your new repository
3. In your terminal type...  `git clone {paste SSH link}`
4. Navigate into the repository's folder in your terminal
5. Open VS Code (or editor of your choice) and open the folder
6. In the terminal of VS Code run `npm install` to install all dependencies
7. Create a `.env` file at the root of the project and paste this line into the file:
    ```
   SERVER_SESSION_SECRET= "choose a string longer than 8 digits for your session secret, you can randomly generate one"
    ```
9. You'll also need to add this to your .env file if you'd like the email notifications to function
    ```
    GMAIL_USER= "your gmail account"
    GMAIL_PASS= "create an app password via gmail"
    ```
10. Create a database named `disability_application` in PostgresSQL
If you would like to name your database something else, you will need to change `disability_application` to the name of your new database name in `server/modules/pool.js`
11. The queries in the database.sql file are set up to create all the necessary tables that you need, as well as a dummy data table to test the app. Copy and paste those queries in the SQL query of the database. If this is going to production, leave out the dummy data.
12. Run `npm run server` in your VS Code terminal
13. Open a second terminal and run `npm run client`

## Usage

Once everything is installed and running it should open in your default browser - if not, navigate to http://localhost:5173/#/.

Video walkthrough of application usage: [https://www.youtube.com/watch?v=HRonNTkScl0](https://www.youtube.com/watch?v=KNsAu8uqk9U)

## Deployment
- Login Credentials for Heroku have been provided in the hand off document.
- If you need make changes you wish to push to the deployed app, you must login, go into the disability-access-now section, go to the deploy tab, and then manually deploy. You can reconfigure this to redeploy automatically if you wish, which is on the same page.
- Environment variables are kept on Heroku in the Settings tab, just click the Reveal Config Vars button
- To set up the database, we used Postico, just plug the information from Heroku into a new favorite. The Information for this can be found in the Resources tab, by clicking the Postgres add on. From there it will bring you to a new page where you will go into the settings tab and click view credentials. 
