import ReactMarkdown from "react-markdown"
import { useState } from "react"

export default function Flashcard(props) {
    const [answer, setAnswer] = useState(false)
    const [cardNum, setCardNum] = useState(1)

    const twoDArr = props.passedTwoD

    function handleFlip() {
        setAnswer(prev => !prev)
    }

    function inc() {
        setCardNum(prev => ++prev)
        if (cardNum + 1 > props.passedArr) {
            setCardNum(1)
        }
        setAnswer(false)
    }

    function dec() {
        setCardNum(prev => --prev)
        if (cardNum - 1 < 1) {
            setCardNum(props.passedArr)
        }
        setAnswer(false)
    }

    return(
        <>
            
            <div className="innerDiv">
                <button className="leftarr" onClick={dec}>&larr;</button>
            <div className="flashcard">
                {!answer && <h1 className="frontcard"><ReactMarkdown>{props.passedTwoD[cardNum - 1][0]}</ReactMarkdown></h1>}
                {answer && <h1 className="frontcard"><ReactMarkdown>{props.passedTwoD[cardNum - 1][1]}</ReactMarkdown></h1>}
                <button className="flipper" onClick={handleFlip}>Flip card</button>
            </div>
            <button className="leftarr" onClick={inc}>&rarr;</button>
            </div>
            <h1 className="counter">{cardNum} / {props.passedArr}</h1>
        </>
    )
}