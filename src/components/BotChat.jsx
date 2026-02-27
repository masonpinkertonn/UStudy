export default function BotChat(props) {
    return(
        <div className="bottext">
            <img src="../src/images/robopfp.png" style={{borderRadius: "50%", width: 50, height: 50}} />
            <p style={{width: 276}}>{props.toDisplay}</p>
        </div>
    )
}