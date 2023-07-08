import React, {useReducer, useEffect} from 'react'
import Header from "./Components/Header/Header";
import {Main} from "./Components/Main/Main";
import Loader from "./Components/Loader/Loader";
import Error from "./Components/Error/Error";
import {StartScreen} from "./Components/StartScreen/StartScreen";
import {StartQuestion} from "./Components/StartQuestion/StartQuestion";
import NextButton from "./Components/NextButton/NextButton";
import ProgressBar from "./Components/ProgressBar/ProgressBar";

const initialState = {
    questions: [],

    //loading, error, active, ready, finished
    status: "loading",
    index: 0,
    answer: null,
    points: 0,
}

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
                ...state, status: "active"
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
        default:
            throw new Error("Action Unknown")
    }
}

export default function App() {

    const [{questions, status, index, answer, points}, dispatch] = useReducer(reducer, initialState)
    //Questions Total Length
    const questionLength = questions.length;
    //Question Total Possible Points
    const possiblePoints = questions.reduce((previous, current)=>{
        return previous + current.points
    },0)

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
                        <ProgressBar index={index} points={points} possiblePoints={possiblePoints} questionLength={questionLength} answer={answer}/>
                        <StartQuestion question={questions[index]} answer={answer} dispatch={dispatch}/>
                        <NextButton answer={answer} dispatch={dispatch}/>
                    </>
                )}
            </Main>
        </div>
    )
}

