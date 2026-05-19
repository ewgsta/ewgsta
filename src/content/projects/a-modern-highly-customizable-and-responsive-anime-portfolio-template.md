---
title: "A modern, highly customizable, and responsive anime portfolio template. "
description: A modern, highly customizable, and responsive anime portfolio template.
featured: true
link: https://github.com/ewgsta/myanimeprofile
tech:
  - HTML
  - JS
  - CSS
---
# MyAnimeProfile

MyAnimeProfile is a personal, highly customizable anime portfolio website. It serves as a centralized hub to share a bit about yourself, showcase your favorite anime and characters, track what you are currently watching, and write articles or reviews using standard Markdown.

The project is built with Vanilla HTML, CSS, and modern modular ES6 JavaScript, focusing on performance, maintainability, and ease of use.

## Features

- **Centralized Configuration:** All profile data, social links, and settings are managed through a single `config.js` file. No need to dig through HTML or CSS to update your personal information.
- **Markdown Articles:** The "Spotlight" section is powered by a dynamic Markdown rendering system. Write your articles as simple `.md` files in the `assets/articles/` directory and add them to the configuration.
- **Dynamic Social Links:** Add any social platform simply by defining its name, URL, icon (FontAwesome class or image path), and brand color in the configuration. CSS variables automatically apply the correct styling and hover effects without touching stylesheets.
- **Modular JavaScript:** The codebase is split into logical modules (Tabs, Modals, Pagination) making it clean and easy to extend.
- **Responsive Design:** Fully responsive layout that looks great on both desktop and mobile devices.

## Project Structure

- `index.html` - The main structure of the application.
- `assets/js/config.js` - The single source of truth for your profile data, socials, and articles.
- `assets/js/main.js` - The main entry point orchestrating the modules and Markdown rendering.
- `assets/js/modules/` - Contains logic for UI components like modals, tabs, and pagination.
- `assets/css/main.css` - The global stylesheet utilizing modern CSS variables for dynamic theming.
- `assets/articles/` - Directory containing your Markdown review and spotlight files.

## Setup and Usage

Since the project uses modern ES6 JavaScript modules, it must be served over HTTP/HTTPS rather than via the `file://` protocol to prevent CORS policy restrictions.

1. Clone or download the repository.
2. Open a terminal in the project directory.
3. Start a local development server. If you have Python installed, you can easily use:
   ```bash
   python3 -m http.server 8000
   ```
4. Open your browser and navigate to `http://localhost:8000`.

## Customization

### Updating Profile Data
Open `assets/js/config.js` and modify the `profile` object to update your name, handle, and bio text.

### Managing Social Links
To add a new social link, add a new object to the `socials` array in `config.js`. You can use FontAwesome classes for icons or provide a path to a custom image. Brand colors defined here are automatically injected into the CSS via variables.

### Adding New Articles
1. Create a new `.md` file inside the `assets/articles/` directory. Standard Markdown syntax (headings, paragraphs, images, links) is fully supported and automatically styled by the global CSS.
2. Add the path to your new Markdown file into the `articles` array inside `config.js`.

## Technologies Used

- HTML5
- CSS3 (Custom Properties, Flexbox, Grid)
- Vanilla JavaScript (ES6 Modules)
- Marked.js (Markdown Parser)
- FontAwesome (Icons)

## Credits
Original HTML/CSS template and inspiration by [heyKPerks/MyAnimeProfile](https://github.com/heyKPerks/MyAnimeProfile).

## License
This project is released into the **Public Domain** (The Unlicense). 
You are completely free to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the software. You can use it for any purpose, without any restrictions. Giving credit to this repository is appreciated but absolutely not required.
