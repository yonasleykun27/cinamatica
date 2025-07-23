# 🎬 CINEMATICA – Movie Discovery App

![CINEMATICA Screenshot](./src/assets/screenshot.png) <!-- Replace with your own image -->

**CINEMATICA** is a sleek and responsive React-based movie discovery application. It allows users to browse trending movies, search titles, view detailed info, and manage a list of custom movies with full CRUD (Create, Read, Update, Delete) functionality.

---

## ✨ Features

- 🎬 Browse popular movies from the TMDB API
- 🔍 Search for movies by title
- 📺 View movie details (overview, genres, runtime, rating, etc.)
- ➕ Add your own custom movies
- ✏️ Edit custom movie information
- 🗑️ Delete movies from your custom list
- ▶️ Play official trailers within the app
- 📱 Fully responsive for all screen sizes

---

## Main Technologies For The Project

![Bootstrap](https://img.shields.io/badge/bootstrap-%23563D7C.svg?style=for-the-badge&logo=bootstrap&logoColor=white)  
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)  
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)  
![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)

---

## Website Link ⬇

Explore the details by visiting now and immerse yourself in the world of movies!  
Feel free to share your observations with me.

👉 **https://movnite.netlify.app/**

---

## 📁 Folder Structure

src/
├── assets/ # App images, icons
├── components/ # Reusable UI components (Header, Footer, MovieCard, etc.)
├── context/ # Global state context
├── pages/ # Main page components (Home, Details, AddMovie, etc.)
├── services/ # API logic (Axios + TMDB)
├── App.js # Main app wrapper
├── index.js # Entry point
└── index.css # Global styles

yaml
Copy
Edit

---

## 🛠️ Getting Started

### Prerequisites

- Node.js v14 or higher
- npm v6 or higher
- TMDB API key (get one free from [TMDB](https://www.themoviedb.org/documentation/api))

### Setup Instructions

1. Clone the repo

```bash
git clone https://github.com/yonasleykun27/cinamatica.git
cd cinamatica
Install dependencies

bash
Copy
Edit
npm install
Create a .env file in the root and add your API keys:

env
Copy
Edit
REACT_APP_TMDB_API_KEY=your_tmdb_key_here
REACT_APP_TMDB_BASE_URL=https://api.themoviedb.org/3
Start the development server

bash
Copy
Edit
npm start
🙋‍♂️ Author
Yonas Leykun
📧 yonasleykun27@gmail.com
🔗 GitHub Profile

📄 License
This project is licensed under the MIT License – feel free to use, modify, and distribute.
