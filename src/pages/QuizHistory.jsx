import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";

const QuizHistory = () => {
	const [quizData, setQuizData] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchQuizHistory = async () => {
			try {
				const response = await fetch("http://localhost:5000/api/quiz-history");
				const data = await response.json();
				setQuizData(data);
			} catch (error) {
				console.error("Error fetching quiz data:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchQuizHistory();
	}, []);

	const chartData = {
		labels: quizData.map((quiz) => quiz.quiz.title || "No Title"),
		datasets: [
			{
				label: "Scores",
				data: quizData.map((quiz) => quiz.final_score),
				backgroundColor: "rgba(75, 192, 192, 0.6)",
			},
		],
	};

	return (
		<div>
			<h2>Quiz History</h2>
			{loading ? (
				<p>Loading...</p>
			) : (
				<>
					<table border="1">
						<thead>
							<tr>
								<th>Quiz Title</th>
								<th>Score</th>
								<th>Accuracy</th>
								<th>Rank</th>
							</tr>
						</thead>
						<tbody>
							{quizData.map((quiz) => (
								<tr key={quiz.id}>
									<td>{quiz.quiz.title || "No Title"}</td>
									<td>{quiz.final_score}</td>
									<td>{quiz.accuracy}</td>
									<td>{quiz.rank_text}</td>
								</tr>
							))}
						</tbody>
					</table>
					<Bar data={chartData} />
				</>
			)}
		</div>
	);
};

export default QuizHistory;



