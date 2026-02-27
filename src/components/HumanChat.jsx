export default function HumanChat(props) {
    return(
        <div className="humantext">
            <p style={{width: 276}}>{props.toDisplay}</p>
            <img src="../src/images/pfp.png" style={{borderRadius: "50%", width: 50, height: 50}} />
        </div>
    )
}