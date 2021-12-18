import React from "react";
import "./style.css"

export default function Die(props){

    const styles = {
        border : props.isHeld ? "6px solid #59E391" : "#FFFFFF",
        borderRadius : "10px"
    }

    return (
    <div className="die" style={styles} onClick={props.holdDice}>
        <img className="dice-img" alt={props.value} src={`http://roll.diceapi.com/images/poorly-drawn/d6/${props.value}.png`} />
        <h1>{props.value} aa</h1>
    </div>
    )
    
}
