import React, {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import {Col, Container, Row} from "react-bootstrap";
import logo from "../gamepic.png"
import GameSettings from "./GameSettings";
import ScorePage from "./ScorePage";
import AlertMessage from "./AlertMessage";
import GuessTable from "./GuessTable";
import NumberPicker from "./NumberPicker";


const DIGIT=4
const SCORE=1000

/**
 * Generates a secret code of four unique digits
 * @returns {string} - The generated secret code
 */
function generateSecretCode() {
    let code = "";
    while (code.length < DIGIT) {
        const digit = Math.floor(Math.random() * 10).toString();
        if (!code.includes(digit)) {
            code += digit;
        }
    }
    console.log(code)
    return code;
}
/**
 * The main component for the game
 * @returns {JSX.Element} - The game component as a React element
 */
function Game() {
    const [secretCode, setSecretCode] = useState(() => generateSecretCode());
    const [pickerString,setPickerString]=useState("Your history of guesses will appear below: ")
    const [guessList,setGuessList]=useState([])
    const [falseTrue,setFalseTrue]=useState(false)
    const [winTheGame,setWinTheGame]=useState(false)
    const [score,setScore]=useState(0)
    /**
     * Checks the input guess number against the secret code and updates the guess history
     * @param {string} GuessNumber - The guess number as a string of digits
     * @returns {void}
     */
    function checkGuessNumber(GuessNumber)  {
        let str = ""
        if (GuessNumber.length < 4) {
            str="Please select 4 digits!"
        }
        else {
            let matchingDigits = 0,matchingDigitsInSamePosition = 0, arr1 = secretCode.split(''),arr2 = GuessNumber.split('');
            let matchingDigitsSet = new Set([...arr1].filter(x => arr2.includes(x)));


            for (let i = 0; i < arr1.length ; i++) {
                if (arr1[i] === arr2[i]) {
                    matchingDigitsInSamePosition++;
                }
            }
            matchingDigits = matchingDigitsSet.size - matchingDigitsInSamePosition;
            str = "Your guess: " + matchingDigitsInSamePosition.toString() + " Bulls and " + matchingDigits.toString() + " Cows"
            const newRow = {
                guessNumber: GuessNumber,
                bullsNumber: matchingDigitsInSamePosition,
                cowsNumber: matchingDigits,
            };
            setGuessList((prevGuesses) => [newRow, ...prevGuesses]);
            if(matchingDigitsInSamePosition === DIGIT){
                calculateScore();
                setWinTheGame(true);

                str="Your history of guesses will appear below: "
            }

        }
        setPickerString(str)
    }

    function handleCol()
    {
        setGuessList([])
        setSecretCode(generateSecretCode())
        setFalseTrue(true)
        setWinTheGame(false)

    }

    useEffect(() => {
        if (falseTrue) {
            setFalseTrue(false);
        }
    }, [falseTrue]);

        function calculateScore() {

            setScore(SCORE - (10 * (guessList.length)));
        }



    return(
        <Container className='mt-5' >
            <Row>
                <Col className='col-2'></Col>
                <Col>
                    <Row>
                        {
                            <img src={logo} alt="background"  style={{ height: '60%',width: '100%'}} className="header-image mb-3 mt-1"/>
                        }
                    </Row>
                    <Row style={{backgroundColor: 'rgba(180, 255, 220,0.7)'}}>
                        <Row>
                            <GameSettings handleCol={handleCol}></GameSettings>
                        </Row>
                        {
                            winTheGame?
                                <ScorePage score ={score}></ScorePage>
                                :
                                <Row>
                                    <NumberPicker setNumberGuess={checkGuessNumber} resetSelectedNumbers={falseTrue}></NumberPicker>
                                    <AlertMessage string={pickerString}></AlertMessage>
                                    <GuessTable guesses={guessList}></GuessTable>
                                </Row>
                        }
                    </Row>
                </Col>
                <Col className='col-2'></Col>
            </Row>
        </Container>
    )
}

export default Game;
