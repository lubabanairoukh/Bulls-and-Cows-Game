import React, { Fragment, useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import HighScoresTable from "./HighScoreTable";
import AlertMessage from "./AlertMessage";

function ScorePage({ score }) {
    const [name, setName] = useState('');
    const [highScorePage,setHighScorePage]=useState(false);
    const [error, setError] = useState("");

    /**
     * Updates the `name` state with the value of the input field whenever the user types something in it.
     *
     * @param {Event} event
     */
    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    /**
     * Handles the response from the server after submitting the high score form.
     * @param {Response} response - The response object returned from the server.
     * @throws {Error} If the response is not successful.
     */
    function handleResponse(response) {
        if (!response.ok) {
            throw new Error("Hmm looks like we can't save your score. Please try again");
        }
        else{
            setHighScorePage(true);
        }
    }
    /**
     * Handles any errors that occur when submitting the high score form.
     * Sets the `error` state with an error message.
     *
     * @param {Error} error - The error object that was thrown.
     */
    function handleError(error) {
        setError("Hmm looks like we can't save your score. Please try again")
    }




    /**
     * Handles the form submission by sending a POST request to the /java_react_war/api/highscores endpoint
     * with the user's name and score, and then calling either the handleResponse or handleError functions
     *  based on the response from the server.
     *  @param {Event} event - The form submission event.
     */
    function handleFormSubmissionPost(event) {

        event.preventDefault();
        if(name.length!==0) {

            fetch(`/java_react_war/api/highscores`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'datatype': 'json'
                },
                body: JSON.stringify({
                    name: name,
                    score: score
                })
            })
                .then(handleResponse)
                .catch(handleError);
        }else{
            setError("Please Enter Your Name");
        }
    }
    return (
            highScorePage ?
                 <HighScoresTable></HighScoresTable>
            :
            <Fragment>
            <div
                style={{ backgroundColor: '#FEF6CE' }}
                className="d-flex align-items-center mt-3 mb-4"
            >
                <div>
                    <h4 className="mx-lg-3 mt-3 mb-3 card-title">
                        You Won! your score is : {score}
                    </h4>
                    <h6 className="card-subtitle mx-lg-3 mb-4 text-muted">
                        You may enter your name below to record your score.
                    </h6>
                </div>
            </div>
            <Form className="mx-lg-3" onSubmit={handleFormSubmissionPost}>
                <Row>
                    <Col>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Control
                                type="text"
                                placeholder="Name"
                                value={name}
                                onChange={handleNameChange}
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Col>
                </Row>
            </Form>
                {
                    error && <AlertMessage string={error}></AlertMessage>
                }
        </Fragment>
    );
}

export default ScorePage;
