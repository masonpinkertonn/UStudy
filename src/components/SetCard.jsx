import { use, useState } from "react"
import Flashcard from "./Flashcard"
import { updateDoc, getDoc, doc, arrayUnion } from "firebase/firestore"
import Gen2 from "./Gen2"

import ReactMarkdown from "react-markdown"

import { db } from "../config/firebase-config"
import ChatScreen from "./ChatScreen"
import MCQ from "./MCQ"

export default function SetCard(props) {
    const [isReady, setIsReady] = useState(false)

    const [passedArr, setPassedArr] = useState(0)

    const [passedTwoD, setPassedTwoD] = useState([[]])

    const [editing, setEditing] = useState(false)

    const [chatting, setChatting] = useState(false)

    const [currFile, setCurrFile] = useState({})

    const [choosing, setChoosing] = useState(false)

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

    function openChat() {
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
        setChatting(prev => !prev)
    }

    function openMC() {
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
        setChoosing(prev => !prev)
    }

    //console.log(props.importantID)

    return (
        <div className="outerCard">
            <div className="setDiv">
                <p style={{color: "white", fontSize: "10px"}}><ReactMarkdown>{props.name}</ReactMarkdown></p>
                <button onClick={handleFlashcards}>{isReady ? "Close" : "Open"} set</button>        
            </div>
            {isReady && <Flashcard passedArr={passedArr} passedTwoD={passedTwoD}/>}
            <div style={{display: "flex"}}>
                <button onClick={makeEdits}>{editing ? "Cancel" : "Edit set"}</button>
                <button onClick={openChat}>{chatting ? "Cancel" : "Open chat"}</button>
                <button onClick={openMC}>{choosing ? "Cancel" : "Multiple Choice"}</button>
            </div>
            {chatting && <ChatScreen important={passedTwoD}/>}
            {editing && <Gen2 importantID={props.importantID} />}
            {choosing && <MCQ important={passedTwoD} />}
        </div>
    )
}