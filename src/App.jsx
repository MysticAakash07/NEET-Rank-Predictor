import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import QuizHistory from "./pages/QuizHistory";
import RankPredictor from "./pages/RankPredictor";
import './styles/App.css'

function App() {
	return (
		<Router>
			<Navbar />
			<div className="container">
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/quiz-history" element={<QuizHistory />} />
					<Route path="/rank-predictor" element={<RankPredictor />} />
				</Routes>
			</div>
		</Router>
	);
}

export default App;
