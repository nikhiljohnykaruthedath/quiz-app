import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { addApiData, addCategoryTypes, addQuizQuestionSet, addQuizStats } from '../actions/apiData';
import { Link } from 'react-router-dom';
import AssessmentIcon from '@material-ui/icons/Assessment';
import './Category.css';

const API_URL = "http://lsatmaxadmin.us/interview/loadData.php";

const Category = (props) => {
    const [questions, setQuestions] = useState([]);
    const [categories, setCategories] = useState([]);

    // fetch data from URL and load from local storage
    useEffect(() => {
        fetch(API_URL)
            .then((res) => res.json())
            .then((data) => {
                const updatedQuestions = data.map((question) => (
                    {
                        id: question.id,
                        correct_answer_id: question.correct_answer_id,
                        question_text: question.question_text,
                        category: question.category,
                        answers: question.answers,
                        selected_answer_id: -1
                    }
                ))
                setQuestions(updatedQuestions);

                // Read from local storage if data is present
                if (props.quizStats.length === 0) {
                    let array = JSON.parse(localStorage.getItem('quizStats'));
                    if (array && array.length > 0) {
                        array.map((arr) => {
                            props.addQuizStats(arr);
                        })
                    }
                }

                props.addApiData(data);
            });
    }, [])

    // Get all unique categories and their resp. question total
    useEffect(() => {
        let mainCategories = Array.from(new Set(questions.map((item) => item.category)));

        let count = 0;
        let totalCount = 0;
        let categoriesInfo = [];
        mainCategories.map((categoryName) => {
            questions.map((question) => {
                if (question.category === categoryName) {
                    count++;
                    totalCount++;
                }
            });
            let categoryInfo = {
                name: categoryName,
                totalQuestions: count
            }
            categoriesInfo.push(categoryInfo);
            count = 0;
        });


        let allCategoryInfo = {
            name: 'All',
            totalQuestions: totalCount
        }

        categoriesInfo.push(allCategoryInfo);
        mainCategories.push('All');
        setCategories(mainCategories);
        props.addCategoryTypes(categoriesInfo);
    }, [questions]);

    // Manipulate the data to accommodate quizzing capabilities
    const getCategorySpecificData = (categoryName) => {
        let finalQuestionSet = [];
        if (categoryName === "All") {
            finalQuestionSet = props.apiData.map((question) => ({
                id: question.id,
                correct_answer_id: question.correct_answer_id,
                question_text: question.question_text,
                category: "All",
                answers: question.answers,
                selected_answer_id: -1 // Adding selected answer id
            }))
        }
        else {
            const updatedQuestions = props.apiData.filter((question) => question.category === categoryName);
            finalQuestionSet = updatedQuestions.map((question) => ({
                id: question.id,
                correct_answer_id: question.correct_answer_id,
                question_text: question.question_text,
                category: question.category,
                answers: question.answers,
                selected_answer_id: -1
            }))
        }
        props.addQuizQuestionSet(finalQuestionSet)
    }

    return (
        <div>

            {/* Nav Bar */}
            <div className="row text-center navbar">
                <div className="col-sm"></div>
                <div className="col-sm brand">LSATPrep</div>

                <div className="col-sm stats">
                    <Link to="/stats">
                        <AssessmentIcon />
                        Stats
                        </Link>
                    <Link to="/">
                        Category
                        </Link>
                </div>
            </div>

            {/* Jumbotron */}
            <div className="row text-center">
                <div className="col-sm jumbotron">
                    <div className="jumbotronTitle">Welcome to LSATPrep</div>
                    <div className="jumbotronText">Select a category to get started...</div>
                </div>
            </div>

            {/* Grid of categories to practice from */}
            <div className="container categories">
                <div className="sectionTitle">Categories</div>
                <div className="row text-center">
                    {
                        props.categoryTypes && props.categoryTypes.map((category, index) => (
                            <div key={index} className="col-sm-4 categoryCard">
                                <div className="card">
                                    <div className="card-header">
                                        {category.name}
                                    </div>
                                    <div className="card-body">
                                        <h5 className="card-title">Questions: {category.totalQuestions}</h5>

                                        <Link to="/quiz">
                                            <button type="button" className="btn practiceButton" onClick={() => getCategorySpecificData(category.name)}>Practice</button>
                                        </Link>

                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>


    );
};

const mapStateToProps = state => ({
    apiData: state.apiData.apiData,
    categoryTypes: state.apiData.categoryTypes,
    quizStats: state.apiData.quizStats,
})

const mapDispatchToProps = dispatch => ({
    addApiData: (payload) => dispatch(addApiData(payload)),
    addCategoryTypes: (payload) => dispatch(addCategoryTypes(payload)),
    addQuizQuestionSet: (payload) => dispatch(addQuizQuestionSet(payload)),
    addQuizStats: (payload) => dispatch(addQuizStats(payload)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Category)