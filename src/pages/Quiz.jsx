import { useEffect, useState, useCallback } from "react";
import { fetchQuestions } from "../api/triviaApi";
import { useNavigate } from "react-router-dom";

const TOTAL_QUESTIONS = 10;
const TIMER_DURATION = 20;

function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [shuffledAnswers, setShuffledAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [timeLeft, setTimeLeft] = useState(TIMER_DURATION);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadQuestions = async () => {
      const data = await fetchQuestions();
      if (data.length > 0) {
        setQuestions(data.slice(0, TOTAL_QUESTIONS));
        setLoading(false);
      }
    };
    loadQuestions();
  }, []);

  useEffect(() => {
    if (questions.length > 0 && questions[currentIndex]) {
      const answers = [...questions[currentIndex].incorrect_answers, questions[currentIndex].correct_answer];
      setShuffledAnswers(answers.sort(() => Math.random() - 0.5));
      setTimeLeft(TIMER_DURATION);
      setSelectedAnswer(null);
    }
  }, [currentIndex, questions]);

  const handleTimeout = useCallback(() => {
    if (selectedAnswer === null) {
      setSelectedAnswer("TIMEOUT");
      setTimeout(() => {
        if (currentIndex + 1 < TOTAL_QUESTIONS) {
          setCurrentIndex((prev) => prev + 1);
        } else {
          navigate("/results", { state: { score, total: TOTAL_QUESTIONS } });
        }
      }, 1000);
    }
  }, [selectedAnswer, currentIndex, score, navigate]);

  useEffect(() => {
    if (timeLeft === 0) {
      handleTimeout();
    }
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft, handleTimeout]);

  const handleAnswerClick = (answer) => {
    if (!selectedAnswer) {
      setSelectedAnswer(answer);
      if (answer === questions[currentIndex].correct_answer) {
        setScore((prev) => prev + 1);
      }
      setTimeout(() => {
        if (currentIndex + 1 < TOTAL_QUESTIONS) {
          setCurrentIndex((prev) => prev + 1);
        } else {
          navigate("/results", { state: { score, total: TOTAL_QUESTIONS } });
        }
      }, 1000);
    }
  };

  return (
    <div className="app-container">
      {loading ? (
        <h3>Loading questions...</h3>
      ) : questions.length > 0 ? (
        <div className="quiz-container">
          <h2>Question {currentIndex + 1} of {TOTAL_QUESTIONS}</h2>
          <h3 dangerouslySetInnerHTML={{ __html: questions[currentIndex].question }} />
          <p className="timer">⏳ {timeLeft} seconds left</p>
          {shuffledAnswers.map((answer, index) => (
            <button
              key={index}
              onClick={() => handleAnswerClick(answer)}
              className={`answer-button ${selectedAnswer ? "disabled" : ""}`}
              style={{
                background: selectedAnswer
                  ? answer === questions[currentIndex].correct_answer
                    ? selectedAnswer === "TIMEOUT"
                      ? "red"
                      : "green"
                    : answer === selectedAnswer || selectedAnswer === "TIMEOUT"
                    ? "red"
                    : "lightgray"
                  : "var(--primary-color)",
              }}
              dangerouslySetInnerHTML={{ __html: answer }}
            />
          ))}
        </div>
      ) : (
        <h3>Error: No questions found</h3>
      )}
    </div>
  );
}

export default Quiz;

