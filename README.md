

# Bulls and Cows Game

## Overview

This repository contains a full implementation of the classic Bulls and Cows game using React for the frontend and Java Servlet for handling high scores on the backend. The game generates a random 4-digit number with unique digits, and the player attempts to guess it. For each guess, the player receives feedback on the number of "bulls" (correct digits in the correct position) and "cows" (correct digits in the wrong position). The game ends when the player correctly guesses all four digits (4 bulls).

## Features

- **React Frontend**:
  - User-friendly and responsive interface using Bootstrap.
  - Displays the history of guesses with corresponding bulls and cows.
  - Shows a success message and score upon winning.
  - Allows the user to submit their name to record their score.
  - Displays the top 5 high scores.

- **Java Servlet Backend**:
  - Handles high scores via a RESTful API.
  - Stores high scores in a file named `scores.dat` using serialization.
  - Manages concurrent access to the high score file to avoid race conditions.
  - Ensures no duplicate user names in the high score file.


## Setup Instructions

### Frontend (React)

1. **Install Dependencies**:
   ```bash
   cd frontend
   npm install
   ```

2. **Run the Application**:
   ```bash
   npm start
   ```

### Backend (Java Servlet)

1. **Install Maven Dependencies**:
   ```bash
   cd backend
   mvn clean install
   ```

2. **Run the Servlet**:
   - Deploy the `backend` project to a servlet container such as Apache Tomcat.

## API Endpoints

### High Scores API

- **Add a High Score**:
  - **Endpoint**: `/highscores/add`
  - **Method**: `POST`
  - **Parameters**: 
    - `username`: The user's name.
    - `score`: The number of guesses.

- **Get Top 5 High Scores**:
  - **Endpoint**: `/highscores/top5`
  - **Method**: `GET`

## Game Instructions

1. **Start the Game**: The game will automatically generate a random 4-digit number with unique digits.
2. **Make a Guess**: Enter a 4-digit number and click "Guess".
3. **Receive Feedback**: The game will display the number of bulls and cows.
4. **Win the Game**: When you guess the number correctly (4 bulls), the game will display a success message and your score.
5. **Submit Your Score**: Enter your name to record your score.
6. **View High Scores**: The top 5 high scores will be displayed.

## Assumptions

- The user name must be a valid string of 1-24 alphanumeric characters.
- The backend always performs read/write operations directly to the high score file to ensure consistency.

## In order to run your exercise you:
* run the server side; with IntelliJ configuration at the upper right (created above)
* run the client side: open the terminal: `cd react-client`, `npm install`,  run with the command `npm start`

Then browse:
* your react client at http://localhost:3000
* your server will be available at http://localhost:8080/api/highscores (you have of course to implement the REST API).
  Note that you should never specify the host and port in your React code! (use 'api/' instead of 'http://localhost:8080/api/')



## Conclusion

This project is an excellent opportunity to practice your React and Java Servlet skills by implementing a fun and interactive game. Good luck and enjoy coding!

---

**Contributors**:
- Lubaba Nairoukh




