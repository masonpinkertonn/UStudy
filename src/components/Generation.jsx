import { useState, useEffect } from "react"
import { getDoc, doc, updateDoc } from "firebase/firestore"
import { db } from "../config/firebase-config"

export default function Generation(props) {
    const [isProcessingOriginal, setIsProcessingOriginal] = useState(false)
    
    const [isProcessingShow, setIsProcessingShow] = useState(false)

    const [imgData, setImgData] = useState([])

    const [status, setStatus] = useState("")

    const [isReady, setIsReady] = useState(false)

    const [importantId, setImportantId] = useState("")

    const [isReadyTwo, setIsReadyTwo] = useState(false)
    
    const [isError, setIsError] = useState(false)

    const [isProcessingBig, setIsProcessingBig] = useState(false)

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

    function hiddenFunc() {
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
    }

    return (
        <div>
            <input type="file" onClick={(e) => handleFiles(e)} />

            <button onClick={important}>Extract text</button>

            {Object.keys(imgData).length > 0 && <button onClick={loopy}>Generate flashcards</button>}

            {isProcessingShow && <h1 style={{color: "white"}}>Processing...</h1>}

            {isReady && <button onClick={hiddenFunc}>Show flashcards</button>}
        </div>
    )
}