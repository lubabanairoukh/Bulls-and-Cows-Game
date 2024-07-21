import React from "react";
import Table from 'react-bootstrap/Table';

/**
 * Renders a table displaying the guesses made by the player.
 * @param {Array} guesses - An array of objects representing each guess, including the guess number, number of bulls,
 * and number of cows.
 * @returns {JSX.Element} - A table displaying the guesses made by the player.
 */
function GuessTable({guesses}) {
    const guessList = guesses.map((guess, index) => (
        <tr key={`guess${index}`}>
            <td>{guess.guessNumber}</td>
            <td>{guess.bullsNumber}</td>
            <td>{guess.cowsNumber}</td>
        </tr>
    ));

    return (
        <Table striped bordered hover variant="white" style={{backgroundColor: 'white'}}>
            <thead>
            <tr>
                <th>Guess</th>
                <th>Bulls</th>
                <th>Cows</th>
            </tr>
            </thead>
            <tbody >
                {guessList}
            </tbody>
        </Table>
    );

}
    export default GuessTable;
