import React, {Fragment} from 'react';
import {Card, Col, Row} from 'react-bootstrap';

/**
 * This is a React component called GameSettings that renders two buttons for a game:
 * "Rules" and "New Game".
 * When the "Rules" button is clicked,a Card component is displayed with instructions for the game.
 * When the "New Game" button is clicked, a function called handleCol() is called,which is passed in as a prop to this component.
 *
 */
class GameSettings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasClick: false
        };
    }

    /**
     *  toggles the value of `hasClick` in the component's state.
     */
    handleRulesClick = () => {
        this.setState(prevState => ({hasClick: !prevState.hasClick}));
    };

    /**
     * function that call function that was passed in as a prop.
     */
    handleNewGameClick = () => {
        this.props.handleCol();
    }

    render() {
        const {handleCol} = this.props.handleCol
        return (
            <Fragment>
                <Row className="mb-3 mt-1">
                    <Col className='col-1'></Col>
                    <Col className='col-3'>
                        <div>
                            <button id="buttonPlay" type="submit" className="btn btn-primary"
                                    style={{color:'black',backgroundColor:'#FFB653'}} onClick={this.handleRulesClick}>
                                Rules
                            </button>
                        </div>
                    </Col>

                    <Col className='col-4'></Col>
                    <Col className='col-3'>
                        <div>
                            <button id="buttonPlay" type="submit" className="btn btn-primary" style={{backgroundColor:'#CD4A4A',color:'#FFFFFF'}}
                                    onClick={this.handleNewGameClick}>
                                New Game
                            </button>
                        </div>
                    </Col>

                </Row>
                {
                    this.state.hasClick ? (
                        <Row className='mb-3 mt-1'>
                            <Card style={{backgroundColor: '#FFFFFF'}}>
                                <Card.Body>
                                    <Card.Title>Game Rules</Card.Title>
                                    <Card.Subtitle className="mb-2 text-muted">Rules</Card.Subtitle>
                                    <Card.Text>
                                        The program generates a 4 digit number,while the player tries to guess it.
                                    </Card.Text>
                                    <Card.Text>
                                        Each digit appears at most once. e.g. 1234 is valid, but 1233 is not valid.
                                    </Card.Text>
                                    <Card.Text>
                                        For every guess that the player makes, we display 2 values:
                                        <br/>
                                        the number of bulls:1 bull means the guess contains and the target number have 1
                                        digit in common,
                                        and in the correct position.
                                        <br/>
                                        the number of cows: 1 cow mean the guess and the target have 1 digit in common,
                                        but not in correct position.
                                    </Card.Text>
                                    <Card.Text>
                                        For example if the number to guess is 1234. Guessing 4321 will give 0 bulls and
                                        4 cows. 3241 will give 1 bull and 3 cows.
                                        4 bulls means that the user won the game.
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Row>
                    ) : (<></>)}
            </Fragment>
        );
    }
}

export default GameSettings;
