# CINEMATICA - Movie Discovery App

![CINEMATICA Screenshot](./src/assets/screenshot.png) <!-- Add a screenshot later -->

CINEMATICA is a React-based movie discovery application that allows users to browse popular movies, search for specific titles, view movie details, and manage a list of custom movies with full CRUD (Create, Read, Update, Delete) functionality.

## Features

- 🎬 **Browse Popular Movies**: Discover the latest and most popular movies from TMDB
- 🔍 **Search Functionality**: Find movies by title
- 📺 **Movie Details**: View comprehensive information about each movie
- ➕ **Add Custom Movies**: Create your own movie entries
- ✏️ **Edit Movies**: Update details of your custom movies
- 🗑️ **Delete Movies**: Remove movies from your collection
- ▶️ **Trailer Playback**: Watch movie trailers directly in the app
- 📱 **Fully Responsive**: Works on mobile, tablet, and desktop devices

## Technologies Used

- **React** - JavaScript library for building user interfaces
- **React Router** - Navigation and routing
- **React Bootstrap** - UI components and styling
- **React Icons** - Icon library
- **Axios** - HTTP client for API requests
- **TMDB API** - Movie database API
- **Netlify** - Deployment and hosting

## Getting Started

### Prerequisites

- Node.js (v14+)
- npm (v6+)
- TMDB API key (free tier)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yonasleykun27/cinamatica.git
cd cinamatica
Install dependencies:

bash
npm install
Create a .env file in the root directory and add your TMDB API key:

env
REACT_APP_TMDB_API_KEY=your_api_key_here
REACT_APP_TMDB_BASE_URL=https://api.themoviedb.org/3
Start the development server:

bash
npm start
Open your browser and visit:

text
http://localhost:3000
Project Structure
text
src/
├── components/       # Reusable components
├── context/          # React context providers
├── pages/            # Page components
├── services/         # API services
├── assets/           # Images and other assets
├── App.js            # Main application component
├── index.js          # Entry point
└── index.css         # Global styles
Deployment
This app is deployed on Netlify. See the deployment section below for instructions.

Contributing
Contributions are welcome! Please follow these steps:

Fork the project

Create your feature branch (git checkout -b feature/AmazingFeature)

Commit your changes (git commit -m 'Add some AmazingFeature')

Push to the branch (git push origin feature/AmazingFeature)

Open a pull request

License
Distributed under the MIT License. See LICENSE for more information.

Contact
Yonas Leykun - GitHub - Email

Project Link: https://github.com/yonasleykun27/cinamatica