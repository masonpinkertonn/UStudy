import React from "react"
import { getAIMCQ, getAIQuestion } from "../ai"

export default function MCQ(props) {
    const [question, setQuestion] = React.useState(1)
    const [toPut, setToPut] = React.useState("")
    const [asked, setAsked] = React.useState([])
    const [correctIndex, setCorrectIndex] = React.useState(-1)
    const [correct, setCorrect] = React.useState(false)

    const [catalyst, setCatalyst] = React.useState(false)

    const [answerChoices, setAnswerChoices] = React.useState(["", "", "", ""])

    console.log(props.important)

    function helper(response) {
        setToPut(response)
        setAsked(prev => [...prev, response])
    }

    React.useEffect(() => {
        const newQuestion = getAIQuestion(props.important, asked).then(response => helper(response))
    }, [catalyst])

    function goBack() {
        if (question > 1)
        {
            setQuestion(prev => --prev)
        }
    }

    function makeNext() {
        if (question === asked.length)
        {
            setCatalyst(prev => !prev)
            setQuestion(question => ++question)
        }
        else
        {
            setQuestion(question => ++question)
        }
    }

    React.useEffect(() => {
        const newResp = getAIMCQ(asked[question - 1], props.important).then((response) => response.split("*")).then(data => handleAnswers(data))

    }, [asked])

    function handleAnswers(data) {
        for (let i = 0; i < data.length; i++)
        {
            if (data[i].includes("[CORRECT]"))
            {
                data[i] = data[i].substring(0, data[i].length - 10)
                setCorrectIndex(i)
            }
        }
        setAnswerChoices(prev => [data[0], data[1], data[2], data[3]])
    }
    
    return(
        <div className="MCScreen">
            <button onClick={goBack}>&larr;</button>
            <div className="question_cont">
                <h2>Question {question}: {asked[question - 1]}</h2>
                <div className="option" onClick={check}>{answerChoices[0]}</div>
                <div className="option" onClick={check}>{answerChoices[1]}</div>
                <div className="option" onClick={check}>{answerChoices[2]}</div>
                <div className="option" onClick={check}>{answerChoices[3]}</div>
                {correct && <h2>Great job!</h2>}
            </div>
            <button onClick={makeNext}>&rarr;</button>
        </div>
    )
}