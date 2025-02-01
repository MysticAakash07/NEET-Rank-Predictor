import axios from "axios";

export const fetchQuizHistory = async () => {
	try {
		const response = await axios.get("https://api.jsonserve.com/XgAgFJ");
		return response.data;
	} catch (error) {
		console.error("Error fetching quiz data:", error);
		return [];
	}
};
