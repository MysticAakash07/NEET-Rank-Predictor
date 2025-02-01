import { Link } from "react-router-dom";
import '../styles/NavBar.css'
const Navbar = () => {
	return (
		<nav className="navbar">
			<ul>
				<li>
					<Link to="/">Home</Link>
				</li>
				<li>
					<Link to="/quiz-history">Quiz History</Link>
				</li>
				<li>
					<Link to="/rank-predictor">Rank Predictor</Link>
				</li>
			</ul>
		</nav>
	);
};

export default Navbar;
