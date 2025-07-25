

# Dynamic Podcast App

Welcome to the **Dynamic Podcast App**! This project is a modern web-based podcast platform built to provide an intuitive experience for discovering, playing, and managing podcast episodes. It features a responsive design, a global audio player, genre tagging, and seamless navigation across podcast details and episode lists. Whether you're a podcast enthusiast or a developer looking to explore the codebase, this README will guide you through everything you need to know.

---

## 📝 Introduction

The Dynamic Podcast App allows users to browse a collection of podcasts, view episode details, and play audio content with a fixed player that persists across page navigations. Key features include:

* **Podcast Browsing:** Explore a grid of podcasts with genre filters.
* **Episode Playback:** Play, pause, seek, and navigate episodes with a global audio player.
* **Dark Mode Support:** Switch between light and dark themes for a personalized experience.
* **Responsive Design:** Optimized for desktop and mobile devices.

This project is ideal for learning React, state management with Context API, and CSS theming, or for extending with additional features like user authentication or a backend API.

---

## 📈 My live Dynamic Podcast App link

 Please see my App's live website link. Powered by Vercel

[dynamic-podcast-app.vercel.app](Live App Link)

---

## 🚀 Technologies Used

This project leverages a stack of modern web technologies:

* **React:** A JavaScript library for building user interfaces, providing a component-based architecture.
* **React Router:** Handles client-side navigation between podcast grids and detail pages.
* **Context API:** Manages global state for audio playback and favorites.
* **CSS Modules:** Enables scoped and theme-aware styling with dark/light mode support.
* **HTML5 Audio API:** Powers the audio player for seamless playback.
* **JavaScript (ES6+):** Used for logic and interactivity.
* **Node.js & npm:** For dependency management and running the development server.

---

## ⚙️ Setup Instructions

Follow these steps to set up and run the project locally:

### Prerequisites

* **Node.js:** Version 14.x or higher (includes npm).
* **Git:** For cloning the repository.
* **Text Editor:** Such as VS Code for development.

---

### Installation

1. **Clone the Repository:**

```bash
git clone https://github.com/Rikusvr375/RIKVAN25113_FTO2502_Group-A_Rikus-van-Rooyen_DJSPP.git
cd DJSPP
```

2. **Install Dependencies:**

```bash
npm install
```

This installs all required packages listed in `package.json`, including React, React Router, and other dependencies.

---


3. **Run the Development Server:**

```bash
npm run dev
```

This starts the app on [http://localhost:3000](http://localhost:3000). Open this URL in your browser to see the application.

---


## 💡 Usage Examples

### Adding Podcasts To Favourites

* Open any desired podacst app's detail page.
* Navigate to the season you want to add to your Favourites list.
* Click on the White heart, and be sure that it turns red.
* Now you can navigate to the Favourites page, seen at the top of the screen.
* View all your listed items in the favourites page.

### Browsing Podcasts

* Navigate to the homepage (`/`) to view the podcast grid.
* Use pagination buttons to cycle through pages of podcasts.
* Click a podcast card to view its details.

---

### Viewing Podcast Details

* Click a podcast from the grid to navigate to `/show/:id` (e.g., `/show/1`).
* View the podcast title, description, genres, last updated date, total seasons, and total episodes.
* Select a season from the dropdown to see its episodes.
* Click **"Play"** on an episode to start audio playback.

---

### Using the Audio Player

When an episode plays, a fixed audio player appears at the bottom of the screen.

**Controls:**

* **Play/Pause:** Toggle playback with the central button.
* **Seek:** Drag the slider to jump to a specific time.
* **Progress:** View current time and total duration.

Navigate between pages; the player persists and continues playback.

A confirmation prompt appears if you attempt to reload the page during playback.

---

### Switching Themes

Toggle between light and dark modes using the theme switcher.

* Dark mode adjusts background colors (e.g., `#2a2a2a`) and text colors (e.g., `#fff`) for better visibility.

---

## 📬 Contact

For questions or support, reach out via the [GitHub Issues page](https://github.com/Rikusvr375) or email at **[rikusvr12@gmail.com](rikusvr12@gmail.com)**.

---
