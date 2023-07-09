const FinishedScreen = ({point, possiblePoints, highScore, dispatch}) => {
    const percentage = (point / possiblePoints) * 100;

    let emoji;
    if (percentage === 100) emoji = "🥇"
    if (percentage >= 80 && percentage < 100) emoji = "🥳"
    if (percentage >= 50 && percentage < 80) emoji = "🙃"
    if (percentage >= 0 && percentage < 50) emoji = "😔"
    if (percentage === 0) emoji = "🙅"


    return (
        <>
            <p className="result"><span>{emoji}</span> You scored <strong> {point} </strong> out
                of {possiblePoints} ({Math.ceil(percentage)}%)
            </p>
            <p className="highscore">(HighScore: {highScore} Points)</p>
            <button onClick={() => dispatch({type: "restart"})} className="btn btn-ui">Restart Quiz</button>
        </>
    )
}

export default FinishedScreen
