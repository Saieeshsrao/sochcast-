# Sochcast Clone

This project was created using the React framework. You can view it at [Sochcast Clone](https://cc27-122-171-16-3.ngrok-free.app/) (note: the link may not work if the port is closed, as it is running locally for demo purposes).

## Features

### Show List
- **Fetch and Display:** Retrieve and display a list of all available shows.
- **Show Details:** Each show displays its title and show image.

### Episode List
- **Display Episodes:** When a user clicks on a show, a list of episodes for that show is displayed.
- **Episode Details:** Each episode displays its title, image, and author.

### TODO
- **Audio Playback:** Implement audio playback for episodes (the provided API currently lacks audio paths and episode lists).
- **Player Controls:**
  - Play, pause, and volume control.
  - Automatically play the next episode when the current one finishes.


## How to RUN Locally

**`git clone`** the project.

CD to the project directoy and run **`npm start
`
**

Run the comman **`npm install`** to install all the required node modules from package.json

### `npm start`

Runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.
You may also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.
