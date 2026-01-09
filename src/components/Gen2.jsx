import { useState, useEffect, useRef } from "react"
import { getDoc, doc, updateDoc, addDoc, arrayUnion } from "firebase/firestore"
import { db } from "../config/firebase-config"
import { ocrKey } from "../ai"

import ReactMarkdown from "react-markdown"

import Flashcard from "./Flashcard"

import { getAI, getAITitle } from "../ai"

export default function Gen2(props) {
    const didMount = useRef(false)
    
    const didMountBig = useRef(false)

    const didMountStatus = useRef(false)

    const formData = new FormData()

    const [linear, setLinear] = useState([])

    const [currFile, setCurrFile] = useState({})

    const [isProcessed, setIsProcessed] = useState(false)
    
    const [isProcessingOriginal, setIsProcessingOriginal] = useState(false)
    
    const [isProcessingShow, setIsProcessingShow] = useState(false)

    const [imgData, setImgData] = useState([])

    const [status, setStatus] = useState("")

    const [isReady, setIsReady] = useState(false)

    const [importantId, setImportantId] = useState("")

    const [isReadyTwo, setIsReadyTwo] = useState(false)
    
    const [isError, setIsError] = useState(false)

    const [isProcessingBig, setIsProcessingBig] = useState(false)

    const [resp, setResp] = useState("")

    const [passedArr, setPassedArr] = useState(0)
    
    const [passedTwoD, setPassedTwoD] = useState([[]])

    const myBestKey = ocrKey

    console.log(currFile)

    function handleFiles(e) {
        setCurrFile(e.target.files[0])
    }

    const important = () => {
        //console.log(currFile)
        setIsProcessingOriginal(true)
        setIsProcessingShow(true)
    }

    const loopy = async () => {
        if (status === "processed")
        {
            
        }
        else {
            setIsProcessingBig(true)
            setIsProcessingShow(true)
        }
    }

    useEffect(() => {
        if (!didMountBig.current) {
            didMountBig.current = true
            return
        }
        //console.log("Checking.")
        fetch('https://www.handwritingocr.com/api/v3/documents?page=1&per_page=100', {
            headers: {
                'Authorization': `Bearer ${myBestKey}`,
                'Accept': 'application/json'
            }
        }).then(response => response.json()).then(data => 
            {
                //console.log("Gotem.")
                //setStatus(data.documents[0].status)
                if (data.documents[0].status === "processed")
                {
                    setIsProcessingShow(false)
                    setStatus("processed")
                }
                else {
                    setIsProcessingBig(prev => !prev)
                }
            })
    }, [isProcessingBig])

    useEffect(() => {
            if (!didMountStatus.current) {
                didMountStatus.current = true
                return
            }
    
            console.log("Status changed.")
            
            let fetchedData = []
    
            setIsProcessingShow(true)
                fetch(`https://www.handwritingocr.com/api/v3/documents/${imgData.id}`, {
                    headers: {
                        'Authorization': `Bearer ${myBestKey}`,
                        'Accept': 'application/json'
                    }
                }).then(response => response.json()).then(data => {
                    fetchedData = data.results[0].transcript.split("\n")
                    setLinear(data.results[0].transcript.split("\n"))
                }).then(() => {
                    getAI(fetchedData).then(response => {
                        setResp(response)
                    const newResponse = response.split("\n")
                    let lengthTrack = 0
                    let qapair = [[]]
                    for (let i = 0; i < newResponse.length; i += 2) {
                        
                        const newer = newResponse[i].split("->")
                        //console.log(newer[0])
                        //console.log(newer[1])
                        //setFront(newer[0])
                        //setBack(newer[1])
                        qapair.push([])
                        qapair[lengthTrack][0] = newer[0]
                        qapair[lengthTrack][1] = newer[1]
                        lengthTrack++
                    }
                    //console.log(qapair)
                    setPassedArr(lengthTrack)
                    
                    setPassedTwoD(qapair)
                    setIsProcessed(false)

                    let trackID = ""
                    let docRef

                    for (let i = 0; i < newResponse.length; i++) {
                        const current = newResponse[i]
                        getDoc(doc(db, "notelists", props.importantID)).then(data => {
                                console.log(data.id)
                                trackID = data.id
                                docRef = doc(db, "notelists", trackID)
                            }).then(() => updateDoc(docRef, {
                                data: arrayUnion(current)
                            }).then(() => {
                        setIsProcessingShow(false)
                        setIsReady(true)
    
                    }))
                    }
                    })
                    
                })
                let lines = []
                let currLine = ""
                for (let i = 0; i < imgData.length - 1; i++)
                {
                    lines.push(imgData[i].LineText)
                }
        }, [status])

//getDoc(doc(db, "notelists", props.importantID)).then(data => console.log(data))

    /*function hiddenFunc() {
        try {
            let trackID = ""
            let docRef
            getDoc(doc(db, "notelists", importantId)).then(data => {
                console.log(data.id)
                trackID = data.id
                docRef = doc(db, "notelists", trackID)
            }).then(() => updateDoc(docRef, {
                idWith: trackID
            }))
            setIsReadyTwo(true)
            setIsError(false)
        }
        catch {
            setIsReadyTwo(false)
            setIsError(true)
        }
    }*/

    useEffect(() => {
        if (!didMount.current) {
            didMount.current = true
            return
        }
        formData.append("file", currFile)
        formData.append("action", "transcribe")
        formData.append("delete_after", "604800")
        fetch("https://www.handwritingocr.com/api/v3/documents", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${myBestKey}`,
                "Accept": "application/json"
            },
            body: formData
        }).then(response => response.json()).then(data => setImgData(data)).then(() => console.log("listo")).then(() => setIsProcessingShow(false))
    }, [isProcessingOriginal])

    return (
        <div>
            <input type="file" onChange={(e) => handleFiles(e)} />

            <button onClick={important}>Extract text</button>

            {Object.keys(imgData).length > 0 && <button onClick={loopy}>Generate flashcards</button>}

            {isProcessingShow && <h1 style={{color: "white"}}>Processing...</h1>}

            {isReadyTwo && <div className="markdown"><ReactMarkdown>{resp}</ReactMarkdown></div>}
            
            {isReadyTwo && <div className="flashZone"><Flashcard passedArr={passedArr} passedTwoD={passedTwoD}/></div>}
        </div>
    )
}