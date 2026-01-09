export default function SetsZone(props) {
    return (
    <>
        {props.userName.length > 0 && <h1 style={{color: "white"}}>Sets: {props.setNum}</h1>}

        <div className="setContainer">
            {props.setMapper}
        </div>
    </>
    )
}