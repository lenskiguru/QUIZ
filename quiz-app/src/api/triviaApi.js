const API_URL = "https://opentdb.com/api.php?amount=10&category=9&type=multiple";

export const fetchQuestions = async () => {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    return data.results; // Возвращаем массив вопросов
  } catch (error) {
    console.error("Error fetching quiz questions:", error);
    return [];
  }
};
