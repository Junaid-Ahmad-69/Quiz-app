import React from 'react'

const ProgressBar = ({index, questionLength, points, possiblePoints, answer}) => {
    return (
        <header className="progress">
            <progress max={questionLength} value={index + Number(answer !== null)}/>
            <p>Question <strong>{index + 1}</strong>/{questionLength}</p>
            <p><strong>{points}</strong>/ {possiblePoints}</p>
        </header>
    )
}

export default ProgressBar
