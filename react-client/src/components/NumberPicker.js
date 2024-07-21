import React, {useEffect, useState} from 'react';
/**

 A component that allows users to pick a number and submit it as a guess.
 @param {function} setNumberGuess - Function to set the selected number as a guess.
 @param {boolean} resetSelectedNumbers - A flag to reset the selected numbers when it's true.
 @returns {JSX.Element} - A JSX element that renders the NumberPicker component.
 */
function NumberPicker({ setNumberGuess, resetSelectedNumbers}) {
    const [selectedNumbers, setSelectedNumbers] = useState(['','','','']);

    const options = Array(10).fill().map((_, i) => ({ value: i, label: i }));

    /**
     * Updates the `selectedNumbers` state with the new value of a specific number input field
     * @param {number} index - The index of the number input field to update.
     * @param {string} value - The new value to set for the number input field.
     */
    const handleNumberSelect = (index, value) => {
        setSelectedNumbers(prevSelectedNumbers => {
            const newSelectedNumbers = [...prevSelectedNumbers];
            newSelectedNumbers[index] = value;
            return newSelectedNumbers;
        });
    }
    /**
     * Handles the submit button click event by concatenating the values of the `selectedNumbers` state
     * and setting the result to the `numberGuess` state.
     */
    const handleSubmitButton = () => {
        setNumberGuess(selectedNumbers.join(''))
    }
    /**
     * Resets the `selectedNumbers` state to the initial value of `['', '', '', '']`
     * when the `resetSelectedNumbers` prop changes.
     */
    useEffect(() => {
        if (resetSelectedNumbers) {
            setSelectedNumbers(['', '', '', '']);
        }
    }, [resetSelectedNumbers]);

    return (
        <>
            <div className="row number-picker">
                {
                    selectedNumbers.map((number, index) => (
                    <div key={index} className="col">
                        <select style={{ backgroundColor: '#FFFFFF' }} className="form-select " value={number} onChange={(e) => handleNumberSelect(index, e.target.value)}>
                            <option value="">Guess...</option>
                            {options.map(option => (
                                <option key={option.value} value={option.value}>{option.label}</option>
                            ))}
                        </select>
                    </div>
                ))}
            </div>
            <br/>
            <div>
                <button id="buttonPlay" type="submit" className="btn btn-primary" onClick={handleSubmitButton}>
                    Go!!
                </button>
            </div>
        </>
    );
}

export default NumberPicker;
