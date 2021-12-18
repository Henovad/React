import React from "react";
import "./style.css"
import Die from "./Die"
import { nanoid } from "nanoid"
import Confetti from 'react-confetti'

export default function App() {

    const [dice, setDice] = React.useState(allNewDice())
    const [tenzies, setTenzies] = React.useState(false)
    const [rollCount, setRollcount] = React.useState(0)
    const [menu, setMenu] = React.useState(true)

    React.useEffect(() => {
        const allHeld = dice.every(die => die.isHeld)
        let firstDieValue = dice[0].value
        const allSameValue = dice.every(die => die.value === firstDieValue)
        if (allHeld && allSameValue) {
            setTenzies(true)
        }
    }, [dice])

    function getRandomDieNumber() {
        return Math.ceil(Math.random() * 6)
    }

    function allNewDice() {
        let newDice = []
        for (let i = 0; i < 10; i++) {
            newDice.push({
                value: getRandomDieNumber(),
                isHeld: false,
                id: nanoid(),
                isShake: false
            })
        }
        return newDice
    }

    function holdDice(id) {
        setDice(oldDice => oldDice.map(die => {
            if (die.id === id) {
                die.isHeld = !die.isHeld
            }
            return die
        }))
    }

    const diceElements = dice.map((die) => <Die
        id={die.id}
        key={die.id}
        value={die.value}
        isHeld={die.isHeld}
        holdDice={() => holdDice(die.id)}
        isShake={die.isShake}
    />
    )

    function shake() {
        const diceElements = document.getElementsByClassName("die")
        for (let index = 0; index < diceElements.length; index++) {
            if (dice[index].isHeld) {
                continue
            }
            const element = diceElements[index]
            element.classList.add("shake")
        }
        setTimeout(() => {
            for (let index = 0; index < diceElements.length; index++) {
                const element = diceElements[index]
                element.classList.remove("shake")
            }
        }, 1000)
    }

    function rollDice() {
        setDice(prevDice => prevDice.map(die => {
            return die.isHeld ? die : { ...die, value: getRandomDieNumber() }
        }))
        shake()
        setRollcount(prevCount => prevCount + 1)
    }

    function newGame() {
        setDice(allNewDice())
        setTenzies(false)
        setRollcount(0)

    }

    function menuToggle(){
        setMenu(prevState => !prevState)
        newGame()
    }

    return (
        <>
            {
                menu ? 
                <div className="game-container">
                    <div className="menu--container">
                        <h1 className="title">🎲 Tenzies 🎲</h1>
                        <h2 className="menu--title">Main Menu</h2>
                        <div className="menu--btn-container">
                            <button className="btn" onClick={menuToggle}>Single Player</button>
                            <button className="btn" disabled={true}>Player VS Computer</button>
                            <button className="btn" disabled={true}>Player VS Player</button>
                        </div>
                    </div>
                </div>
                : 
                <main className="game-container">
                    {tenzies && <Confetti />}
                    <button className="btn btn-back" onClick={menuToggle}>Back to menu</button>
                    <div>
                        <h1 className="title">Single Player Mode</h1>
                        <p className="instructions">Roll until all dice are the same.
                            Click each die to freeze it at its current value between rolls.</p>
                    </div>
                        <div className="dice--container">
                            {diceElements}
                        </div>
                        <div>
                            <h3 className="roll-count">Roll Count: {rollCount}</h3>
                            <button onClick={tenzies ? newGame : rollDice} className="btn btn-roll" >{tenzies ? "new game" : "Roll"}</button>
                        </div>
                    <div className="game-over" style={{ display: tenzies ? "block" : "none" }}>GAME OVER</div>
                </main>
            }
        </>
    )
}