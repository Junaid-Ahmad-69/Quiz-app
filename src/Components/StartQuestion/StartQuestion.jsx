import QuestionOptions from "../QuestionOptions/QuestionOptions";

export const StartQuestion = ({question, answer,dispatch}) => {
    return (
        <div>
            <h4>{question.question}</h4>
            <QuestionOptions question={question} answer={answer} dispatch={dispatch}/>

        </div>
    )
}
