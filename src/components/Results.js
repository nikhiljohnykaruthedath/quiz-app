import React from 'react';
import './Results.css';
import { connect } from 'react-redux'
import { addQuizQuestionSet, addQuizResults, addQuizStats } from '../actions/apiData'
import { Link } from 'react-router-dom'

const Results = (props) => {

    const getAnswerText = (answer, index) => {
        return `${String.fromCharCode(65 + index)}. ${answer}`;
    }

    const getResultHeader = (selectedAnswerId, correctAnswerId) => {
        if (selectedAnswerId === correctAnswerId) {
            return 'correctAnswer';
        }

        else
            return 'wrongAnswer';
    }

    const getResultRow = (selectedAnswerId, correctAnswerId, answerId) => {
        if ((selectedAnswerId === -1) && (correctAnswerId === answerId))
            return 'correctAnswerRow';
        if ((selectedAnswerId === correctAnswerId) && (selectedAnswerId === answerId))
            return 'correctAnswerRow';
        if ((selectedAnswerId !== correctAnswerId) && (correctAnswerId === answerId))
            return 'correctAnswerRow';
        if ((selectedAnswerId !== correctAnswerId) && (selectedAnswerId === answerId))
            return 'wrongAnswerRow';
    }

    const saveToLocalStorage = () => {
        localStorage.setItem('quizStats', JSON.stringify(props.quizStats));
    }

    return (
        <div>
            <div>
                {saveToLocalStorage()}
                {/* Top bar */}
                <div className="row navBarContainer">
                    <div className="col-sm-4 questionList">
                    </div>
                    <div className="col-sm-4 pageTitle">Results - {props.quizQuestionSet[0].category}</div>
                </div>
                {/* Cumalative Results */}
                <div className="row boxResultsContainer">
                    <div className="col-sm-4 box">
                        <div className="boxResults">
                            <div>Questions</div>
                            <div className="boxValue">{props.quizQuestionSet.length}</div>
                        </div>

                    </div>
                    <div className="col-sm-4 box">
                        <div className="boxResults">
                            <div>Answered</div>
                            <div className="boxValue">{props.quizQuestionSet.filter((question) => question.selected_answer_id !== -1).length}</div>
                        </div>

                    </div>
                    <div className="col-sm-4 box">
                        <div className="boxResults">
                            <div>Score</div>
                            <div className="boxValue">{props.quizResults.score}</div>
                        </div>
                    </div>
                </div>
                {/* Question Answer Review */}
                <div className="sectionTitle">Question and Answers</div>
                {
                    props.quizQuestionSet && props.quizQuestionSet.map((question, index) => (
                        <div className="row">
                            <div className="accordion accordion-flush" id="accordionFlushExample">
                                <div className="accordion-item">
                                    <h2 className="accordion-header" id="flush-headingOne">
                                        <button className={`accordion-button collapsed ${getResultHeader(question.selected_answer_id, question.correct_answer_id)}`} type="button" data-bs-toggle="collapse" data-bs-target={`#Question${index + 1}`} aria-expanded="false" aria-controls={`#Question${index + 1}`}>
                                            Question{index + 1}
                                        </button>
                                    </h2>
                                    <div id={`Question${index + 1}`} className="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                                        <div className="accordion-body">
                                            <div
                                                className="questionItem"
                                                dangerouslySetInnerHTML={{ __html: question.question_text }}
                                            />
                                            <div>
                                                {
                                                    question.answers.map((answer, index) => (
                                                        <div
                                                            key={answer.id}
                                                            className={
                                                                `resultAnswerItem 
                                                        ${getResultRow(question.selected_answer_id, question.correct_answer_id, answer.id)}
                                                        `}
                                                            dangerouslySetInnerHTML={{ __html: getAnswerText(answer.answer_text, index) }} />
                                                    ))
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                }
                <div className="col-sm">
                    <Link to="/categories">
                        <button className="resultsContinue rightButton" data-bs-toggle="modal" data-bs-target="#exampleModal">Back to Categories</button>
                    </Link>
                </div>
            </div>
        </div>
    )

};

const mapStateToProps = state => ({
    quizQuestionSet: state.apiData.quizQuestionSet,
    quizResults: state.apiData.quizResults,
    quizStats: state.apiData.quizStats,
})

const mapDispatchToProps = dispatch => ({
    addQuizQuestionSet: (payload) => dispatch(addQuizQuestionSet(payload)),
    addQuizResults: (payload) => dispatch(addQuizResults(payload)),
    addQuizStats: (payload) => dispatch(addQuizStats(payload)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Results)