export const StartScreen = ({questionLength, dispatch}) => {
    return (
        <div className="start">
            <h2>Welcome to the React Quiz!</h2>
            <h3>{questionLength} question to test your React mastery</h3>
            <button onClick={() => dispatch({type: "startQuiz"})} className="btn btn-ui">Let's Start</button>
        </div>
    )
}
