import { signOut } from "firebase/auth"
import { auth } from "../config/firebase-config"

export default function Header(props) {
    const handleClick = () => {
        props.toSign(true)
        //await signOut(auth)
    }

    return (
        <div className="header">
            <img src="../src/images/pfp.png" className="pfp" />
            <h2 className="pfptext">{props.name.length > 0 ? props.name : "N/A"}</h2>
            <div className="inner">
                <span>UStudy</span>
            </div>
            {props.name.length > 0 && <button className="lout" onClick={handleClick}>Log Out</button>}
        </div>
    )
}