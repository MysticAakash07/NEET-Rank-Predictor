# Student Rank Predictor

## Overview
This project analyzes quiz performance on the NEET Testline app to predict student ranks based on past year NEET exam results. Built using the MERN stack (MongoDB not included), it fetches quiz history and predicts rank using a performance-based algorithm.

## Features
- Fetches quiz history and displays it in a table.
- Allows users to select a quiz and predicts their NEET rank.
- Utilizes a simple formula to estimate rank based on score and accuracy.
- Bypasses CORS restrictions using an Express server.

## Tech Stack
- **Frontend**: React (React Hooks, Fetch API)
- **Backend**: Express.js
- **Data Fetching**: API endpoints from `jsonserve.com`

## Installation & Setup
### Prerequisites
Ensure you have the following installed:
- Node.js
- npm or yarn

### Steps
1. **Clone the repository**
   ```bash
   git clone https://github.com/MysticAakash07/NEET-Rank-Predictor.git
   cd student-rank-predictor
   ```
2. **Install dependencies**
   ```bash
   npm install
   ```
3. **Start the backend server**
   ```bash
   node server.js
   ```
4. **Start the frontend**
   ```bash
   npm run dev
   ```
5. Open `http://localhost:3000` in your browser.

## API Endpoints
- **GET /api/quiz-history**
  - Fetches quiz history data from `jsonserve.com`.

## Project Structure
```
/NEET-Rank-Predictor
│── /src
│   ├── /components
│   │   ├── Navbar.jsx
│   ├── /pages
│   │   ├── Home.jsx
│   │   ├── QuizHistory.jsx
│   │   ├── RankPredictor.jsx
│   ├── /styles
│   │   ├── App.css
│   │   ├── NavBar.css
│   ├── App.jsx
│   ├── main.jsx
│── /public
│── /node_modules
│── server.js
│── package.json
│── vite.config.js
```

## Approach
### Data Analysis
- Fetch quiz history using `fetch()`.
- Extract relevant details such as `score`, `accuracy`, and `quiz title`.

### Rank Prediction Algorithm
- Uses the formula:
  ```math
  Estimated Rank = 5000 - (Final Score * Accuracy / 10)
  ```
- Ensures rank is at least `1`.

### Bonus (Future Work)
- Extend the model to predict the most likely college for admission based on rank.

## Demo & Submission
- **Screenshots**: Include visualizations of quiz history and rank prediction.


## Contact
For any queries, reach out via email: `rahulsagar460@gmail.com`

---


