# Sto Piato

A food delivery application built with React. It showcases local restaurants and lets visitors search, filter, and add selections to a demo cart.

## Getting Started

Make sure Node.js and npm are installed.

```bash
npm install
npm start
```

Open the address shown by Vite in the terminal, usually `http://localhost:5173/`. In GitHub Codespaces, open the **Ports** tab and select **Open in Browser** for port `5173`.

Useful commands:

| Command | Description |
| --- | --- |
| `npm start` | Starts the development server, available through port forwarding. |
| `npm run dev` | Starts the development server. |
| `npm run build` | Creates the production build in the `dist/` directory. |
| `npm run preview` | Previews the production build after it has been built. |

## Features

- Search restaurants by name and cuisine.
- Filter by category, including pizza, burgers, sushi, and coffee.
- Add and remove restaurants from favorites.
- Demo cart with an item counter.
- Responsive layout for mobile and desktop.

## How It Works

The application starts from `index.html`, which contains the `#root` element. `src/main.jsx` creates the React root and renders the `App` component.

`src/App.jsx` contains the category and restaurant data, along with the main page logic. `useState` stores user selections such as the active category, search query, and cart contents. The restaurant list is filtered by category and search query, and the results are rendered as React components.

`src/styles.css` contains the styles, responsive breakpoints, and animations. `package.json` defines the dependencies and available npm commands.

## Project Structure

```text
.
├── index.html
├── package.json
└── src
	├── App.jsx
	├── main.jsx
	└── styles.css
```

## Current Limitations

This is a frontend demo. Restaurant listings and prices are sample data, and the cart only works in the browser; it does not place real orders. There is no backend, user authentication, or payment processing yet. Images and fonts are loaded from external services, so an internet connection is required to display them.

To share the application with recruiters through a public link, deploy it to a hosting service such as Vercel or Netlify. `npm start` runs the application locally or in Codespaces, but does not create a public website by itself.