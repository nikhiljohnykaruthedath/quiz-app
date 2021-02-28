import React, { useState } from 'react';
import Question from './Question';
import './Quiz.css';
import Results from './Results';
import Sidebar from './Sidebar';
import { connect } from 'react-redux'

import { addQuizQuestionSet, addQuizResults, addQuizStats } from '../actions/apiData'

const Quiz = (props) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isSubmited, setIsSubmited] = useState(false);

    const handlePrevQuestion = () => {
        if (currentIndex - 1 < 0)
            return false;
        setCurrentIndex(currentIndex - 1);
    }

    const handleNextQuestion = () => {
        if (currentIndex + 1 >= props.quizQuestionSet.length)
            return false;
        setCurrentIndex(currentIndex + 1);
    }

    // Save the selected answer per question
    const handleSaveQuestionAnswer = (questionId, answerId) => {
        let index = props.quizQuestionSet.findIndex((question) => question.id === questionId);
        if (index !== -1)
            props.quizQuestionSet[index].selected_answer_id = answerId;
    }

    // On submit, compute and save the results
    const handleSaveResults = () => {
        let tempScore = 0;
        props.quizQuestionSet.map((question) => {
            if (question.selected_answer_id === question.correct_answer_id) {
                tempScore++;
            }
        });

        let categoryName = Array.from(new Set(props.quizQuestionSet.map((item) => item.category)));

        const temp = {
            score: tempScore,
            totalQuestions: props.quizQuestionSet.length,
            totalAnswers: props.quizQuestionSet.filter((question) => question.selected_answer_id !== -1).length
        }

        const temp2 = {
            categoryType: categoryName[0],
            sessions: {
                timestamp: +new Date(),
                score: tempScore,
                totalQuestions: props.quizQuestionSet.length,
                totalAnswers: props.quizQuestionSet.filter((question) => question.selected_answer_id !== -1).length
            }
        }

        props.addQuizResults(temp);
        props.addQuizStats(temp2);
        setIsSubmited(true);
    }

    return props.quizQuestionSet && props.quizQuestionSet.length > 0 ? (
        <div>
            <div className="container">
                {
                    isSubmited ? (
                        <Results
                            categoryName={props.quizQuestionSet[0].category} />
                    ) : (
                            <div>
                                {/* Sidebar to enable easy access to questions */}
                                <Sidebar width={300} height={"100vh"} categoryName={props.quizQuestionSet[0].category}>
                                    <div className="sidebar_text">Select from the list below to jump to that particular question...</div>
                                    {
                                        props.quizQuestionSet.map((question, index) => (
                                            <div key={index} className="sidebar_link" onClick={() => setCurrentIndex(index)}>
                                                <div className="questionLink" >
                                                    {`Question ${index + 1}`}
                                                </div>
                                            </div>

                                        ))
                                    }
                                </Sidebar>

                                {/* Questions */}
                                <div className="container questionContainer">
                                    <Question
                                        question={props.quizQuestionSet[currentIndex]}
                                        currentIndex={currentIndex}
                                        handlePrevQuestion={handlePrevQuestion}
                                        handleNextQuestion={handleNextQuestion}
                                        handleSaveQuestionAnswer={handleSaveQuestionAnswer} />

                                    {/* Prev and Next Buttons */}
                                    <div className="quiz_bottomBar row">
                                        <div className="col-sm-6 buttonContainer">
                                            <button
                                                className="btn leftButton"
                                                disabled={currentIndex - 1 < 0 ? true : false}
                                                onClick={() => { handlePrevQuestion(); }}>
                                                Prev Question
                                        </button>
                                        </div>
                                        <div className="col-sm-6 buttonContainer">
                                            <button
                                                className="btn ightButton"
                                                disabled={currentIndex + 1 >= props.quizQuestionSet.length ? true : false}
                                                onClick={() => { handleNextQuestion(); }}>
                                                Next Question
                                        </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Warning Modal on submit */}
                                <div className="modal fade" id="submitModal" tabIndex="-1" aria-labelledby="submitModalLabel" aria-hidden="true">
                                    <div className="modal-dialog">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h5 className="modal-title" id="submitModalLabel">Submit Quiz Session?</h5>
                                            </div>
                                            <div className="modal-body">
                                                Are you sure you want to submit this quiz session. You won't be able to change your answers later.
                                        </div>
                                            <div className="modal-footer">
                                                <button type="button" className="btn" data-bs-dismiss="modal">Cancel</button>
                                                <button type="button" className="btn submit" data-bs-dismiss="modal" onClick={() => handleSaveResults()}>Save Changes</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                }
            </div>
        </div>
    ) : <h1 className="text-center">Please redirect to Categories by going to path: / </h1>;

};

const mapStateToProps = state => ({
    quizQuestionSet: state.apiData.quizQuestionSet,
})

const mapDispatchToProps = dispatch => ({
    addQuizQuestionSet: (payload) => dispatch(addQuizQuestionSet(payload)),
    addQuizResults: (payload) => dispatch(addQuizResults(payload)),
    addQuizStats: (payload) => dispatch(addQuizStats(payload)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Quiz)