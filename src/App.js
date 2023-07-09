import React, {useReducer, useEffect} from 'react'
import Header from "./Components/Header/Header";
import {Main} from "./Components/Main/Main";
import Loader from "./Components/Loader/Loader";
import Error from "./Components/Error/Error";
import {StartScreen} from "./Components/StartScreen/StartScreen";
import {StartQuestion} from "./Components/StartQuestion/StartQuestion";
import NextButton from "./Components/NextButton/NextButton";
import ProgressBar from "./Components/ProgressBar/ProgressBar";
import FinishedScreen from "./Components/FinishedScreen/FinishedScreen";
import Footer from "./Components/Footer/Footer";
import Timer from "./Components/Timer/Timer";

const initialState = {
    questions: [],

    //loading, error, active, ready, finished
    status: "loading",
    index: 0,
    answer: null,
    points: 0,
    highScore: 0,
    secondRemaining: null,
}
const SEC_PER_TIME = 30;
function reducer(state, action) {
    switch (action.type) {
        case "dataReceived":
            return {
                ...state, questions: action.payload, status: "ready"
            }
        case "dataFailed":
            return {
                ...state, status: "error"
            }
        case "startQuiz":
            return {
                ...state, status: "active",
                secondRemaining: state.questions.length * SEC_PER_TIME,
            }
        case "newAnswer":
            const currentQuestion = state.questions.at(state.index)
            return {
                ...state, answer: action.payload,
                points: action.payload === currentQuestion.correctOption ? state.points + currentQuestion.points : state.points,
            }
        case "nextQuestion":
            return {
                ...state, index: state.index + 1,
                answer: null,
            }
        case "finished":
            return {
                ...state, status: "finished",
                highScore: state.points > state.highScore ? state.points : state.highScore,
            }
        case "restart":
            return {
                ...initialState,
                questions: state.questions,
                status: "ready",
            }
        case "tick":
            return {
                ...state, secondRemaining: state.secondRemaining - 1,
                status: state.secondRemaining === 0 ? "finished" : state.status,
            }
        default:
            throw new Error("Action Unknown")
    }
}

export default function App() {

    const [{questions, status, index, answer, points, highScore,secondRemaining}, dispatch] = useReducer(reducer, initialState)
    //Questions Total Length
    const questionLength = questions.length;
    //Question Total Possible Points
    const possiblePoints = questions.reduce((previous, current) => {
        return previous + current.points
    }, 0)

    useEffect(() => {

        fetch(`http://localhost:4000/questions`)
            .then((res) => res.json())
            .then((data) => dispatch({type: "dataReceived", payload: data}))
            .catch((error) => dispatch({type: "dataFailed"}))

    }, [])
    return (
        <div className="app">
            <Header/>
            <Main>
                {status === "loading" && <Loader/>}
                {status === "error" && <Error/>}
                {status === "ready" && <StartScreen questionLength={questionLength} dispatch={dispatch}/>}
                {status === "active" && (
                    <>
                        <ProgressBar index={index} points={points} possiblePoints={possiblePoints}
                                     questionLength={questionLength} answer={answer}/>
                        <StartQuestion question={questions[index]} answer={answer} dispatch={dispatch}/>
                        <Footer>
                            <Timer dispatch={dispatch} secondsRemaining={secondRemaining}/>
                            <NextButton answer={answer} dispatch={dispatch} index={index}
                                        questionLength={questionLength}/>
                        </Footer>
                    </>
                )}
                {status === "finished" &&
                    <FinishedScreen point={points} possiblePoints={possiblePoints} highScore={highScore}
                                    dispatch={dispatch}/>}

            </Main>
        </div>
    )
}

