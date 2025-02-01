import { useState, useEffect } from "react";

const RankPredictor = () => {
	const [quizHistory, setQuizHistory] = useState([]);
	const [selectedQuiz, setSelectedQuiz] = useState(null);
	const [quizPredictedRank, setQuizPredictedRank] = useState(null);
	const [customPredictedRank, setCustomPredictedRank] = useState(null);
	const [customInput, setCustomInput] = useState({
		accuracy: "",
		speed: "",
		totalQuestions: "",
		answeredQuestions: "",
		finalScore: "",
		negativeScore: "",
		correctAnswers: "",
		incorrectAnswers: "",
		trophyLevel: "",
		mistakesCorrected: "",
	});

	useEffect(() => {
		fetch("http://localhost:5000/api/quiz-history")
			.then((response) => response.json())
			.then((data) => setQuizHistory(data))
			.catch((error) => console.error("Error fetching quiz history:", error));
	}, []);

	const handleQuizSelect = (quiz) => {
		setSelectedQuiz(quiz);
		predictRank(
			parseFloat(quiz.accuracy),
			parseInt(quiz.speed),
			quiz.total_questions,
			quiz.correct_answers + quiz.incorrect_answers,
			parseFloat(quiz.final_score),
			parseFloat(quiz.negative_score),
			quiz.correct_answers,
			quiz.incorrect_answers,
			quiz.trophy_level,
			quiz.mistakes_corrected,
			setQuizPredictedRank
		);
	};

	// New rank prediction logic considering all data from the API
	const predictRank = (
		accuracy,
		speed,
		totalQuestions,
		answeredQuestions,
		finalScore,
		negativeScore,
		correctAnswers,
		incorrectAnswers,
		trophyLevel,
		mistakesCorrected,
		setRank
	) => {
		accuracy = Math.min(Math.max(accuracy, 0), 100); // Ensure accuracy is within [0,100]
		speed = Math.max(speed, 1); // Prevent division by zero
		totalQuestions = Math.max(totalQuestions, 1); // Ensure valid total questions
		answeredQuestions = Math.max(answeredQuestions, 1); // Ensure valid answered questions
		finalScore = Math.max(finalScore, 0); // Ensure valid final score
		negativeScore = Math.max(negativeScore, 0); // Ensure valid negative score
		trophyLevel = Math.max(trophyLevel, 1); // Ensure valid trophy level
		mistakesCorrected = Math.max(mistakesCorrected, 0); // Ensure valid mistakes corrected

		// Calculate performance factor based on available data
		const performanceFactor =
			(accuracy * speed * (answeredQuestions / totalQuestions)) / 100;

		// Adjust performance based on final score and negative score
		const adjustedPerformance =
			(performanceFactor * finalScore) / (finalScore + negativeScore);

		// A simple formula to calculate rank based on the above factors
		const estimatedRank = Math.max(
			1,
			Math.round(
				10000 -
					adjustedPerformance * 50 +
					trophyLevel * 10 -
					mistakesCorrected * 5
			)
		);

		setRank(estimatedRank);
	};

	const handleCustomSubmit = (e) => {
		e.preventDefault();
		const {
			accuracy,
			speed,
			totalQuestions,
			answeredQuestions,
			finalScore,
			negativeScore,
			correctAnswers,
			incorrectAnswers,
			trophyLevel,
			mistakesCorrected,
		} = customInput;

		predictRank(
			parseFloat(accuracy),
			parseInt(speed),
			parseInt(totalQuestions),
			parseInt(answeredQuestions),
			parseFloat(finalScore),
			parseFloat(negativeScore),
			parseInt(correctAnswers),
			parseInt(incorrectAnswers),
			parseInt(trophyLevel),
			parseInt(mistakesCorrected),
			setCustomPredictedRank
		);
	};

	return (
		<div>
			<h2>Rank Predictor</h2>
			<ul>
				{quizHistory.map((quiz) => (
					<li
						key={quiz.id}
						onClick={() => handleQuizSelect(quiz)}
						style={{ cursor: "pointer" }}
					>
						{quiz.quiz.title} - Score: {quiz.final_score}
					</li>
				))}
			</ul>

			{selectedQuiz && (
				<div>
					<h3>Selected Quiz: {selectedQuiz.quiz.title}</h3>
					<p>Predicted Rank: {quizPredictedRank}</p>
				</div>
			)}

			<h3>Custom Rank Prediction</h3>
			<form onSubmit={handleCustomSubmit}>
				<label>
					Accuracy (%):
					<input
						type="number"
						value={customInput.accuracy}
						onChange={(e) =>
							setCustomInput({ ...customInput, accuracy: e.target.value })
						}
						required
					/>
				</label>
				<label>
					Speed:
					<input
						type="number"
						value={customInput.speed}
						onChange={(e) =>
							setCustomInput({ ...customInput, speed: e.target.value })
						}
						required
					/>
				</label>
				<label>
					Total Questions:
					<input
						type="number"
						value={customInput.totalQuestions}
						onChange={(e) =>
							setCustomInput({ ...customInput, totalQuestions: e.target.value })
						}
						required
					/>
				</label>
				<label>
					Answered Questions:
					<input
						type="number"
						value={customInput.answeredQuestions}
						onChange={(e) =>
							setCustomInput({
								...customInput,
								answeredQuestions: e.target.value,
							})
						}
						required
					/>
				</label>
				<label>
					Final Score:
					<input
						type="number"
						value={customInput.finalScore}
						onChange={(e) =>
							setCustomInput({ ...customInput, finalScore: e.target.value })
						}
						required
					/>
				</label>
				<label>
					Negative Score:
					<input
						type="number"
						value={customInput.negativeScore}
						onChange={(e) =>
							setCustomInput({ ...customInput, negativeScore: e.target.value })
						}
						required
					/>
				</label>
				<label>
					Correct Answers:
					<input
						type="number"
						value={customInput.correctAnswers}
						onChange={(e) =>
							setCustomInput({ ...customInput, correctAnswers: e.target.value })
						}
						required
					/>
				</label>
				<label>
					Incorrect Answers:
					<input
						type="number"
						value={customInput.incorrectAnswers}
						onChange={(e) =>
							setCustomInput({
								...customInput,
								incorrectAnswers: e.target.value,
							})
						}
						required
					/>
				</label>
				<label>
					Trophy Level:
					<input
						type="number"
						value={customInput.trophyLevel}
						onChange={(e) =>
							setCustomInput({ ...customInput, trophyLevel: e.target.value })
						}
						required
					/>
				</label>
				<label>
					Mistakes Corrected:
					<input
						type="number"
						value={customInput.mistakesCorrected}
						onChange={(e) =>
							setCustomInput({
								...customInput,
								mistakesCorrected: e.target.value,
							})
						}
						required
					/>
				</label>
				<button type="submit">Predict Rank</button>
			</form>
			{customPredictedRank && (
				<p>Custom Predicted Rank: {customPredictedRank}</p>
			)}
		</div>
	);
};

export default RankPredictor;
