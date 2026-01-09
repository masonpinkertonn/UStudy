import { use, useState } from "react"
import Flashcard from "./Flashcard"
import { updateDoc } from "firebase/firestore"
import Generation from "./Generation"

export default function SetCard(props) {
    const [isReady, setIsReady] = useState(false)

    const [passedArr, setPassedArr] = useState(0)

    const [passedTwoD, setPassedTwoD] = useState([[]])

    const [editing, setEditing] = useState(false)

    const [currFile, setCurrFile] = useState({})

    function handleFlashcards() {
        let lengthTrack = 0
        let qapair = [[]]
        for (let i = 0; i < props.data.length; i += 2) {
            
            const newer = props.data[i].split("->")
            //console.log(newer[0])
            //console.log(newer[1])
            qapair.push([])
            qapair[lengthTrack][0] = newer[0]
            qapair[lengthTrack][1] = newer[1]
            lengthTrack++
        }
        for (let i = 0; i < props.coll.length; i++)
        {

        }
        setPassedArr(lengthTrack)
        setPassedTwoD(qapair)
        setIsReady(prev => !prev)
    }

    function makeEdits() {
        setEditing(prev => !prev)
    }

    //console.log(props.allData)

    return (
        <div className="outerCard">
            <div className="setDiv">
                <h3 style={{color: "white"}}>{props.name}</h3>
                <button onClick={handleFlashcards}>{isReady ? "Close" : "Open"} set</button>        
            </div>
            {isReady && <Flashcard passedArr={passedArr} passedTwoD={passedTwoD}/>}
            <button onClick={makeEdits}>{editing ? "Cancel" : "Edit set"}</button>
            {editing && <Generation />}
        </div>
    )
}