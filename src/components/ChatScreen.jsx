import React from "react";
import BotChat from "./BotChat";
import HumanChat from "./HumanChat";
import { getAI, getAIChatbot } from "../ai";

export default function ChatScreen() {
    const [chatText, setChatText] = React.useState("")

    const [myChats, setMyChats] = React.useState(0)

    const [toMap, setToMap] = React.useState([["", "Hello, I'm your AI tutor! What would you like to do?"]])

    const [toAdd, setToAdd] = React.useState("")

    const isMounted = React.useRef(true)

    React.useEffect(() => {
        if (isMounted.current)
        {
            isMounted.current = false;
        }
        else
        {
            const response = getAIChatbot(toAdd).then((data) => setToMap(prev => [...prev, ["", data]]))
            setToMap(prev => [...prev, [toAdd, "..."]])
        }
    }, [myChats])

    const mapper = toMap.map((item) => (
        <>
        {item[0].length > 0 && <HumanChat toDisplay={item[0]} />}
        {item[1].length > 0 && <BotChat toDisplay={item[1]} />}
        </>
    ))

    function setText(e) {
        setChatText(e.target.value)
    }

    console.log(toMap)

    function sendText() {
        if (chatText.length > 0)
        {
            setToAdd(chatText)
            setMyChats(prev => prev + 1)

            setChatText("")
            const writer = document.getElementById("toWrite")
            writer.value = ""
        }
    }

    console.log(chatText)

    return (
        <div className="chatwindow">
            <div className="content">
                {mapper}
            </div>
            <div className="typer">
                <input id="toWrite" onChange={(e) => setText(e)} type="text" placeholder="What do you want to know?" style={{backgroundColor: "gray"}}/>
                <button onClick={sendText} style={{backgroundColor: "gray"}}><img src="../src/images/sender.png" width={50} height={50}/></button>
            </div>
        </div>
    )
}