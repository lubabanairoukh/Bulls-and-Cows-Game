
import {Table} from "react-bootstrap";
import React, {Fragment, useEffect, useState} from "react";
import AlertMessage from "./AlertMessage";

/**
 * A React component that displays a table of high scores.
 * The component retrieves the high scores data from a server and renders it in a table.
 * If there is an error retrieving the data, an error message is displayed using the AlertMessage component.
 * @returns The HighScoresTable React component.
*/
function HighScoresTable() {
    const [highScores, setHighScores] = useState([]);
    const [error, setError] = useState("");

    /**
     * Retrieves the high scores data from the server.
     * If there is an error retrieving the data, sets the error state.
     * @returns {void}
     */
    function getHighScores() {

        fetch("/java_react_war/api/highscores")
            .then(response =>
                    response.json()
            )
            .then(data => {
                setHighScores(data);
            })
            .catch(e => {
                setError("Hmm looks like we can't save your score. Please try again")
                
            });
    }

    /**
     * Calls the getHighScores function when the component is mounted.
     * @returns {void}
     */
    useEffect(() => {
        getHighScores();
    }, []);



    return (
        <Fragment>
            <div
                style={{ backgroundColor: '#FEF6CE' }}
                className="d-flex align-items-center mt-3 mb-4"
            >
                <div>
                    <h4 className="mx-lg-3 mt-3 mb-3 card-title">
                         High Scores
                    </h4>
                    <Table striped bordered hover variant="white" style={{backgroundColor: 'white'}}>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>userName</th>
                                <th>Score</th>
                            </tr>
                        </thead>
                        <tbody >
                        {
                            highScores.map((highScore, index) => (
                                <tr key={`highScore${index}`}>
                                    <td>{index}</td>
                                    <td>{highScore.name}</td>
                                    <td>{highScore.score}</td>
                                </tr>
                            ))
                        }
                        </tbody>
                    </Table>
                    {
                        error && <AlertMessage string={error}></AlertMessage>
                    }
                </div>
            </div>
        </Fragment>
    );
}

export default HighScoresTable;