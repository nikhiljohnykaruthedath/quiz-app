import React from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { connect } from 'react-redux'
import { addQuizStats } from '../actions/apiData'
import { Link } from 'react-router-dom'
import AssessmentIcon from '@material-ui/icons/Assessment';
import "./Stats.css"

const Stats = (props) => {
    let mainPointQuestionData = [];
    let argumentStructureQuestionsData = [];
    let allQuestionData = [];

    const getStatsData = () => {
        // Read from local storage if data is present
        if (props.quizStats.length === 0) {
            let array = JSON.parse(localStorage.getItem('quizStats'));
            if (array && array.length > 0) {
                array.map((arr) => {
                    props.addQuizStats(arr);
                })
            }
        }
    }

    const getData = () => {

        props.quizStats.map((stat) => {
            if (stat.categoryType === 'Main Point Questions') {
                mainPointQuestionData.push([stat.sessions.timestamp, stat.sessions.score]);
            }
            if (stat.categoryType === 'Argument Structure Questions') {
                argumentStructureQuestionsData.push([stat.sessions.timestamp, stat.sessions.score]);
            }
            if (stat.categoryType === 'All') {
                allQuestionData.push([stat.sessions.timestamp, stat.sessions.score]);
            }
        });
    }

    return (
        <div>
            { getStatsData()}
            { getData()}
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
            {
                props.quizStats.length > 0 ?
                    <div className="statsContainer">
                        <div className="sectionTitle">Graphical Progress</div>
                        <HighchartsReact
                            highcharts={Highcharts}
                            options={
                                {
                                    title: {
                                        text: 'Progress - Category Wise'
                                    },

                                    yAxis: {
                                        title: {
                                            text: 'Score'
                                        }
                                    },

                                    xAxis: { type: 'datetime' },

                                    time: {
                                        timezone: 'Los Angeles'
                                    },

                                    series: [{
                                        name: 'Main Point Questions',
                                        data: mainPointQuestionData
                                    }, {
                                        name: 'Argument Structure Questions',
                                        data: argumentStructureQuestionsData
                                    }, {
                                        name: 'All',
                                        data: allQuestionData
                                    }],

                                    responsive: {
                                        rules: [{
                                            condition: {
                                                maxWidth: 500
                                            },
                                            chartOptions: {
                                                legend: {
                                                    layout: 'horizontal',
                                                    align: 'center',
                                                    verticalAlign: 'bottom'
                                                }
                                            }
                                        }]
                                    }
                                }
                            }
                        />
                    </div>
                    : <div className="noDataMessage">No Data</div>
            }
            {
                props.quizStats.length > 0 ?
                    <div className="statsContainer">
                        <div className="sectionTitle">Tabular Progress</div>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">Date/Time</th>
                                    <th scope="col">Category</th>
                                    <th scope="col">Questions</th>
                                    <th scope="col">Answered</th>
                                    <th scope="col">Score</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    props.quizStats.map((stat) => (
                                        <tr>
                                            <td>{`${new Date(stat.sessions.timestamp).toLocaleDateString()} ${new Date(stat.sessions.timestamp).toLocaleTimeString()}`}</td>
                                            <td>{stat.categoryType}</td>
                                            <td>{stat.sessions.totalQuestions}</td>
                                            <td>{stat.sessions.totalAnswers}</td>
                                            <td>{stat.sessions.score}</td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>

                    : null
            }

        </div>
    );
}

const mapStateToProps = state => ({
    quizQuestionSet: state.apiData.quizQuestionSet,
    quizStats: state.apiData.quizStats,
    categoryTypes: state.apiData.categoryTypes,
})

const mapDispatchToProps = dispatch => ({
    addQuizStats: (payload) => dispatch(addQuizStats(payload)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Stats);