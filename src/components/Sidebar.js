import "./Sidebar.css";
import React from "react";
import CloseIcon from '@material-ui/icons/Close';
import { connect } from 'react-redux'
import { addQuizQuestionSet, addQuizResults, addQuizStats } from '../actions/apiData'

const Sidebar = ({ width, height, children, categoryName }, props) => {
    const [xPosition, setX] = React.useState(-width);
    const [isOpen, setIsOpen] = React.useState(false);

    const toggleMenu = () => {
        if (xPosition < 0) {
            setX(0);
        } else {
            setX(-width);
        }
        setIsOpen(!isOpen);
    };

    React.useEffect(() => {
        setX(-width);
    }, []);

    return (
        <React.Fragment>
            <div className="row navBarContainer">
                <div className="col-sm-4 questionList">
                    <button type="button" className="btn btn-link" onClick={() => toggleMenu()}> Question List</button>
                </div>
                <div className="col-sm-4 pageTitle">{categoryName}</div>
                <div className="col-sm-4">
                    <button className="submit rightButton" data-bs-toggle="modal" data-bs-target="#exampleModal">Submit</button>
                </div>
            </div>
            <div
                className="side-bar"
                style={{
                    transform: `translatex(${xPosition}px)`,
                    width: width,
                    minHeight: height
                }}
            >
                {
                    isOpen ? <button
                        onClick={() => toggleMenu()}
                        className="toggle-menu"
                        style={{
                            transform: `translate(${width}px, 20vh)`
                        }}
                    >
                        <CloseIcon />
                    </button> : null
                }
                <div className="content">{children}</div>
            </div>
        </React.Fragment>
    );
};

const mapStateToProps = state => ({
    quizQuestionSet: state.apiData.quizQuestionSet,
})

const mapDispatchToProps = dispatch => ({
    addQuizQuestionSet: (payload) => dispatch(addQuizQuestionSet(payload)),
    addQuizResults: (payload) => dispatch(addQuizResults(payload)),
    addQuizStats: (payload) => dispatch(addQuizStats(payload)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar)