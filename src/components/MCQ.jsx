import React from "react"
import { getAIMCQ, getAIQuestion } from "../ai"

export default function MCQ(props) {
    const [question, setQuestion] = React.useState(1)
    const [toPut, setToPut] = React.useState("")
    const [asked, setAsked] = React.useState([])

    const [catalyst, setCatalyst] = React.useState(false)

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
        const newResp = getAIMCQ(asked[question - 1], props.important).then((response) => console.log(response))
    }, [asked])
    
    return(
        <div className="MCScreen">
            <button onClick={goBack}>&larr;</button>
            <div className="question_cont">
                <h2>Question {question}: {asked[question - 1]}</h2>
                <div className="option">O Option 1</div>
                <div className="option">O Option 2</div>
                <div className="option">O Option 3</div>
                <div className="option">O Option 4</div>
            </div>
            <button onClick={makeNext}>&rarr;</button>
        </div>
    )
}