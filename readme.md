# Planne Frontend Challenge

A simple movie search application using TMDB API, built with Vite for fast development and performance.

## Getting Started

Follow the steps below to set up and run the project.

## Prerequisites

Make sure you have the following installed:

Node.js: v23.7.0
Yarn: v1.22.22

## Installation

Clone this repository:

```sh
git clone https://github.com/th-coutinho/planne-challenge.git
```

```sh
cd planne-challege
```

Install dependencies:

```sh
yarn install
```

## Environment Variables

To enable API requests, create a .env file in the project root and add your TMDB API key:

`VITE_TMDB_API_KEY=your_tmdb_api_key_here`

If needed, check .env.example for reference.

## Available Scripts

The project includes the following command scripts:

### Start Development Server:

`yarn dev`

Runs the app in development mode with hot module replacement.

### Build for Production:

```sh
yarn build
```

Generates an optimized build for deployment.

### Preview Production Build:

```sh
yarn preview
```

Serves the built project locally to test the final production version.

### Run Tests:

```sh
yarn test
```

Runs unit tests using Vitest.

📁 Project Structure
The project is structured as follows:

```
📦 my-vue-app
┣ 📂src
┃ ┣ 📂api
┃ ┣ 📂components
┃ ┣ 📂mappers
┃ ┣ 📂styles
┃ ┣ 📂utils
┃ ┣ 📜main.js
┃ ┗ 📜style.css
┣ 📂tests
┣ 📜.env.example
┣ 📜.gitignore
┣ 📜index.html
┣ 📜package.json
┣ 📜vite.config.js
┗ 📜yarn.lock
```

### Notes

This project is configured with Vite for fast builds and hot module reloading.
Ensure the .env file is set up correctly, or API requests may fail.
Check comments.md for additional insights into project decisions and implementation details.
