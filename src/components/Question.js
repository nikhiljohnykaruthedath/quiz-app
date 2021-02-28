import React, { useState } from 'react';
import './Question.css';

const Question = ({ handleSaveQuestionAnswer, question, currentIndex }) => {
    const [selectedAnswerId, setSelectedAnswerId] = useState(-1);

    // Add consecutive alphabets to each answer option
    const getAnswerText = (answer, index) => {
        return `${String.fromCharCode(65 + index)}. ${answer}`;
    }

    return (
        <div>
            {/* Question */}
            <div className="question">Question {currentIndex + 1}</div>
            <div
                className="questionItem"
                dangerouslySetInnerHTML={{ __html: question.question_text }}
            />

            {/* Answer Choices */}
            <div>
                {
                    question.answers.map((answer, index) => (
                        <div
                            key={answer.id}
                            className={`answerItem ${question.selected_answer_id === answer.id ? 'selectedAnswer' : null}`}
                            onClick={() => { setSelectedAnswerId(answer.id); handleSaveQuestionAnswer(question.id, answer.id) }}
                            dangerouslySetInnerHTML={{ __html: getAnswerText(answer.answer_text, index) }} />
                    ))
                }
            </div>
        </div>
    )
};

export default Question;
