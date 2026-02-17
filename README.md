<div id="header" align="center">

<img width="713" height="62" alt="banner" src="https://github.com/user-attachments/assets/deafc925-451e-44a4-b3bd-f688c1e7f7bf" />

</div>
  
---
# DevSpace 

### 🌐 [CLICK TO DEMO](https://my-devspace.netlify.app/)

##### Sarah Smith

[![LinkedIn Badge](https://img.shields.io/badge/-@sarahsmithdeveloper-blue?style=flat&logo=Linkedin&logoColor=black)](https://www.linkedin.com/in/sarahsmithdeveloper/)

---

## :pencil: Description

A vibrant, MySpace-inspired social networking interface that brings back the nostalgia of "Top 8" friends and profile songs, built with modern web technologies.

Built with React, React Router, and a custom REST API.

---

## :camera_flash: Screenshots 

|   Description | Screenshot | 
|:-------------:| -----------|
| <h3 align="center">Landing Page</h3> | <img width="600" alt="landing-page" src="https://github.com/user-attachments/assets/5133ee63-6d2d-485c-87c1-e044f51fe784" /> |
| <h3 align="center"> Dashboard </h3> | <img width="600" alt="dashboard" src="https://github.com/user-attachments/assets/adf2ebbf-3260-4b2a-a8ad-7b44fd98d9b9" /> |
| <h3 align="center"> User Profile </h3> | <img width="600" alt="user-profile" src="https://github.com/user-attachments/assets/2b689029-f7a7-45c1-9fe3-470a1be88076" /> |

## Tech Stack
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![React-Bootstrap](https://img.shields.io/badge/React_Bootstrap-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Netlify](https://img.shields.io/badge/netlify-%23000000.svg?style=for-the-badge&logo=netlify&logoColor=#00C7B7)

![Heroku](https://img.shields.io/badge/-Heroku-05122A?style=flat&logo=heroku)
![HTML5](https://img.shields.io/badge/-HTML5-05122A?style=flat&logo=html5)
![CSS3](https://img.shields.io/badge/-CSS-05122A?style=flat&logo=css3)
![Trello](https://img.shields.io/badge/-Trello-05122A?style=flat&logo=trello)
![Markdown](https://img.shields.io/badge/-Markdown-05122A?style=flat&logo=markdown)
![Git](https://img.shields.io/badge/-Git-05122A?style=flat&logo=git)
![Github](https://img.shields.io/badge/-GitHub-05122A?style=flat&logo=github)
![VSCode](https://img.shields.io/badge/-VS_Code-05122A?style=flat&logo=visualstudio)

<details open>
  <summary> Trello Board </summary>
  <a href="https://trello.com/b/4KI9oFU8/unit-4-project-planning-devspace"
    > https://trello.com/b/4KI9oFU8/unit-4-project-planning-devspace </a
  >
</details>

---

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm
- Backend API running locally or deployed

### Installation
1. Clone the frontend repository  
2. Install dependencies
  npm i
3. Create a `.env` file and add the backend API URL  
**VITE_BACK_END_SERVER_URL**=your_backend_url_here
4. Import the CSS file into your application's entry point, which is typically src/index.js, src/index.tsx, or src/main.jsx: import 'bootstrap/dist/css/bootstrap.min.css';
5. Start the development server  
npm run dev

The app will run at `http://localhost:5173` by default.

Netlify Deployment [Link](https://my-devspace.netlify.app/)

* Production: Set FRONTEND_URL in Heroku to your Netlify domain.
* Development: Defaults to localhost:5173

### Backend Repository
The backend REST API for this project can be found here:  
[Backend](https://github.com/sarahlibx/devspace-back-end)

Make sure the backend is running before using the frontend.

----

## :computer: Features
 
- User authentication (signup, login)
- JWT-based authorization
- Owner-only access to user data
- Full CRUD for network posts
- Fully customizable user profile
- iTunes API integration for profile song
- Fully styled with React-Bootstrap for a seamless experience across devices
- The app uses dynamic CORS origins to allow for both local development and production environments.

---

## :books: Resources Used

### [React Bootstrap](https://react-bootstrap.netlify.app/docs/getting-started/introduction/)
### [iTunes Search API](https://performance-partners.apple.com/search-api#:~:text=The%20Search%20API%20allows%20you,%2C%20audiobooks%2C%20and%20TV%20shows.)
### [Web Design Museum](https://www.webdesignmuseum.org/gallery/myspace-in-2008)

---

## :fire: Challenges Overcome
- CORS Preflight Issues: Configured the frontend to send appropriate credentials to the cross-origin Heroku server.
- State Management: Handled asynchronous race conditions when loading profile data to prevent "undefined" errors before the API responds.
- The "Refresh" Bug: Implemented Netlify redirects to allow users to refresh their browser on any sub-route (like /users/1/wall) without losing the page.

>Note: If deploying to Netlify, ensure a _redirects file is present in the public folder with /* /index.html 200 to support React Router.

---

## :satellite: Future Enhancements
- Implement "Like" functionality on posts.
- Implement edit & delete functionality on comments.
- Add real-time notifications for friend requests.
- Add real-time "online now" status.
- Update logic for number of posts displayed to the feed & on the user profile (ex: most recent 10 then load next 10 on scroll).
- Modify edit song feature to be handled directly from profile view vs in edit profile form.
- Add delete friend handler logic.
- Add /friends route to view all friends on a page.
- Update top 8 view to be selected & set by the user, rather than current view of first 8 friends in the list.
- Expand the iTunes API integration to allow for a playable music widget.
- Create seed.py file for immediate "stock" database entries, making testing quicker.

---

This project was built by:

- **Sarah Smith** - [GitHub](https://github.com/sarahlibx) | [LinkedIn](https://www.linkedin.com/in/sarahsmithdeveloper/) 
