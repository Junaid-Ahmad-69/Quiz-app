const NextButton = ({dispatch, answer, index, questionLength}) => {
    if (answer === null) return null

    if (index < questionLength - 1) return (
        <button className="btn btn-ui" onClick={() => dispatch({type: "nextQuestion"})}>
            Next
        </button>
    );
    if (index === questionLength - 1) return (
        <button className="btn btn-ui" onClick={() => dispatch({type: "finished"})}>
            Finished
        </button>
    );
}

export default NextButton
